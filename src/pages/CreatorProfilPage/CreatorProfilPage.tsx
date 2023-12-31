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
import { addSubsToTheList, setContentType } from '../../redux/contextSlice/contextSlice';
import CreatorsMedias from '../../components/CreatorsMedias/CreatorsMedias';
import SurveyCard from '../../components/SurveyCard/SurveyCard';
import { CreatorObject } from '../ResearchPage/ResearchPage';
import { Publication } from '../../redux/publicationsSlice/publicationsSlice';
import { ClipLoader } from 'react-spinners';


const CreatorProfilPage = () => {
// Navigation
  const navigate = useNavigate();

// Params
  const { username } = useParams();
  
  // Redux 
  const listSub = useAppSelector(state => state.context.subsList)
  const listFav = useAppSelector(state => state.context.favoritesList)
  const contentType = useAppSelector(state => state.context.contentType)
  const dispatch = useAppDispatch()
// State
  const [creatorInfos, setCreatorInfos] = useState<CreatorObject>()
  const [isCreatorInFavList, setIsCreatorInFavList] = useState<boolean>(false) 
  const [isCreatorInSubList, setIsCreatorInSubList] = useState<boolean>(false)

// Api
  const getUserByUsernameApi = useApi(users.getUserByUsername)
  const publicationListApi = useApi(publications.getOneUsersPublications)
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
      dispatch(setContentType('home'))
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
    if (!isVisible && !isCreatorInSubList) return ;
    navigate(`/${username}/post/${publicationId}`)
  }

  return (
    <MainContainer>
        <CreatorProfilHeader
          isCreatorInFavList={isCreatorInFavList}
          creatorId={creatorInfos?.id}
          username={creatorInfos?.username}
          description={creatorInfos?.creator.description}
          displayName={creatorInfos?.displayName} 
          creatorImage={creatorInfos?.creator.image} />
        {!isCreatorInSubList &&
        <div style={{display: 'flex', marginTop: 10, marginBottom: 20, width: '65%', justifyContent: 'center', padding: 10}}>
          <CustomButton
            icon={<FaLock size={13} color='white' style={{ marginRight: 15 }} />}
            title="S'abonner à ce créateur" 
            onClick={() => createSubscritpionApi.request(creatorInfos?.id)} />
        </div>}
        <ContentType />
        {publicationListApi.loading &&
        <div style={{display: 'flex', justifyContent: 'center', padding: 10}}>
          <ClipLoader color={colors.dark.primary} loading={true} size={30}  />
        </div>}
        { contentType === "home" &&
        publicationListApi.data.map((post: Publication) => {
          if(post.responses && post.hasAlreadyVoted) {
            console.log(post)
            return (
              <SurveyCard 
                question={post.content}
                responses={post.responses}
                username={post.author.username}
                name={post.author.displayName}
                authorId={post.author.id}
                publicationId={post.id}
                date={post.creationDate}
                hasAlreadyVoted={post.hasAlreadyVoted}
                profilPicture={post.author.pictureUrl}
                />
            )
          }
          return (
            <PostCard
            key={post.id}
            publicationId={post.id}
            images={post.pictureUrls}
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
            profilPicture={post.author.pictureUrl}
            onClick={() => handlePostClick(post.author.username, post.id, post.visible)}
        />
        )})}
        {
          contentType === 'medias' &&
          <CreatorsMedias data={publicationListApi.data} isSub={isCreatorInSubList} /> 
        }
    </MainContainer>
  )
}

const MainContainer = styled.div`
background-color: ${colors.dark.background};
display: flex;
flex-direction: column;
flex: 1;
border-left: 0.5px solid ${colors.lightDark};
margin: auto;
position: relative;
min-height: 1500px;
`;

export default CreatorProfilPage