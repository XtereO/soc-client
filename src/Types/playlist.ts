import { MusicType } from "./music";
import { ProfileType } from "./profile";



export type PlaylistDetailType = {
    playlistId: string
    title: string
    musics: MusicType[]
    imgSrc: string
    summaryRating: number
    countRated: number
    owner: ProfileType
    isPublic: boolean
    date: string
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
}

export type GetPlaylistsFiltersType = {
    page: number
    size: number
    title: string
    onlyMyCreated: boolean
    onlyMySaved: boolean
    firstShow: 'new' | 'old' | 'most rated'
}