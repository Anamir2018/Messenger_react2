import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { friendType } from "../types";

// Friends Type
type friendsState =  {
    list: Array<friendType>,
    selectedFriendId: number|undefined,
    colorChat: string,
    sharedPhotos: string[],
    searchFriend: string,
    isFriendWriting: boolean,
    isFriendWritingTimeout?: NodeJS.Timeout,
};

// friends initial State
const initialState: friendsState = {
    list: 
    [],
    selectedFriendId: undefined,
    colorChat: "#0084ff",
    sharedPhotos: [],
    searchFriend: "",
    isFriendWriting: false,
};

// select new friend
const changeIsFriendWritingTimeout: CaseReducer<friendsState, PayloadAction<NodeJS.Timeout>>  = (state, action) => {
    return {
        ...state,
        isFriendWritingTimeout: action.payload
    }

}
// select new friend
const changeIsFriendWriting: CaseReducer<friendsState, PayloadAction<boolean>>  = (state, action) => {
    return {
        ...state,
        isFriendWriting: action.payload
    }

}
// select new friend
const changeSelectedFriend: CaseReducer<friendsState, PayloadAction<number>>  = (state, action) => {
    if(state.list.length > 0) {
        console.log(state.selectedFriendId);
        
        const friendColorChat = state.list.filter(friend => friend.id === action.payload)[0].colorChat;
        return (
            {
            ...state,
            selectedFriendId: action.payload,
            colorChat: friendColorChat || state.colorChat
            }
        )
    }

}
// change color chat
const changeColorChat: CaseReducer<friendsState, PayloadAction<string>>  = (state, action) => {
    return (
        {
        ...state,
        list: state.list.map(friend => (friend.id === state.selectedFriendId) ? {...friend, colorChat: action.payload} : friend),
        colorChat: action.payload ? action.payload : "#0084ff"
        }
    )
}

// select new friend
const changeListFriends: CaseReducer<friendsState, PayloadAction<friendType[]>>  = (state, action) => {
    return (
        {
            ...state,
            list: action.payload
        }
    )
}
// select new friend
const changeSharedPhotos: CaseReducer<friendsState, PayloadAction<string[]>>  = (state, action) => {
    return (
        {
            ...state,
            sharedPhotos: action.payload
        }
    )
}
// select new friend
const changeSearchFriend: CaseReducer<friendsState, PayloadAction<string>>  = (state, action) => {
    return (
        {
            ...state,
            searchFriend: action.payload
        }
    )
}
// ---------------------------------------- Slice Default Export -------------
const friendsSlice = createSlice({
    name: "friends",
    initialState: initialState,
    reducers: {
        setSelectedFriend: changeSelectedFriend,
        setColorChat: changeColorChat,
        setListFriends: changeListFriends,
        setSharedPhotos: changeSharedPhotos,
        setSearchFriend: changeSearchFriend,
        setIsFriendWriting: changeIsFriendWriting,
        setIsFriendWritingTimeout: changeIsFriendWritingTimeout,
    }
})

export default friendsSlice;
export const { setSelectedFriend, setColorChat, setListFriends, setSharedPhotos, setSearchFriend, setIsFriendWriting, setIsFriendWritingTimeout } = friendsSlice.actions;
