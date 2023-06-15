import React, { useEffect } from 'react'
import publications from '../../api/publications'
import users from '../../api/users'
import colors from '../../config/colors'
import useApi from '../../hooks/useApi/useApi'
import { CustomDivider, CustomText } from '../../components/CustomedComponents/index'
import PostCard from '../../components/PostCard/PostCard'

import AutoSizer from 'react-virtualized-auto-sizer' ;
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

const HomePage = () => {
    const email = "tata@example.com"

    // API
    const getUserByEmailApi = useApi(users.getUserByEmail)
    const feedApi = useApi(publications.getFeedPublications)

    // Effects
    useEffect(() => {
      getUserByEmailApi.request(email)
      feedApi.request()
    }, [])
    useEffect(() => {
        if(feedApi.success) {
          //dispatch(setFeedPublicationList(feedApi.data))
          console.log('Voici le feed: ', feedApi.data)
        } else if(feedApi.error) {
          console.log('error [Feed api]') 
        }
      }, [feedApi.success, feedApi.error])
    useEffect(() => {
        console.log('Voici le user connecté : ', getUserByEmailApi.data)
        if (getUserByEmailApi.success) {
        } else if (getUserByEmailApi.error) {
        console.log('Problème pour récupérer les infos du user connecté.')
        }
}, [getUserByEmailApi.success, getUserByEmailApi.error,])

    // Custom Row for the List
    const Row = ({ index, style }: ListChildComponentProps) => {
        const item = feedApi.data[index];
        return (
            <div style={style}>
                <PostCard
                    publicationId={item.id}
                    source={undefined}
                    username={item.author.username}
                    visible={true}
                    displayName={item.author.displayName}
                    comments={item.nbComments}
                    likes={item.nbLikes}
                    liked={item.liked}
                    description={item.content}
                    nbPictures={item.nbPictures}
                    date={item.creationDate}
                    authorId={item.author.id}
                />
                <CustomDivider />
            </div>
        );
    }

  return (
    <div style={{backgroundColor: colors.dark.background, flex: 1, paddingTop: 30}}>
        {feedApi.data.map((post: any) => (
            <PostCard
            publicationId={post.id}
            source={undefined}
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
        />
        ))}
    </div>
  )
}

export default HomePage