"use client";

import Link from "next/link";

import axios from "axios";
import { useState } from "react";
import { axiosInstance } from "../lib/configAxios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await axiosInstance.post("/api/register", {
        username: username,
        password: password,
        role: role,
      });
      console.log(result);
      window.location.href = "/login";
    } catch (error) {
      console.error("kesalahan pada server next", error);
    }
  };
  return (
    <div className="h-screen flex items-center">
      <div className="container w-1/3 mx-auto mt-8">
        <h1 className="text-2xl font-bold">Register</h1>
        <form
          action="/register"
          method="post"
          className="mt-4"
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
          <div>
            <label>are you teacher?</label>
            <p>yes</p>
            <input
              type="radio"
              name="role"
              value="teacher"
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
            <p>no</p>
            <input
              type="radio"
              name="role"
              value="user"
              defaultChecked
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </div>
          <p className="mb-4">
            Have an account?{" "}
            <Link className="text-blue-700" href="/login">
              Login
            </Link>
          </p>
          <button className="bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
