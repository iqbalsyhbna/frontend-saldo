import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  Database
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard size={28} />
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>

        <p className="text-blue-100">
          Selamat datang di{" "}
          <span className="font-semibold text-white">
            Sistem Informasi Posisi Saldo
          </span>.  
          Sistem ini digunakan untuk memantau penerimaan,
          pengeluaran, serta posisi saldo RKUD secara real-time.
        </p>
      </div>

      {/* SUMMARY CARD */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* TOTAL PENERIMAAN */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Penerimaan</p>
            <TrendingUp className="text-green-600" size={20} />
          </div>

          <h3 className="text-2xl font-bold text-gray-800">
            Rp 0
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Total penerimaan RKUD
          </p>
        </div>

        {/* TOTAL PENGELUARAN */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Total Pengeluaran</p>
            <TrendingDown className="text-red-600" size={20} />
          </div>

          <h3 className="text-2xl font-bold text-gray-800">
            Rp 0
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Total pengeluaran RKUD
          </p>
        </div>

        {/* SALDO */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500 text-sm">Saldo Saat Ini</p>
            <Wallet className="text-blue-600" size={20} />
          </div>

          <h3 className="text-2xl font-bold text-gray-800">
            Rp 0
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Saldo terakhir RKUD
          </p>
        </div>

      </div>

      {/* QUICK ACTION */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* DATA SALDO */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">

          <div className="flex items-center gap-3 mb-3">
            <Database className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              Data Saldo
            </h3>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Lihat data penerimaan dan pengeluaran RKUD serta
            analisis posisi saldo harian.
          </p>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
            Lihat Data Saldo
          </button>
        </div>

        {/* INPUT SALDO */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">

          <div className="flex items-center gap-3 mb-3">
            <PlusCircle className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">
              Input Saldo
            </h3>
          </div>

          <p className="text-gray-600 text-sm mb-4">
            Tambahkan data penerimaan atau pengeluaran RKUD
            untuk memperbarui posisi saldo sistem.
          </p>

          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
            Input Data Saldo
          </button>
        </div>

      </div>

      {/* INFO SYSTEM */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Informasi Sistem
        </h3>

        <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
          <li>Sistem digunakan untuk monitoring posisi saldo RKUD.</li>
          <li>Data penerimaan dan pengeluaran dapat diperbarui setiap hari.</li>
          <li>Pastikan data yang diinput sesuai dengan laporan RKUD.</li>
        </ul>
      </div>

    </div>
  );
}