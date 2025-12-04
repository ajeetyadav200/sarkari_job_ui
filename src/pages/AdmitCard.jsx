
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';


// admitCardData.js
const admitCardData = [
  {
    id: 1,
    title: "BHU UET ADMIT CARD 2017",
    isNew: false
  },
  {
    id: 2,
    title: "UPSC ENGINEERING SERVICES MAINS 2017 ADMIT CARD",
    isNew: true
  },
  {
    id: 3,
    title: "UPSC GEOLOGIST / GEO SCIENTIST ADMIT CARD",
    isNew: false
  },
  {
    id: 4,
    title: "MP PRE-AGRICULTURE TEST (PAT) - 2017",
    isNew: false
  },
  {
    id: 5,
    title: "SBI PO Admit Card 2017",
    isNew: true
  },
  {
    id: 6,
    title: "Allahabad University PG Admit Card 2017",
    isNew: false
  }
];


const AdmitCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Admit Card</h2>
      </div>
      <div className="max-h-96 overflow-y-auto p-4">
        <ul className="space-y-3">
          {admitCardData.map((card) => (
            <li key={card.id} className="border-b border-dashed border-gray-300 pb-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">■</span>
                <h3 className="text-blue-700 font-semibold hover:text-blue-900 cursor-pointer flex items-center gap-2">
                  {card.title}
                  {card.isNew && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>
                  )}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default AdmitCard