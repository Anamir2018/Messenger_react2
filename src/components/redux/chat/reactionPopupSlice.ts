import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
type popupSliceType = {
    show?: boolean,
    messageType?: messageType,
    popupType?: popupType,
    idSelectedMessage?: number,
};
type messageType = "text" | "image" | "like" | "";
type popupType = "react" | "options" | "reply" | "";
const initialState: popupSliceType = {
    show: false,
    messageType: "",
    popupType: "",
    idSelectedMessage: -1,
}

const setShowPopup : CaseReducer<popupSliceType, PayloadAction<popupSliceType>>  = (state, action) => {
    const show = (state.idSelectedMessage === action.payload.idSelectedMessage &&
                state.messageType === action.payload.messageType &&
                state.popupType === action.payload.popupType ) ? false : true;
    return (
        {
            show: show,
            messageType:  action.payload.messageType,
            idSelectedMessage: show ? action.payload.idSelectedMessage : -1,
            popupType: action.payload.popupType,
        }
    )
}

// ------------------------------------- Default export Chat slice
const reactionPopupSlice = createSlice({
    name: "reactionPoup",
    initialState: initialState,
    reducers: {
        showPopup: setShowPopup,
    }
})

export default reactionPopupSlice;
export const {showPopup} = reactionPopupSlice.actions;
// const changePopupRef: CaseReducer<popupType, PayloadAction<React.MutableRefObject<HTMLDivElement | null>> >  = (state, action) => {
//     console.log("Ref popup: ",action.payload);
    
//     return (
//         {
//             ...state,
//             popupRef: action.payload,    
//         }
//     )
// }
// const changePopupParentRef : CaseReducer<popupType, PayloadAction<React.MutableRefObject<HTMLDivElement | null>>>  = (state, action) => {
//     // if(state.popupRef && state.popupRef.current) {
//     //     if(action.payload && action.payload.current)
//     //     // @ts-ignore: Object is possibly 'null'.
//     //     action.payload?.current.prepend(state.popupRef.current)
//     //     else
//     //     document.body.prepend(state.popupRef.current as HTMLDivElement || "")
//     // } 
//     return (
//         {
//             ...state,
//             // popupParentRef: action.payload    
//         }
//     )
// }
// const changeSelectedMessage: CaseReducer<popupSliceType, PayloadAction<{id: number, type: poupLocationType}>>  = (state, action) => {

//     return(
//         {
//             ...state,
//             show: !state.show,
//             idSelectedMessage: action.payload.id,
//             type: action.payload.type,
//         }
//     )
// }
