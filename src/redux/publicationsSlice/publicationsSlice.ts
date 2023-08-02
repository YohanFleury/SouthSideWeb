import { createSlice } from '@reduxjs/toolkit'

export type Publication = {
    author: {
        displayName: string;
        id: number;
        username: string;
    };
    content: string;
    id: number;
    liked: boolean;
    nbComments: number;
    nbLikes: number;
    visible: boolean;
    creationDate: any;
    nbPictures: number;
    responses?: any[];
    pictureUrls: string[];
}

interface initialStateProps {
    feedPublications: Publication[];
    oneCreatorPublications: Publication[];
    oneCreatorPublicationsFromResearch: Publication[];
}

export const initialState: initialStateProps = {
    feedPublications: [],
    oneCreatorPublications: [],
    oneCreatorPublicationsFromResearch: []
}

export const publicationsSlice = createSlice({
    name: 'publications',
    initialState: initialState,
    reducers: {
        setFeedPublicationList: (state, {payload}) => {
            state.feedPublications = payload
        },
        setOneCreatorPublications: (state, {payload}) => {
            state.oneCreatorPublications = payload
        },
        setOneCreatorPublicationsFromResearch: (state, {payload}) => {
            state.oneCreatorPublicationsFromResearch = payload
        },
        addLikeToPublication: (state, {payload}) => {
            const fp = state.feedPublications.find(publication => publication.id === payload)
            if(fp) {
                fp.liked = true;
                fp.nbLikes = fp.nbLikes + 1
            }
            const op = state.oneCreatorPublications.find(publication => publication.id === payload)
            if(op) {
                op.liked = true;
                op.nbLikes = op.nbLikes + 1
            }
            const opfr = state.oneCreatorPublicationsFromResearch.find(publication => publication.id === payload)
            if(opfr) {
                opfr.liked = true;
                opfr.nbLikes = opfr.nbLikes + 1
            }
        },
        removeLikeToPublication: (state, {payload}) => {
            const fp = state.feedPublications.find(publication => publication.id === payload)
            if(fp) {
                fp.liked = false;
                fp.nbLikes = fp.nbLikes - 1
            }
            const op = state.oneCreatorPublications.find(publication => publication.id === payload)
            if(op) {
                op.liked = false;
                op.nbLikes = op.nbLikes - 1
            }
            const opfr = state.oneCreatorPublicationsFromResearch.find(publication => publication.id === payload)
            if(opfr) {
                opfr.liked = false;
                opfr.nbLikes = opfr.nbLikes - 1
            }
        },
        deletePublication: (state, {payload}) => {
            const homeFeedIndex = state.feedPublications.findIndex((publication: any) => publication.id === payload);
            if (homeFeedIndex !== -1) {
                state.feedPublications.splice(homeFeedIndex, 1);
            }
            const creatorFeedIndex = state.oneCreatorPublications.findIndex((publication: any) => publication.id === payload);
            if (creatorFeedIndex !== -1) {
                state.oneCreatorPublications.splice(creatorFeedIndex, 1);
            }
        },
        addOneToNbComments: (state, {payload}) => {
            const fp = state.feedPublications.find(publication => publication.id === payload)
            if(fp) {
                fp.nbComments = fp.nbComments + 1
            }
            const op = state.oneCreatorPublications.find(publication => publication.id === payload)
            if(op) {
                op.nbComments = op.nbComments + 1
            }
            const opfr = state.oneCreatorPublicationsFromResearch.find(publication => publication.id === payload)
            if(opfr) {
                opfr.nbComments = opfr.nbComments + 1
            }
        },
        removeOneToNbComments: (state, {payload}) => {
            const fp = state.feedPublications.find(publication => publication.id === payload)
            if(fp) {
                fp.nbComments = fp.nbComments - 1
            }
            const op = state.oneCreatorPublications.find(publication => publication.id === payload)
            if(op) {
                op.nbComments = op.nbComments - 1
            }
            const opfr = state.oneCreatorPublicationsFromResearch.find(publication => publication.id === payload)
            if(opfr) {
                opfr.nbComments = opfr.nbComments - 1
            }
        },
    }
})


export const { 
    setFeedPublicationList,
    setOneCreatorPublications,
    setOneCreatorPublicationsFromResearch,
    addLikeToPublication,
    removeLikeToPublication,
    deletePublication,
    addOneToNbComments,
    removeOneToNbComments
} = publicationsSlice.actions

export default publicationsSlice.reducer