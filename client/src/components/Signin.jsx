import { useState } from "react";
import Button from "./Button";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";
import signInAnimation from "../assets/Signin.json";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./Home";

const Signin = () => {
  const navigate = useNavigate();
  const [visiblePass, setVisiblePass] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:8000/",
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
          alert("Logged in successfully");
          navigate("/Home");
        })
        .catch((err) => {
          alert("invalide username or password");
          console.log(err.message, err.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen w-full bg-red-400 flex flex-col lg:flex-row items-center justify-between">
      <div className="w-full h-[20vh] lg:min-h-screen bg-[#2c73eb] overflow-hidden flex items-center justify-center ">
        <Lottie
          animationData={signInAnimation}
          className="w-full h-[20vh] lg:h-[80vh]"
        />
      </div>
      <div className="w-full min-h-screen bg-red-400 flex flex-col">
        <div className="w-full min-h-screen bg-white flex flex-col items-center justify-start lg:pt-0 pt-5 lg:justify-center">
          <div className="lg:w-96 w-72  ">
            <h1 className="text-black font-bold text-xl lg:text-3xl pb-2">
              Account Login
            </h1>
            <p className="text-gray-600">
              If you are already a member you can login with your email address
              and password.
            </p>
            <form action="post" method="post" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center mt-2">
                <label
                  htmlFor="email"
                  className="mb-1 tracking-tighter text-gray-600"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="border rounded-md px-3 py-2 outline-none border-gray-400 w-full h-12"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col justify-center mt-2">
                <label
                  htmlFor="password"
                  className="mb-1 tracking-tighter text-gray-600"
                >
                  Password
                </label>
                <div className="flex rounded-md items-center w-full border border-gray-400">
                  <input
                    type={visiblePass ? "text" : "password"}
                    className=" px-3 py-2 outline-none  w-full h-12"
                    name="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    className="px-3 cursor-pointer"
                    onClick={() => setVisiblePass((prev) => !prev)}
                  >
                    {visiblePass ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </div>

                <div className="flex gap-4 items-center mt-3">
                  <input type="checkbox" name="rememberMe" id="" />
                  <label
                    htmlFor="rememberMe"
                    className="mb-1 tracking-tighter text-gray-600"
                  >
                    Remeber me
                  </label>
                </div>
              </div>

              <div className="mt-2 flex items-center w-ful justify-center">
                <input
                  type="submit"
                  value="Sigin"
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold h-14 rounded-md px-3 py-2 cursor-pointer text-xl "
                />
              </div>
            </form>
          </div>

          <div className="w-full mt-2 text-center">
            <p className="text-gray-500">
              Dont have an account ?{" "}
              <Link to={"/signup"} className="text-blue-600 cursor-pointer">
                Sign up here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
