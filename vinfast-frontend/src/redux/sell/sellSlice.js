import { createSlice } from "@reduxjs/toolkit"
import cookies from 'react-cookies'

export const sellSlice = createSlice ({
    name: "slide",
    initialState: {
        slide: cookies.load('slide'),
    },
    reducers: {
        login: (state, action) => {
            state.slide = action.payload;
        },
        logout: (state) => {
            state.slide = null;
        }
    }
})

export const { login, logout } = sellSlice.actions;

export const selectslide = (state) => state.slide.slide
export default sellSlice.reducer