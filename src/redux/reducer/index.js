import { combineReducers } from "@reduxjs/toolkit"
import loading from "./loading"
import payMethod from "./payMethod"
import isSignIn from "./isSignIn"
import firstLauch from "./firstLauch"

export default rootReducer = combineReducers({
    loading: loading,
    payMethod: payMethod,
    isSignIn: isSignIn,
    firstLauch: firstLauch,
})