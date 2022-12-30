import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
} 

//Slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedInOrSignedUp: (state, action) => {
            state.user = action.payload
        },
        userLoggedOut: (state, action) => {
            state.user = null;
        },
        userProfileUpdated: (state, action) => {
            Object.keys(action.payload).forEach(key => {
                state.user[key] = action.payload[key];
            })
        }

    }
})


//Selectors
export const getUserFromStore = state => state.user.user;
export const getUserErrorFromStore = state => state.user.error;

//reducer and action creators
export const { userLoggedInOrSignedUp, userLoggedOut, userProfileUpdated } = userSlice.actions;
export default userSlice.reducer;
