import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import User from "../../service/User";
import { Waveform } from "@uiball/loaders";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const mode = localStorage.getItem("theme");
  const [theme, setTheme] = useState(null);
  const [loader, setLoader] = useState(false);
  const [loaderColor, setLoaderColor] = useState("white");

  useEffect(() => {
    if (mode == "dark") {
      setLoaderColor("white");
      setTheme(true);
    } else {
      setLoaderColor("black");
      setTheme(false);
    }
  }, [theme]);
  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 2,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    if (
      confirmPassword.trim().toLowerCase() == password.trim().toLowerCase() &&
      password.length > 7 &&
      email.length > 7
    ) {
      const user = {
        email: email,
        password: password,
        confirm_password: confirmPassword,
      };
      setLoader(true);
      setTimeout(() => {
        User.loginUser(user)
          .then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("firstName", res.data.user.first_name);
            localStorage.setItem("lastName", res.data.user.last_name);
            localStorage.setItem("userName", res.data.user.username);
            localStorage.setItem("email", res.data.user.email);
            if (res.status === 200) {
              location.href = "/";
            }
            console.log(res);
          })
          .catch((err) => console.log(err.message));
      }, 1000);
      success("User created");
    } else {
      error("Passwords are not identical");
    }
  };
  return (
    <>
      {contextHolder}
      {loader ? (
        <div
          className={`w-full fixed top-0 left-0 h-screen  overflow-hidden  ${
            mode == "dark" ? "bg-[#2A2B2F]" : "bg-white  "
          }   z-50 flex items-center justify-center `}
        >
          <Waveform size={40} lineWeight={3.5} speed={1} color={loaderColor} />
        </div>
      ) : (
        <section className={`w-full ${theme ? "bg-[#2A2B2F]" : "bg-gray-50 "}`}>
          <div
            className={`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0`}
          >
            <div
              className={`w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700 ${
                theme ? "bg-[#222327]" : "bg-white"
              }`}
            >
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                  className={`text-xl text-center font-bold leading-tight tracking-tight  md:text-2xl ${
                    theme ? "text-white" : "text-black"
                  }`}
                >
                  Sign In
                </h1>
                <form
                  onSubmit={loginUser}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
                  <div>
                    <label
                      for="email"
                      className={`block mb-2 text-sm font-medium  dark:text-white ${
                        theme ? "text-[white]" : "text-black"
                      }`}
                    >
                      Your email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className={`block mb-2 text-sm font-medium  dark:text-white ${
                        theme ? "text-[white]" : "text-black"
                      }`}
                    >
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="confirm-password"
                      className={`block mb-2 text-sm font-medium  dark:text-white ${
                        theme ? "text-[white]" : "text-black"
                      }`}
                    >
                      Confirm password
                    </label>
                    <input
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="confirm-password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        for="terms"
                        className={`block text-sm font-medium  dark:text-white ${
                          theme ? "text-[white]" : "text-black"
                        }`}
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign In
                  </button>
                  <div
                    className={`flex items-center gap-1 flex-col${
                      theme ? "text-[white]" : "text-black"
                    }`}
                  >
                    <p
                      className={`text-sm font-light text-gray-500 dark:text-gray-400 ${
                        theme ? "text-[white]" : "text-black"
                      }`}
                    >
                      Not registered yet ?
                    </p>
                    <Link
                      to="/register"
                      href="#"
                      className={`font-medium  hover:underline  ${
                        theme ? "text-[white]" : "text-black"
                      }`}
                    >
                      Create a new account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
