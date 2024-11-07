import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/store/UserSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "../ui/moving-border"; 
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setpassword] = useState("");
  const dispatch= useDispatch();
  const navigate=useNavigate();

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    if(name=="email"){
        setEmail(value)
    }
    else if(name =="password"){
        setpassword(value)
    }
  }

  const collectdata = async () => {
    try{
        const result= await axios.post("http://localhost:5000/login",{
            email:email,
            pass:password
        },
        {
        headers:{
            "content-Type": "application/json"
        }
        } );
        console.log(result.data);
          dispatch(login(result.data.data.user))
          navigate("/upload")
          toast.success("login succesfully :)")

    }
    catch (err) {
        toast.error(err.response.data.message)
        
    }
}

const googleLOgin= async()=>{
try{
  


}
catch(e){
  console.log(e);
}
}

return (
    <>
      <form method="post" className="w-full">
        <div className="bg-gray-200 min-h-screen flex justify-center items-center ">
          <div className="bg-custom-gradient2 w-full max-w-md rounded-xl text-center flex flex-col p-6">
            <h1 className="text-white font-serif text-3xl mb-4">Login for existing user!</h1>

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
                                  Do You Have An Account?
                               <Link to="/signup" className=" text-blue-700 cursor-pointer underline flex justify-end ml-2">Register account!</Link>
                               {/* <Link to="/forget" className=" text-blue-700 cursor-pointer underline flex justify-end ml-2">forget password</Link> */}

                                </p>

                            </div>
                        </div>
             <div className=" flex justify-center align-middle items-center">
            <Button
              className=" bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold flex justify-center mr-4 items-center text-lg hover:scale-90 "
              onClick={(e) => {
                e.preventDefault();
                collectdata();
              }}
            >
            Login
            </Button>
            <Button
                className=" bg-custom-gradient2 dark:bg-slate-900 text-black dark:text-white border-neutral-500 dark:border-slate-800 font-serif font-bold flex justify-center items-center  text-lg hover:scale-90 "
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
export default Login;
