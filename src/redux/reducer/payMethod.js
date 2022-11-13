import { createSlice } from "@reduxjs/toolkit"

export const payMethod = createSlice({
    name: 'payMethod',
    initialState: {
        value: 0,
    },
    reducers: {
        paymentSelected: (state, actions) => {
            state.value = actions.payload
        } 
    }
})

export const { paymentSelected } = payMethod.actions
export default payMethod.reducer