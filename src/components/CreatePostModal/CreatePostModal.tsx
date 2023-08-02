import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components';
import { CustomButton } from '../CustomedComponents';
import { AiOutlineClose } from 'react-icons/ai';

import { FaImage } from "react-icons/fa";
import useApi from '../../hooks/useApi/useApi';
import users from '../../api/users';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import ProfilPicture from '../ProfilPicture/ProfilPicture';
import TextareaAutosize from 'react-textarea-autosize';
import colors from '../../config/colors';
import { setCloseNewPostModal } from '../../redux/contextSlice/contextSlice';
import AudienceBtn from '../AudienceBtn/AudienceBtn';
import SurveyComponent from '../SurveyComponent/SurveyComponent';
import SurveyBtn from '../SurveyBtn/SurveyBtn';
import publications from '../../api/publications';


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
    maxHeight: '90%', 
    overflow: 'auto', 
    borderWidth: 0
  },
  overlay: {
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
  },
};

// This line is important to bind the modal to your appElement
Modal.setAppElement('#root');

const CreatePostModal = () => {
  // State
  const [content, setContent] = useState('');
  const [profilPicture, setProfilPicture] = useState<any>(null)
  const [isSurvey, setIsSurvey] = useState<boolean>(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [imagesChoosen, setImagesChoosen] = useState<any[]>([])
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [pictureFiles, setPictureFiles] = useState<any[]>([])

  // Ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Redux
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.context.currentUser)
  const openNewPostModal = useAppSelector(state => state.context.openNewPostModal)
  const responsesArray = useAppSelector(state => state.context.responsesArray)

  // API
  const getProfilPictureApi = useApi(users.getProfilPicture)
  const createSurveyApi = useApi(publications.createSurvey)
  const createPublicationApi = useApi(publications.createPublication)
  const addImageToPublicationApi = useApi(publications.addImageToPublication)

  // Effects

  useEffect(() => {
    if (isSurvey) {
        if (content.length > 0 && responsesArray[0].length > 0 && responsesArray[1].length > 0) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    } else {
        if (content.length > 0 || imagesChoosen.length > 0) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }
  }, [content, responsesArray, imagesChoosen, isSurvey]) 

  useEffect(() => {
    getProfilPictureApi.request(currentUser.id)
    console.log(currentUser)
    }, [])
  useEffect(() => {
    if(getProfilPictureApi.success) {
       console.log('Photo créateur bien récupérée', getProfilPictureApi.data)
       setProfilPicture(arrayBufferToBase64(getProfilPictureApi.data))
    } else if(getProfilPictureApi.error) {
       console.log('Error [Get creator picture / Drawer]')
    }
}, [getProfilPictureApi.success, getProfilPictureApi.error, getProfilPictureApi.data])

  useEffect(() => {
    if (createPublicationApi.success) {
      console.log('La publication a été prise en compte !')
      if (pictureFiles.length > 0) {
        pictureFiles.map((imageInfos: any,) => {
          addImageToPublicationApi.request(createPublicationApi.data.id, imageInfos.type, imageInfos.file)
      })
      }
    } else if (createPublicationApi.error) {
      console.log('Un problème est survenu avec la publication.')
    }
  }, [createPublicationApi.success, createPublicationApi.error])
  
  // Functions
  const closeModal = () => {
    dispatch(setCloseNewPostModal())
    setImagesChoosen([])
  }

  const handleTextChange = (e: any) => {
    setContent(e.target.value);
  }

  const handleImageClick = () => {
    if(isSurvey) return

    fileInputRef.current?.click();
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
    }
};

  const handleSurvey = () => {
    setIsSurvey(x => !x)
  }
  const onPrivacyPress = () => {
    setIsPublic(!isPublic)
  }

  const handlePost = () => {
    if (isDisabled) return 

    if (isSurvey) {
        let responses: any[] = []
        responsesArray.map((res) => res.length > 0 && responses.push({
            responseText: res
        }))
        createSurveyApi.request(content, currentUser.id, responses, isPublic)
    } else {
        createPublicationApi.request(content, isPublic, currentUser.id)
    }
    setContent('')
    closeModal()
}

const handleDeleteImage = (index: number) => {
  setImagesChoosen(imagesChoosen.filter((_, i) => i !== index));
}

  return (
    <div>
      <Modal
        isOpen={openNewPostModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <CloseButton onClick={closeModal}>
          <MdClose size={25} />
        </CloseButton>
        <PpContainer>
            <ProfilPicture 
                size={35} 
                onPress={() => null} 
                source={`data:image/jpg;base64,${profilPicture}`} />
        </PpContainer>
        <BtnContainer>
            <CustomButton 
                disabled={isDisabled}
                buttonStyle={{width: 100}} 
                textStyle={{fontSize: 17}} 
                title='Poster' 
                onClick={handlePost} />
        </BtnContainer>
        <div style={{marginTop: 50}}>
          <AudienceBtn onClick={onPrivacyPress} />
        </div>
        <Container>
            <TextareaAutosize
                style={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "none",
                    outline: "none",
                    width: "85%",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    fontSize: "20px",
                    resize: "none",
                    padding: 10
                }}
                minRows={1}
                maxRows={15}
                placeholder={isSurvey ? 'Pose ta question !' : 'Exprime toi !'}
                autoFocus
                onChange={handleTextChange}
            />
        {isSurvey && <SurveyComponent />}
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
        </Container>
        <IconsContainer>
            <StyledCircle style={{cursor: isSurvey ? 'default' : 'pointer'}} onClick={handleImageClick}>
                <FaImage size={17} color={isSurvey ? colors.medium : "white"} />
                <input 
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange} 
                />
            </StyledCircle>
            <SurveyBtn disabled={imagesChoosen.length > 0} onPress={handleSurvey} isSurvey={isSurvey} />
        </IconsContainer>
        
      </Modal>
    </div>
  );
}

const IconsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
`;
const StyledCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333; 
  width: 35px; 
  height: 35px; 
  border-radius: 50%;
  margin: 10px;
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

const Container = styled.div`
  max-height: 500px;
  overflow: auto;
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

const PpContainer = styled.button`
  border: none;
  background: none;
  position: absolute;
  top: 5px;
  left: 45%;
`;

const BtnContainer = styled.button`
border: none;
background: none;
position: absolute;
top: 10px;
right: 0;

`;

export default CreatePostModal;
