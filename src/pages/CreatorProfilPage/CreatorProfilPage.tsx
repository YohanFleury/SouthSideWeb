import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { CustomButton, CustomHeader, CustomText } from '../../components/CustomedComponents'
import colors from '../../config/colors';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi/useApi';
import users from '../../api/users';
import publications from '../../api/publications';
import { FaLock } from "react-icons/fa";
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import PostCard from '../../components/PostCard/PostCard';
import CreatorProfilHeader from '../../components/CreatorProfilHeader/CreatorProfilHeader';
import ContentType from '../../components/ContentType/ContentType';
import { useNavigate } from 'react-router-dom';
import { addSubsToTheList } from '../../redux/contextSlice/contextSlice';

type creatorInfos = {
  account: any;
  creator: {
    certified: boolean;
    description: string;
    validated: boolean;
  },
  displayName: string;
  email: string;
  id: number;
  username: string;
}

const CreatorProfilPage = () => {
// Navigation
  const navigate = useNavigate();

// Params
  const { username } = useParams();
  
  // Redux 
  const listSub = useAppSelector(state => state.context.subsList)
  const listFav = useAppSelector(state => state.context.favoritesList)
  
  const dispatch = useAppDispatch()
// State
  const [creatorInfos, setCreatorInfos] = useState<creatorInfos>()
  const [creatorImage, setCreatorImage] = useState<any>()
  const [isCreatorInFavList, setIsCreatorInFavList] = useState<boolean>(false) 
  const [isCreatorInSubList, setIsCreatorInSubList] = useState<boolean>(false)

// Api
  const getUserByUsernameApi = useApi(users.getUserByUsername)
  const publicationListApi = useApi(publications.getOneUsersPublications)
  const creatorPictureApi = useApi(users.getCreatorPicture)
  const createSubscritpionApi = useApi(users.createSubscritpion)

// Effects
  useEffect(() => {
    const isInFavList = listFav?.find(creator => creator.username == username)
    setIsCreatorInFavList(isInFavList ? true : false)

    const isInSubList = listSub?.find(creator => creator.username == username)
    setIsCreatorInSubList(isInSubList ? true : false)
  }, [listFav, listSub])
  

  useEffect(() => {
      getUserByUsernameApi.request(username)
  }, [])
  
  useEffect(() => {
    if (getUserByUsernameApi.success) {
      console.log('User trouvé: ', getUserByUsernameApi.data)
      setCreatorInfos(getUserByUsernameApi.data[0])   

    } else if (getUserByUsernameApi.error) {
      console.log('PB')
    }
  }, [getUserByUsernameApi.success, getUserByUsernameApi.error])
  
  useEffect(() => {
    if (creatorInfos) {
      creatorPictureApi.request(creatorInfos.id)
    }
  }, [creatorInfos])

  useEffect(() => {
    if(creatorPictureApi.success) {
      setCreatorImage(arrayBufferToBase64(creatorPictureApi.data))
    } else if(creatorPictureApi.error) {
      console.log('Error [Get creator picture]')
    }
  }, [creatorPictureApi.success, creatorPictureApi.error, creatorPictureApi.data])
  
  useEffect(() => {
    if (creatorInfos) {
      publicationListApi.request(creatorInfos.id)
    }
  }, [listSub, creatorInfos])

  useEffect(() => {
    if (publicationListApi.success) {
      console.log('Liste de publications reçue ✅', publicationListApi.data)
    } else if (publicationListApi.error) {
      console.log('Liste de publications non reçue ❌')
    }
  }, [publicationListApi.data, publicationListApi.success, publicationListApi.error])

  useEffect(() => {
    if(createSubscritpionApi.success){
      dispatch(addSubsToTheList({
        id: creatorInfos?.id,
        username: creatorInfos?.username,
        displayName: creatorInfos?.displayName,
        description: creatorInfos?.creator.description
      }))
      console.log(`Tu viens de t'abonner à ${username} !`)
    } else if(createSubscritpionApi.error) {
      console.log("Erreur [Create Sub]")
    } 
  }, [createSubscritpionApi.success, createSubscritpionApi.error])


// Functions
  const handlePostClick = (username: string, publicationId: number, isVisible: boolean) => {
    if (!isVisible) return ;
    navigate(`/${username}/post/${publicationId}`)
  }
console.log(publicationListApi.data)
  return (
    <MainContainer>
        <CustomHeader title={`@${username}`} />
        <CreatorProfilHeader
          isCreatorInFavList={isCreatorInFavList}
          creatorId={creatorInfos?.id}
          username={creatorInfos?.username}
          description={creatorInfos?.creator.description}
          displayName={creatorInfos?.displayName} 
          creatorImage={creatorImage} />
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 20}}>
          <CustomButton
            icon={<FaLock size={13} color='white' style={{ marginRight: 15 }} />}
            title="S'abonner à ce créateur" 
            onClick={() => createSubscritpionApi.request(creatorInfos?.id)} />
        </div>
        <ContentType />
        {publicationListApi.data.map((post: any) => (
            <PostCard
            key={post.id}
            publicationId={post.id}
            source={undefined}
            username={post.author.username}
            visible={post.visible}
            displayName={post.author.displayName}
            comments={post.nbComments}
            likes={post.nbLikes}
            liked={post.liked}
            description={post.content}
            nbPictures={post.nbPictures}
            date={post.creationDate}
            authorId={post.author.id}
            onClick={() => handlePostClick(post.author.username, post.id, post.visible)}
        />
        ))}
    </MainContainer>
  )
}

const MainContainer = styled.div`
background-color: ${colors.dark.background};
display: flex;
flex-direction: column;
flex: 1;
border-left: 0.5px solid ${colors.lightDark};
border-right: 0.5px solid ${colors.lightDark};
margin: auto;
position: relative;
`;

export default CreatorProfilPage