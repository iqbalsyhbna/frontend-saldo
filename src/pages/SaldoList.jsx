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
        (item) => new Date(item.tanggal) >= new Date(currentFilter.startDate),
      );
    }
    if (currentFilter.endDate) {
      result = result.filter(
        (item) => new Date(item.tanggal) <= new Date(currentFilter.endDate),
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
            new Date(item.tanggal) <= new Date(end),
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
        `Yakin ingin menghapus data saldo tanggal ${item.tanggal}?`,
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
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          📊 Data Saldo RKUD & SIPD
        </h2>

        <button
          onClick={handleExportPdf}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition"
        >
          📄 Export PDF
        </button>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6">
          {/* DATE FILTER */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-semibold mb-1">
                Dari Tanggal
              </label>
              <input
                type="date"
                name="startDate"
                value={filter.startDate}
                onChange={handleFilterChange}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500 font-semibold mb-1">
                Sampai Tanggal
              </label>
              <input
                type="date"
                name="endDate"
                value={filter.endDate}
                onChange={handleFilterChange}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* FILTER BUTTON */}
          <div className="flex gap-2">
            <button
              onClick={applyFilter}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition"
            >
              Terapkan
            </button>

            <button
              onClick={resetFilter}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Reset
            </button>
          </div>

          {/* TYPE FILTER */}
          <div className="flex bg-gray-100 rounded-lg p-1 ml-auto">
            {[
              { label: "Semua", value: "all" },
              { label: "Penerimaan", value: "penerimaan" },
              { label: "Pengeluaran", value: "pengeluaran" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setTypeFilter(btn.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition
                ${
                  typeFilter === btn.value
                    ? "bg-white shadow text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <SaldoTable
          data={filtered}
          typeFilter={typeFilter}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* MODAL EDIT */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">✏️ Edit Data Saldo</h3>

              <button
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-red-500 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <SaldoForm
                initialData={editing}
                onSubmit={(formData) => handleUpdate(editing.id, formData)}
                onCancel={() => setEditing(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
