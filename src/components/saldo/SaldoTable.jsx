import { useAuth } from "../../hooks/useAuth";
import { formatDate, formatCurrency } from "../../utils/format";
import { Pencil, Trash2 } from "lucide-react";

export default function SaldoTable({ data, typeFilter = "all", onEdit, onDelete }) {
  const { user } = useAuth();

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 border rounded-lg bg-gray-50">
        Tidak ada data saldo untuk periode ini.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-h-[600px] border rounded-lg shadow-sm relative">
      <table className="min-w-full text-sm border-collapse">
        <thead className="bg-blue-50 sticky top-0 z-10 shadow-sm">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Tanggal
            </th>

            {/* Penerimaan */}
            {typeFilter !== "pengeluaran" && (
              <>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Penerimaan RKUD
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Penerimaan SIPD
                </th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">
                  Selisih Penerimaan
                </th>
              </>
            )}

            {/* Pengeluaran */}
            {typeFilter !== "penerimaan" && (
              <>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Pengeluaran RKUD
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Pengeluaran SIPD
                </th>
                <th className="px-4 py-3 text-left font-semibold text-red-700">
                  Selisih Pengeluaran
                </th>
              </>
            )}

            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Saldo RKUD
            </th>
            <th className="px-4 py-3 text-left font-semibold text-gray-700">
              Keterangan
            </th>

            {user?.role === "admin" && (
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Aksi
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
            >
              <td className="px-4 py-2 whitespace-nowrap">
                {formatDate(item.tanggal)}
              </td>

              {typeFilter !== "pengeluaran" && (
                <>
                  <td className="px-4 py-2">{formatCurrency(item.penerimaan_rkud)}</td>
                  <td className="px-4 py-2">{formatCurrency(item.penerimaan_sipd)}</td>
                  <td className="px-4 py-2 text-blue-600 font-medium">
                    {formatCurrency(item.selisih_penerimaan)}
                  </td>
                </>
              )}

              {typeFilter !== "penerimaan" && (
                <>
                  <td className="px-4 py-2">{formatCurrency(item.pengeluaran_rkud)}</td>
                  <td className="px-4 py-2">{formatCurrency(item.pengeluaran_sipd)}</td>
                  <td className="px-4 py-2 text-red-600 font-medium">
                    {formatCurrency(item.selisih_pengeluaran)}
                  </td>
                </>
              )}

              <td className="px-4 py-2 font-semibold text-gray-800">
                {formatCurrency(item.saldo_rkud)}
              </td>
              <td className="px-4 py-2">{item.keterangan || "-"}</td>

              {user?.role === "admin" && (
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition"
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
