import { useState } from "react";
import Button from "./Button";
import Lottie from "lottie-react";
import signUpAnimation from "../assets/Signup.json";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const [visiblePass, setVisiblePass] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fullName, email, password, gender, birthDate);
    try {
      await axios
        .post(
          `https://userregisteration.onrender.com/signup`,
          {
            fullName,
            email,
            password,
            gender,
            birthDate,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data == "User Already registered") {
            alert("User Already registered please sign in");
            navigate("/", { state: { id: email } });
          } else {
            alert("Account created successfully you login now");
            navigate("/");
          }
        });
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="min-h-screen w-full bg-red-400 flex flex-col lg:flex-row items-center justify-between">
      <div className="w-full h-[20vh] lg:min-h-screen bg-[#2c73eb] overflow-hidden flex items-center justify-center">
        <Lottie
          animationData={signUpAnimation}
          className="w-full h-[20vh] lg:h-[80vh]"
        />
      </div>

      <div className="w-full min-h-screen bg-red-400 flex flex-col">
        <div className="w-full min-h-screen bg-white flex flex-col items-center lg:pt-0 pt-20 justify-start lg:justify-center relative text-gray-500">
          <Link
            to={"/"}
            className="absolute top-5 left-5 lg:left-5 flex items-center justify-between gap-1 cursor-pointer"
          >
            {" "}
            <IoIosArrowBack /> Back
          </Link>
          <div className="lg:w-96 w-72 lg:mx-0 mx-5 ">
            <h1 className="text-black font-bold text-xl lg:text-3xl pb-2">
              Account Signup
            </h1>
            <p className="text-gray-600">
              Become a member and enjoy exclusive promotions.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col justify-center mt-2">
                <label
                  htmlFor="fullname"
                  className="mb-1 tracking-tighter text-gray-600"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2 outline-none border-gray-400 w-full h-12"
                  name="fullname"
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
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
              </div>

              <div className="flex flex-col justify-center mt-2">
                <label
                  htmlFor="gender"
                  className="mb-1 tracking-tighter text-gray-600"
                >
                  Gender
                </label>
                <input
                  type="text"
                  className="border rounded-md px-3 py-2 outline-none border-gray-400 w-full h-12"
                  name="gender"
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              <div className="flex flex-col justify-center mt-2">
                <label
                  htmlFor="dateofbirth"
                  className="mb-1 tracking-tighter text-gray-600"
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  className="border rounded-md px-3 py-2 outline-none border-gray-400 w-full h-12"
                  name="dateofbirth"
                  required
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              <div className="w-full mt-2">
                <input
                  type="submit"
                  value="Create Account"
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold h-14 rounded-md px-3 py-2 cursor-pointer text-xl "
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
