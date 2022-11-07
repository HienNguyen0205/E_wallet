import { createSlice } from "@reduxjs/toolkit"

export const loading = createSlice({
    name: 'loading',
    initialState: {
        value: false,
    },
    reducers: {
        toggleLoading: state => {state.value = !state.value}
    }
})

export const { toggleLoading } = loading.actions
export default loading.reducer