"use client";

import { axiosInstance } from "@/app/lib/configAxios";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const AdminListKelas = () => {
  const [kelas, setKelas] = useState([]);
  const getKelas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan, silakan login kembali.");
        return;
      }

      const response = await axiosInstance.get("/api/kelas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cek status respons langsung
      if (response.status === 200) {
        setKelas(response.data.payload); // Atur data kelas
      } else if (response.status === 404) {
        setKelas([]);
      }
    } catch (error: any) {
      // Tangani berbagai jenis error
      if (error.response) {
        if (error.response.status === 404) {
          setKelas([]);
        } else {
          console.error(
            `Error ${error.response.status}:`,
            error.response.data.message || "Kesalahan pada server"
          );
        }
      } else if (error.request) {
        console.error("Tidak ada respons dari server:", error.request);
      } else {
        console.error("Kesalahan lainnya:", error.message);
      }
    }
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
  }, []);
  return (
    <div>
      <div className="w-full">
        <div className="p-4 font-semibold">
          <h1>List Kelas</h1>
        </div>
        <div className="w-full">
          <table className="w-full">
            <thead className="text-left">
              <tr className="bg-gray-200 border-b-2 border-gray-400">
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Price</th>
                <th>Created by</th>
                <th colSpan={2} className="text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {kelas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                kelas.map((k: any) => (
                  <tr key={k._id} className="border-b-2 ">
                    <td className="py-2">{k.title}</td>
                    <td>{k.description}</td>
                    <td>
                      <img
                        className="w-[200px]"
                        src={k.imageLink}
                        alt={k.title}
                      />
                    </td>
                    <td>{k.price}</td>
                    <td>{k.createdBy}</td>
                    <td>
                      <Link href={`/dashboard/kelas/${k._id}`}>edit</Link>
                    </td>
                    <td>
                      <button onClick={() => deleteHandler(k._id)}>
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminListKelas;
