"use client";

import { axiosInstance } from "@/app/lib/configAxios";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Kelas {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageLink: string;
}

const Page = () => {
  const params = useParams();
  const Router = useRouter();

  const [kelas, setKelas] = useState<Kelas>({
    _id: "",
    title: "",
    description: "",
    price: 0,
    imageLink: "",
  });

  const getKelas = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan, silakan login kembali.");
        return;
      }

      const response = await axiosInstance.get("/api/kelas", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const dataKelas = response.data.payload.find(
        (data: Kelas) => data._id === params.id
      );
      if (dataKelas) {
        setKelas(dataKelas);
      } else {
        console.warn("Data kelas tidak ditemukan.");
      }
    } catch (error) {
      console.error("Kesalahan pada server:", error);
    }
  };

  const editHandle = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token tidak ditemukan, silakan login kembali.");
      return;
    }

    if (
      kelas.title == "" ||
      kelas.description == "" ||
      kelas.imageLink == "" ||
      kelas.price == null
    ) {
      alert("data tidak boleh kosong");
      return;
    }

    axiosInstance
      .put(`/api/kelas/${kelas._id}`, kelas, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        Router.push("/dashboard/kelas");
      });
  };

  useEffect(() => {
    console.log("Fetching data for ID:", params.id);
    getKelas();
  }, [params.id]);

  return (
    <div className="w-full">
      <div className="p-4 font-semibold">
        <h1>Edit kelas : {kelas.title}</h1>
      </div>
      <div className="w-[50%] mx-auto">
        <form onSubmit={editHandle} className="w-full">
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            id="title"
            className="border-2 border-gray-300 p-2 rounded-lg w-full"
            value={kelas.title}
            onChange={(e) => setKelas({ ...kelas, title: e.target.value })}
          />
          <br />
          <label htmlFor="description">Description</label>
          <br />

          <input
            type="text"
            name="description"
            id="description"
            className="border-2 border-gray-300 p-2 rounded-lg w-full"
            value={kelas.description}
            onChange={(e) =>
              setKelas({ ...kelas, description: e.target.value })
            }
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            type="number"
            name="price"
            id="price"
            className="border-2 border-gray-300 p-2 rounded-lg w-full"
            value={kelas.price}
            onChange={(e) =>
              setKelas({ ...kelas, price: Number(e.target.value) })
            }
          />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input
            type="text"
            name="image"
            id="image"
            className="border-2 border-gray-300 p-2 rounded-lg w-full"
            value={kelas.imageLink}
            onChange={(e) => setKelas({ ...kelas, imageLink: e.target.value })}
          />
          <br />
          <br />
          <button type="submit" className="px-3 py-2 bg-slate-500 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
