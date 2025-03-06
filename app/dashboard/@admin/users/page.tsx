import NavBarAdmin from "@/app/component/NavBarAdmin";

import AdminListUsers from "@/app/component/admin/AdminListUsers";

const UserPage = () => {
  return (
    <div className="flex w-full">
      <div>
        <NavBarAdmin />
      </div>
      <div className="w-full">
        <AdminListUsers />
      </div>
    </div>
  );
};

export default UserPage;
