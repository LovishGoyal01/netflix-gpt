import { useState } from "react"
import Header from "./Header"

const Login = () => {
   
    const [isSignInForm,setisSignInForm]=useState(true);

    const toggleSignInForm=()=>{
         setisSignInForm(!isSignInForm);
    }

    return(
    <>   
       <div><Header/></div>
       <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_small.jpg" alt="background-img"></img>
       </div>
       <div>
         <form className="w-3/12 absolute p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg ">
           <h1 className="font-bold text-3xl py-4">{isSignInForm? "Sign In":"Sign Out"}</h1>
           { 
             !isSignInForm && <input 
               type="text" 
               placeholder="Full Name" 
              className="p-4 my-4 bg-[#333] w-full placeholder-gray-400 text-white rounded-sm"/>
           }
            <input type="text" placeholder="Email address" className="p-4 my-4 bg-[#333] w-full placeholder-gray-400" />
            <input type="password" placeholder="Password" className="p-4 my-4 bg-[#333] w-full placeholder-gray-400" />
            <button className="p-4 my-6 bg-red-700 w-full text-xl font-medium">{isSignInForm? "Sign In":"Sign Out"}</button>
            <p className="p-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? sign Up Now":"Already registerd? sign In Now"}</p>
         </form>
       </div>
    </>  
    )}

export default Login;    