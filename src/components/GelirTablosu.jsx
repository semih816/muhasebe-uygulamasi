import React, { useState } from "react";

export default function GelirTablosu({ firma }) {
  // Rakamları manuel giriyoruz
  const [data, setData] = useState({
    brutSatislar: "",
    satisIndirimleri: "",
    satisMaliyeti: "",
    faaliyetGiderleri: "",
    digerGelirler: "",
    finansmanGiderleri: ""
  });

  // Ara toplamlar
  const netSatislar = Number(data.brutSatislar) - Number(data.satisIndirimleri);
  const brutKar = netSatislar - Number(data.satisMaliyeti);
  const faaliyetKari = brutKar - Number(data.faaliyetGiderleri);
  const netKar = faaliyetKari + Number(data.digerGelirler) - Number(data.finansmanGiderleri);

  return (
    <div className="max-w-4xl mx-auto bg-white border-2 border-slate-800 shadow-2xl p-6">
      <h2 className="text-center font-bold text-xl mb-6 border-b-2 pb-2 uppercase">
        {firma} <br /> GELİR TABLOSU (01.12.2008 - 31.12.2008)
      </h2>

      <div className="space-y-3">
        {/* Giriş Satırları */}
        <div className="flex justify-between items-center border-b py-1">
          <span className="font-bold">A- BRÜT SATIŞLAR</span>
          <input type="number" className="border p-1 text-right w-32" value={data.brutSatislar} onChange={e => setData({...data, brutSatislar: e.target.value})} />
        </div>
        <div className="flex justify-between items-center border-b py-1 italic">
          <span>B- SATIŞ İNDİRİMLERİ (-)</span>
          <input type="number" className="border p-1 text-right w-32 text-red-500" value={data.satisIndirimleri} onChange={e => setData({...data, satisIndirimleri: e.target.value})} />
        </div>
        <div className="flex justify-between bg-slate-100 p-2 font-black">
          <span>NET SATIŞLAR</span>
          <span>{netSatislar.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center border-b py-1 italic text-red-600">
          <span>C- SATIŞLARIN MALİYETİ (-)</span>
          <input type="number" className="border p-1 text-right w-32" value={data.satisMaliyeti} onChange={e => setData({...data, satisMaliyeti: e.target.value})} />
        </div>
        <div className="flex justify-between bg-slate-200 p-2 font-black">
          <span>BRÜT SATIŞ KARI VEYA ZARARI</span>
          <span>{brutKar.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center border-b py-1 italic text-red-600">
          <span>D- FAALİYET GİDERLERİ (-)</span>
          <input type="number" className="border p-1 text-right w-32" value={data.faaliyetGiderleri} onChange={e => setData({...data, faaliyetGiderleri: e.target.value})} />
        </div>
        <div className="flex justify-between bg-slate-100 p-2 font-black">
          <span>FAALİYET KARI VEYA ZARARI</span>
          <span>{faaliyetKari.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center border-b py-1">
          <span>E- DİĞER OLAĞAN GELİR VE KARLAR</span>
          <input type="number" className="border p-1 text-right w-32" value={data.digerGelirler} onChange={e => setData({...data, digerGelirler: e.target.value})} />
        </div>
        <div className="flex justify-between items-center border-b py-1 italic text-red-600">
          <span>F- FİNANSMAN GİDERLERİ (-)</span>
          <input type="number" className="border p-1 text-right w-32" value={data.finansmanGiderleri} onChange={e => setData({...data, finansmanGiderleri: e.target.value})} />
        </div>

        <div className={`flex justify-between p-4 mt-6 text-white font-black text-xl ${netKar >= 0 ? "bg-green-600" : "bg-red-600"}`}>
          <span>DÖNEM NET KARI VEYA ZARARI</span>
          <span>{netKar.toLocaleString()} TL</span>
        </div>
      </div>
    </div>
  );
}