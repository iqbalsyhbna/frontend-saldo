import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      window.location.href = "/";
    } catch {
      setError("Login gagal, periksa username/password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <img src={Logo} alt="Logo" className="w-fit h-32 mx-auto mb-4" />

        {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Login
          </button>
          <Link
            to="/"
            className="block w-full text-center bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors duration-200"
          >
            Go to Dashboard
          </Link>
        </form>
      </div>
    </div>
  );
}
