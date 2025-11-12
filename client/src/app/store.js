import {applyMiddleware, configureStore} from "@reduxjs/toolkit"
import apiSlice from "./apiSlice";
import aouthSliceReducer from "../components/auth/authSlice"

const store= configureStore({
    reducer:{
        auth:aouthSliceReducer,
        [apiSlice.reducerPath]:apiSlice.reducer       
    },
    middleware:(getDefultMiddleware)=>getDefultMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store;