import { onAuthStateChanged,signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser,removeUser } from "../utils/userslice";
import { logo, SUPPOERTED_LANGUAGES } from "../utils/constants";
import {toogleGptSearchView}  from "../utils/gptslice"
import {changeLanguage} from "../utils/configslice";

const Header = () => {
  const navigate = useNavigate();

  const dispatch=useDispatch();

  const user = useSelector((store) => store.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  useEffect( () =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) 
            {
             const {uid,email,displayname,photoURL} = user;
            
              dispatch(addUser({uid:uid,email:email,displayname:displayname,photoURL:photoURL}));
              navigate("/browse");
            } else {
                   dispatch(removeUser());
                   navigate("/");
                   }
          });

         return () => unsubscribe(); 
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toogleGptSearchView());
  }

  const handleLanguageChange = (e) => {
     dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute px-8 py-2 w-full bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src={logo}
        alt="logo"
      />
     {user && (
        <div className="flex p-2 items-center space-x-3">
        {showGptSearch && (
           <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
             {SUPPOERTED_LANGUAGES.map(language=><option key={language.identifier} value={language.identifier}>{language.name}</option>)}   
           </select>
        )}
        <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg m-2" onClick={handleGptSearchClick}> {showGptSearch? "Homepage" : "GPT Search" }</button>
        <img
          className="w-12 h-12 rounded"
          alt="user-icon"
          src={user?.photoURL}
        />
        <button onClick={handleSignOut} className="font-bold text-white">
          (Sign-out)
        </button>
      </div>
     )}
    </div>
  );
};

export default Header;
