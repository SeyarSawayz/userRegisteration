import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/logout"),
        { withCredentials: true };
      navigate("/");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };
  return (
    <div>
      <div className="w-full h-24 bg-blue-500 flex items-center justify-between px-10">
        <div className="text-black font-bold text-3xl">Home</div>
        <Link
          onClick={handleLogout}
          className=" bg-red-500 hover:bg-red-400 text-white font-bold rounded-md px-2 py-[0.5] cursor-pointer text-xl h-10 flex items-center justify-center "
        >
          Logout
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
