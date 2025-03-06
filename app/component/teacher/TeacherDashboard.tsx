"use client";

import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { axiosInstance } from "@/app/lib/configAxios";

const TeacherDashboard = () => {
  const [kelas, setKelas] = useState([]);
  const getKelas = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token tidak ditemukan, silakan login kembali.");
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));

    const response = axiosInstance
      .get("/api/kelas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const filtered = res.data.payload.filter((item: any) => {
          return item.createdBy === decoded.username;
        });
        setKelas(filtered);
      });
  };

  const deleteHandler = async (id: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan, silakan login kembali.");
        return;
      }

      await axiosInstance.delete(`/api/kelas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKelas(kelas.filter((k: any) => k._id !== id));
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error(
          "Unauthorized: Token tidak valid atau telah kedaluwarsa."
        );
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    getKelas();
  });

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Teacher</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            <Link href="/dashboard/add">
              <PlusCircle className="w-5 h-5 inline" /> Tambah Kelas
            </Link>
          </button>
        </div>
        {kelas.length == 0 ? (
          "kelas kosong"
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kelas.map((classItem: any) => (
              <div
                key={classItem._id}
                className="p-4 shadow-lg border rounded-lg"
              >
                <img src={classItem.imageLink} alt={classItem.title} />
                <h2 className="text-lg font-semibold">{classItem.title}</h2>
                <p className="text-sm text-gray-500">{classItem.description}</p>
                <p className="text-sm text-gray-500">Rp. {classItem.price}</p>
                <br />
                <i>
                  <b className="text-sm text-gray-500 my-5">
                    by {classItem.createdBy}
                  </b>
                </i>
                <br />
                <button className="bg-blue-500 px-3 py-1 rounded text-white mt-3 mr-3">
                  <Link href={`/dashboard/edit/${classItem._id}`}>Edit</Link>
                </button>
                <button
                  className="bg-red-500 px-3 py-1 rounded text-white mt-3"
                  onClick={() => deleteHandler(classItem._id)}
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
