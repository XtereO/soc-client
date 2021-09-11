


export type ReviewType={
    user:{
        avatar: string
        firstName: string
        secondName: string
        shortNickname: string
        id: string
    }
    review: null | string
    rating: number
    reviewFor: 'Music' | 'Playlist'
    idMusicOrPlaylist: string
    titleMusicOrPlaylist: string
    date: string
}
export type ProfileType={
    shortNickname: string
    userId: string|null
    avatar: string | null
    firstName: string
    secondName: string
    aboutMe: string
    followers: number
    subscribers: number
}
export type NamesType={
    shortNickname?: string 
    firstName?: string  
    secondName?: string 
}