import { createSlice } from "@reduxjs/toolkit";
import { IType } from "../../types/types";
import { PayloadAction } from "@reduxjs/toolkit";

interface TypeState {
    selectedType: IType,
}

const initialState: TypeState = {
    selectedType: {},
}

export const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        setType(state, action: PayloadAction<IType>) {
            state.selectedType = action.payload
        }
    }
})

export default typeSlice.reducer