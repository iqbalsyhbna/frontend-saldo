import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const menu = [
    { path: "/", label: "Dashboard" },
    { path: "/saldo", label: "Data Saldo" },
    { path: "/saldo/input", label: "Input Saldo" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-blue-600">PosSaldo</h1>
        <div className="flex gap-6">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-gray-700 hover:text-blue-600 transition ${
                location.pathname === item.path ? "font-semibold text-blue-600" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
