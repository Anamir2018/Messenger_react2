import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

type viewerType = {
    urlImage: string
}
// friends initial State
const initialState = {
    urlImage: ""
};

const viewImageViewer: CaseReducer<viewerType, PayloadAction<string>>  = (state, action) => {
    return (
        {
        ...state,
        urlImage: action.payload
        }
    )
}


// ---------------------------------------- Slice Default Export -------------
const imageViewerSlice = createSlice({
    name: "imageViewer",
    initialState: initialState,
    reducers: {
        showImageViewer: viewImageViewer
    }
})

export default imageViewerSlice;
export const { showImageViewer } = imageViewerSlice.actions;
