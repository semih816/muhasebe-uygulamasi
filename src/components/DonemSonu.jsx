import React, { useState } from "react";

export default function DonemSonu() {
  // Verileri 0 veya boş string ile başlatıyoruz ki "temiz" olsun
  const [kdv, setKdv] = useState({ hesaplanan: "", indirilecek: "" });
  const [amortisman, setAmortisman] = useState({ demirbas: "", oran: "", ay: "" });
  const [smm, setSmm] = useState({ kalan: "", envanter: "" });

  // Hesaplamalar (Sadece veri varsa çalışır)
  const devreden = (Number(kdv.indirilecek) > Number(kdv.hesaplanan)) ? (kdv.indirilecek - kdv.hesaplanan) : 0;
  const odenecek = (Number(kdv.hesaplanan) > Number(kdv.indirilecek)) ? (kdv.hesaplanan - kdv.indirilecek) : 0;
  const amortismanTutari = (Number(amortisman.demirbas) * (Number(amortisman.oran) / 100)) / 12 * Number(amortisman.ay);
  const smmTutari = Number(smm.kalan) - Number(smm.envanter);

  return (
    <div className="space-y-10 pb-20 max-w-4xl mx-auto">
      <h2 className="text-2xl font-black text-center border-b-4 border-slate-800 pb-2 uppercase tracking-tighter">
        Dönem Sonu Envanter Kayıtları
      </h2>

      {/* 1. KDV TAHAKKUKU */}
      <section className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="font-bold text-lg mb-4 text-blue-700 border-b pb-2">KDV Tahakkuku</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input type="number" placeholder="391 Hesaplanan KDV" className="border-2 p-3 rounded-lg focus:border-blue-500 outline-none" value={kdv.hesaplanan} onChange={e => setKdv({...kdv, hesaplanan: e.target.value})} />
          <input type="number" placeholder="191 İndirilecek KDV" className="border-2 p-3 rounded-lg focus:border-blue-500 outline-none" value={kdv.indirilecek} onChange={e => setKdv({...kdv, indirilecek: e.target.value})} />
        </div>
        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs">
          <p className="mb-1">/---------------- 31.12 ----------------/</p>
          <p className="flex justify-between"><span>391 HESAPLANAN KDV</span> <span>{Number(kdv.hesaplanan).toLocaleString()}</span></p>
          {devreden > 0 && <p className="flex justify-between"><span>190 DEVREDEN KDV</span> <span>{devreden.toLocaleString()}</span></p>}
          <p className="flex justify-between pl-8 text-white"><span>191 İNDİRİLECEK KDV</span> <span>{Number(kdv.indirilecek).toLocaleString()}</span></p>
          {odenecek > 0 && <p className="flex justify-between pl-8 text-white"><span>360 ÖDENECEK VERGİ/FON</span> <span>{odenecek.toLocaleString()}</span></p>}
        </div>
      </section>

      {/* 2. AMORTİSMAN */}
      <section className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="font-bold text-lg mb-4 text-purple-700 border-b pb-2">Amortisman Ayırma</h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <input type="number" placeholder="Varlık Değeri" className="border-2 p-3 rounded-lg" value={amortisman.demirbas} onChange={e => setAmortisman({...amortisman, demirbas: e.target.value})} />
          <input type="number" placeholder="Oran %" className="border-2 p-3 rounded-lg" value={amortisman.oran} onChange={e => setAmortisman({...amortisman, oran: e.target.value})} />
          <input type="number" placeholder="Ay Sayısı" className="border-2 p-3 rounded-lg" value={amortisman.ay} onChange={e => setAmortisman({...amortisman, ay: e.target.value})} />
        </div>
        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs">
          <p className="flex justify-between"><span>770 GENEL YÖNETİM GİDERLERİ</span> <span>{amortismanTutari > 0 ? amortismanTutari.toLocaleString() : "0"}</span></p>
          <p className="flex justify-between pl-8 text-white"><span>257 BİRİKMİŞ AMORTİSMANLAR (-)</span> <span>{amortismanTutari > 0 ? amortismanTutari.toLocaleString() : "0"}</span></p>
        </div>
      </section>

      {/* 3. SMM */}
      <section className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="font-bold text-lg mb-4 text-green-700 border-b pb-2">Maliyet Kaydı (SMM)</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input type="number" placeholder="153 Borç Toplamı" className="border-2 p-3 rounded-lg" value={smm.kalan} onChange={e => setSmm({...smm, kalan: e.target.value})} />
          <input type="number" placeholder="Fiili Stok (Envanter)" className="border-2 p-3 rounded-lg" value={smm.envanter} onChange={e => setSmm({...smm, envanter: e.target.value})} />
        </div>
        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs">
          <p className="flex justify-between"><span>621 SATILAN MALIN MALİYETİ</span> <span>{smmTutari !== 0 ? smmTutari.toLocaleString() : "0"}</span></p>
          <p className="flex justify-between pl-8 text-white"><span>153 TİCARİ MALLAR</span> <span>{smmTutari !== 0 ? smmTutari.toLocaleString() : "0"}</span></p>
        </div>
      </section>
    </div>
  );
}