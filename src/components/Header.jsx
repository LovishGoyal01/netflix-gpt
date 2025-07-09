import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  return (
    <div className="absolute px-8 py-2 w-full bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
     {user && (
        <div className="flex p-2 items-center space-x-3">
        <img
          className="w-12 h-12 rounded"
          alt="user-icon"
          src={
            user?.photoURL ||
            "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          }
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
