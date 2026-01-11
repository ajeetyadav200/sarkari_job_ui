
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const syllabusData = [
  {
    id: 1,
    title: "UPSC OLD QUESTION PAPERS"
  },
  {
    id: 2,
    title: "SSC CGL Previous Year Papers"
  },
  {
    id: 3,
    title: "Railway RRB NTPC Syllabus 2017"
  },
  {
    id: 4,
    title: "IBPS PO Exam Pattern & Syllabus"
  },
  {
    id: 5,
    title: "GATE Computer Science Syllabus"
  }
];


const Syllabus = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Government Services</h2>
      </div>
      <div className="max-h-96 overflow-y-auto p-4">
        <ul className="space-y-3">
          {syllabusData.map((syllabus) => (
            <li key={syllabus.id} className="border-b border-dashed border-gray-300 pb-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">■</span>
                <h3 className="text-blue-700 font-semibold hover:text-blue-900 cursor-pointer">
                  {syllabus.title}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Syllabus