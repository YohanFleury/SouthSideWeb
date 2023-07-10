import React, { useCallback, useEffect, useState } from 'react'
import publications from '../../api/publications';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import useApi from '../../hooks/useApi/useApi';
import { CustomText, CustomDivider } from '../CustomedComponents/index';
import PostCardHeader from '../PostCardHeader/PostCardHeader';


import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
    source?: any;
    publicationId: number;
    date: string | undefined;
    authorId: number;
    onClick?: () => void
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
    onClick
   }: PostCardProps) => {
    
// State
const [testImages, settestImages] = useState<any[]>(new Array(nbPictures).fill(null))
const [isLiked, setIsLiked] = useState(liked)
const [lastFetchedIndex, setLastFetchedIndex] = useState(0);
const [lastPress, setLastPress] = useState<number>(0);
const [numberLikes, setNumberLikes] = useState<number>(likes)

// Redux 
const dispatch = useAppDispatch()
const theme = useAppSelector(state => state.context.theme)

// API
const getPublicationPicturesApi = useApi(publications.getPublicationPictures)
const addLikeApi = useApi(publications.addLike)
const deleteLikeApi = useApi(publications.deleteLike)

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
    addLikeApi.request(publicationId)
}
const handleDislike = () => {
    deleteLikeApi.request(publicationId)
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
                onClick={onClick}
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
                <div style={{maxWidth: '100%', maxHeight: '100%'}}>
                {/* {testImages.length > 0 &&
                    <Slider {...settings}>
                    {testImages.map((image, index) => (
                        <ImageContainer  onDoubleClick={handleDoublePress}>
                            <Image key={index} src={`data:image/jpg;base64,${image}`} />
                        </ImageContainer>
                    ))}
                    </Slider>
                } */}
                {testImages.length > 0 && 
                <ImageContainer onClick={onClick}  onDoubleClick={handleDoublePress}>
                    <Image src={`data:image/jpg;base64,${testImages[0]}`} />
                </ImageContainer>}
                </div>
                {description &&
                <Description onClick={onClick} style={{marginTop: testImages.length > 1 ? 25 : 8}}>
                    <CustomText style={{fontSize: 16}}>{description}</CustomText>
                </Description>}
                <IconContainer>
                    <InnerContainer>
                        <IconGroup>
                            {isLiked 
                            ? <IoMdHeart size={22} color='red' onClick={handleDislike} />
                            : <IoMdHeartEmpty size={22} color={theme === "dark" ? colors.medium : 'black'} onClick={handleLike} />
                            }
                            <CustomText style={{fontSize: 11, marginLeft: 5}}>{numberLikes}</CustomText>
                        </IconGroup>
                        <IconGroup>
                            <FaRegComment size={19}  color={theme === 'dark' ? colors.medium : "black"}/>
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
  padding-bottom: 10px;
  max-width: 100%;
  cursor: pointer;
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
  margin-top: 20px;
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