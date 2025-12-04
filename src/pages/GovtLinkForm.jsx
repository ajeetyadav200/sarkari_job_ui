
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const govtLinkFormData = [
  {
    id: 1,
    title: "PAN CARD CHANGE FORM (FOR ALREDY ALLOTED ONLY)"
  },
  {
    id: 2,
    title: "PAN CARD FORM (NEW ONLY)"
  },
  {
    id: 3,
    title: "बीज के अनुदान हेतु किसान पंजीकरण"
  },
  {
    id: 4,
    title: "बिहार हेतु अनुदान उत्तर प्रदेश शासन"
  },
  {
    id: 5,
    title: "गुस्सावस्था पेंशन APPLICATION"
  },
  {
    id: 6,
    title: "विकलांग जन पेंशन APPLICATION"
  },
  {
    id: 7,
    title: "हिन्दू विवाह पंजीकरण आवेदन"
  },
  {
    id: 8,
    title: "राष्ट्रीय पारिवारिक लाभ योजना (नैशनल फैमिली बेनीफिट स्कीम)"
  }
];

const GovtLinkForm = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Govt. Link & Form Download</h2>
      </div>
      <div className="max-h-96 overflow-y-auto p-4">
        <h3 className="text-green-700 font-bold mb-3 bg-yellow-100 px-3 py-2 rounded">FORM</h3>
        <ul className="space-y-3">
          {govtLinkFormData.map((form) => (
            <li key={form.id} className="border-b border-dashed border-gray-300 pb-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">■</span>
                <h3 className="text-blue-700 font-semibold hover:text-blue-900 cursor-pointer">
                  {form.title}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default GovtLinkForm