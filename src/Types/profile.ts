


export type ReviewType={ 
    user?: ProfileType
    review: null | string
    rating: number
    reviewFor?: 'Music' | 'Playlist'
    idMusicOrPlaylist: string
    titleMusicOrPlaylist: string
    date?: string
    reviewId?: string
}
export type ProfileDetailType={
    shortNickname: string
    userId: string | null
    avatar: string | null
    firstName: string
    secondName: string
    aboutMe: string
    followers: number
    following: number
    unreadedMessages: number
    isFollow: boolean | null // null - my profile
}
export type ProfileType={
    shortNickname: string
    userId: string
    avatar: string | null
    firstName: string
    secondName: string
    aboutMe: string
    isFollow: boolean
}
export type NamesType={
    shortNickname?: string 
    firstName?: string  
    secondName?: string 
}