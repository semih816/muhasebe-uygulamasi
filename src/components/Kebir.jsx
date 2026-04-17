import React from "react";

export default function Kebir({ kebirs, setKebirs }) {
  const addKebir = () => {
    setKebirs([...kebirs, { id: Date.now(), name: "", code: "", bItems: [0], aItems: [0] }]);
  };

  const addLine = (id, side) => {
    setKebirs(kebirs.map(k => k.id === id ? { ...k, [side]: [...k[side], 0] } : k));
  };

  const updateValue = (id, side, idx, val) => {
    setKebirs(kebirs.map(k => {
      if (k.id === id) {
        const newArr = [...k[side]];
        newArr[idx] = Number(val);
        return { ...k, [side]: newArr };
      }
      return k;
    }));
  };

  return (
    <div className="space-y-4">
      <button onClick={addKebir} className="bg-purple-600 text-white px-4 py-2 rounded text-sm font-bold">+ T CETVELİ EKLE</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kebirs.map(k => (
          <div key={k.id} className="bg-white border-2 border-gray-800 shadow-md">
            <div className="flex border-b-2 border-gray-800 bg-gray-50 text-[10px] font-bold">
              <span className="p-1 border-r border-gray-800 w-10">BORÇ</span>
              <input className="flex-1 bg-transparent text-center border-none focus:ring-0 uppercase" placeholder="HESAP ADI" value={k.name} onChange={e => setKebirs(kebirs.map(x => x.id===k.id ? {...x, name: e.target.value}:x))} />
              <span className="p-1 border-l border-gray-800 w-10 text-right">ALACAK</span>
            </div>
            <div className="grid grid-cols-2 divide-x-2 divide-gray-800 min-h-[100px] text-xs">
              <div className="p-1 text-right flex flex-col">
                {k.bItems.map((val, i) => <input key={i} type="number" className="text-right p-0 border-none mb-1" value={val || ""} onChange={e => updateValue(k.id, "bItems", i, e.target.value)} />)}
                <button onClick={() => addLine(k.id, "bItems")} className="text-blue-600 text-[8px] mt-auto"> + SATIR </button>
              </div>
              <div className="p-1 text-left flex flex-col">
                {k.aItems.map((val, i) => <input key={i} type="number" className="text-left p-0 border-none mb-1" value={val || ""} onChange={e => updateValue(k.id, "aItems", i, e.target.value)} />)}
                <button onClick={() => addLine(k.id, "aItems")} className="text-blue-600 text-[8px] mt-auto"> + SATIR </button>
              </div>
            </div>
            <div className="grid grid-cols-2 border-t-2 border-gray-800 font-bold bg-gray-50 text-[10px]">
              <span className="p-1 text-right border-r-2 border-gray-800">{k.bItems.reduce((a,b)=>a+b,0).toLocaleString()}</span>
              <span className="p-1 text-left">{k.aItems.reduce((a,b)=>a+b,0).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}