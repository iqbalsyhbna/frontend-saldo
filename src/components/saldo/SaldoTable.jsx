import { formatDate, formatCurrency } from "../../utils/format";
import { Pencil, Trash2 } from "lucide-react";

export default function SaldoTable({ data, onEdit,onDelete  }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">Belum ada data saldo.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {[
              "Tanggal",
              "Penerimaan RKUD",
              "Pengeluaran RKUD",
              "Saldo RKUD",
              "Penerimaan SIPD",
              "Pengeluaran SIPD",
              "Selisih Penerimaan",
              "Selisih Pengeluaran",
              "Keterangan",
              "Aksi",
            ].map((head) => (
              <th
                key={head}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
            >
              <td className="px-4 py-2 whitespace-nowrap">{formatDate(item.tanggal)}</td>
              <td className="px-4 py-2">
                {formatCurrency(item.penerimaan_rkud)}
              </td>
              <td className="px-4 py-2">
                {formatCurrency(item.pengeluaran_rkud)}
              </td>
              <td className="px-4 py-2 font-semibold text-gray-800">
                {formatCurrency(item.saldo_rkud)}
              </td>
              <td className="px-4 py-2">
                {formatCurrency(item.penerimaan_sipd)}
              </td>
              <td className="px-4 py-2">
                {formatCurrency(item.pengeluaran_sipd)}
              </td>
              <td className="px-4 py-2 text-blue-600">
                {formatCurrency(item.selisih_penerimaan)}
              </td>
              <td className="px-4 py-2 text-red-600 whitespace-nowrap">
                {formatCurrency(item.selisih_pengeluaran)}
              </td>
              <td className="px-4 py-2">{item.keterangan || "-"}</td>
              <td className="px-4 py-2 flex gap-2">
                {/* Tombol Edit */}
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>

                {/* Tombol Delete */}
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
