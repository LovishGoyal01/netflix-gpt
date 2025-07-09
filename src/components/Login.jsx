import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate";

import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";


const Login = () => {
   
    const [isSignInForm,setisSignInForm]=useState(true);
    
    const [errMessage,seterrMessage]=useState(null);

    const dispatch=useDispatch();

    const navigate = useNavigate();

    const name=useRef(null); 
    const email=useRef(null);
    const password=useRef(null);

    const toggleSignInForm=()=>{
         setisSignInForm(!isSignInForm);
    }

    const handleButtonClick= ()=>{
        // Validata form data
     const message=checkValidData(email.current.value,password.current.value);
      seterrMessage(message);

       if(message) return; //invalid data
        
       //signin/ signup logic

       if(!isSignInForm)
         {
              createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                  .then((userCredential) => {
                    
                     const user = userCredential.user;
                     
                     updateProfile(user, {
                        displayname: name.current.value , photoURL:"https://avatars.githubusercontent.com/u/174886388?v=4&size=64"
                          })
                           .then(() => {
                              const { uid,email,displayname,photoURL} = auth.currentUser;
                              dispatch(addUser({uid:uid,email:email,displayname:displayname,photoURL:photoURL}));
                              navigate("/browse");       
                           })
                           .catch((error) => {
                              seterrMessage(error.message);
                           });

                  })
                  .catch((error) => {
                     const errorCode = error.code;
                     const errorMessage = error.message;
                     seterrMessage(errorCode + "-" + errorMessage)
                  });
         }
         else {
                 signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                       const user = userCredential.user;
                       console.log(user)
                     })
                    .catch((error) => {
                       const errorCode = error.code;
                       const errorMessage = error.message;
                       seterrMessage(errorCode + "-" + errorMessage)
                     });
              }

   }

    return(
    <>   
       <div><Header/></div>
       <div className="absolute">
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_small.jpg" alt="background-img"></img>
       </div>
       <div>
         <form  onSubmit={(e)=>e.preventDefault()}  className="w-3/12 absolute p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white rounded-lg ">
           <h1 className="font-bold text-3xl py-4">{isSignInForm? "Sign In":"Sign Up"}</h1>
           { 
             !isSignInForm && <input 
               ref={name}
               type="text" 
               placeholder="Full Name" 
              className="p-4 my-4 bg-[#333] w-full placeholder-gray-400 text-white rounded-sm"/>
           }
            <input ref={email}  type="text" placeholder="Email address" className="p-4 my-4 bg-[#333] w-full placeholder-gray-400" />
            <input ref={password}  type="password" placeholder="Password" className="p-4 my-4 bg-[#333] w-full placeholder-gray-400" />
            <p className="text-red-500 font-bold text-lg p-2">{errMessage}</p>
            <button className="p-4 my-6 bg-red-700 w-full text-xl font-medium" onClick={handleButtonClick}>{isSignInForm? "Sign In":"Sign Up"}</button>
            <p className="p-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? sign Up Now":"Already registerd? sign In Now"}</p>
         </form>
       </div>
    </>  
    )}

export default Login;    