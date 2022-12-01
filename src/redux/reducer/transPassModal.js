import { createSlice } from "@reduxjs/toolkit"

export const transPassModal = createSlice({
    name: 'transPassModal',
    initialState: {
        code: '',
        isOpen: false
    },
    reducers: {
        setCode: (state,actions) => {
            state.code = actions.payload
        },
        setModalState: (state,actions) => {
            state.isOpen = actions.payload
        }
    }
})

export const { setCode, setModalState } = transPassModal.actions
export default transPassModal.reducer