import { useAuth } from "../../hooks/useAuth";
import { formatDate, formatCurrency } from "../../utils/format";
import { Pencil, Trash2 } from "lucide-react";

export default function SaldoTable({
  data,
  typeFilter = "all",
  onEdit,
  onDelete,
}) {
  const { user } = useAuth();

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 border rounded-xl bg-gray-50 shadow-sm">
        Tidak ada data saldo untuk periode ini.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-h-[600px] border border-gray-200 rounded-xl shadow-sm bg-white">
      <table className="min-w-full text-sm border-collapse">
        {/* HEADER */}
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr className="text-gray-700">
            <th className="px-4 py-3 text-left font-semibold">Tanggal</th>

            {/* Penerimaan */}
            {typeFilter !== "pengeluaran" && (
              <>
                <th className="px-4 py-3 text-right font-semibold">
                  Penerimaan RKUD
                </th>
                <th className="px-4 py-3 text-right font-semibold">
                  Penerimaan SIPD
                </th>
                <th className="px-4 py-3 text-right font-semibold text-blue-600">
                  Selisih
                </th>
              </>
            )}

            {/* Pengeluaran */}
            {typeFilter !== "penerimaan" && (
              <>
                <th className="px-4 py-3 text-right font-semibold">
                  Pengeluaran RKUD
                </th>
                <th className="px-4 py-3 text-right font-semibold">
                  Pengeluaran SIPD
                </th>
                <th className="px-4 py-3 text-right font-semibold text-red-600">
                  Selisih
                </th>
              </>
            )}

            <th className="px-4 py-3 text-right font-semibold">Saldo RKUD</th>

            <th className="px-4 py-3 text-left font-semibold">Keterangan</th>

            {user?.role === "admin" && (
              <th className="px-4 py-3 text-center font-semibold w-[110px]">
                Aksi
              </th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y">
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-blue-50 transition-colors duration-150"
            >
              <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                {formatDate(item.tanggal)}
              </td>

              {typeFilter !== "pengeluaran" && (
                <>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(item.penerimaan_rkud)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(item.penerimaan_sipd)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-600 font-mono">
                    {formatCurrency(item.selisih_penerimaan)}
                  </td>
                </>
              )}

              {typeFilter !== "penerimaan" && (
                <>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(item.pengeluaran_rkud)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">
                    {formatCurrency(item.pengeluaran_sipd)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-red-600 font-mono">
                    {formatCurrency(item.selisih_pengeluaran)}
                  </td>
                </>
              )}

              <td className="px-4 py-3 text-right font-semibold text-gray-900 font-mono">
                {formatCurrency(item.saldo_rkud)}
              </td>

              <td className="px-4 py-3 text-gray-600 max-w-[220px] truncate">
                {item.keterangan || "-"}
              </td>

              {user?.role === "admin" && (
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
