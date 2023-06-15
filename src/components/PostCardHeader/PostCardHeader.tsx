import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import publications from '../../api/publications';
import users from '../../api/users';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import { convertTimeFormat } from '../../config/utils/ocnvertTimeFormat';
import useApi from '../../hooks/useApi/useApi';
import { addPublicationToSavedList, deletePublicationFromSavedList } from '../../redux/contextSlice/contextSlice';
import { deletePublication } from '../../redux/publicationsSlice/publicationsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ProfilPicture from '../ProfilPicture/ProfilPicture';
import { MdMoreHoriz } from 'react-icons/md';
import { CustomText } from '../CustomedComponents/index';
import colors from '../../config/colors';

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
    isSurvey
}: PostCardHeaderProps) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [coordinateX, setCoordinateX] = useState<number>(0)
    const [coordinateY, setCoordinateY] = useState<number>(0)

    const [profilPicture, setProfilPicture] = useState<any>()

    const savedPublicationsList = useAppSelector(state => state.context.savedPublicationsList)
    const dispatch = useAppDispatch()
    
    const savePublicationApi = useApi(publications.savePublication)
    const deleteSavePublicationApi = useApi(publications.deleteSavedPublication)
    const deletePublicationApi = useApi(publications.deletePublication)
    const getProfilPictureApi = useApi(users.getProfilPicture)

    // Profil Picture 
    useEffect(() => {
        getProfilPictureApi.request(authorId)
    }, [])

    useEffect(() => {
        if(getProfilPictureApi.success) {
           setProfilPicture(arrayBufferToBase64(getProfilPictureApi.data))
        } else if(getProfilPictureApi.error) {
           console.log('Error [Get creator picture [PostCardHeader]]')
        }
    }, [getProfilPictureApi.success, getProfilPictureApi.error, getProfilPictureApi.data])
    
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
        setModalVisible(false)
    }
    const handleDelete = () => {
        setModalVisible(false);
        deletePublicationApi.request(publicationId)
    }
    const handleSave = () => {
        const index = savedPublicationsList.findIndex((element: any) => element.id === publicationId);
        if (index !== -1) {
            deleteSavePublicationApi.request(publicationId)
        } else {
            savePublicationApi.request(publicationId)
        }
        setModalVisible(false);
    }
    
    return (
        <Container>
            <Header>
                <ProfilInfos>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <ProfilPicture 
                            onPress={onPpPress} 
                            size={40}
                            source={`data:image/jpg;base64,${profilPicture}`}
                        />      
                        <TextContainer>
                            <CustomText style={{fontSize: '15px', fontWeight: 'bold', marginTop: '5px'}}>{displayName}</CustomText>
                            <CustomText style={{fontSize: '13px', color: colors.medium}}>{`@${username}`}</CustomText>
                        </TextContainer>
                    </div>
                </ProfilInfos>
                <TimeContainer>
                    <MdMoreHoriz 
                        size={21} 
                        color="white"
                        onMouseDown={(event) => {
                            setCoordinateX(event.pageX)
                            setCoordinateY(event.pageY)
                        }}
                        onClick={() => setModalVisible(true)} />
                    {date && <CustomText style={{fontSize: '12px', color: colors.medium}}>{convertTimeFormat(date)}</CustomText>}
                </TimeContainer>
            </Header>
        </Container>
    )
}

interface ProfilInfoProps {
    padding?: number;
    backgroundColor?: string;
    justifyContent?: string;
}

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