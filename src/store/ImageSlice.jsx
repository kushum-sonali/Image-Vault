import { createSlice } from "@reduxjs/toolkit";
import { Upload } from "lucide-react";
const imageSlice=createSlice({
    name:"image",
    initialState:{
        image:[]
    },
    reducers:{
        upload:(state,action)=>{
            state.image = [...state.image,action.payload]
        }            
    }
})
export const {upload} = imageSlice.actions;
export default imageSlice.reducer;
