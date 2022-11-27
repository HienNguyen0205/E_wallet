import { configureStore } from "@reduxjs/toolkit"
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist"
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from './reducer'

const persistConfig = {
    key: 'root',
    version: 0,
    storage: AsyncStorage,
    whitelist: ['firstLauch', 'isSignIn', 'userInfo'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})