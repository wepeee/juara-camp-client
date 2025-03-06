"use client";

import { axiosInstance } from "@/app/lib/configAxios";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AdminAddForm = () => {
  const Router = useRouter();
  const formHandle = (event: React.FormEvent) => {
    event.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    const price = (document.getElementById("price") as HTMLInputElement).value;
    const image = (document.getElementById("image") as HTMLInputElement).value;
    if (title == "" || description == "" || price == "" || image == "") {
      alert("data tdk boleh kosong");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = JSON.parse(atob(token.split(".")[1]));

    console.log(title);

    axiosInstance
      .post(
        "/api/kelas",
        {
          title,
          description,
          price,
          imageLink: image,
          createdBy: "admin",
          createdById: decoded.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        Router.push("/dashboard/kelas");
      });
  };
  return (
    <div>
      <div className="p-4 font-semibold">
        <h1>Add Kelas</h1>
      </div>
      <div>
        <form onSubmit={formHandle} className="w-[50%] mx-auto">
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="border-2 border-gray-300 p-2 rounded-lg"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              id="image"
              className="border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <button className="bg-blue-500 text-white p-2 rounded-lg my-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddForm;
