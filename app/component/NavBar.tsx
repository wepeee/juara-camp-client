"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NavBar = () => {
  const Router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
      return;
    }
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const username = decoded.username;
    setUser(username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    Router.push("/login");
  };

  return (
    <div className="bg-gray-800 p-4">
      <nav className="container mx-auto flex justify-between items-center text-gray-200">
        <ul className="flex">
          <li className="mr-6">
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>

        <ul className="flex items-center">
          {user ? (
            <>
              <li className="mr-4">Hello, {user}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
