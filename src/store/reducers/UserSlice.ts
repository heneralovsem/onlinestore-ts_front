import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: IUser,
    isAuth: boolean
}

const initialState: UserState = {
    user: {},
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer