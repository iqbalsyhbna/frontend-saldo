import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Users, ShieldCheck, LayoutDashboard, Settings } from "lucide-react";

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-6">
      {/* HERO HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard size={26} />
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <p className="text-blue-100">
          Panel administrasi untuk mengelola pengguna dan pengaturan sistem.
        </p>
      </div>

      {/* WELCOME CARD */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-gray-700 text-lg">
            Selamat datang,{" "}
            <span className="font-semibold text-gray-900">
              {user?.username}
            </span>{" "}
            👋
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Role kamu:{" "}
            <span className="font-semibold text-blue-600">{user?.role}</span>
          </p>
        </div>

        <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
          <ShieldCheck size={28} />
        </div>
      </div>

      {/* ADMIN MENU */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Menu Administrasi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* MANAGE USER */}
          <div
            onClick={() => navigate("/users-crud")}
            className="cursor-pointer bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition group"
          >
            <div className="bg-blue-100 text-blue-600 w-fit p-3 rounded-lg mb-3 group-hover:bg-blue-600 group-hover:text-white transition">
              <Users size={26} />
            </div>

            <h3 className="font-semibold text-gray-800 text-lg">Manage User</h3>

            <p className="text-sm text-gray-500 mt-1">
              Kelola akun pengguna sistem (Create, Read, Update, Delete).
            </p>
          </div>

          {/* SYSTEM SETTINGS (placeholder) */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm opacity-60">
            <div className="bg-gray-100 text-gray-500 w-fit p-3 rounded-lg mb-3">
              <Settings size={26} />
            </div>

            <h3 className="font-semibold text-gray-700 text-lg">
              System Settings
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Pengaturan sistem (coming soon).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
