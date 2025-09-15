import { useEffect, useState } from "react";
import { createSaldo } from "../../api/saldoApi";

export default function SaldoForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    tanggal: "",
    penerimaan_rkud: "",
    pengeluaran_rkud: "",
    saldo_rkud: "",
    penerimaan_sipd: "",
    pengeluaran_sipd: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(form); // untuk edit
    } else {
      try {
        await createSaldo(form);
        alert("✅ Data berhasil disimpan!");
        setForm({
          tanggal: "",
          penerimaan_rkud: "",
          pengeluaran_rkud: "",
          saldo_rkud: "",
          penerimaan_sipd: "",
          pengeluaran_sipd: "",
        });
      } catch (err) {
        console.error(err);
        alert("❌ Gagal menyimpan data");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { name: "tanggal", label: "Tanggal", type: "date" },
        { name: "penerimaan_rkud", label: "Penerimaan RKUD", type: "number" },
        { name: "pengeluaran_rkud", label: "Pengeluaran RKUD", type: "number" },
        { name: "saldo_rkud", label: "Saldo RKUD", type: "number" },
        { name: "penerimaan_sipd", label: "Penerimaan SIPD", type: "number" },
        { name: "pengeluaran_sipd", label: "Pengeluaran SIPD", type: "number" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-gray-700 font-medium mb-1">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            required={field.type !== "number"}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      ))}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {initialData ? "Update" : "Simpan"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
