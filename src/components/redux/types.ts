type statusType = "online"|"offline";
export type userType = {
    id: number,
    firstName: string,
    lastName: string,
    avatar: string,
};
export type friendType = {
    id: number,
    firstName: string,
    lastName: string,
    avatar: string,
    status?: statusType,
    adress?: string,
    fbLink?: string,
    colorChat?:string,
    lastMessage?: string,
    nbMessagesNotRead?: number,
}
export type messageType = {
    id?: number,
    isFriendMessage: boolean,
    isRead: boolean,
    time: number,
    text: string,
    reactionText?: number,
    sharedImage: string,
    reactionSharedImage?: number,
}
