import React, { useState } from "react";
import signinLogo from "../Admin/AdminImage/signiLogo.png";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../function/config";

export default function Signin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [Signin, setSignin] = useState("Signin");
  // Validate username
  const validateUsername = (value) => {
    if (!value) {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }
  };

  // Validate password
  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 4) {
      setPasswordError("Password must be at least 4 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      email: username,
      password: password,
    };
    try {
      const response = await axios.post(
        `${config.base_url}/api/HappyMarineShipping/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 200) {
        setLoading(false);
        console.log(response);
        localStorage.setItem("token", response.data.token);
        if (response.data.is_admin === true) {
          localStorage.setItem("admin", "t");
          window.location.href = "/admin/Dashboard";
        } else {
          // Handle other roles or redirect to a default page
          toast.error("Unauthorized role", {
            autoClose: 3000,
            position: "top-right",
          });
        }
      } else {
        console.log(response);
        toast.error(response.data.message, {
          autoClose: 3000,
          position: "top-right",
        });
        setLoading(false);
      }
    } catch (err) {
      console.log("error2", err);
      toast.error("Error", {
        autoClose: 3000,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-[#123D5f] flex items-center justify-center h-screen">
        <div className="bg-white p-5 max-h-screen w-[35%]">
          {Signin === "Signin" && (
            <>
              <div>
                <img src={signinLogo} className="w-[256px] -mt-10" alt="" />
                <h1 className="text-center text-[24px] -mt-5">Signin</h1>
              </div>

              <form className="flex flex-col gap-7 mx-auto mt-5">
                {/* Username Field */}
                <div className="relative w-full group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setusername(e.target.value);
                      validateUsername(e.target.value);
                    }}
                    onBlur={() => validateUsername(username)}
                    className={`w-full px-1 py-1 border-b ${
                      usernameError ? "border-red-500" : "border-gray-400"
                    } focus:outline-none focus:ring-0 bg-transparent`}
                  />
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 ease-in-out group-focus-within:w-full group-focus-within:left-0"></span>
                </div>

                {/* Password Field */}
                <div className="relative w-full group mt-4">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    onBlur={() => validatePassword(password)}
                    className={`w-full px-1 py-1 border-b ${
                      passwordError ? "border-red-500" : "border-gray-400"
                    } focus:outline-none focus:ring-0 bg-transparent`}
                  />
                  <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 ease-in-out group-focus-within:w-full group-focus-within:left-0"></span>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="h-4 w-4" />
                    <span className="text-sm">Remember Me</span>
                  </label>
                  <button
                    onClick={() => setSignin("resetpswd")}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="w-full bg-blue-500 text-white  py-2 rounded-lg hover:bg-blue-600 disabled:cursor-not-allowed transition duration-200 disabled:bg-gray-300"
                  disabled={
                    usernameError || passwordError || !username || !password
                  }
                >
                  {loading ? (
                    <span className="block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </>
          )}
          {Signin === "resetpswd" && (
            <>
              <div className="flex  justify-between">
                <div>
                  <h1 className="text-2xl">Recover Password</h1>
                  <p className="mt-2 text-gray-500">
                    Enter your Email and instructions will be sent to you!
                  </p>
                </div>
                ̥{/* Back Icon */}
                <button
                  onClick={()=> setSignin("Signin")}
                  className=" -mt-6"
                >
                  <i className="bx bx-arrow-back text-3xl text-blue-500 hover:text-blue-700 transition-all duration-300 ease-in-out transform hover:rotate-180"></i>
                </button>
              </div>
              <form className="mt-10">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full rounded-lg border py-3  p-2"
                />
                <button className="mt-4 bg-[#FB9678] w-full text-center p-3 rounded-lg text-white font-semibold transition-all duration-300 hover:bg-[#e97a58]">
                  RESET
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
