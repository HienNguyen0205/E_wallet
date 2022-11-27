import { combineReducers } from "@reduxjs/toolkit"
import loading from "./loading"
import payMethod from "./payMethod"
import isSignIn from "./isSignIn"
import firstLauch from "./firstLauch"
import userInfo from "./userInfo"
import forgetPassState from "./forgetPassState"

export default rootReducer = combineReducers({
    loading: loading,
    payMethod: payMethod,
    isSignIn: isSignIn,
    firstLauch: firstLauch,
    userInfo: userInfo,
    forgetPassState: forgetPassState,
})