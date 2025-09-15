import { formatDate, formatCurrency } from "../../utils/format";

export default function SaldoTable({ data, onEdit }) {
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
              <td className="px-4 py-2">{formatDate(item.tanggal)}</td>
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
              <td className="px-4 py-2 text-red-600">
                {formatCurrency(item.selisih_pengeluaran)}
              </td>
              <td className="px-4 py-2">{item.keterangan || "-"}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
