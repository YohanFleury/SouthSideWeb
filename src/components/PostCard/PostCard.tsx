import React, { useCallback, useEffect, useState } from 'react'
import publications from '../../api/publications';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import useApi from '../../hooks/useApi/useApi';
import { CustomText, CustomDivider } from '../CustomedComponents/index';
import PostCardHeader from '../PostCardHeader/PostCardHeader';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../CustomCarousel/MyCarouselStyles.css'
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addLikeToPublication, removeLikeToPublication } from '../../redux/publicationsSlice/publicationsSlice';
import { addOneLikeToPublication, removeOneLikeToPublication } from '../../redux/contextSlice/contextSlice';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import colors from '../../config/colors';

export interface PostCardProps {
    description?: string;
    nbPictures: number;
    visible: boolean;
    likes: number;
    liked: boolean;
    comments: number;
    username: string;
    displayName: string;
    onTipsPress?: () => void;
    onPpPress?: () => void;
    source?: any;
    publicationId: number;
    date: string | undefined;
    authorId: number;
    onClick: () => void
}

const DOUBLE_PRESS_DELAY = 300;

const CustomArrowNext = (onClickHandler: () => void, hasPrev: boolean, label: string) => 
  hasPrev && (
    <ArrowContainer onClick={(event) => {
      event.stopPropagation();
      onClickHandler();
    }} style={{ right: '0' }}>
      <FaArrowRight color="white" />
    </ArrowContainer>
  );

const CustomArrowPrev = (onClickHandler: () => void, hasNext: boolean, label: string) => 
  hasNext && (
    <ArrowContainer onClick={(event) => {
      event.stopPropagation();
      onClickHandler();
    }} style={{ left: '0' }}>
      <FaArrowLeft color="white" />
    </ArrowContainer>
  );




