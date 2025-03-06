import Link from "next/link";

const NavBarAdmin = () => {
  return (
    <div style={{ display: "flex" }} className="h-screen fix">
      <nav style={{ width: "200px", padding: "10px", background: "#f0f0f0" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li className="mb-2 bg-slate-500 p-3 rounded-md">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="mb-2 bg-slate-500 p-3 rounded-md">
            <Link href="/dashboard/users">Users</Link>
          </li>
          <li className="mb-2 bg-slate-500 p-3 rounded-md">
            <Link href="/dashboard/kelas">Kelas</Link>
          </li>
          <li className="mb-2 bg-slate-500 p-3 rounded-md">
            <Link href="/dashboard/add">Add Kelas</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBarAdmin;
