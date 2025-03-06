import React from "react";

import NavBarAdmin from "@/app/component/NavBarAdmin";
import AdminDashboard from "@/app/component/admin/AdminDashboard";

const Dashboard = () => {
  return (
    <div className="flex">
      <div>
        <NavBarAdmin />
      </div>
      <div className="w-full">
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
