import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Base menu
  const menu = [
    { path: "/", label: "Dashboard" },
    { path: "/saldo", label: "Data Saldo" },
  ];

  // Tambahkan menu khusus admin
  if (user?.role === "admin") {
    menu.push({ path: "/saldo/input", label: "Input Saldo" });
    menu.push({ path: "/admin", label: "Admin" });
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  // Komponen tombol login/logout
  const AuthButton = ({ mobile = false }) => {
    if (!user) {
      return (
        <Link
          to="/login"
          onClick={() => setIsMenuOpen(false)}
          className={`${
            mobile ? "block w-full text-center" : "ml-4"
          } bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700`}
        >
          Login
        </Link>
      );
    }

    return (
      <button
        onClick={handleLogout}
        className={`${
          mobile ? "block w-full" : "ml-4"
        } bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700`}
      >
        Logout
      </button>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 h-full">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 cursor-pointer">
          PoSaldo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                location.pathname === item.path
                  ? "font-semibold text-blue-600"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Auth Button Desktop */}
          <AuthButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out border-t ${
          isMenuOpen
            ? "max-h-60 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 py-2 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-200 ${
                location.pathname === item.path
                  ? "font-semibold text-blue-600 bg-blue-50"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Auth Button Mobile */}
          <AuthButton mobile />
        </div>
      </div>
    </nav>
  );
}
