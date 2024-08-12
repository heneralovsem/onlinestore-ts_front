import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface popUpState {
    popUpVisibility: boolean,
}

const initialState: popUpState = {
    popUpVisibility: false,
}

export const popUpSlice = createSlice({
    name: 'popUp',
    initialState,
    reducers: {
        setPopUpVisibility(state, action: PayloadAction<boolean>) {
            state.popUpVisibility = action.payload
        }
    }
})

export default popUpSlice.reducer