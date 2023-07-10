import apiClient from "./client";

const endpoint = '/publications'

const getFeedPublications = () => apiClient.get(`${endpoint}/news`)

const getOneUsersPublications = (id: number) => apiClient.get(`${endpoint}/users/${id}`)

const getOnePublication = (id: number) => apiClient.get(`${endpoint}/${id}`)

const createPublication = (content: string, isPublic: boolean, authorId: number) => (
    apiClient.post(endpoint, {
        content: content,
        visible: isPublic,
        author: {
            id: authorId
        }
    })
)

const addImageToPublication = (id: number, imgType: string, mainPicture: any) => (
    apiClient.put(`${endpoint}/${id}/mainpicture/${imgType}`, mainPicture, {
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    })
)

const getPublicationPictures = (id: number, order: number) => 
    apiClient.get(`${endpoint}/${id}/pictures?order=${order}`, {}, {
        responseType: 'arraybuffer',
        headers: {
            Accept: '*/*'
        }
    })

// Like or Dislike 

const addLike = (id: number) => apiClient.post(`${endpoint}/${id}/likes`)

const deleteLike = (id: number) => apiClient.delete(`${endpoint}/${id}/likes`)

// Comment

const addComment = (id: number, content: string) => apiClient.post(`${endpoint}/${id}/comments`, {
    content: content
})

const getComments = (id: number) => apiClient.get(`${endpoint}/${id}/comments`)

const deleteComment = (id: number) => apiClient.delete(`${endpoint}/comments/${id}`)

// Save

const savePublication = (id: number) => apiClient.post(`${endpoint}/${id}/saved`)

const getSavedPublications = () => apiClient.get(`${endpoint}/saved`)

const deleteSavedPublication = (id: number) => apiClient.delete(`${endpoint}/${id}/saved`)

// Survey

type SurveyResponse = {responseText: string}
type responses = SurveyResponse[]

const createSurvey = (content: string, authorId: number, responses: responses, isPublic: boolean) => (
    apiClient.post(`${endpoint}/survey`, {
        content: content,
        visible: isPublic,
        author: {
            id: authorId
        },
        actif: true,
        multiple: false,
        responses: responses
    }) 
)
    
const voteSurvey = (id: number, responses: any) => (
    apiClient.put(`${endpoint}/survey/chooseResponse`, {
        sondage: id,
        responses: responses
    })
    )
    
const deletePublication = (id: number) => apiClient.delete(`${endpoint}/${id}`)
        
export default {
    getOneUsersPublications,
    createPublication,
    deletePublication,
    createSurvey,
    voteSurvey,
    addImageToPublication,
    getPublicationPictures,
    addLike,
    deleteLike,
    addComment,
    getComments,
    deleteComment,
    getFeedPublications,
    savePublication,
    getSavedPublications,
    deleteSavedPublication,
    getOnePublication
}