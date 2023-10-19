"use client";

import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import Storage from "@/helpers/storage";

import Image from "next/image";
import CompanyHeader from "../assets/images/Name_Logo.png";
import { useRouter } from "next/navigation";
import TokenChecker from "@/helpers/tokenChecker";

export default function Login() {
  const initialState = { username: "", password: "" };

  const [loginInfo, setLoginInfo] = useState(initialState);

  const [loading, setLoading] = useState(false);

  const navigate = useRouter();

  const handleLogin = async () => {
    if (loginInfo.password.length < 1 || loginInfo.password.length < 1) {
      window.alert("Username and or Password field cannot be left blank");
      return;
    }
    setLoading(true);
    await axios
      .post("http://localhost:8080/user/login", {
        username: loginInfo.username,
        password: loginInfo.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          // save all data to local storage
          Storage.setItems(res);
          // dump the login info from state
          setLoginInfo(initialState);
          // move to the dashboard
          navigate.push("/home");
        }
      })
      .catch(() => {
        setLoginInfo(initialState);
        setLoading(false);
        window.alert("incorrect username/password");
      });
  };

  const login = (
    <>
      <Image src={CompanyHeader} alt="Company Header" width={500} />
      <div className="w-1/3 rounded-t-3xl">
        <div className="bg-slate-600 text-slate-100 rounded-t-3xl">
          <h1 className="text-4xl p-4 text-center">Login</h1>
        </div>
        <div className=" bg-slate-100 h-full flex flex-col p-10 shadow-md shadow-slate-200">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, username: e.target.value })
            }
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }
          />
          <button onClick={() => handleLogin()}>submit</button>
        </div>
      </div>
    </>
  );

  const loadScreen = <h1 className="text-white"> loading...</h1>;

  const loginPage = (
    <div className="text-slate-800 bg-slate-800 flex justify-center items-center  w-screen h-screen flex-col">
      {loading ? loadScreen : login}
      <TokenChecker location="login" />
    </div>
  );

  return loginPage;
}
