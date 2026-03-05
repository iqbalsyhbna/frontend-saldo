import { useEffect, useState } from "react";
import {
  createSaldo,
  getSaldoById,
  registerLaporanPenerimaan,
  registerLaporanPengeluaran,
} from "../../api/saldoApi";
import { uploadFile } from "../../api/ocrApi";

export default function SaldoForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    tanggal: "",
    penerimaan_rkud: "",
    pengeluaran_rkud: "",
    saldo_rkud: "",
    penerimaan_sipd: "",
    pengeluaran_sipd: "",
    keterangan: "",
  });

  const [loadingOCR, setLoadingOCR] = useState(false);

  const getKeterangan = async (id) => {
    const res = await getSaldoById(id);
    return res.keterangan || "";
  };

  const fetchPengeluaran = async (tanggal) => {
    if (!tanggal) return;

    try {
      const body = {
        jenis_dokumen: "sp2d",
        tanggal_awal: tanggal,
        tanggal_akhir: tanggal,
        jenis_register: "transaksi",
        id_skpd: 0,
        id_penanggung_jawab: 0,
        jenis_kriteria: "semua",
      };

      const pengeluaran = await registerLaporanPengeluaran(body);

      setForm((prev) => ({
        ...prev,
        pengeluaran_sipd: pengeluaran.data.total_bruto || 0,
      }));
    } catch (err) {
      console.error("Gagal fetch pengeluaran", err);
    }
  };

  const fetchPenerimaan = async (tanggal) => {
    if (!tanggal) return;

    try {
      const body = {
        jenis_dokumen: "stbp",
        tanggal_awal: tanggal,
        tanggal_akhir: tanggal,
        jenis_register: "transaksi",
        id_skpd: 0,
        id_akun: 0,
      };

      const penerimaan = await registerLaporanPenerimaan(body);

      setForm((prev) => ({
        ...prev,
        penerimaan_sipd: penerimaan.data.total_nilai || 0,
      }));
    } catch (err) {
      console.error("Gagal fetch penerimaan", err);
    }
  };

  useEffect(() => {
    if (initialData) {
      const fetchData = async () => {
        const keterangan = await getKeterangan(initialData.id);

        setForm({
          ...initialData,
          keterangan,
        });

        // 🔥 langsung fetch berdasarkan tanggal edit
        fetchPengeluaran(initialData.tanggal);
        fetchPenerimaan(initialData.tanggal);
      };

      fetchData();
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData && form.tanggal) {
      // 🔥 mode create
      fetchPengeluaran(form.tanggal);
      fetchPenerimaan(form.tanggal);
    }
  }, [form.tanggal]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    try {
      setLoadingOCR(true);

      const res = await uploadFile(selectedFile);
      setForm((prev) => ({
        ...prev,
        penerimaan_rkud: res.total_penerimaan || "",
        pengeluaran_rkud: res.total_pengeluaran || "",
        saldo_rkud: res.saldo || "",
      }));
    } catch (err) {
      console.error(err);
      alert("❌ Gagal membaca file");
    } finally {
      setLoadingOCR(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataClean = {
      ...form,
      penerimaan_rkud:
        form.penerimaan_rkud === "" ? 0 : parseFloat(form.penerimaan_rkud),
      pengeluaran_rkud:
        form.pengeluaran_rkud === "" ? 0 : parseFloat(form.pengeluaran_rkud),
      saldo_rkud: form.saldo_rkud === "" ? 0 : parseFloat(form.saldo_rkud),
      penerimaan_sipd:
        form.penerimaan_sipd === "" ? 0 : parseFloat(form.penerimaan_sipd),
      pengeluaran_sipd:
        form.pengeluaran_sipd === "" ? 0 : parseFloat(form.pengeluaran_sipd),
      keterangan: form.keterangan.trim() === "" ? null : form.keterangan.trim(),
    };

    if (onSubmit) {
      onSubmit(formDataClean);
    } else {
      try {
        await createSaldo(formDataClean);
        alert("✅ Data berhasil disimpan!");
      } catch (err) {
        console.error(err);
        alert("❌ Gagal menyimpan data");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
      {/* 🔥 Hanya 1 Judul Utama */}
      {initialData ? (
        <></>
      ) : (
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-3">
          Input Data Saldo
        </h2>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ================= TANGGAL ================= */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Tanggal <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* ================= RKUD ================= */}
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-5">
          <p className="font-semibold text-gray-700">Data RKUD</p>

          {/* Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Upload File RKUD (Optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-sm border border-gray-300 rounded-xl px-4 py-2 bg-white cursor-pointer"
            />
            {loadingOCR && (
              <p className="text-xs text-blue-600 mt-2">Membaca file...</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              name="penerimaan_rkud"
              value={form.penerimaan_rkud}
              onChange={handleChange}
              placeholder="Penerimaan RKUD"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              name="pengeluaran_rkud"
              value={form.pengeluaran_rkud}
              onChange={handleChange}
              placeholder="Pengeluaran RKUD"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              name="saldo_rkud"
              value={form.saldo_rkud}
              onChange={handleChange}
              placeholder="Saldo RKUD"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* ================= SIPD ================= */}
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-5">
          <p className="font-semibold text-gray-700">Data SIPD</p>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              name="penerimaan_sipd"
              value={form.penerimaan_sipd}
              onChange={handleChange}
              placeholder="Penerimaan SIPD"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="number"
              name="pengeluaran_sipd"
              value={form.pengeluaran_sipd}
              onChange={handleChange}
              placeholder="Pengeluaran SIPD"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        {/* ================= KETERANGAN ================= */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Keterangan (Optional)
          </label>
          <input
            type="text"
            name="keterangan"
            value={form.keterangan}
            onChange={handleChange}
            placeholder="Tambahkan catatan jika diperlukan"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* ================= BUTTON ================= */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition"
          >
            {initialData ? "Update" : "Simpan"}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-xl transition"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
