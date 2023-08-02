import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {  CustomText } from '../CustomedComponents';
import { FiCheckCircle } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5"
import colors from '../../config/colors';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BiBell } from "react-icons/bi";
import { BiMessageDetail } from "react-icons/bi";
import useApi from '../../hooks/useApi/useApi';
import users from '../../api/users';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addCreatorToFavList, deleteCreatorFromFavList } from '../../redux/contextSlice/contextSlice';

interface CreatorProfilHeaderProps {
    creatorImage: string;
    displayName?: string;
    description?: string;
    creatorId?: number;
    username?: string;
    isCreatorInFavList: boolean;
}

const CreatorProfilHeader = ({ creatorImage, displayName, description, creatorId, username, isCreatorInFavList}: CreatorProfilHeaderProps) => {
  // Redux
  const dispatch = useAppDispatch()
  
  // State
  
  // Api
  const addCreatorToFavorites = useApi(users.addCreatorToFavorites)
  const deleteCreatorFromFavorites = useApi(users.deleteCreatorFromFavorites)

  // Effects


  useEffect(() => {
    if(addCreatorToFavorites.success) {
      console.log(`${username} a bien été ajouté aux favoris`)
      dispatch(addCreatorToFavList({
        description: description,
        displayName: displayName,
        id: creatorId,
        username: username
      }))
    } else if(addCreatorToFavorites.error) {
      console.log('Un problème est survenu : [AddFavorites].')
    }
  }, [addCreatorToFavorites.success, addCreatorToFavorites.error])

  useEffect(() => {
    if(deleteCreatorFromFavorites.success) {
      console.log(`${username} a bien été supprimé des favoris`)
      dispatch(deleteCreatorFromFavList(creatorId))
    } else if(deleteCreatorFromFavorites.error) {
      console.log('Un problème est survenu : [DeleteFavorites].')
    }
  }, [deleteCreatorFromFavorites.success, deleteCreatorFromFavorites.error])

  // Functions
  const handleFavorites = () => {
    console.log('cliked')
    if(isCreatorInFavList) {
      deleteCreatorFromFavorites.request(creatorId)
    } else {
      addCreatorToFavorites.request(creatorId)
    }
  }
  return (
    <ImageBackground img={creatorImage}>
        <IconsContainer> 
          <SingleIconContainer onClick={handleFavorites}>
            {!isCreatorInFavList &&
            <IoMdHeartEmpty size={23} color='white' />}
            {isCreatorInFavList &&
            <IoMdHeart size={23} color={colors.dark.primary} />}
          </SingleIconContainer>
          <SingleIconContainer>
            <BiBell size={23} color='white' />
          </SingleIconContainer>
          <SingleIconContainer>
            <BiMessageDetail size={20} color='white' />
          </SingleIconContainer>
        </IconsContainer>
        <GradientDiv>
            <NamingContainer>
                <CustomText style={{fontSize: 'clamp(18px, 3vw, 30px)', fontWeight: 'bold'}}>
                    {displayName}
                </CustomText>
                <FiCheckCircle size={23} color='white' style={{marginLeft: 8, marginTop: 5}} />
            </NamingContainer>
            <NamingContainer>
                <CustomText style={{fontSize: 'clamp(14px, 2vw, 20px)',}}>
                    {description}
                </CustomText>
            </NamingContainer>
            <LocationContainer>
                <IoLocationOutline size={14} color={colors.medium} style={{marginRight: 8}} />
                <CustomText style={{fontSize: 'clamp(12px, 2vw, 18px)', color: colors.lightGrey}}>
                    Rio de Janeiro, Brasil
                </CustomText>
            </LocationContainer>
            
        </GradientDiv>
    </ImageBackground>
  )
}

interface ImageBackgroundProps {
    img: string;
  }

const ImageBackground = styled.div<ImageBackgroundProps>`
  background-image: url(${({img}: any) => `data:image/jpg;base64,${img}`});
  width: 100%;
  height: 50vh;

  @media (min-width: 768px) {
    height: 60vh
  }
  //padding-bottom: 33.33%; /* For a 3:1 aspect ratio */
  overflow: hidden;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  min-height: 100%
`;

const GradientDiv = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1));
  display: flex;
  height: 210px;
  width: 100%;
  position: relative;
  flex-direction: column;
  justify-content: space-evenly;
`;

const IconsContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 100px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SingleIconContainer = styled.div`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const NamingContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const LocationContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 10px;
`;

export default CreatorProfilHeader