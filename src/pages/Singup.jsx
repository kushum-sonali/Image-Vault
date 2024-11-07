import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/moving-border"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {auth,provider} from "../../imgConfig"
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UserSlice from "@/store/UserSlice";
import { login } from "@/store/UserSlice";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "username")  {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phone") {
      setPhone(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
const {user}= useSelector((state)=>state.user)
  const collectData = async (userToSave) => {
    try {
      console.log(username, phone, email, password);
      const result = await fetch("http://localhost:5000/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          phone,
          email,
          password
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await result.json(); 
      console.log(data);
      // dispatch(login(data));
      if (data) {
        toast.success("Signup Success");
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const googledata= async(userToSave)=>{
    try{
      const result = await fetch("http://localhost:5000/getuser", {
        method: "POST",
        body: JSON.stringify({
          username:userToSave.username,
          email:userToSave.email,
          firebaseId:userToSave.firebaseId
         
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data= await result.json();
      
      if (data) {
        dispatch(login(data.user));
        navigate('/upload')
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const handleGoogleSignIn = async() => {
    signInWithPopup(auth, provider)
      .then(async(result) => {
        const user = result.user;
        console.log(user);

        const userToSave=  {
          email: user.email,
          username: user.displayName,
          firebaseId: user.uid
        }
        
       
        await googledata(userToSave);
  
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google Sign-up Failed");
      });
  };
  

  return (
    <>
      <form method="post" className="w-full">
        <div className="bg-gray-200 min-h-screen flex justify-center items-center ">
          <div className="bg-custom-gradient2 w-full max-w-md rounded-xl text-center flex flex-col p-6">
            <h1 className="text-white font-serif text-3xl mb-4">Signup for new user</h1>

            <div className="flex flex-col mb-4">
              <Label className="text-white text-left m-2">Username</Label>
              <Input
                type="text"
                placeholder="Enter Your username"
                value={username}
                name="username"
                className="rounded"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mb-4">
              <Label className="text-white text-left m-2">Email</Label>
              <Input
                type="email"
                placeholder="Enter Your email"
                value={email}
                name="email"
                className="rounded"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mb-4">
              <Label className="text-white text-left m-2">Phone</Label>
              <Input
                type="number"
                placeholder="Enter Your phone"
                value={phone}
                name="phone"
                className="rounded"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mb-4 ">
              <Label className="text-white text-left m-2">Password</Label>
              <Input
                type="password"
                placeholder="Enter Your password"
                value={password}
                name="password"
                className="rounded"
                onChange={handleChange}
              />
            </div>
            <div>
              <div>
                <p className=" flex justify-center font-serif mb-2">
                  Do you have an account? <Link to="/login" className=" text-blue-700 cursor-pointer underline flex justify-end ml-2">Login</Link>
                </p>
              </div>
            </div>
         
            <div className=" flex justify-end align-middle items-center">
              <Button
                className=" bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold flex justify-center items-center text-lg hover:scale-90 "
                onClick={(e) => {
                  e.preventDefault();
                  collectData();
                }}
              >
                Signup
              </Button>
              
              <Button
                className=" bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold flex justify-center items-center text-lg hover:scale-90 "
                onClick={(e) => {
                  e.preventDefault();
                  handleGoogleSignIn();
                }}
              >
                SignIn with Google
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default SignUp;
