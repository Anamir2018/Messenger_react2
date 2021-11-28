import { combineReducers } from "@reduxjs/toolkit"
import userSlice from  "./user/userSlice";
import friendsSlice from  "./friends/friendsSlice";
import chatSlice from "./chat/chatSlice";
import imageViewerSlice from "./imageViewer/imageViewerSlice";
import reactionPopupSlice from "./chat/reactionPopupSlice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    friends: friendsSlice.reducer,
    chat: chatSlice.reducer,
    imageViewer: imageViewerSlice.reducer,
    reactionPopup: reactionPopupSlice.reducer,
});

export default rootReducer;