const PostCard = ({
    description, 
    nbPictures, 
    visible, 
    username, 
    displayName, 
    likes, 
    liked,
    comments,
    onTipsPress, 
    onPpPress,
    source,
    publicationId,
    date,
    authorId,
    onClick
   }: PostCardProps) => {
    
// State
const [testImages, settestImages] = useState<any[]>(new Array(nbPictures).fill(null))
const [isLiked, setIsLiked] = useState(liked)
const [lastFetchedIndex, setLastFetchedIndex] = useState(0);
const [lastPress, setLastPress] = useState<number>(0);
const [numberLikes, setNumberLikes] = useState<number>(likes)
const [isCreatorInSubList, setIsCreatorInSubList] = useState<boolean>(false)
const [hasUserAccesToThePost, setHasUserAccesToThePost] = useState(!visible ? isCreatorInSubList : true)
// Redux 
const dispatch = useAppDispatch()
const theme = useAppSelector(state => state.context.theme)
const openPublicationId = useAppSelector(state => state.context.openPublicationId)
const listSub = useAppSelector(state => state.context.subsList)

const isPostModalOpen = openPublicationId === publicationId
// API
const getPublicationPicturesApi = useApi(publications.getPublicationPictures)
const addLikeApi = useApi(publications.addLike)
const deleteLikeApi = useApi(publications.deleteLike)

// Effects

useEffect(() => {
  const isInSubList = listSub?.find(creator => creator.username == username)
  setIsCreatorInSubList(isInSubList ? true : false)
}, [listSub])

useEffect(() => {
    if(nbPictures > 0) {
        getPublicationPicturesApi.request(publicationId, 0);
    }
}, [])

useEffect(() => {
  if(getPublicationPicturesApi.success) {
        settestImages(prevImages => 
            prevImages.map((img, index) => index === lastFetchedIndex 
                ? arrayBufferToBase64(getPublicationPicturesApi.data) 
                : img)
          )
  } else if(getPublicationPicturesApi.error) {
    //console.log(`Problème sur la publication ${publicationId} [Main Picture]`)
  }
}, [getPublicationPicturesApi.success, getPublicationPicturesApi.error, getPublicationPicturesApi.data])   

useEffect(() => {
  if (addLikeApi.success) {
    setIsLiked(true)
    setNumberLikes(numberLikes + 1)
  }
}, [addLikeApi.success])

useEffect(() => {
    if (deleteLikeApi.success) {
      setIsLiked(false)
      setNumberLikes(numberLikes - 1)
    }
  }, [deleteLikeApi.success])
// Functions

const handleIndexChanged = useCallback((index: number) => {
    if (!testImages[index]) {
        getPublicationPicturesApi.request(publicationId, index);
        setLastFetchedIndex(index);
    }
    }, [lastFetchedIndex, testImages]);

const handleDoublePress = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;

    if (delta < DOUBLE_PRESS_DELAY) {
        liked ? handleDislike() : handleLike()
    }
    setLastPress(time);
}
const handleLike = () => {
  if (!isCreatorInSubList && !visible ) return ;
    addLikeApi.request(publicationId)
}
const handleDislike = () => {
    deleteLikeApi.request(publicationId)
}


  return (
        <MainContainer style={{cursor: !visible && !isCreatorInSubList ? 'default' : 'pointer'}}>
            <Container>
                <PostCardHeader
                onClick={() =>  isPostModalOpen ? null : onClick()}
                username={username}
                displayName={displayName}
                authorId={authorId}
                onPpPress={onPpPress}    
                date={date}
                publicationId={publicationId}
                nbComments={comments}
                nbLikes={likes}
                nbPictures={nbPictures}
                description={description}
                isSurvey={false}
                />
                {testImages.length > 0 &&
                    <Carousel 
                      renderArrowPrev={CustomArrowPrev}
                      renderArrowNext={CustomArrowNext}
                      showStatus={false} 
                      showIndicators={testImages.length < 2 ? false : true}
                      onChange={handleIndexChanged}>
                      {testImages.map((image, index) => (
                          <ImageContainer  onDoubleClick={handleDoublePress}>
                              <Image key={index} src={`data:image/jpg;base64,${image}`} />
                          </ImageContainer>
                      ))}
                    </Carousel>
                  } 
                {/* {testImages.length > 0 && 
                <ImageContainer onClick={() =>  isPostModalOpen ? null : onClick()}  onDoubleClick={handleDoublePress}>
                    <Image src={`data:image/jpg;base64,${testImages[0]}`} />
                </ImageContainer>} */}
                <IconContainer>
                    <InnerContainer>
                        <IconGroup>
                            {isLiked 
                            ? <IoMdHeart size={22} color='red' onClick={handleDislike} />
                            : <IoMdHeartEmpty 
                              size={22} 
                              color={!isCreatorInSubList && !visible ? colors.medium : colors.white } 
                              onClick={handleLike} />
                            }
                            <CustomText style={{fontSize: 11, marginLeft: 5}}>{numberLikes}</CustomText>
                        </IconGroup>
                        <IconGroup>
                            <FaRegComment size={19} color={!isCreatorInSubList && !visible ? colors.medium : colors.white } />
                            <CustomText style={{fontSize: 11, marginLeft: 5}}>{comments}</CustomText>
                        </IconGroup>
                    </InnerContainer>
                </IconContainer>
                {description &&
                <Description onClick={() =>  isPostModalOpen ? null : onClick()} style={{marginTop: testImages.length > 1 ? 25 : 8}}>
                    <CustomText style={{fontSize: 16}}>{description}</CustomText>
                </Description>}
            </Container>
        </MainContainer>
  )
}

const ArrowContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;  // Centre le conteneur verticalement
  transform: translateY(-50%);  // Utilisé pour centrer parfaitement
  z-index: 5;
  cursor: pointer;
`;


const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background-color: ${colors.dark.background};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 100%;
  border-bottom: 1px solid ${colors.lightDark};
`;

const Container = styled.div`
  overflow: hidden;
  flex: 1;
  position: relative;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: auto; /* Remplacez par la hauteur maximale souhaitée */
  margin-top: 10px;
  max-height: 100%;
  max-width: 100%;
`;

const Image = styled.img`
  width: 100%;   // Change to 100%
  height: 100%;  // Change to 100%
  object-fit: contain;  // Add this line
  border-radius: 10px;
`;


const Description = styled.div`
  font-size: 16px;
  padding: 5px;
`;


const IconContainer = styled.div`
display: flex;
align-items: center;
padding: 5px;
margin-top: 5px 
`;

const InnerContainer = styled.div`
display: flex;
width: 25%;
justify-content: space-between;
`;

const IconGroup = styled.div`
display: flex;
align-items: center;
`;

export default PostCard