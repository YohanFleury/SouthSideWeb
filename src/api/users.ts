import apiClient from "./client";

const endpoint = '/users'

const getAllUsers = () => apiClient.get(endpoint)

const getCreators = () => apiClient.get(`${endpoint}/creators`)

const getUserById = (id: number) => apiClient.get(`${endpoint}/${id}`)

const createUser = (email: string, username: string,) => {
    apiClient.post(endpoint, {
        email: email,
        username: username,
        displayName: username
    })
}

const getUserByUsername = (username: string) => apiClient.get(`${endpoint}/search/${username}`)

const getUserByEmail = (email: string) => apiClient.get(`${endpoint}/byemail?email=${email}`)

const updateUser = (id: number, displayName: string, description: string) => apiClient.put(`${endpoint}/${id}`, {
    displayName: displayName,
    creator: {
        description: description
    }
})

const createCreator = (
    email: string,
    username: string, 
    description: string
    ) => {
        apiClient.post(endpoint, {
            email: email,
            username: username,
            displayName: username,
            creator: {
                description: description
            }
        })
} 

const getCreatorByUsernameAndDisplayname = (name: string) => apiClient.get(`${endpoint}/creators/search?data=${name}`)

const getSubscriptions = (id: number) => apiClient.get(`${endpoint}/${id}/subscriptions`)

const createSubscritpion = (creatorId: number) => apiClient.post('/connections', {
    info: "info d'abonnement...",
    creatorId: creatorId
})

const deleteSubscription = (idCreator: number) => apiClient.delete(`/connections/creators/${idCreator}`)

const addCreatorToFavorites = (id: number) => apiClient.post(`${endpoint}/${id}/favorites`)

const getFavoritesList = () => apiClient.get(`${endpoint}/favorites`)

const deleteCreatorFromFavorites = (id: number) => apiClient.delete(`${endpoint}/${id}/favorites`)

const addCreatorPicture = (picture: any, type: string) => {
    return apiClient.put(`${endpoint}/creators/profilpicture/${type}`, picture, {
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    })
}

const getCreatorPicture = (idCreator: number) => (
    apiClient.get(`${endpoint}/creators/${idCreator}/profilpicture`, {}, {
        responseType: 'arraybuffer',
        headers: {
            Accept: '*/*'
        }
    })

) 

const addProfilPicture = (picture: any, type: string) => {
    return apiClient.put(`${endpoint}/accountpicture/${type}`, picture, {
        headers: {
            'Content-Type': 'application/octet-stream'
        }
    })
}

const getProfilPicture = (id: number) => (
    apiClient.get(`${endpoint}/${id}/accountpicture`, {}, {
        responseType: 'arraybuffer',
        headers: {
            Accept: '*/*'
        }
    })
)

export default {
    getAllUsers,
    getCreators,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    getCreatorByUsernameAndDisplayname,
    updateUser,
    createUser,
    createCreator,
    getSubscriptions,
    createSubscritpion,
    deleteSubscription,
    addCreatorToFavorites,
    getFavoritesList,
    deleteCreatorFromFavorites,
    addCreatorPicture,
    getCreatorPicture,
    addProfilPicture,
    getProfilPicture
}