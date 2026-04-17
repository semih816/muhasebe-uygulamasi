export default function MizanTable({ data }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mizan</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400">
            <th>Hesap</th>
            <th>Borç</th>
            <th>Alacak</th>
            <th>Kalan</th>
          </tr>
        </thead>

        <tbody>
          {data.mizan.map((m, i) => (
            <tr key={i} className="border-b border-gray-800">
              <td>{m.hesap}</td>
              <td>{m.borc}</td>
              <td>{m.alacak}</td>
              <td className="text-pink-400">{m.kalan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}