import React from "react";

export default function KapanisBilancosu({ firma, kebirAccounts }) {
  // Sadece bakiye veren hesapları çek (Sıfırlanmış gelir-giderler gelmez)
  const aktifHesaplar = kebirAccounts
    .map(acc => {
      const b = acc.bItems.reduce((s, v) => s + v, 0);
      const a = acc.aItems.reduce((s, v) => s + v, 0);
      return { ...acc, bakiye: b - a };
    })
    .filter(acc => acc.bakiye > 0);

  const pasifHesaplar = kebirAccounts
    .map(acc => {
      const b = acc.bItems.reduce((s, v) => s + v, 0);
      const a = acc.aItems.reduce((s, v) => s + v, 0);
      return { ...acc, bakiye: a - b };
    })
    .filter(acc => acc.bakiye > 0);

  const toplamAktif = aktifHesaplar.reduce((s, a) => s + a.bakiye, 0);
  const toplamPasif = pasifHesaplar.reduce((s, a) => s + a.bakiye, 0);

  return (
    <div className="max-w-5xl mx-auto bg-white border-2 border-slate-900 shadow-xl">
      <div className="bg-slate-800 text-white text-center py-4 font-bold uppercase tracking-widest">
        {firma} - DÖNEM SONU KAPANIŞ BİLANÇOSU
      </div>

      <div className="grid grid-cols-2 min-h-[300px]">
        {/* AKTİF */}
        <div className="border-r-2 border-slate-900 p-4">
          <h3 className="font-black border-b mb-2">AKTİF (VARLIKLAR)</h3>
          {aktifHesaplar.map((acc) => (
            <div key={acc.code} className="flex justify-between text-sm font-mono border-b border-dotted py-1">
              <span>{acc.code} {acc.name}</span>
              <span>{acc.bakiye.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* PASİF */}
        <div className="p-4">
          <h3 className="font-black border-b mb-2">PASİF (KAYNAKLAR)</h3>
          {pasifHesaplar.map((acc) => (
            <div key={acc.code} className="flex justify-between text-sm font-mono border-b border-dotted py-1">
              <span>{acc.code} {acc.name}</span>
              <span>{acc.bakiye.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 border-t-2 border-slate-900 bg-slate-100 font-black p-3 text-lg">
        <div className="flex justify-between px-4 border-r-2 border-slate-900">
          <span>TOPLAM</span>
          <span>{toplamAktif.toLocaleString()}</span>
        </div>
        <div className="flex justify-between px-4">
          <span>TOPLAM</span>
          <span>{toplamPasif.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}