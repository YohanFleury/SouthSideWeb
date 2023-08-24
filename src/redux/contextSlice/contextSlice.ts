import { createSlice } from '@reduxjs/toolkit'
import {Publication} from '../publicationsSlice/publicationsSlice';

type subs = {
    id: number,
    username: string,
    displayName: string,
    description: string,
}
type subList = Creator[]

export type Creator = {
    account: {
        birthdate: string;
        picture: string;
    },
    creator: {
        certified: boolean;
        description: string;
        image: string;
    }
    displayName: string,
    email: string,
    id: number,
    username: string
}
export type currentUser = {
    account: {
        birthdate: string;
        picture: string;
    },
    creator?: {
        certified: boolean;
        description: string;
        image: string;
    }
    displayName: string,
    email: string,
    id: number,
    username: string
}

interface initialStateProps {
    theme: 'dark' | 'light';
    chatVisible: boolean;
    language: 'en' | 'it' | 'es' | 'fr' | 'pt'  ;
    isDrawerOpenable: boolean;
    currentUser: currentUser ;
    token: string;
    isUserEmailVerified: boolean;
    subsList: subList;
    favoritesList: subList;
    savedPublicationsList: Publication[];
    postPosted: boolean;
    contentType: 'home' | 'medias' | 'videos' | 'lives';
    responsesArray: any[];
    openPublicationId: number | null;
    openNewPostModal: boolean;
    openPushMediasModal: boolean;
}

export const initialState: initialStateProps = {
    theme: "dark",
    chatVisible: false,
    language: 'en',
    isDrawerOpenable: true,
    currentUser: {
        account: {
            birthdate: '',
            picture: 'https://unsplash.com/photos/jVb0mSn0LbE'
        },
        displayName: '',
        email: '',
        id: 0,
        username: ''
    },
    token: '',
    isUserEmailVerified: false,
    subsList: [],
    favoritesList: [],
    savedPublicationsList: [],
    postPosted: false,
    contentType: 'home',
    responsesArray: ["", "", "", ""],
    openPublicationId: null,
    openNewPostModal: false,
    openPushMediasModal: false
}

export const contextSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setLanguage: (state, {payload}) => {
            state.language = payload
        },
        setTheme: (state, {payload}) => {
            state.theme = payload
        },

        switchTheme: (state) => {
            state.theme === "dark" 
            ? state.theme = "light"
            : state.theme = "dark"
        },

        setIsDrawerOpenable: (state, {payload}) => {
            state.isDrawerOpenable = payload
        },
        
        setCurrentUser: (state, {payload}) => {
            state.currentUser = payload
        },
        setCurrenUserDisplayName: (state, {payload}) => {
            state.currentUser.displayName = payload
        },
        setCurrentUserDescription: (state, {payload}) => {
            if(state.currentUser.creator) {
                state.currentUser.creator.description = payload
            }
        },
        setToken: (state, {payload}) => {
            state.token = payload
        },
        setisUserEmailVerified: (state, {payload}) => {
            state.isUserEmailVerified = payload
        },
        setSubsList: (state, {payload}) => {
            state.subsList = payload
        },
        addSubsToTheList:  (state, {payload}) => {
            state.subsList.push(payload)
        },
        deleteSubsToTheList:  (state, {payload}) => {
            const index = state.subsList.findIndex((element: any) => element.id === payload);
            if (index !== -1) {
                state.subsList.splice(index, 1);
            }
        },
        setFavoritesList: (state, {payload}) => {
            state.favoritesList = payload
        },
        setSavedPublicationsList: (state, {payload}) => {
            state.savedPublicationsList = payload
        },
        addCreatorToFavList: (state, {payload}) => {
            state.favoritesList.push(payload)
        },
        deleteCreatorFromFavList: (state, {payload}) => {
            const index = state.favoritesList.findIndex((element: any) => element.id === payload);
            if (index !== -1) {
                state.favoritesList.splice(index, 1);
            }
        },
        addPublicationToSavedList: (state, {payload}) => {
            state.savedPublicationsList.push(payload)
        },
        deletePublicationFromSavedList: (state, {payload}) => {
            const index = state.savedPublicationsList.findIndex((element: any) => element.id === payload);
            if (index !== -1) {
                state.savedPublicationsList.splice(index, 1);
            }
        },
        addOneLikeToPublication: (state, {payload}) => {
            const publication = state.savedPublicationsList.find(publication => publication.id === payload)
            if(publication) {
                publication.liked = true;
                publication.nbLikes = publication.nbLikes + 1
            }
        },
        removeOneLikeToPublication: (state, {payload}) => {
            const publication = state.savedPublicationsList.find(publication => publication.id === payload)
            if(publication) {
                publication.liked = false;
                publication.nbLikes = publication.nbLikes - 1
            }
        },
        addNbComments: (state, {payload}) => {
            const publication = state.savedPublicationsList.find(publication => publication.id === payload)
            if(publication) {
                publication.nbComments = publication.nbComments + 1 
            }
        },
        removeNbComments: (state, {payload}) => {
            const publication = state.savedPublicationsList.find(publication => publication.id === payload)
            if(publication) {
                publication.nbComments = publication.nbComments - 1 
            }
        },
        setPostPosted: (state, {payload}) => {
            state.postPosted = payload
        },
        setContentType: (state, {payload}) => {
            state.contentType = payload
        },
        setResponsesArray: (state, {payload}) => {
            state.responsesArray[payload.index] = payload.content
        },
        setopenModal: (state, {payload}) => {
            state.openPublicationId = payload;
        },
        setcloseModal: (state) => {
            state.openPublicationId = null;
        },
        setOpenNewPostModal: (state) => {
            state.openNewPostModal = true;
        },
        setCloseNewPostModal: (state) => {
            state.openNewPostModal = false;
        },
        setOpenPushMediasModal: (state) => {
            state.openPushMediasModal = true;
        },
        setClosePushMediasModal: (state) => {
            state.openPushMediasModal = false;
        }
    }
})


export const { 
    setTheme, 
    switchTheme, 
    setIsDrawerOpenable, 
    setLanguage,
    setCurrentUser,
    setCurrenUserDisplayName,
    setCurrentUserDescription,
    setToken,
    setisUserEmailVerified,
    setSubsList,
    addSubsToTheList,
    deleteSubsToTheList,
    setFavoritesList,
    addCreatorToFavList,
    deleteCreatorFromFavList,
    setPostPosted,
    setContentType,
    addPublicationToSavedList,
    setSavedPublicationsList,
    deletePublicationFromSavedList,
    addNbComments,
    addOneLikeToPublication,
    removeNbComments,
    removeOneLikeToPublication,
    setResponsesArray,
    setcloseModal,
    setopenModal,
    setOpenNewPostModal,
    setCloseNewPostModal,
    setClosePushMediasModal,
    setOpenPushMediasModal
} = contextSlice.actions

export default contextSlice.reducer