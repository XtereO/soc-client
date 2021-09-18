import { ProfileType } from "./profile";


export type GenreType='All' | 'Rep' | 'Hip-hop' | `Rock'n'roll` | 'Metall' | 'Other' 
export type MusicType={
    musicId: string
    owner: ProfileType
    title: string
    musicSrc: string | null
    imgSrc: string | null
    author: string | null
    summaryRating: number
    countRated: number//How many people rated this music
    date: string
    genre: GenreType
}
