"use client";

import axios from "axios";
import { error } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { axiosInstance } from "../lib/configAxios";

const Login = () => {
  const Router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!username || username == "") {
        alert("username tidak boleh kosong");
        return;
      }
      if (!password || password == "") {
        alert("password tidak boleh kosong");
        return;
      }
      const result = axiosInstance
        .post("/api/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          const token = res.data.payload;
          localStorage.setItem("token", token);
          Router.push("/dashboard");
        })
        .catch((error) => {
          alert("username tidak ditemukan");
          return;
        });
    } catch (error) {
      console.error("kesalahan pada server next", error);
    }
  };
  return (
    <div className="h-screen flex items-center">
      <div className="container w-1/3 mx-auto mt-8">
        <h1 className="text-2xl font-bold">Login</h1>
        <form
          className="mt-4"
          action="/login"
          method="post"
          onSubmit={submitHandler}
        >
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full border p-2"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border p-2"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p className="mb-4">
            Don't have an account?{" "}
            <Link className="text-blue-700" href="/register">
              Register
            </Link>
          </p>
          <button className="bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
