import { MusicType } from "./music";
import { ProfileType, ReviewType } from "./profile";



export type PlaylistDetailType = {
    playlistId: string
    title: string
    imgSrc: string
    summaryRating: number
    countRated: number
    owner: ProfileType
    isPublic: boolean
    date: string    
    isSaved: boolean
    myReview: ReviewType | null
    musics: MusicType[] 
    countSaves: number
}
export type PlaylistType={
    playlistId: string
    title: string
    imgSrc: string
    summaryRating: number
    countRated: number
    owner: ProfileType
    isPublic: boolean
    date: string    
    isSaved: boolean
    myReview: ReviewType | null
    countMusics: number
}

export type GetPlaylistsFiltersType = {
    page: number
    size: number
    title: string
    onlyMyCreated: boolean
    onlyMySaved: boolean
    firstShow: 'new' | 'old' | 'most rated'
}

export type MinimilizeMusicType = {
    title: string
    author: string | null
    musicId: string
    imgSrc: string | null
    isInPlaylist: boolean
    isSaved: boolean
    owner: ProfileType
}