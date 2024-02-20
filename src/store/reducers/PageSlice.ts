import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface PageState {
    currentPage: number,
}

const initialState: PageState = {
    currentPage: 1
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        }
    }
})

export default pageSlice.reducer