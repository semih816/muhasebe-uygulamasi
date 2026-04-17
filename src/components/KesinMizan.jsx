import React from "react";

export default function KesinMizan({ firma, kebirAccounts }) {
  // Toplamları hesapla
  const borcToplam = kebirAccounts.reduce((s, a) => s + a.bItems.reduce((sum, v) => sum + v, 0), 0);
  const alacakToplam = kebirAccounts.reduce((s, a) => s + a.aItems.reduce((sum, v) => sum + v, 0), 0);
  
  const borcKalanToplam = kebirAccounts.reduce((s, a) => {
    const diff = a.bItems.reduce((sum, v) => sum + v, 0) - a.aItems.reduce((sum, v) => sum + v, 0);
    return s + (diff > 0 ? diff : 0);
  }, 0);

  const alacakKalanToplam = kebirAccounts.reduce((s, a) => {
    const diff = a.aItems.reduce((sum, v) => sum + v, 0) - a.bItems.reduce((sum, v) => sum + v, 0);
    return s + (diff > 0 ? diff : 0);
  }, 0);

  return (
    <div className="p-4 bg-white shadow-2xl rounded-lg border-2 border-slate-800">
      <h2 className="text-xl font-black text-center mb-6 text-slate-900 border-b-2 pb-2 uppercase italic">
        {firma} KESİN MİZANI
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse border border-slate-400">
          <thead className="bg-slate-100 font-bold uppercase">
            <tr className="border-b-2 border-slate-800">
              <th className="border p-2">KOD</th>
              <th className="border p-2">HESAP İSMİ</th>
              <th className="border p-2 text-right">BORÇ TOPLAM</th>
              <th className="border p-2 text-right">ALACAK TOPLAM</th>
              <th className="border p-2 text-right text-blue-700">BORÇ KALAN</th>
              <th className="border p-2 text-right text-red-700">ALACAK KALAN</th>
            </tr>
          </thead>
          <tbody>
            {kebirAccounts.sort((a,b) => a.code - b.code).map((acc) => {
              const bT = acc.bItems.reduce((s, v) => s + v, 0);
              const aT = acc.aItems.reduce((s, v) => s + v, 0);
              const bK = bT > aT ? bT - aT : 0;
              const aK = aT > bT ? aT - bT : 0;

              return (
                <tr key={acc.code} className="hover:bg-slate-50 border-b font-mono">
                  <td className="p-2 border font-bold">{acc.code}</td>
                  <td className="p-2 border">{acc.name}</td>
                  <td className="p-2 border text-right">{bT.toLocaleString()}</td>
                  <td className="p-2 border text-right">{aT.toLocaleString()}</td>
                  <td className="p-2 border text-right font-bold text-blue-800">{bK > 0 ? bK.toLocaleString() : "-"}</td>
                  <td className="p-2 border text-right font-bold text-red-800">{aK > 0 ? aK.toLocaleString() : "-"}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-900 text-white font-black">
            <tr>
              <td className="p-2 border text-center" colSpan="2">GENEL TOPLAM</td>
              <td className="p-2 border text-right">{borcToplam.toLocaleString()}</td>
              <td className="p-2 border text-right">{alacakToplam.toLocaleString()}</td>
              <td className="p-2 border text-right text-blue-300">{borcKalanToplam.toLocaleString()}</td>
              <td className="p-2 border text-right text-red-300">{alacakKalanToplam.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}