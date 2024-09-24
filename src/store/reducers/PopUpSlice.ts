import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface popUpState {
    popUpVisibility: boolean,
    popUpType: string
}

const initialState: popUpState = {
    popUpVisibility: false,
    popUpType: ''
}

export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
        setPopUpVisibility(state, action: PayloadAction<boolean>) {
            state.popUpVisibility = action.payload
        },
        setPopUpType(state, action: PayloadAction<string>) {
            state.popUpType = action.payload
        }
    }
})

export default popUpSlice.reducer