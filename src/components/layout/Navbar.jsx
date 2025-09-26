import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const menu = [
    { path: "/", label: "Dashboard" },
    { path: "/saldo", label: "Data Saldo" },
    { path: "/saldo/input", label: "Input Saldo" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6 h-full">
        <h1 className="text-xl font-bold text-blue-600">PoSaldo</h1>
        <div className="flex gap-6">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-gray-700 hover:text-blue-600 transition ${
                location.pathname === item.path
                  ? "font-semibold text-blue-600"
                  : ""
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
