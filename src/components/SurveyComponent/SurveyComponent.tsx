import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import useApi from '../../hooks/useApi/useApi';
import publications from '../../api/publications';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setResponsesArray } from '../../redux/contextSlice/contextSlice';
import { CustomButton, CustomInput } from '../CustomedComponents';



const SurveyComponent = () => {
    const [responseUna, setResponseUna] = useState<string>('')
    const [responseDos, setResponseDos] = useState<string>('')
    const [responseTres, setResponseTres] = useState<string>('')
    const [responseQuatro, setResponseQuatro] = useState<string>('')

    const [showRepTres, setShowRepTres] = useState<boolean>(false)
    const [showRepQuatro, setShowRepQuatro] = useState<boolean>(false)


    const dispatch = useAppDispatch()

    const handleAdd = () => {
        if (showRepTres) {
            setShowRepQuatro(true)
        } else {
            setShowRepTres(true)
        }
    }

    
    const handleSurvey = () => {
        //createSurvey('Suis je le plus beau de lapplication', 243, responses)
    }

    useEffect(() => {
      dispatch(setResponsesArray({
        index: 0,
        content: responseUna
      }))
      dispatch(setResponsesArray({
        index: 1,
        content: responseDos
      }))
      dispatch(setResponsesArray({
        index: 2,
        content: responseTres
      }))
      dispatch(setResponsesArray({
        index: 3,
        content: responseQuatro
      }))
    }, [responseUna, responseDos, responseTres, responseQuatro])

    const closeRepTres = () => {
        setShowRepTres(false)
        setResponseTres('')
    }
    const closeRepQuatro = () => {
        setShowRepQuatro(false)
        setResponseQuatro('')
    }

    return (
      <Container>
            {!showRepQuatro && (
                <StyledCircle>
                    <AddIcon onClick={handleAdd} />
                </StyledCircle>
            )}
        <Blocks>
            <CustomInput 
                placeholder='Réponse 1'
                onChange={(e) => setResponseUna(e.target.value)}
                value={responseUna}
            />
        </Blocks>
        <Blocks>
            <CustomInput
                placeholder='Réponse 2'
                onChange={(e) => setResponseDos(e.target.value)}
                value={responseDos}
            />
        </Blocks>
        {showRepTres && (
          <Blocks>
            <CustomInput
                placeholder='Réponse 3'
                onChange={(e) => setResponseTres(e.target.value)}
                value={responseTres}
            />
            {!showRepQuatro && (
              <CloseIcon size={25} onClick={closeRepTres} />
            )}
          </Blocks>
        )}
        {showRepQuatro && (
          <Blocks>
            <CustomInput
                placeholder='Réponse 4'
                onChange={(e) => setResponseQuatro(e.target.value)}
                value={responseQuatro}
            />
            <CloseIcon size={25} onClick={closeRepQuatro} />
          </Blocks>
        )}
      </Container>
    );
}

const Container = styled.div`
    width: 90%;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 15px;
    position: relative;
`;

const Blocks = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
`;

const CloseIcon = styled(AiOutlineClose)`
    color: white;
    cursor: pointer;
    position: absolute;
    right: 5%
`;

const AddIcon = styled(AiOutlinePlus)`
    
    cursor: pointer;
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
  position: absolute;
  top: 0px;
  right: 0px;
`;


export default SurveyComponent;
