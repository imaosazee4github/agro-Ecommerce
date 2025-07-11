import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react'
import { apiSlice } from './api/apiSlice';
import authReducer from './features/auth/authSlice';
import favouritiesReducer from '../redux/features/favorite/favouriteSlice'
import { getFavoritesFromLocalStorage } from '../utils/localStorage';


const initialFavourites = getFavoritesFromLocalStorage() || []


const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        favourites : favouritiesReducer,
    },

    preloadedState : {
        favourites : initialFavourites
    },

    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true,
})

setupListeners(store.dispatch);
export default store