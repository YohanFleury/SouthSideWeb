import React, { useCallback, useEffect, useState } from 'react'
import publications from '../../api/publications';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import useApi from '../../hooks/useApi/useApi';
import { CustomText, CustomDivider } from '../CustomedComponents/index';
import PostCardHeader from '../PostCardHeader/PostCardHeader';
import Slider from "react-slick";
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addLikeToPublication, removeLikeToPublication } from '../../redux/publicationsSlice/publicationsSlice';
import { addOneLikeToPublication, removeOneLikeToPublication } from '../../redux/contextSlice/contextSlice';

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
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
    source: any;
    publicationId: number;
    date: string | undefined;
    authorId: number
}

const DOUBLE_PRESS_DELAY = 300;


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
   }: PostCardProps) => {
    
// State
const [testImages, settestImages] = useState<any[]>(new Array(nbPictures).fill(null))
const [lastFetchedIndex, setLastFetchedIndex] = useState(0);
const [lastPress, setLastPress] = useState<number>(0);
const [numberLikes, setNumberLikes] = useState<number>(likes)

// Redux 
const dispatch = useAppDispatch()
const theme = useAppSelector(state => state.context.theme)

// API
const getPublicationPicturesApi = useApi(publications.getPublicationPictures)
const { request: addLike, data: likeAdded, error } = useApi(publications.addLike)
const {request: deleteLike, data: likeDeleted, error: erroDeletedLike} = useApi(publications.deleteLike)

// Effects
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
    addLike(publicationId)
    setNumberLikes(numberLikes + 1)
    dispatch(addLikeToPublication(publicationId))
    dispatch(addOneLikeToPublication(publicationId))
}
const handleDislike = () => {
    deleteLike(publicationId)
    setNumberLikes(numberLikes - 1)
    dispatch(removeLikeToPublication(publicationId))
    dispatch(removeOneLikeToPublication(publicationId))
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    afterChange: (current: any) => handleIndexChanged(current),
  };

  return (
    <>
        <MainContainer>
            <Container>
                <PostCardHeader
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
                    <Slider {...settings}>
                    {testImages.map((image, index) => (
                        <ImageContainer key={index} onDoubleClick={handleDoublePress}>
                            <Image src={`data:image/jpg;base64,${image}`} />
                        </ImageContainer>
                    ))}
                    </Slider>
                }
                {description &&
                <Description hasTestImages={testImages && testImages.length > 1}>
                    <CustomText style={{fontSize: 16}}>{description}</CustomText>
                </Description>}
                <IconContainer>
                    <InnerContainer>
                        <IconGroup>
                            {liked 
                            ? <IoMdHeart size={22} color='red' onClick={handleDislike} />
                            : <IoMdHeartEmpty size={22} color={theme === "dark" ? "white" : 'black'} onClick={handleLike} />
                            }
                            <CustomText style={{fontSize: 11, marginLeft: 5}}>{likes}</CustomText>
                        </IconGroup>
                        <IconGroup>
                            <FaRegComment size={19}  color={theme === 'dark' ? "white" : "black"}/>
                            <CustomText style={{fontSize: 11, marginLeft: 5}}>{comments}</CustomText>
                        </IconGroup>
                    </InnerContainer>
                </IconContainer>
            </Container>
        </MainContainer>
        <CustomDivider />
    </>        
  )
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background-color: ${colors.dark.background};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px
`;

const Container = styled.div`
  overflow: hidden;
  flex: 1;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

interface DescriptionProps {
    hasTestImages: boolean;
}

const Description = styled.div<DescriptionProps>`
  margin-top: ${({ hasTestImages }) => hasTestImages ? 25 : 8}px;
  font-size: 16px;
  padding: 5px
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