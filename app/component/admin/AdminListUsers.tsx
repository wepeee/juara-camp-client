"use client";

import { axiosInstance } from "@/app/lib/configAxios";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  role: string;
}

const AdminListUsers = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance
      .get("/api/admin/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.payload);
      });
  };

  useEffect(() => {
    getUsers();
  });
  return (
    <div className="w-full">
      <div className="p-4 font-semibold">
        <h1>List Users</h1>
      </div>
      <div className="w-full">
        <div className="w-[100%] flex justify-evenly ">
          <table className="w-[70%]">
            <thead className="bg-gray-200 border-b-2 border-gray-400">
              <tr>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {users.map((user: User) => (
                <tr key={user._id} className="border-b-2">
                  <td className="py-3 px-5">{user.username}</td>
                  <td className="py-3 px-5 text-center">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminListUsers;
