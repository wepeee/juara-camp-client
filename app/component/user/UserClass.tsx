"use client";

import { axiosInstance } from "@/app/lib/configAxios";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiArrowToLeft } from "react-icons/bi";

interface kelas {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
  createdBy: string;
}
interface Payload {
  kelas: kelas;
}

const UserClass = () => {
  const [kelas, setKelas] = useState<Payload[]>([]);
  const getUserClass = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan, silakan login kembali.");
        return;
      }

      const decoded = JSON.parse(atob(token.split(".")[1]));
      const respond = await axiosInstance.get("/api/user/kelas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(respond.data.payload);
      setKelas(respond.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserClass();
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-gray-100 justify-center w-full p-5">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[95%] mt-5 mx-auto">
          <h1 className="text-2xl font-bold mb-4">Your Class</h1>
          <Link href="/dashboard" className="flex items-center p-2 m-3">
            <BiArrowToLeft className="mr-1"></BiArrowToLeft>
            <p>Dashboard</p>
          </Link>
          <div className="flex justify-evenly flex-wrap">
            {kelas.length > 0 ? (
              kelas.map((item) => (
                <div
                  key={item.kelas._id}
                  className="bg-slate-300 rounded-sm w-[30%] p-4 shadow-md mt-4"
                >
                  <img
                    src={item.kelas.imageLink}
                    alt={item.kelas.title}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-bold mt-2">{item.kelas.title}</h3>
                  <p className="text-sm">{item.kelas.description}</p>
                  <p className="font-semibold text-green-600">
                    Rp {item.kelas.price}
                  </p>
                </div>
              ))
            ) : (
              <p>Belum ada kelas yang terdaftar.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserClass;
