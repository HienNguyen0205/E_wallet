import { createSlice } from "@reduxjs/toolkit"

export const firstLauch = createSlice({
    name: 'firstLauch',
    initialState: {
        value: true,
    },
    reducers: {
        turnOffIntro: state => {state.value = false}
    }
})

export const { turnOffIntro } = firstLauch.actions
export default firstLauch.reducer