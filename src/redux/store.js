import { configureStore } from "@reduxjs/toolkit"
import loading from "./reducer/loading"
import payMethod from "./reducer/payMethod"

export default configureStore({
    reducer: {
        loading: loading,
        payMethod: payMethod,
    }
})