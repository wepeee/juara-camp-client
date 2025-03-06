import NavBarAdmin from "@/app/component/NavBarAdmin";

import AdminListKelas from "@/app/component/admin/AdminListKelas";

const KelasPage = () => {
  return (
    <div className="flex">
      <div>
        <NavBarAdmin />
      </div>
      <div className="w-full">
        <AdminListKelas />
      </div>
    </div>
  );
};

export default KelasPage;
