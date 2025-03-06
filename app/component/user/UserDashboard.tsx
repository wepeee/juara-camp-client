"use client";

import { axiosInstance } from "@/app/lib/configAxios";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

Link;

interface Kelas {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
}

const UserDashboard = () => {
  const [user, setUser] = useState("");
  const [kelas, setKelas] = useState<Kelas[]>([]);

  const getUser = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token tidak ditemukan, silakan login kembali.");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser(decoded.username);
    } catch (error) {
      console.error("Token tidak valid:", error);
    }
  };

  const getKelas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan, silakan login kembali.");
        return;
      }
      const respond = await axiosInstance.get("/api/kelas", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(respond.data.payload);
      setKelas(respond.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const buyHandler = async (idKelas: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan, silakan login kembali.");
        return;
      }
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const respond = await axiosInstance.post(
        "/api/user/kelas",
        {
          kelasId: idKelas,
          id: decoded.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("kelas dibeli !");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getKelas();
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 justify-center w-full p-5">
        <div className="flex bg-gray-400 w-fit p-3 rounded-md">
          <FaShoppingCart className="text-2xl text-gray-700 mr-3" />
          <Link href="/dashboard/yourclass">your class</Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg w-[95%] mt-5 mx-auto">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user}!</h1>
          <div>
            {kelas.length > 0 ? (
              kelas.map((item) => (
                <div
                  key={item._id}
                  className="p-4 border rounded-md mb-2 shadow-sm"
                >
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p>{item.description}</p>
                  <p className="text-green-500 font-bold">Rp {item.price}</p>
                  <img
                    src={item.imageLink}
                    alt={item.title}
                    className="w-40 h-24 object-cover"
                  />
                  <button
                    className="bg-green-400 px-4 py-1 rounded-md mt-3"
                    onClick={() => buyHandler(item._id)}
                  >
                    buy
                  </button>
                </div>
              ))
            ) : (
              <p>Loading kelas...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
