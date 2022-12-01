import { createSlice } from "@reduxjs/toolkit"

export const userInfo = createSlice({
    name: 'userInfo',
    initialState: {
        value: {
            email: '',
            tel: '',
            balance: 0,
            name: '',
            birthday: '',
            address: '',
            createAt: ''
        }
    },
    reducers: {
        setUserInfo: (state, actions) => {
            state.value = {...state.value, ...actions.payload}
        },
        clearUserInfo: state => {
            state.value = {
                email: '',
                tel: '',
                balance: 0,
                name: '',
                birthday: '',
                address: '',
                createAt: ''
            }
        }
    }
})

export const { setUserInfo, clearUserInfo } = userInfo.actions
export default userInfo.reducer