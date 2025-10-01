import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  // Ambil data user
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateUser(editing, form);
      } else {
        await createUser(form);
      }
      setForm({ username: "", password: "", role: "user" });
      setEditing(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (user) => {
    setForm({ username: user.username, password: "", role: user.role });
    setEditing(user.id);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Apakah Anda yakin ingin menghapus user ini?"
      );
      if (!confirmDelete) return;

      await deleteUser(id);
      fetchUsers();
      alert("User berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus user!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ← Back
        </button>
      </div>

      {/* Form User */}
      <div className="bg-white p-4 shadow rounded mb-6 max-w-md">
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 rounded"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={!editing} // wajib hanya saat tambah user
          />
          <select
            className="w-full border p-2 rounded"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {editing ? "Update User" : "Add User"}
          </button>
        </form>
      </div>

      {/* Tabel User */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-3 py-2">ID</th>
            <th className="border px-3 py-2">Username</th>
            <th className="border px-3 py-2">Role</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td className="border px-3 py-2">{u.id}</td>
                <td className="border px-3 py-2">{u.username}</td>
                <td className="border px-3 py-2">{u.role}</td>
                <td className="border px-3 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-3">
                Belum ada user
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
