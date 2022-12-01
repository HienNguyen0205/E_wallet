import { createSlice } from "@reduxjs/toolkit"

export const payMethod = createSlice({
    name: 'payMethod',
    initialState: {
        value: [],
        selectedId: 0,
    },
    reducers: {
        setCardInfo: (state, actions) => {
            state.value.push(actions.payload)
        },
        setSelectedId: (state, actions) => {
            state.selectedId = actions.payload
        },
        clearCardInfo: state => {
            state.value = []
        }
    }
})

export const { setCardInfo, setSelectedId, clearCardInfo } = payMethod.actions
export default payMethod.reducer