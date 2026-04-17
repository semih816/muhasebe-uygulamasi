import React from "react";

export default function Yevmiye({ entries, setEntries }) {
  const addEntry = () => {
    setEntries([...entries, { id: Date.now(), date: "", desc: "", rows: [{ id: Date.now()+1, code: "", name: "", b: 0, a: 0 }] }]);
  };

  const addRow = (entryId) => {
    setEntries(entries.map(e => e.id === entryId ? { ...e, rows: [...e.rows, { id: Date.now(), code: "", name: "", b: 0, a: 0 }] } : e));
  };

  const updateRow = (entryId, rowId, field, val) => {
    setEntries(entries.map(e => e.id === entryId ? { ...e, rows: e.rows.map(r => r.id === rowId ? { ...r, [field]: (field==="b" || field==="a") ? Number(val) : val } : r) } : e));
  };

  return (
    <div className="space-y-6">
      <button onClick={addEntry} className="bg-green-600 text-white px-4 py-2 rounded text-sm font-bold shadow-md">+ YENİ MADDE EKLE</button>
      {entries.map((entry, idx) => (
        <div key={entry.id} className="bg-white border border-gray-400 rounded shadow-sm overflow-hidden">
          <div className="bg-gray-100 p-2 flex gap-4 items-center border-b border-gray-400 text-xs font-bold">
            <span>MADDE {idx + 1}</span>
            <input type="date" className="border p-1" value={entry.date} onChange={e => setEntries(entries.map(ent => ent.id === entry.id ? {...ent, date: e.target.value} : ent))} />
            <input type="text" className="flex-1 border p-1" placeholder="Açıklama..." value={entry.desc} onChange={e => setEntries(entries.map(ent => ent.id === entry.id ? {...ent, desc: e.target.value} : ent))} />
          </div>
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-300">
                <th className="w-16 p-1 border-r">KOD</th>
                <th className="p-1 border-r">AÇIKLAMA</th>
                <th className="w-24 p-1 border-r text-right">BORÇ</th>
                <th className="w-24 p-1 text-right">ALACAK</th>
              </tr>
            </thead>
            <tbody>
              {entry.rows.map(row => (
                <tr key={row.id} className="border-b border-gray-200">
                  <td className="border-r"><input className="w-full p-1" value={row.code} onChange={e => updateRow(entry.id, row.id, "code", e.target.value)} /></td>
                  <td className="border-r"><input className={`w-full p-1 ${row.a > 0 ? "pl-10 italic" : "font-semibold"}`} value={row.name} onChange={e => updateRow(entry.id, row.id, "name", e.target.value)} /></td>
                  <td className="border-r"><input type="number" className="w-full p-1 text-right" value={row.b || ""} onChange={e => updateRow(entry.id, row.id, "b", e.target.value)} /></td>
                  <td><input type="number" className="w-full p-1 text-right" value={row.a || ""} onChange={e => updateRow(entry.id, row.id, "a", e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => addRow(entry.id)} className="p-1 text-blue-600 text-[10px] font-bold">+ HESAP EKLE</button>
        </div>
      ))}
    </div>
  );
} 