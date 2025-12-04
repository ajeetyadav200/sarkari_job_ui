
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const resultData = [
  {
    id: 1,
    title: "DELHI METRO DMRC RESULT 2017 ( FOR DMRC/OM/HR/201624-9-17 )"
  },
  {
    id: 2,
    title: "KARNATAKA BANK CLERK RESULT 2017"
  },
  {
    id: 3,
    title: "IBPS CWE SO MAINS EXAM AND INTERVIEW RESULT 2017"
  },
  {
    id: 4,
    title: "IBPS CWE PO MAINS EXAM AND INTERVIEW RESULT 2017"
  },
  {
    id: 5,
    title: "IBPS CWE CLERK MAINS EXAM RESULT 2017"
  },
  {
    id: 6,
    title: "RRB NTPC Final Result 2017"
  },
  {
    id: 7,
    title: "SSC CHSL (10+2) Tier-I Result 2017"
  }
];

// Result.js Component
const Result = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Result</h2>
      </div>
      <div className="max-h-96 overflow-y-auto p-4">
        <ul className="space-y-3">
          {resultData.map((result) => (
            <li key={result.id} className="border-b border-dashed border-gray-300 pb-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">■</span>
                <h3 className="text-blue-700 font-semibold hover:text-blue-900 cursor-pointer">
                  {result.title}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Result