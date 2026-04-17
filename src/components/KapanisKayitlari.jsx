import React from "react";

export default function KapanisKayitlari({ kebirAccounts }) {
  // Gelir ve Gider hesaplarını otomatik süz
  const gelirHesaplari = kebirAccounts.filter(acc => acc.code.startsWith("6") && (acc.aItems.reduce((s, v) => s + v, 0) - acc.bItems.reduce((s, v) => s + v, 0)) > 0);
  const giderHesaplari = kebirAccounts.filter(acc => acc.code.startsWith("6") && (acc.bItems.reduce((s, v) => s + v, 0) - acc.aItems.reduce((s, v) => s + v, 0)) > 0);

  const getNetBakiye = (acc) => {
    const b = acc.bItems.reduce((s, v) => s + v, 0);
    const a = acc.aItems.reduce((s, v) => s + v, 0);
    return Math.abs(b - a);
  };

  const toplamGelir = gelirHesaplari.reduce((s, acc) => s + getNetBakiye(acc), 0);
  const toplamGider = giderHesaplari.reduce((s, acc) => s + getNetBakiye(acc), 0);
  const netKar = toplamGelir - toplamGider;

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-20">
      <h2 className="text-2xl font-black text-center border-b-4 border-slate-800 pb-2 uppercase italic">Dönem Sonu Kapanış Maddeleri</h2>

      {/* MADDE: GELİRLERİN KAPATILMASI */}
      <div className="bg-white border-2 border-slate-900 shadow-xl">
        <div className="bg-slate-800 text-white p-2 text-xs font-bold flex justify-between uppercase">
          <span>Yevmiye Maddesi: Gelir Hesapları</span>
          <span>31.12</span>
        </div>
        <div className="p-4 space-y-2">
          {gelirHesaplari.map(acc => (
            <div key={acc.code} className="flex justify-between border-b text-sm font-mono">
              <span>{acc.code} {acc.name}</span>
              <span className="font-bold">{getNetBakiye(acc).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-mono pl-12 italic text-blue-700">
            <span>690 DÖNEM KARI VEYA ZARARI</span>
            <span className="font-bold">{toplamGelir.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* MADDE: GİDERLERİN KAPATILMASI */}
      <div className="bg-white border-2 border-slate-900 shadow-xl">
        <div className="bg-slate-800 text-white p-2 text-xs font-bold flex justify-between uppercase">
          <span>Yevmiye Maddesi: Gider Hesapları</span>
          <span>31.12</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex justify-between text-sm font-mono text-red-700">
            <span>690 DÖNEM KARI VEYA ZARARI</span>
            <span className="font-bold">{toplamGider.toLocaleString()}</span>
          </div>
          {giderHesaplari.map(acc => (
            <div key={acc.code} className="flex justify-between border-b text-sm font-mono pl-12 italic">
              <span>{acc.code} {acc.name}</span>
              <span className="font-bold">{getNetBakiye(acc).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SONUÇ ÖZETİ */}
      <div className={`p-6 rounded-2xl text-center shadow-inner ${netKar >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Hesaplanan Dönem Net Karı</p>
        <p className={`text-4xl font-black ${netKar >= 0 ? 'text-green-700' : 'text-red-700'}`}>
          {netKar.toLocaleString()} TL
        </p>
      </div>
    </div>
  );
}