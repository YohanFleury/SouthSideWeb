import React, { useEffect, useState } from 'react';
import colors from '../../config/colors';
import useApi from '../../hooks/useApi/useApi';
import users from '../../api/users';
import { arrayBufferToBase64 } from '../../config/utils/arrayBufferToBase64';
import PostCardHeader from '../PostCardHeader/PostCardHeader';
import publications from '../../api/publications';
import { useAppDispatch } from '../../redux/store';
import { chooseSurveyResponse } from '../../redux/publicationsSlice/publicationsSlice';
import styled from 'styled-components';
import { CustomText } from '../CustomedComponents';


interface SurveyCardProps {
    username: string;
    name: string;
    question: string;
    responses: any[];
    authorId: number;
    description?: string;
    onTipsPress?: () => void;
    onPpPress?: () => void;
    publicationId: number;
    date: string | undefined;
    hasAlreadyVoted: boolean;
}

type response = {
    answered: boolean,
    count: number,
    id: number,
    responseText: string
}
const SurveyCard: React.FC<SurveyCardProps> = ({
    name,
    username, 
    question, 
    responses, 
    authorId, 
    description,
    date,
    publicationId,
    onPpPress,
    hasAlreadyVoted
  }) => {
    const [choosenResId, setChoosenResId] = useState<number | null>(null)    
    const [totalCount, setTotalCount] = useState(0)
    const [responsesArray, setResponsesArray] = useState<response[]>(responses)
    const [hasVoted, setHasVoted] = useState<boolean>(hasAlreadyVoted)
    const dispatch = useAppDispatch()

    const surveyVoteApi = useApi(publications.voteSurvey)   
    
    const handleVoteSurvey = (resId: number) => {
        if (hasVoted) return ;
        surveyVoteApi.request(publicationId, [resId])
    }

    useEffect(() => {
      setTotalCount(0)
      responsesArray.map((res: response) => {
        setTotalCount(x => x + res.count)
      })
    }, [responsesArray])
    

    useEffect(() => {
      if (surveyVoteApi.success) {
        console.log('Vote sondage pris en compte !')
        setHasVoted(true)
        const newResponsesArray = responsesArray.map((res) => {
            if (res.id === choosenResId) {
              return {
                ...res,
                answered: true,
                count: res.count + 1
              };
            } else {
              return res;
            }
        });
        setResponsesArray(newResponsesArray);

      } else if (surveyVoteApi.error) {
        console.log('Problème vote sondage.')
      }
    }, [surveyVoteApi.success, surveyVoteApi.error])
    
  
    return (
        <MainContainer>
          <Container>
            <PostCardHeader
              username={username}
              displayName={name}
              authorId={authorId}
              onPpPress={onPpPress}    
              date={date}
              publicationId={publicationId}
              description={description}
              isSurvey={true}
            />
            <Subject>
              <CustomText style={{ fontSize: 16 }}>{question}</CustomText>
            </Subject>
            <Answers>
              {responsesArray.map((res: response) => (
                <AnswerDetail
                  key={res.id}
                  onClick={() => {
                    handleVoteSurvey(res.id);
                    if (!hasVoted) {
                      setChoosenResId(res.id);
                    }
                  }}
                  style={{
                    borderColor: res.answered ? colors.dark.primary : colors.lightGrey,
                    cursor: hasVoted ? 'default' : 'pointer'
                  }}
                >
                  <CustomText>{res.responseText}</CustomText>
                  {hasVoted && (
                    <CustomText
                      style={{ 
                        position: 'absolute', 
                        right: 5, 
                        top: 10, 
                        color: res.answered ? colors.dark.primary : colors.white }}
                    >
                      {res.count == 0 ? '0 %' : `${(res.count / totalCount) * 100} %`}
                    </CustomText>
                  )}
                </AnswerDetail>
              ))}
            </Answers>
          </Container>
        </MainContainer>
    );
  };
  

  export default SurveyCard

  const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background-color: ${colors.dark.background};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  max-width: 80%;
`;

const Container = styled.div`
overflow: hidden;
flex: 1;
position: relative;
width: 100%;
border-bottom: 1px solid ${colors.lightDark};
padding-bottom: 10px
`;

const Subject = styled.div`
  height: auto;
  padding: 10px;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  
`;

const AnswerDetail = styled.div`
  padding: 10px;
  border-radius: 20px;
  align-items: center;
  margin-top: 10px;
  position: relative;
  width: 70%;
  border: 1px solid ${colors.lightDark};
  display: flex;
  justify-content: center;
`;

