 import { useRef, useState } from "react"
 import Header from "./Header"
 import { checkValidData } from "../utils/validate";

import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase"
import { updateProfile } from "firebase/auth";
 import { useDispatch } from "react-redux";
 import { addUser } from "../utils/userslice";
import { photoUrl ,poster } from "../utils/constants";

const Login = () => {
   
    const [isSignInForm,setisSignInForm]=useState(true);
    
    const [errMessage,seterrMessage]=useState(null);

     const dispatch=useDispatch();

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
                        displayname: name.current.value , photoURL:photoUrl
                          })
                           .then(() => {
                              const { uid,email,displayname,photoURL} = auth.currentUser;
                       dispatch(addUser({uid:uid,email:email,displayname:displayname,photoURL:photoURL}));
                                
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
                       console.log(user);
                      
                     })
                    .catch((error) => {
                       const errorCode = error.code;
                       const errorMessage = error.message;
                       seterrMessage(errorCode + "-" + errorMessage)
                     });
              }

   }

    return(
    <div className="relative w-full h-screen">  
       <div><Header/></div>
       <div className="absolute inset-0">
        <img src={poster} alt="background-img" className="w-full h-full object-cover"></img>
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
    </div>  
    )}

export default Login;    