"use client";

import React, { useEffect, useState } from "react";

import NavBar from "../component/NavBar";

const checkRole = () => {
  if (typeof window === "undefined") {
    return "user";
  }

  const token = localStorage.getItem("token");
  if (!token) {
    return "user";
  }
  const decoded = JSON.parse(atob(token.split(".")[1]));

  return decoded.role;
};

interface LayoutProps {
  admin: React.ReactNode;
  teacher: React.ReactNode;
  user: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ admin, teacher, user }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(checkRole());
  }, []);
  return (
    <div>
      <NavBar />
      <div>
        {role === "admin"
          ? admin
          : role === "user"
          ? user
          : role === "teacher"
          ? teacher
          : null}
      </div>
    </div>
  );
};

export default Layout;
