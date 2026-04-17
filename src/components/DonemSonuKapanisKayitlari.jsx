import React from "react";

export default function DonemSonuKapanisKayitlari({ kebirAccounts }) {
  // Borç ve Alacak taraflarını bakiye durumuna göre hazırla
  const borcaGelecekler = kebirAccounts
    .map(acc => ({ ...acc, bakiye: (acc.aItems.reduce((s,v)=>s+v,0) - acc.bItems.reduce((s,v)=>s+v,0)) }))
    .filter(acc => acc.bakiye > 0);

  const alacagaGelecekler = kebirAccounts
    .map(acc => ({ ...acc, bakiye: (acc.bItems.reduce((s,v)=>s+v,0) - acc.aItems.reduce((s,v)=>s+v,0)) }))
    .filter(acc => acc.bakiye > 0);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-10">
      <section className="bg-white border-2 border-black shadow-lg">
        <div className="bg-black text-white p-2 font-bold text-center uppercase">
          Hesap Kapanış Kaydı (31.12)
        </div>
        <div className="p-4 font-mono text-sm">
          {borcaGelecekler.map(acc => (
            <div key={acc.code} className="flex justify-between mb-1">
              <span>{acc.code} {acc.name}</span>
              <span>{acc.bakiye.toLocaleString()}</span>
            </div>
          ))}
          {alacagaGelecekler.map(acc => (
            <div key={acc.code} className="flex justify-between pl-12 text-slate-500 italic">
              <span>{acc.code} {acc.name}</span>
              <span className="pr-10">{acc.bakiye.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="border-t p-2 text-center text-xs italic bg-slate-50">
          "Bilanço hesaplarının kapatılması"
        </div>
      </section>

      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl text-center">
        <h4 className="font-bold text-blue-800 uppercase text-xs mb-2">Yeni Dönem Notu</h4>
        <p className="text-sm text-blue-600 italic">
          Gelecek dönemin açılış kaydı, yukarıdaki maddelerin tam tersi (Borç/Alacak yer değiştirerek) yapılacaktır.
        </p>
      </div>
    </div>
  );
}