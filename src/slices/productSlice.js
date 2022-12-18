import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    resultSearchProduct: JSON.parse(localStorage.getItem('resultSearchProduct')) || [],
}

const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        search: (state, action) => {
            console.log(state);
            console.log(action);
        },
    }
})

const { reducer, actions } = product;
export const { search } = actions;
export default reducer;