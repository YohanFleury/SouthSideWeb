import React from 'react'
import styled from 'styled-components';
import { CustomHeader } from '../../components/CustomedComponents';
import PostCard from '../../components/PostCard/PostCard';
import colors from '../../config/colors';
import { useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const MyBooksPage = () => {
    const savedPublicationsList = useAppSelector(state => state.context.savedPublicationsList)
    const navigate = useNavigate();


    const handlePpClick = (username: string) => {
        navigate(`/${username}`);
      };
    
      const handlePostClick = (username: string, publicationId: number) => {
        navigate(`/${username}/post/${publicationId}`)
      }
  return (
    <MainContainer>
        <CustomHeader title='Signets' />
        {savedPublicationsList.map(post => (
            <PostCard
            key={post.id}
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
            onPpPress={() => handlePpClick(post.author.username)}
            onClick={() => handlePostClick(post.author.username, post.id)}
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

export default MyBooksPage