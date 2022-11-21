import { createSlice } from "@reduxjs/toolkit"

export const isSignIn = createSlice({
    name: 'isSignIn',
    initialState: {
        value: false,
    },
    reducers: {
        signIn: state => {state.value = true},
        signOut: state => {state.value = false},
    }
})

export const { signIn, signOut } = isSignIn.actions
export default isSignIn.reducer