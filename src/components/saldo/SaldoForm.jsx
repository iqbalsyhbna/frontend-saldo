import { useEffect, useState } from "react";
import { createSaldo, getSaldoById } from "../../api/saldoApi";

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

  const getKeterangan = async (id) => {
    const res = await getSaldoById(id);
    return res.keterangan || ""; // pastikan return string
  };

  useEffect(() => {
    if (initialData) {
      const fetchKeterangan = async () => {
        const keterangan = await getKeterangan(initialData.id);
        setForm({
          ...initialData,
          keterangan, // ambil dari DB, kalau kosong → ""
        });
      };

      fetchKeterangan();
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bersihkan dan konversi nilai sebelum dikirim
    const formData = {
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
      onSubmit(formData); // untuk edit
    } else {
      try {
        await createSaldo(formData);
        alert("✅ Data berhasil disimpan!");
        setForm({
          tanggal: "",
          penerimaan_rkud: "",
          pengeluaran_rkud: "",
          saldo_rkud: "",
          penerimaan_sipd: "",
          pengeluaran_sipd: "",
          keterangan: "",
        });
      } catch (err) {
        console.error(err);
        alert("❌ Gagal menyimpan data");
      }
    }
  };

  // Definisi field dengan required yang spesifik
  const fields = [
    { name: "tanggal", label: "Tanggal", type: "date", required: true },
    {
      name: "penerimaan_rkud",
      label: "Penerimaan RKUD",
      type: "number",
      required: false,
    },
    {
      name: "pengeluaran_rkud",
      label: "Pengeluaran RKUD",
      type: "number",
      required: false,
    },
    {
      name: "saldo_rkud",
      label: "Saldo RKUD",
      type: "number",
      required: false,
    },
    {
      name: "penerimaan_sipd",
      label: "Penerimaan SIPD",
      type: "number",
      required: false,
    },
    {
      name: "pengeluaran_sipd",
      label: "Pengeluaran SIPD",
      type: "number",
      required: false,
    },
    { name: "keterangan", label: "Keterangan", type: "text", required: false }, // TIDAK REQUIRED
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-gray-700 font-medium mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            required={field.required} // Gunakan property required dari field
            placeholder={
              field.name === "keterangan" ? "Opsional - bisa dikosongkan" : ""
            }
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      ))}

      {/* Tombol untuk clear keterangan */}
      <div className="flex items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => setForm({ ...form, keterangan: "" })}
          className="text-red-500 hover:text-red-700 underline cursor-pointer"
        >
          Kosongkan Keterangan
        </button>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          {initialData ? "Update" : "Simpan"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition cursor-pointer"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
