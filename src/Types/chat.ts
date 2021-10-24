import { ProfileType } from "./profile";


export type TypeChatType = 'dialog' | 'group' | 'discussion'
export type MessageType = {
    messageId: string
    companion: ProfileType
    textMessage: string  
    date: string
}
export type CompanionType = {
    count: number
    isHavePermission: boolean
    user: ProfileType
}
export type ChatType = {
    chatId: string
    type: TypeChatType

    avatar: string
    title: string

    lastMessage: MessageType,
    companions: CompanionType[],
    date: string
}