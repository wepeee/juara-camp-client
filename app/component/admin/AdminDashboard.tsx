"use client";

import React, { useEffect, useState } from "react";

import CardData from "./CardData";
import axios from "axios";
import { axiosInstance } from "@/app/lib/configAxios";

const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [kelas, setKelas] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [admin, setAdmin] = useState(0);
  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance
      .get("/api/admin/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.payload.length);
        const teacherCount = res.data.payload.filter(
          (user: any) => user.role === "teacher"
        ).length;
        setTeachers(teacherCount);
        const adminCount = res.data.payload.filter(
          (user: any) => user.role === "admin"
        ).length;
        setAdmin(adminCount);
      });
  };

  const getKelas = async () => {
    const token = localStorage.getItem("token");
    const response = await axiosInstance
      .get("/api/kelas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.payload);
        setKelas(res.data.payload.length);
      });
  };

  useEffect(() => {
    getUsers();
    getKelas();
  });
  return (
    <div className="w-full">
      <div className="p-4 font-semibold">
        <h1>Dashboard Admin</h1>
      </div>
      <div className="w-full">
        <div className="w-[100%] flex justify-evenly text-center">
          <CardData number={users} title="Users" />
          <CardData number={kelas} title="Kelas" />
          <CardData number={teachers} title="Teachers" />
          <CardData number={admin} title="Admin" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
