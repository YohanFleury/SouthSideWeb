import React, { useEffect } from 'react'
import publications from '../../api/publications'
import users from '../../api/users'
import colors from '../../config/colors'
import useApi from '../../hooks/useApi/useApi'
import { CustomDivider, CustomHeader, CustomText } from '../../components/CustomedComponents/index'
import PostCard from '../../components/PostCard/PostCard'
import { useNavigate } from 'react-router-dom';

import AutoSizer from 'react-virtualized-auto-sizer' ;
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setFeedPublicationList } from '../../redux/publicationsSlice/publicationsSlice'

const HomePage = () => {
    const email = "tata@example.com"

    // Navigation
    const navigate = useNavigate();

    // Redux
    const dispatch = useAppDispatch()
    const feedList = useAppSelector(state => state.publications.feedPublications)

    // API
    const feedApi = useApi(publications.getFeedPublications)


    // Effects
    useEffect(() => {
      feedApi.request()
    }, [])
    
    useEffect(() => {
        if(feedApi.success) {
          dispatch(setFeedPublicationList(feedApi.data))
          console.log('Voici le feed: ', feedApi.data)
        } else if(feedApi.error) {
          console.log('error [Feed api]') 
        }
      }, [feedApi.success, feedApi.error])

  // Functions

  const handlePpClick = (username: string) => {
    navigate(`/${username}`);
  };

  const handlePostClick = (username: string, publicationId: number) => {
    navigate(`/${username}/post/${publicationId}`)
  }
console.log("env  : ", process.env.NODE_ENV)
  return (
    <MainContainer>
        <div style={{width: '83%'}}>
         <CustomHeader title='Accueil' />
        </div>
        {feedList.map(post => (
            <PostCard
            key={post.id}
            publicationId={post.id}
            images={post.pictureUrls}
            username={post.author.username}
            visible={true}
            displayName={post.author.displayName}
            comments={post.nbComments}
            likes={post.nbLikes}
            liked={post.liked}
            description={post.content}
            nbPictures={post.nbPictures}
            date={post.creationDate}
            authorId={post.author.id}
            onPpPress={() => handlePpClick(post.author.username)}
            onClick={() => handlePostClick(post.author.username, post.id)}
          />
        ))}
    </MainContainer>
  )
}

const MainContainer = styled.div`
  background-color: ${colors.dark.background};
  border-left: 0.5px solid ${colors.lightDark};
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: auto;
  position: relative;
`;


export default HomePage