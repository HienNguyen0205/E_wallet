import { createSlice } from '@reduxjs/toolkit'

export const forgetPassState = createSlice({
    name: 'forgetPassState',
    initialState: {
        value: 'email'
    },
    reducers: {
        setForgetPassState: (state, actions) => {
            state.value = actions.payload
        }
    }
})

export const { setForgetPassState } = forgetPassState.actions
export default forgetPassState.reducer