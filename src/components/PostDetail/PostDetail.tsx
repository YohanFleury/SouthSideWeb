import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import publications from '../../api/publications';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi/useApi';
import { publicationsSlice } from '../../redux/publicationsSlice/publicationsSlice';
import { CustomButton, CustomHeader, CustomInput, CustomText } from '../CustomedComponents'
import PostCard from '../PostCard/PostCard';
import { Publication } from '../../redux/publicationsSlice/publicationsSlice';
import CommentItem from '../CommentItem/CommentItem';
import { FiSend } from "react-icons/fi";
import { useAppSelector } from '../../redux/store';

type Comment = {
  author: {
    displayName: string;
    id: number;
    username: string;
  };
  content: string;
  creationDate: any;
  id: number;
  publicationId: number;
}

const PostDetail = () => {
// State
  const [publication, setPublication] = useState<Publication>()
  const [comments, setComments] = useState<Comment[]>([])
  const [commentValue, setCommentValue] = useState<string>('')
  const [isCreatorInSubList, setIsCreatorInSubList] = useState<boolean>(false)

// Params
  const { username, publicationId } = useParams();

// Redux
const listSub = useAppSelector(state => state.context.subsList)

// API
  const addCommentApi = useApi(publications.addComment)
  const getCommentsApi = useApi(publications.getComments)
  const deleteCommentApi = useApi(publications.deleteComment)
  const getPublicationApi = useApi(publications.getOnePublication)

// Effects

useEffect(() => {
  const isInSubList = listSub.find(creator => creator.username == username)
  setIsCreatorInSubList(isInSubList ? true : false)
}, [])

useEffect(() => {
  getPublicationApi.request(publicationId)
}, [])

useEffect(() => {
  if (getPublicationApi.success) {
      setPublication(getPublicationApi.data)
      console.log('Publication récupérée ! ✅')
  } else if (getPublicationApi.error) {
      console.log('Publication non reçue. ❌')
  }
}, [getPublicationApi.success, getPublicationApi.error])

useEffect(() => {
  getCommentsApi.request(publicationId)
}, [])
useEffect(() => {
  if (getCommentsApi.success) {
    setComments(getCommentsApi.data)
    
    console.log('Liste des commentaires reçue ! ✅', getCommentsApi.data)
  } else if (getCommentsApi.error) {
    console.log('Liste com non reçue. ❌')
  }
}, [getCommentsApi.success, getCommentsApi.error])

useEffect(() => {
  if (addCommentApi.success) {
    console.log('Commentaire ajouté ✅', addCommentApi.data)
    setComments((prevComments) => [...prevComments, addCommentApi.data])
    if(publication) {
      setPublication((prevPublication) => ({
        ...(prevPublication as Publication),
        nbComments: (prevPublication?.nbComments || 0) + 1,
      }));
    }
  } else if (addCommentApi.error) {
    console.log('Commentaire non posté ❌')
  }
}, [addCommentApi.success, addCommentApi.error])


// Functions

const addComment = () => {
  addCommentApi.request(publicationId, commentValue)
  setCommentValue('')
}     

  return (
    <MainContainer>
        <CustomHeader title='Commentaires' />
        {publication &&
        <PostCard
          onClick={() => null}
          publicationId={publication.id}
          username={publication.author.username}
          visible={publication.visible}
          displayName={publication.author.displayName}
          comments={publication.nbComments}
          likes={publication.nbLikes}
          liked={publication.liked}
          description={publication.content}
          nbPictures={publication.nbPictures}
          images={publication.pictureUrls}
          date={publication.creationDate}
          authorId={publication.author.id}
        />}
        {isCreatorInSubList &&
        <div style={{display: 'flex', alignItems: 'center', }}>
          <CustomInput
            placeholder='Ajouter un commentaire' 
            onChange={(e => setCommentValue(e.target.value))} 
            value={commentValue}
          />
          <StyledButton 
            onClick={commentValue.length > 0 ? addComment : () => null}
            style={{backgroundColor: commentValue.length > 0 ? '#1E6CD0' : '#042145'}}>
            <CustomText style={{fontSize: 14, fontWeight: 'bold'}}>Commenter</CustomText>
          </StyledButton>
        </div>}
        { publication?.visible &&
          comments.map(comment => <CommentItem
            key={comment.id}
            displayName={comment.author.displayName}
            username={comment.author.username}
            authorId={comment.author.id}
            content={comment.content}
            date={comment.creationDate}
          />)
        }
    </MainContainer>
  )
}

const MainContainer = styled.div`
  background-color: ${colors.dark.background};
  display: flex;
  flex-direction: column;
  width: 100%;
  border-left: 0.5px solid ${colors.lightDark};
  border-right: 0.5px solid ${colors.lightDark};
  margin: auto;
  position: relative;
  height: 100%;
`;

const StyledButton = styled.div`
  padding: 10px;
  width: 80px;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

export default PostDetail