import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { userType } from "../types";
type userSliceType = {
    user: userType | null,
};
const initialState: userSliceType = {user: null};

const setUserInstance : CaseReducer<userSliceType, PayloadAction<userType | null>>  = (state, action) => {
    if(action.payload === null)
        return ({
            user: null,
        });
    return(
        {
            ...state,
            user: action.payload
        }
    )
}
const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser: setUserInstance,
    }
})
export default userSlice;
export const {setUser} = userSlice.actions;