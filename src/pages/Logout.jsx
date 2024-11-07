import React from "react";
import { logout } from "@/store/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Logout(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    
    return(
        <>
        <h1>Logout</h1>
        <button onClick={()=>{
            dispatch(logout());
            navigate("/login");
        }}>Logout</button>
        
       
        </>
    )
}
export default Logout;
