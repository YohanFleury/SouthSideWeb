import React, { useEffect } from 'react'
import publications from '../../api/publications'
import colors from '../../config/colors'
import useApi from '../../hooks/useApi/useApi'
import { CustomHeader, } from '../../components/CustomedComponents/index'
import PostCard from '../../components/PostCard/PostCard'
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { setFeedPublicationList } from '../../redux/publicationsSlice/publicationsSlice'
import SurveyCard from '../../components/SurveyCard/SurveyCard'

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
        {feedList.map(post => {
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
                />
            )
          }
          return (
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
        )})}
    </MainContainer>
  )
}

const MainContainer = styled.div`
  background-color: ${colors.dark.background};
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: auto;
  position: relative;
`;


export default HomePage