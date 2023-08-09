import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import publications from '../../api/publications';
import users from '../../api/users';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import { convertTimeFormat } from '../../config/utils/ocnvertTimeFormat';
import useApi from '../../hooks/useApi/useApi';
import { addPublicationToSavedList, deletePublicationFromSavedList, setopenModal, setcloseModal } from '../../redux/contextSlice/contextSlice';
import { deletePublication } from '../../redux/publicationsSlice/publicationsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ProfilPicture from '../ProfilPicture/ProfilPicture';
import { MdMoreHoriz } from 'react-icons/md';
import { CustomText } from '../CustomedComponents/index';
import colors from '../../config/colors';
import PostCardModal from '../PostCardModal/PostCardModal';

interface PostCardHeaderProps {
    publicationId: number;
    onPpPress?: (() => void)
    authorId: number;
    displayName: string;
    username: string;
    date: any;
    description?: string;
    nbLikes?: number;
    nbComments?: number;
    nbPictures?: number;
    isSurvey: boolean;
    onClick?: () => void;
    profilPicture: string;
}

const PostCardHeader = ({ 
    publicationId, 
    onPpPress, 
    authorId, 
    displayName, 
    username, 
    date, 
    nbLikes, 
    nbComments, 
    description,
    nbPictures,
    isSurvey,
    onClick,
    profilPicture
}: PostCardHeaderProps) => {

    const [saveTitle, setSaveTitle] = useState<string>('Enregistrer')

    const savedPublicationsList = useAppSelector(state => state.context.savedPublicationsList)
    const openPublicationId = useAppSelector(state => state.context.openPublicationId)
    const currentUser = useAppSelector(state => state.context.currentUser)
    const dispatch = useAppDispatch()
    
    const isModalOpen = openPublicationId === publicationId;

    const savePublicationApi = useApi(publications.savePublication)
    const deleteSavePublicationApi = useApi(publications.deleteSavedPublication)
    const deletePublicationApi = useApi(publications.deletePublication)

    useEffect(() => {
        const find = savedPublicationsList.find(publication => publication.id == publicationId)
        if(find) {
            setSaveTitle('Enlever des signets')
        } else {
            setSaveTitle('Enregistrer')
        }
    }, [savedPublicationsList])
    
    // Save Publication
    useEffect(() => {
        if(savePublicationApi.success) {
          dispatch(addPublicationToSavedList({
            author: {
                username: username,
                id: authorId,
                displayName: displayName,
            },
            content: description,
            visible: true,
            nbComments: nbComments,
            nbLikes: nbLikes,
            date: date,
            id: publicationId,
            nbPictures: nbPictures
          }))
        } else if(savePublicationApi.error) {
          console.log('PROBLEME [Add Saved Publication]')
        }
      }, [savePublicationApi.success, savePublicationApi.error])

    // Delete Saved Publication
    useEffect(() => {
        if(deleteSavePublicationApi.success) {
          dispatch(deletePublicationFromSavedList(publicationId))
        } else if(deleteSavePublicationApi.error) {
          console.log('PROBLEME [Delete Saved Publication]')
        }
      }, [deleteSavePublicationApi.success, deleteSavePublicationApi.error])
    
    // Delete Publication

    useEffect(() => {
        if(deletePublicationApi.success) {
          dispatch(deletePublication(publicationId))
        } else if(deletePublicationApi.error) {
          console.log('Un problème est survenu [Delete publication]')
        }
    }, [deletePublicationApi.success, deletePublicationApi.error])

    const handleReport = () => {
        console.log('Publication signalée')
        dispatch(setcloseModal())
    }
    const handleDelete = () => {
        dispatch(setcloseModal())
        deletePublicationApi.request(publicationId)
    }
    const handleSave = () => {
        const index = savedPublicationsList.findIndex((element: any) => element.id === publicationId);
        if (index !== -1) {
            deleteSavePublicationApi.request(publicationId)
        } else {
            savePublicationApi.request(publicationId)
        }
        dispatch(setcloseModal())
    }
    
    return (
        <Container onClick={onClick}>
            <Header>
            {isModalOpen &&
                <MyModal>
                    {currentUser.id !== authorId && 
                    <MenuItem onClick={handleReport}><CustomText style={{fontSize: '15px'}}>Signaler</CustomText></MenuItem>}
                    {currentUser.id === authorId &&
                    <MenuItem onClick={handleDelete}><CustomText style={{fontSize: '15px'}}>Supprimer</CustomText></MenuItem>}
                    <MenuItem onClick={handleSave}><CustomText style={{fontSize: '15px'}}>{saveTitle}</CustomText></MenuItem>
                </MyModal>
            }
                <ProfilInfos>
                    <div style={{display: 'flex', flexDirection: 'row', flex: 10}}>
                        <ProfilPicture 
                            size={40}
                            source={profilPicture}
                            onPress={(event: any) => {
                                event.stopPropagation();
                                if (onPpPress) {
                                    onPpPress();
                                }
                            }} 
                        />      
                        <TextContainer onClick={(event: any) => {
                                event.stopPropagation();
                                if (onPpPress) {
                                    onPpPress();
                                }
                            }} >
                            <CustomText style={{fontSize: '15px', fontWeight: 'bold', marginTop: '5px'}}>{displayName}</CustomText>
                            <CustomText style={{fontSize: '13px', color: colors.medium}}>{`@${username}`}</CustomText>
                        </TextContainer>
                    </div>
                </ProfilInfos>
                <TimeContainer onClick={() => console.log("okokok")}>
                    <MdMoreHoriz 
                        size={21} 
                        color="white"
                        onClick={(event: any) => {
                            event.stopPropagation();
                            dispatch(setopenModal(publicationId))}
                        } />
                    {date && <CustomText style={{fontSize: '12px', color: colors.medium}}>{convertTimeFormat(date)}</CustomText>}
                </TimeContainer>
            </Header>
        </Container>
    )
}

const MyModal = styled.div`
    position: absolute;
    top: 30px;
    right: 30px;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 10px;
    border-radius: 15px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    box-shadow: 0 0 10px white;  /* Ajoute une ombre blanche */
`;


const MenuItem = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
`;

const Container = styled.div`
    padding: '10px';
    position: relative;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    `;
    
    const ProfilInfos = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
`;

const TextContainer = styled.div`
    margin-left: 5px;
    display: flex;
    flex-direction: column
`;

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;


export default PostCardHeader