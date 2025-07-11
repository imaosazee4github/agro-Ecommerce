import { createSlice } from "@reduxjs/toolkit";


const favouriteSlice = createSlice({
    name : 'favourites',
    initialState : [],
    reducers :{
        addToFavourites: (state, action) => {
            // check if product is already favourites
            if(!state.some((product) => product._id === action.payload._id)){
                state.push(action.payload)
            }
        },

        removeFromFavourites: (state, action) => {
            // remove the product with the match 10

            return state.filter((product) => product._id !== action.payload._id)

        },
        setFavourites: (state, action) => {
            // set favourite from localstorage
            return action.payload
        }
    }

})


export const { setFavourites, addToFavourites, removeFromFavourites} = favouriteSlice.actions;
export const selectFavouriteProduct = (state) => state.favourites
export default favouriteSlice.reducer;