import React from "react";

import NavBarAdmin from "@/app/component/NavBarAdmin";

import AdminAddForm from "@/app/component/admin/AdminAddForm";

const page = () => {
  return (
    <div className="flex">
      <div>
        <NavBarAdmin />
      </div>
      <div className="w-full">
        <AdminAddForm />
      </div>
    </div>
  );
};

export default page;
