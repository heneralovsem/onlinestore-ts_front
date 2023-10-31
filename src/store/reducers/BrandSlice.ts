import { createSlice } from "@reduxjs/toolkit";
import { IBrand } from "../../types/types";
import { PayloadAction } from "@reduxjs/toolkit";

interface BrandState {
    selectedBrand: IBrand,
}

const initialState: BrandState = {
    selectedBrand: {},
}

export const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {
        setBrand(state, action: PayloadAction<IBrand>) {
            state.selectedBrand = action.payload
        }
    }
})

export default brandSlice.reducer