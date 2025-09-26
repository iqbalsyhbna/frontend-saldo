import { useEffect, useState } from "react";
import { deleteSaldo, exportPDF, getAllSaldo, updateSaldo } from "../api/saldoApi";
import SaldoTable from "../components/saldo/SaldoTable";
import SaldoForm from "../components/saldo/SaldoForm";

export default function SaldoList() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllSaldo();
      setData(res);
      setFiltered(res); // default tampil semua
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const applyFilter = () => {
    let result = [...data]; // selalu ambil dari data asli

    if (filter.startDate) {
      result = result.filter(
        (item) => new Date(item.tanggal) >= new Date(filter.startDate)
      );
    }
    if (filter.endDate) {
      result = result.filter(
        (item) => new Date(item.tanggal) <= new Date(filter.endDate)
      );
    }

    setFiltered(result);
  };

  const resetFilter = () => {
    setFilter({ startDate: "", endDate: "" });
    setFiltered(data); // kembalikan ke data asli
  };

  const handleEdit = (item) => {
    setEditing(item);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateSaldo(id, updatedData);
      alert("✅ Data berhasil diperbarui!");
      setEditing(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("❌ Gagal update data");
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Yakin ingin menghapus data saldo tanggal ${item.tanggal}?`)) {
      return;
    }
    try {
      await deleteSaldo(item.id);
      alert("🗑️ Data berhasil dihapus!");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("❌ Gagal menghapus data");
    }
  };

  const handleExportPdf = async () => {
    try {
      await exportPDF({ start: filter.startDate, end: filter.endDate });
    } catch (err) {
      console.error("Gagal export PDF:", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Saldo</h2>

      {/* Filter Form */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Dari Tanggal
          </label>
          <input
            type="date"
            name="startDate"
            value={filter.startDate}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Sampai Tanggal
          </label>
          <input
            type="date"
            name="endDate"
            value={filter.endDate}
            onChange={handleFilterChange}
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div className="flex items-end gap-2">
          <button
            onClick={applyFilter}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Terapkan
          </button>
          <button
            onClick={resetFilter}
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>
        <div className="flex items-end justify-end flex-grow">
          <button
            onClick={handleExportPdf}
            type="button"
            className="bg-yellow-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
      <SaldoTable data={filtered} onEdit={handleEdit} onDelete={handleDelete} />

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Data Saldo</h3>
            <SaldoForm
              initialData={editing}
              onSubmit={(formData) => handleUpdate(editing.id, formData)}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
