import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

import axios from "../axios";

const Login = () => {
  const { persist, setPersist, setAuth } = useAuth();

  const [logemail, setEmail] = useState("");
  const [logpassword, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const togglePersist = () => {
    setPersist((prev) => !prev);
    localStorage.setItem("persist", !persist);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/user/sign_in",
        {
          email: logemail,
          password: logpassword,
        },
        {
          withCredentials: true,
        }
      );
      
      if (response.data.message === "Login Successful") {
        togglePersist();
        toast.success('Login Successful!')
        const accessToken = response?.data?.accessToken;
        const role = response?.data?.role;
        const authpassword = response?.data?.result?.password;

        setAuth({
          id: response?.data?.result?._id,
          email: logemail,
          pass: authpassword,
          role: role,
          token: accessToken,
        }); //saved in global context

        navigate(from, { replace: true });
      }
      else{
        toast.error('Something went wrong.')
      }
    } catch (err) {  //?
      console.log(err);
      if (!err?.reponse) {
        toast.error("Login Failed");
      } else if (err.response?.status === 400) {
        toast.error("Missing username or password");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
    }
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 mx-auto h-screen font-cust1">
        <div className="w-full bg-red-200 rounded-lg shadow sm:max-w-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
              Welcome to <span className="text-red-600">DonateNow</span>
            </h1>
          
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="username" className="mr-2 font-bold">
                  Email :
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  id="email"
                  name="email"
                  value={logemail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="mr-2 font-bold">
                  Password :
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  id="password"
                  name="password"
                  value={logpassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center"
              >
                Login
              </button>
            </form>

            <p className="text-sm font-light text-gray-500">
              Don't have an account yet?{" "}
              <Link
                to="/register"
                className="font-bold text-lg text-primary-600 hover:underline"
              >
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
