import React from "react";

export default function Mizan({ kebirs = [] }) {
  // Eğer kebir listesi boşsa beyaz ekran yerine uyarı bas
  if (!kebirs || kebirs.length === 0) {
    return (
      <div className="p-10 text-center bg-white border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 italic">Mizan oluşturulabilmesi için önce Defteri Kebir'e hesap eklemelisiniz.</p>
      </div>
    );
  }

  // Hesaplamaları yaparken Number zorlaması ve varsayılan 0 değeri ekle
  const mizanRows = kebirs.map((k) => {
    const toplamBorc = (k.bItems || []).reduce((a, b) => a + (Number(b) || 0), 0);
    const toplamAlacak = (k.aItems || []).reduce((a, b) => a + (Number(b) || 0), 0);
    const bakiyeBorc = toplamBorc > toplamAlacak ? toplamBorc - toplamAlacak : 0;
    const bakiyeAlacak = toplamAlacak > toplamBorc ? toplamAlacak - toplamBorc : 0;

    return {
      code: k.code || "---",
      name: k.name || "İsimsiz Hesap",
      toplamBorc,
      toplamAlacak,
      bakiyeBorc,
      bakiyeAlacak,
    };
  });

  const genelTopBorc = mizanRows.reduce((s, r) => s + r.toplamBorc, 0);
  const genelTopAlacak = mizanRows.reduce((s, r) => s + r.toplamAlacak, 0);
  const genelBakBorc = mizanRows.reduce((s, r) => s + r.bakiyeBorc, 0);
  const genelBakAlacak = mizanRows.reduce((s, r) => s + r.bakiyeAlacak, 0);

  return (
    <div className="bg-white border-2 border-gray-600 shadow-xl overflow-hidden mb-20">
      <div className="bg-gray-800 text-white p-3 text-center font-bold uppercase">
        HG TİCARET İŞLETMESİ ARALIK AYI MİZANI
      </div>
      <table className="w-full text-[11px] border-collapse">
        <thead>
          <tr className="bg-gray-200 border-b-2 border-gray-600">
            <th className="border-r border-gray-400 p-2" rowSpan="2">Sıra No</th>
            <th className="border-r border-gray-400 p-2" rowSpan="2">HESAP İSMİ</th>
            <th className="border-r border-gray-400 p-2" colSpan="2">TUTAR</th>
            <th className="p-2" colSpan="2">KALAN</th>
          </tr>
          <tr className="bg-gray-100 border-b-2 border-gray-600 font-bold">
            <th className="border-r border-gray-400 p-1">BORÇ</th>
            <th className="border-r border-gray-400 p-1">ALACAK</th>
            <th className="border-r border-gray-400 p-1">BORÇ</th>
            <th className="p-1">ALACAK</th>
          </tr>
        </thead>
        <tbody>
          {mizanRows.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-300">
              <td className="border-r border-gray-400 p-1 text-center font-mono">{idx + 1}</td>
              <td className="border-r border-gray-400 p-1 font-medium">{row.code} {row.name}</td>
              <td className="border-r border-gray-400 p-1 text-right">{row.toplamBorc.toLocaleString()}</td>
              <td className="border-r border-gray-400 p-1 text-right">{row.toplamAlacak.toLocaleString()}</td>
              <td className="border-r border-gray-400 p-1 text-right font-bold text-blue-800">{row.bakiyeBorc > 0 ? row.bakiyeBorc.toLocaleString() : "-"}</td>
              <td className="p-1 text-right font-bold text-red-800">{row.bakiyeAlacak > 0 ? row.bakiyeAlacak.toLocaleString() : "-"}</td>
            </tr>
          ))}
          <tr className="bg-gray-800 text-white font-bold text-xs">
            <td className="p-2 text-center" colSpan="2">GENEL TOPLAM</td>
            <td className="p-2 text-right">{genelTopBorc.toLocaleString()}</td>
            <td className="p-2 text-right">{genelTopAlacak.toLocaleString()}</td>
            <td className="p-2 text-right">{genelBakBorc.toLocaleString()}</td>
            <td className="p-2 text-right">{genelBakAlacak.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}