import { useEffect, useState } from "react";
import {
  deleteSaldo,
  exportPDF,
  getAllSaldo,
  updateSaldo,
} from "../api/saldoApi";
import SaldoTable from "../components/saldo/SaldoTable";
import SaldoForm from "../components/saldo/SaldoForm";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function SaldoList() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });
  const [typeFilter, setTypeFilter] = useState("all"); // all | penerimaan | pengeluaran
  const [editing, setEditing] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Tambahkan state ini

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk mengambil data tanpa mengatur ulang filter
  const refreshData = async () => {
    try {
      const res = await getAllSaldo();
      setData(res);
      
      // Terapkan filter yang ada tanpa mengubahnya
      applyExistingFilter(res, filter);
    } catch (err) {
      console.error(err);
    }
  };

  // Fungsi untuk menerapkan filter yang ada pada data
  const applyExistingFilter = (dataToFilter, currentFilter) => {
    let result = [...dataToFilter];
    
    if (currentFilter.startDate) {
      result = result.filter(
        (item) => new Date(item.tanggal) >= new Date(currentFilter.startDate)
      );
    }
    if (currentFilter.endDate) {
      result = result.filter(
        (item) => new Date(item.tanggal) <= new Date(currentFilter.endDate)
      );
    }
    
    setFiltered(result);
  };

  const fetchData = async () => {
    try {
      const res = await getAllSaldo();
      setData(res);

      // Hanya atur filter default saat pertama kali loading
      if (isInitialLoad) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const start = formatDate(startOfMonth);
        const end = formatDate(endOfMonth);

        setFilter({ startDate: start, endDate: end });

        const result = res.filter(
          (item) =>
            new Date(item.tanggal) >= new Date(start) &&
            new Date(item.tanggal) <= new Date(end)
        );

        setFiltered(result);
        setIsInitialLoad(false); // Tandai bahwa initial load sudah selesai
      } else {
        // Jika bukan initial load, gunakan filter yang ada
        applyExistingFilter(res, filter);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const applyFilter = () => {
    applyExistingFilter(data, filter);
  };

  const resetFilter = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const start = formatDate(startOfMonth);
    const end = formatDate(endOfMonth);

    setFilter({ startDate: start, endDate: end });
    applyExistingFilter(data, { startDate: start, endDate: end });
  };

  const handleEdit = (item) => setEditing(item);

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateSaldo(id, updatedData);
      alert("✅ Data berhasil diperbarui!");
      setEditing(null);
      refreshData(); // Gunakan refreshData() bukan fetchData()
    } catch (err) {
      console.error(err);
      alert("❌ Gagal update data");
    }
  };

  const handleDelete = async (item) => {
    if (
      !window.confirm(
        `Yakin ingin menghapus data saldo tanggal ${item.tanggal}?`
      )
    )
      return;
    try {
      await deleteSaldo(item.id);
      alert("🗑️ Data berhasil dihapus!");
      refreshData(); // Gunakan refreshData() bukan fetchData()
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
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        📊 Data Saldo RKUD & SIPD
      </h2>

      {/* FILTER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1">
              Dari Tanggal
            </label>
            <input
              type="date"
              name="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1">
              Sampai Tanggal
            </label>
            <input
              type="date"
              name="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={applyFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Terapkan
          </button>
          <button
            onClick={resetFilter}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm font-medium"
          >
            Reset
          </button>
        </div>

        {/* Segmented Buttons */}
        <div className="flex flex-1 md:flex-none justify-between sm:justify-start sm:gap-2 bg-gray-100 rounded-lg mt-2 md:mt-0">
          {[
            { label: "Semua", value: "all" },
            { label: "Penerimaan", value: "penerimaan" },
            { label: "Pengeluaran", value: "pengeluaran" },
          ].map((btn) => (
            <button
              key={btn.value}
              onClick={() => setTypeFilter(btn.value)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition ${
                typeFilter === btn.value
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="w-full md:w-auto flex justify-end">
          <button
            onClick={handleExportPdf}
            className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-500 transition text-sm font-medium"
          >
            📄 Export PDF
          </button>
        </div>
      </div>

      {/* TABLE */}
      <SaldoTable
        data={filtered}
        typeFilter={typeFilter}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* MODAL EDIT */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">✏️ Edit Data Saldo</h3>
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