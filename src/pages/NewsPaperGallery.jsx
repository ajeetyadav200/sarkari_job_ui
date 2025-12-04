
import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const newsPaperData = [
  {
    id: 1,
    image: "📰",
    title: "हिंदुस्तान एक्सप्रेस रोजगार समाचार",
    date: "30-04-2017"
  },
  {
    id: 2,
    image: "📰",
    title: "दैनिक जागरण रोजगार समाचार",
    date: "28-04-2017"
  },
  {
    id: 3,
    image: "📰",
    title: "अमर उजाला रोजगार समाचार",
    date: "25-04-2017"
  }
];


const NewsPaperGallery = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4">
        <h2 className="text-2xl font-bold text-center">News Paper Cutting Gallery</h2>
      </div>
      <div className="p-4">
        {newsPaperData.map((news) => (
          <div key={news.id} className="mb-4">
            <div className="border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 p-8 flex items-center justify-center text-6xl">
                {news.image}
              </div>
              <div className="bg-gray-100 p-3 text-center border-t-2 border-gray-300">
                <p className="text-sm font-semibold text-gray-700">{news.title}</p>
              </div>
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-3 flex justify-between items-center">
                <button className="font-bold hover:underline">Apply Now</button>
                <span className="font-bold">Last Date: {news.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default NewsPaperGallery