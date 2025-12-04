
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const latestNoticeData = [
  {
    id: 1,
    title: "CRPF RECRUITMENT – ASSISTANT SUB-INSPECTOR, SI/OVERSEER & VARIOUS (459 VACANCIES) – LAST DATE 5 MAY",
    isNew: true
  },
  {
    id: 2,
    title: "GUJARAT POSTAL CIRCLE MULTITASKING STAFF RECRUITMENT 2017",
    isNew: true
  },
  {
    id: 3,
    title: "JHARKHAND POLYTECHNIC ENTRANCE EXAM FORM 2017",
    isNew: true
  },
  {
    id: 4,
    title: "BHU SCHOOL ENTRANCE TEST(SET) 2017 ONLINE FORM",
    isNew: true
  }
];


const LatestNotice = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Latest Notice Direct Link</h2>
      </div>
      <div className="max-h-96 overflow-y-auto p-4">
        <ul className="space-y-3">
          {latestNoticeData.map((notice) => (
            <li key={notice.id} className="border-b border-dashed border-gray-300 pb-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">■</span>
                <h3 className="text-blue-700 font-semibold hover:text-blue-900 cursor-pointer flex items-center gap-2">
                  {notice.title}
                  {notice.isNew && (
                    <span className="bg-cyan-500 text-white text-xs px-2 py-1 rounded font-bold">NEW</span>
                  )}
                </h3>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-center gap-2 mt-4 pt-4 border-t">
          <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
            {currentPage}
          </button>
          <button 
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestNotice