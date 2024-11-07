
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import userReducer from "./UserSlice";
import imageReducer from "./ImageSlice"
import storage from "redux-persist/lib/storage";
const persistconfig= {
    key:"root",
    storage,
    version:1
}
const  reducer= combineReducers({
    user:userReducer,
    image:imageReducer
})
const persistedReducer= persistReducer(persistconfig,reducer);
const store= configureStore({reducer:persistedReducer});
export default store;