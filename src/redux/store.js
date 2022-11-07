import { configureStore } from "@reduxjs/toolkit"
import loading from "./reducer/loading"

export default configureStore({
    reducer: {
        loading: loading
    }
})