import React from 'react';
import styled from 'styled-components';

import { CustomText } from '../CustomedComponents';
import colors from '../../config/colors'
import { useAppSelector } from '../../redux/store';

interface ProfilPictureProps {
    size: number;
    source?: string;
    onPress?: any;
}
interface ImageContainerProps {
    size: number;
}

const ImageContainer = styled.div<ImageContainerProps>`
    ${({ size }) => `
        width: ${size + 10}px;
        height: ${size + 10}px;
        border-radius: ${size + 10}px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    `}
`;

interface InnerContainerProps {
    size: number;
}

const InnerContainer = styled.div<InnerContainerProps>`
    ${({ size }) => `
        width: ${size + 3}px;
        height: ${size + 3}px;
        border-radius: ${size + 3}px;
        overflow: hidden;
    `}
`;

const Placeholder = styled.div`
  background-color: #166C3E;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;


const ProfileImage = styled.img<ImageContainerProps>`
    ${({ size }) => `
        height: ${size + 3}px;
        width: ${size + 3}px;
        object-fit: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    `}
`;

const ProfilPicture: React.FC<ProfilPictureProps> = ({ size, source, onPress }) => {
    const currentUser = useAppSelector(state => state.context.currentUser);
    
    return (
        <ImageContainer size={size} onClick={onPress}>
            <InnerContainer size={size}>
                {source ? (
                    <ProfileImage src={source} size={size} />
                ) : (
                    <Placeholder>
                        <CustomText style={{
                            fontSize: 25,
                            color: "white",
                            fontWeight: 'bold'
                        }}>{currentUser.username && currentUser.username.charAt(0).toUpperCase()}</CustomText>
                    </Placeholder>
                )}
            </InnerContainer>
        </ImageContainer>
    );
}

export default ProfilPicture