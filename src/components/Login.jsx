import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";
import { photoUrl, poster } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const [color, setColor] = useState("bg-red-700");

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrMessage(message);

    if (message) return;

    setColor("bg-green-700");

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: photoUrl,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));

            })
            .catch((error) => {
              setErrMessage(error.message);
              setColor("bg-red-700");
            });
        })
        .catch((error) => {
          setErrMessage(error.code + " - " + error.message);
          setColor("bg-red-700");
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          console.log(userCredential.user);

          setTimeout(() => setColor("bg-red-700"), 4000);
        })
        .catch((error) => {
          setErrMessage(error.code + " - " + error.message);
          setColor("bg-red-700");
        });
    }
  };

  return (
    <div className="relative w-full h-screen">
      <Header />
      <div className="absolute inset-0">
        <img
          src={poster}
          alt="background-img"
          className="w-full h-full object-cover"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className={`w-full  absolute p-12 md:w-3/12 md:p-6 ${
          isSignInForm ? "my-36" : "my-20"
        } bg-black/80 mx-auto right-0 left-0 text-white rounded-lg`}
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 bg-[#333] w-full placeholder-gray-400 text-white rounded-sm"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 my-4 bg-[#333] w-full placeholder-gray-400 text-white rounded-sm"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 bg-[#333] w-full placeholder-gray-400 text-white rounded-sm"
        />

        <p className="text-red-500 font-bold p-1">{errMessage}</p>

        <button
          type="button"
          onClick={handleButtonClick}
          className={`p-4 my-6 ${color} w-full text-xl font-medium text-white rounded transition-colors duration-300`}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="p-4 cursor-pointer hover:text-blue-400"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
