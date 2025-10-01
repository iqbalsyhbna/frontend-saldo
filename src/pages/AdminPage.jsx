import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react"; // ikon dari lucide-react

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <p className="text-gray-700">
          Selamat datang, <span className="font-semibold">{user?.username}</span> 👋
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Role kamu:{" "}
          <span className="font-medium text-blue-600">{user?.role}</span>
        </p>
      </div>

      {/* Kotak Menu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Manage User */}
        <div
          onClick={() => navigate("/users-crud")}
          className="cursor-pointer bg-blue-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow hover:bg-blue-600 transition"
        >
          <Users size={40} />
          <h2 className="mt-3 font-semibold text-lg">Manage User</h2>
          <p className="text-sm text-blue-100 mt-1">
            Kelola akun pengguna (CRUD)
          </p>
        </div>
      </div>
    </div>
  );
}
