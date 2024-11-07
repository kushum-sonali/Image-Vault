import { useState } from "react";
import "./App.css";

import FileUploadButton from "./pages/Filesuploader";

import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Mygallary";
import SideNavbar from "./pages/Sidenavbar";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import Logout from "./pages/Logout";
import Settings from "./pages/Settings";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    // <div className=" flex justify-center items-center bg-slate-400">
    //   <UploaderFile/>
    // </div>
<>
    <div className="flex flex-row w-screen">
      <SideNavbar className="" />
      <div className="App flex justify-center items-center h-screen bg-gray-100 w-[80%] bg-custom-gradient  ">
        <Routes>
        <Route path="/" element={<FileUploadButton />} />

          <Route path="/upload" element={<FileUploadButton />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        
      </div> 
    </div>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </>
    
  );
}

export default App;
