import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import Modal from 'react-modal';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { FaImage, FaLock} from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdClose } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { BsPeopleFill, BsBookmark} from "react-icons/bs";
import { TbCurrencyDollarOff } from "react-icons/tb";
import colors from '../../config/colors';
import { setClosePushMediasModal } from '../../redux/contextSlice/contextSlice';
import { CustomButton, CustomInput, CustomText } from '../CustomedComponents';

const customStyles = {
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -10%)',
    backgroundColor: colors.dark.background,
    borderRadius: '10px',
    color: 'white',
    width: "40%",
    minWidth: 400,
    height: '95%', 
    overflow: 'auto', 
    borderWidth: 0
  },
  overlay: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
  },
};


const PushMediasModal = () => {

  // Redux
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.context.currentUser)
  const openPushMediasModal = useAppSelector(state => state.context.openPushMediasModal)

  // States
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [subSelected, setSubSelected] = useState<boolean>(true)
  const [favSelected, setFavSelected] = useState<boolean>(false)
  const [pictureFiles, setPictureFiles] = useState<any[]>([])
  const [imagesChoosen, setImagesChoosen] = useState<any[]>([])
  const [mediasPrice, setMediasPrice] = useState<string>('')
  const [isItFree, setIsItFree] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [mediasMessage, setMediasMessage] = useState<string>('')
  
 // Ref
 const fileInputRef = useRef<HTMLInputElement | null>(null);

 // UseEffect
 useEffect(() => {
  const shouldEnableButton = (
      (subSelected || favSelected) && 
      pictureFiles.length > 0 &&    
      (isItFree || (mediasPrice.length > 0)) && 
      mediasMessage.length > 0 
  );

  setIsDisabled(!shouldEnableButton);  
}, [mediasPrice, subSelected, favSelected, pictureFiles, mediasMessage]);

  // Functions
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleTextChange = (e: any) => {
    setMediasPrice(e.target.value);
  }

  const handleChangeMediasMessage = (e: any) => {
    setMediasMessage(e.target.value);
  }
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    // Autorise les chiffres, le point, mais seulement un point
    if (!/[0-9.]/.test(event.key) || (event.key === '.' && value.includes('.'))) {
      event.preventDefault();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]; 
      const reader = new FileReader();
      
      setPictureFiles(prevFile => [...prevFile, {
        file: file,
        type: file.type.split("/").pop()
      }])

      

      reader.onloadend = function(e) {
        if (e.target?.readyState === FileReader.DONE) {
          setImagesChoosen(prevImages => [...prevImages, String(reader.result)]);
        }
      };
    
      if (file) {
        reader.readAsDataURL(file); 
      }

      console.log('&&&', pictureFiles)
    }
  };

  const handleDeleteImage = (index: number) => {
    setPictureFiles(pictureFiles.filter((_, i) => i !== index));
  }

  const closeModal = () => {
    dispatch(setClosePushMediasModal())
    setPictureFiles([])
    setMediasPrice('')
    setMediasMessage('')
    setImagesChoosen([])
    setIsItFree(false)
  }
  const handleSend = () => {
    if (disabled) return ;
    closeModal()
  } 
