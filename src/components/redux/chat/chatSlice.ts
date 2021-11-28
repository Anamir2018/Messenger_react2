import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {messageType} from '../types'
type chatType = {
    messages: messageType[],
    action: actionType,
    searchConversation: string,
}
type actionType = "newMessage"|"reactToMessage" | null;
const initialState: chatType = {
    messages:[],
    action: null,
    searchConversation: "",
}

const saveNewMessage : CaseReducer<chatType, PayloadAction<messageType>>  = (state, action) => {
    return (
        {
            ...state,
            messages:[
                ...state.messages,
                action.payload
            ],
            action: "newMessage",
        }
        )
}
const changeActionType : CaseReducer<chatType, PayloadAction<actionType>>  = (state, action) => {
    return (
        {
            ...state,
            action: action.payload,
        }
        )
}

const setReactionMessage : CaseReducer<chatType, PayloadAction<{idSelectedMessage?: number, reaction: number, reactionType: "image" | "text" | "like" | "" | undefined}>>  = (state, action) => {
    if(action.payload.idSelectedMessage) {
        state.messages.forEach(element => {
            if(element.id === action.payload.idSelectedMessage) {
                if(action.payload.reactionType === "text")
                    element.reactionText = action.payload.reaction
                else
                    element.reactionSharedImage = action.payload.reaction
            }
        });
    }
}

const setMessages : CaseReducer<chatType, PayloadAction<messageType[]>>  = (state, action) => {
    return(
        {
            ...state,
            messages: action.payload
        }
    )
    };


const setSearchConversationValue : CaseReducer<chatType, PayloadAction<string>>  = (state, action) => {
        return(
            {
                ...state,
                searchConversation: action.payload
            }
        )
    }

const updateMessageToRead : CaseReducer<chatType, PayloadAction<number>>  = (state, action) => {
    state.messages.map(msg => {
                if(msg.id === action.payload)
                    msg.isRead = true;
                return msg;
            })
} 


const deleteMsg : CaseReducer<chatType, PayloadAction<number>>  = (state, action) => {
    return(
        {
            ...state,
            messages: state.messages.filter(msg => msg.id !== action.payload)
        }
    )
    };




// ------------------------------------- Default export Chat slice
const chatSlice = createSlice({
    name: "chat",
    initialState: initialState,
    reducers: {
        addNewMessage: saveNewMessage,
        setAction: changeActionType,
        updateReactionMessage: setReactionMessage,
        setChatMessages: setMessages,
        setSearchConversation: setSearchConversationValue,
        updateMessageToBeRead: updateMessageToRead,
        deleteMessage: deleteMsg,
    }
})

export default chatSlice;
export const {addNewMessage, setAction, updateReactionMessage, setChatMessages, setSearchConversation, updateMessageToBeRead, deleteMessage} = chatSlice.actions;