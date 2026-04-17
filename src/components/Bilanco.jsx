import React from "react";

export default function Bilanco({ rows, setRows }) {
  const addRow = (side) => {
    setRows([...rows, { id: Date.now(), side, code: "", name: "", amount: 0 }]);
  };

  const updateRow = (id, field, value) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: field === "amount" ? Number(value) : value } : r));
  };

  const aktifTop = rows.filter(r => r.side === "aktif").reduce((s, r) => s + r.amount, 0);
  const borcTop = rows.filter(r => r.side === "pasif").reduce((s, r) => s + r.amount, 0);
  const sermaye = aktifTop - borcTop;

  return (
    <div className="bg-white border-2 border-gray-500 shadow-lg">
      <div className="bg-gray-100 p-2 text-center font-bold border-b-2 border-gray-500">AÇILIŞ BİLANÇOSU</div>
      <div className="grid grid-cols-2 divide-x-2 divide-gray-500">
        <div className="p-4">
          <h3 className="font-bold mb-2">AKTİF</h3>
          {rows.filter(r => r.side === "aktif").map(r => (
            <div key={r.id} className="flex gap-1 mb-1">
              <input className="w-12 border p-1 text-xs" value={r.code} onChange={e => updateRow(r.id, "code", e.target.value)} placeholder="Kod" />
              <input className="flex-1 border p-1 text-xs" value={r.name} onChange={e => updateRow(r.id, "name", e.target.value)} placeholder="Hesap" />
              <input className="w-20 border p-1 text-xs text-right" type="number" value={r.amount || ""} onChange={e => updateRow(r.id, "amount", e.target.value)} />
            </div>
          ))}
          <button onClick={() => addRow("aktif")} className="text-blue-600 text-[10px] font-bold">+ SATIR EKLE</button>
        </div>
        <div className="p-4">
          <h3 className="font-bold mb-2 text-right">PASİF</h3>
          {rows.filter(r => r.side === "pasif").map(r => (
            <div key={r.id} className="flex gap-1 mb-1">
              <input className="w-12 border p-1 text-xs" value={r.code} onChange={e => updateRow(r.id, "code", e.target.value)} placeholder="Kod" />
              <input className="flex-1 border p-1 text-xs" value={r.name} onChange={e => updateRow(r.id, "name", e.target.value)} placeholder="Hesap" />
              <input className="w-20 border p-1 text-xs text-right" type="number" value={r.amount || ""} onChange={e => updateRow(r.id, "amount", e.target.value)} />
            </div>
          ))}
          <button onClick={() => addRow("pasif")} className="text-blue-600 text-[10px] font-bold">+ SATIR EKLE</button>
          <div className="mt-4 border-t pt-2 font-bold text-red-600 flex justify-between text-xs">
            <span>500 SERMAYE</span>
            <span>{sermaye.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t-2 border-gray-500 font-bold p-2 bg-gray-50 text-sm">
        <span>TOPLAM: {aktifTop.toLocaleString()}</span>
        <span className="text-right">TOPLAM: {(borcTop + sermaye).toLocaleString()}</span>
      </div>
    </div>
  );
}