console.log('pictures', pictureFiles)
  return (
    <Modal 
      isOpen={openPushMediasModal}
      style={customStyles}  
      onRequestClose={closeModal}>
        <Container>
          <Header>
            <CloseButton onClick={closeModal}>
              <MdClose size={25} />
            </CloseButton>
            <BtnContainer>
              <CustomButton 
                disabled={isDisabled}
                buttonStyle={{width: 100}} 
                textStyle={{fontSize: 17}} 
                title='Poster' 
                onClick={handleSend} />
            </BtnContainer>
          </Header>
          <div style={{marginTop: 30}}>
            <Audience>
                <CustomText style={{fontWeight: 'bold'}}>Partager avec : </CustomText>
                <AudienceChoices>
                    <AudienceBtn active={subSelected} onClick={() => setSubSelected(!subSelected)}>
                      <BsPeopleFill color='white' size={22} style={{ marginRight: 15 }}/>
                      <CustomText>Mes abonnés (1.8k)</CustomText>
                    </AudienceBtn> 
                    <AudienceBtn active={favSelected} onClick={() => setFavSelected(!favSelected)}>
                      <IoIosPeople color='white' size={24} style={{ marginRight: 15 }} />
                      <CustomText>Mes favoris (8.7k)</CustomText>
                    </AudienceBtn> 
                </AudienceChoices>
            </Audience>
          </div>
          <MediaType>
            <CustomText style={{fontWeight: 'bold'}}>Type de médias : </CustomText>
            <AudienceChoices>
              <AudienceBtn style={{justifyContent: 'space-between'}} active={!isItFree} onClick={() => setIsItFree(false)}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <FaLock size={18} color='white' style={{ marginRight: 15 }} />
                  <CustomText>Payants</CustomText>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '50%'}}>
                  <CustomText>Prix :</CustomText>
                  <div style={{width: '50%',}}>
                    <CustomInput 
                      placeholder='-'
                      value={mediasPrice}
                      onChange={handleTextChange}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <CustomText style={{marginLeft: 5}}>€</CustomText>
                </div>
              </AudienceBtn> 
              <AudienceBtn active={isItFree} onClick={() => setIsItFree(true)}>
                <TbCurrencyDollarOff size={21} color='white' style={{ marginRight: 15 }}/>
                <CustomText>Gratuits</CustomText>
              </AudienceBtn> 
            </AudienceChoices>
          </MediaType>
          <MediaType>
            <CustomText style={{fontWeight: 'bold'}}>Ecris un message :</CustomText>
            <div style={{width: '90%', marginTop: 20, display: 'flex', justifyContent: 'center'}}>
              <CustomInput
                placeholder=''
                value={mediasMessage}
                onChange={handleChangeMediasMessage}
              />
            </div>
          </MediaType>
          <MediaType>
          <CustomText style={{fontWeight: 'bold'}}>Télécharge tes médias :</CustomText>
              <StyledCircle onClick={handleImageClick}>
                <FaImage size={22} color={"white"} />
                <input 
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange} 
                />
              </StyledCircle>
              {imagesChoosen.length > 0 &&
              <ImagesContainer>
              {imagesChoosen.map((image, index) => (
                <ImageWrapper key={index}>
                  <DeleteImageContainer onClick={() => handleDeleteImage(index)}>
                    <AiOutlineClose size={15} color="white" />
                  </DeleteImageContainer>
                  <StyledImage key={index} src={image} alt="Choosen" />
                </ImageWrapper>
              ))}
              </ImagesContainer>}
          </MediaType>
          
        </Container>
    </Modal>
);
};

// styled-components basés sur vos styles React Native :
const Container = styled.div`
flex: 1;
`;

const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end;
padding: 0 10px 10px 10px;
`;

const BtnContainer = styled.button`
border: none;
background: none;
position: absolute;
top: 10px;
right: 0;
`;

const Audience = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;
border-top: 0.5px solid ${colors.medium};
padding: 10px;
`;
type AudienceBtnProps = {
  active: boolean
}
const AudienceBtn = styled.div<AudienceBtnProps>`
    height: 20px;
    width: 70%;
    border: 1px solid ${({active}) => (active ? 'transparent' : '#DDD')};
    background-color: ${({active}) => (active ? '#1D62B9' : 'transparent')};
    border-radius: 10px;
    padding: 15px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    cursor: pointer;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  color: white;
  cursor: pointer;
`;

const AudienceChoices = styled.div`
margin-top: 10px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`;

const MediaType = styled(Audience)``;

const StyledCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333; 
  width: 45px; 
  height: 45px; 
  border-radius: 50%;
  margin: 10px;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  width: 180px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;  
  margin: 10px;
  position: relative;
`;

const DeleteImageContainer = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;  
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2px;
  cursor: pointer;
`;

const ImagesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export default PushMediasModal