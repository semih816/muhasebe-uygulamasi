import React, { useState, useEffect } from "react";
// Bileşenleri import ediyoruz
import Bilanco from "./components/Bilanco";
import Yevmiye from "./components/Yevmiye";
import Kebir from "./components/Kebir";
import Mizan from "./components/Mizan";
import DonemSonu from "./components/DonemSonu";
import GelirTablosu from "./components/GelirTablosu";
import KapanisKayitlari from "./components/KapanisKayitlari";
import KesinMizan from "./components/KesinMizan";
import KapanisBilancosu from "./components/KapanisBilancosu";
import DonemSonuKapanisKayitlari from "./components/DonemSonuKapanisKayitlari";

export default function App() {
  const [step, setStep] = useState(0);
  const [firmaIsmi, setFirmaIsmi] = useState("HG TİCARET");

  // --- MERKEZİ STATE YÖNETİMİ ---
  const [bilancoRows, setBilancoRows] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [kebirAccounts, setKebirAccounts] = useState([]);

  // Yevmiye değiştikçe Kebir'i otomatik güncelle (Senin manuel girişlerine dayalı)
  useEffect(() => {
    const newKebirs = {};
    journalEntries.forEach(entry => {
      entry.rows.forEach(row => {
        if (!newKebirs[row.code]) {
          newKebirs[row.code] = { code: row.code, name: row.name, bItems: [], aItems: [] };
        }
        if (Number(row.b) > 0) newKebirs[row.code].bItems.push(Number(row.b));
        if (Number(row.a) > 0) newKebirs[row.code].aItems.push(Number(row.a));
      });
    });
    setKebirAccounts(Object.values(newKebirs));
  }, [journalEntries]);

  const stepsList = [
    "Açılış Bilançosu", "Yevmiye Defteri", "Defteri Kebir", "Geçici Mizan", 
    "Dönem Sonu", "Gelir Tablosu", "Kapanış Kayıtları", "Kesin Mizan", 
    "Kapanış Bilançosu", "Final Kayıtları"
  ];

  const renderStep = () => {
    const commonProps = { firma: firmaIsmi, kebirAccounts, setJournalEntries, journalEntries };

    switch (step) {
      case 0: return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-slate-200 w-full max-w-md">
            <h2 className="text-2xl font-black mb-6 uppercase italic">Yeni Monografi</h2>
            <input 
              type="text" 
              value={firmaIsmi} 
              onChange={(e) => setFirmaIsmi(e.target.value.toUpperCase())}
              className="w-full p-4 border-2 rounded-xl mb-4 text-center font-bold outline-none focus:border-blue-500"
              placeholder="FİRMA İSMİ GİRİNİZ"
            />
            <button 
              onClick={() => setStep(1)} 
              className="w-full bg-slate-900 text-white p-4 rounded-xl font-black hover:bg-slate-800 transition-all uppercase tracking-widest"
            >
              Sistemi Başlat
            </button>
          </div>
        </div>
      );
      case 1: return <Bilanco rows={bilancoRows} setRows={setBilancoRows} {...commonProps} />;
      case 2: return <Yevmiye entries={journalEntries} setEntries={setJournalEntries} {...commonProps} />;
      case 3: return <Kebir kebirs={kebirAccounts} {...commonProps} />;
      case 4: return <Mizan kebirs={kebirAccounts} {...commonProps} />;
      case 5: return <DonemSonu {...commonProps} />;
      case 6: return <GelirTablosu {...commonProps} />;
      case 7: return <KapanisKayitlari {...commonProps} />;
      case 8: return <KesinMizan {...commonProps} />;
      case 9: return <KapanisBilancosu {...commonProps} />;
      case 10: return <DonemSonuKapanisKayitlari {...commonProps} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* ÜST PANEL */}
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-50 shadow-sm flex justify-between items-center px-8">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="font-black text-lg tracking-tighter uppercase">{firmaIsmi}</span>
        </div>
        {step > 0 && (
          <button 
            onClick={() => { if(window.confirm("Sıfırlansın mı?")) setStep(0); }}
            className="text-[10px] bg-red-600 text-white px-3 py-1.5 rounded-md font-bold hover:bg-red-700 uppercase"
          >
            Monografiyi Kapat
          </button>
        )}
      </header>

      {/* SCROLLSUZ MENÜ: flex-wrap ile alta geçer, scroll çıkmaz */}
      {step > 0 && (
        <nav className="max-w-6xl mx-auto p-4 flex flex-wrap justify-center gap-2">
          {stepsList.map((label, i) => (
            <button
              key={i}
              onClick={() => setStep(i + 1)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all shadow-sm border ${
                step === i + 1 
                  ? "bg-blue-600 text-white border-blue-600 scale-105" 
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"
              }`}
            >
              {i + 1}. {label}
            </button>
          ))}
        </nav>
      )}

      {/* İÇERİK ALANI */}
      <main className="max-w-6xl mx-auto p-4">
        {renderStep()}
      </main>

      <footer className="fixed bottom-0 w-full bg-white/90 backdrop-blur-sm border-t p-2 text-center text-[10px] text-slate-500 font-medium uppercase tracking-wider flex justify-center items-center gap-2">
  <span>Muhasebe Uygulama Platformu &copy; 2026</span>
  <span className="text-slate-300">|</span>
  <span>
    Developed & Designed by{" "}
    <a 
      href="https://www.linkedin.com/in/semih-karada%C4%9F-777191235/" // Buraya kendi linkini yapıştır
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-600 font-black hover:underline transition-all"
    >
      SEMİH
    </a>
  </span>
</footer>
    </div>
  );
}