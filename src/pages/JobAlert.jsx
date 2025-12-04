
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const jobAlertData = [
  {
    id: 1,
    title: "SUPER ENGG",
    startDate: "07-11-2025",
    endDate: "27-11-2025",
    posts: 1000,
    isNew: true
  },
  {
    id: 2,
    title: "Assistant Teacher LT",
    startDate: "28-07-2025",
    endDate: "28-08-2025",
    posts: 7466
  },
  {
    id: 3,
    title: "UPSC (CPF) Combined Central Armed Police Force (Assistant Commandant Exam 2017)",
    startDate: "12-04-2017",
    endDate: "05-05-2017",
    posts: 179
  },
  {
    id: 4,
    title: "Railway Recruitment Board Assistant Loco Pilot",
    startDate: "15-05-2025",
    endDate: "10-06-2025",
    posts: 2500
  },
  {
    id: 5,
    title: "SSC CGL (Combined Graduate Level) Examination",
    startDate: "20-06-2025",
    endDate: "15-07-2025",
    posts: 8500
  }
];
const JobAlert = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">Job Alert</h2>
      </div>
      <div className="max-h-96 overflow-y-auto p-4">
        <ul className="space-y-3">
          {jobAlertData.map((job) => (
            <li key={job.id} className="border-b border-dashed border-gray-300 pb-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">■</span>
                <div className="flex-1">
                  <h3 className="text-blue-700 font-semibold hover:text-blue-900 cursor-pointer">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm">
                    <p>
                      <span className="font-semibold">Date: </span>
                      <span className="text-green-600 font-semibold">{job.startDate}</span>
                      <span className="text-red-600 mx-2">⇔</span>
                      <span className="text-red-600 font-semibold">{job.endDate}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Post: </span>
                      <span className="text-blue-600 font-bold">{job.posts}</span>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobAlert