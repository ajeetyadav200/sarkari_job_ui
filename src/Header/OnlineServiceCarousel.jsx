import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OnlineServiceCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "Online Application Service",
      titleHindi: "ऑनलाइन आवेदन सेवा",
      description: "हमारी साइट के माध्यम से आप सभी अपना कोई भी ऑनलाइन स्वीकार कर सकते है।",
      image: "👨‍💻",
      bgGradient: "from-slate-700 via-slate-600 to-teal-600"
    },
    {
      title: "Latest Job Updates",
      titleHindi: "नवीनतम नौकरी अपडेट",
      description: "सरकारी और प्राइवेट नौकरियों की ताजा जानकारी यहाँ प्राप्त करें।",
      image: "💼",
      bgGradient: "from-blue-700 via-blue-600 to-cyan-600"
    },
    {
      title: "Exam Results",
      titleHindi: "परीक्षा परिणाम",
      description: "अपने परीक्षा परिणाम और मेरिट लिस्ट तुरंत देखें और डाउनलोड करें।",
      image: "📊",
      bgGradient: "from-purple-700 via-purple-600 to-pink-600"
    },
    {
      title: "Admit Card Download",
      titleHindi: "एडमिट कार्ड डाउनलोड",
      description: "अपना एडमिट कार्ड आसानी से डाउनलोड करें और परीक्षा की तैयारी करें।",
      image: "🎫",
      bgGradient: "from-green-700 via-green-600 to-emerald-600"
    },
    {
      title: "Syllabus & Pattern",
      titleHindi: "सिलेबस और पैटर्न",
      description: "विभिन्न परीक्षाओं के लिए विस्तृत सिलेबस और परीक्षा पैटर्न देखें।",
      image: "📚",
      bgGradient: "from-orange-700 via-orange-600 to-amber-600"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, currentSlide]);

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto my-8 rounded-2xl overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Container */}
      <div className="relative h-52 md:h-54">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            <div className={`w-full h-full bg-gradient-to-r ${slide.bgGradient} flex items-center justify-between px-8 md:px-16`}>
              {/* Content Section */}
              <div className="flex-1 text-white space-y-4 pr-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
                  {slide.title}
                </h2>
                <h3 className="text-xl md:text-2xl font-semibold opacity-90">
                  {slide.titleHindi}
                </h3>
                <p className="text-base md:text-lg leading-relaxed opacity-90 max-w-xl">
                  {slide.description}
                </p>
              </div>

              {/* Image Section */}
              <div className="hidden md:block">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <span className="text-8xl">{slide.image}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-1 top-1/2 -translate-y-1/2  bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 group z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-1 top-1/2 -translate-y-1/2  bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 group z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-8 h-3 bg-white'
                  : 'w-3 h-3 bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Image */}
      <div className="md:hidden bg-white py-4 flex justify-center">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-6xl">{slides[currentSlide].image}</span>
        </div>
      </div>
    </div>
  );
};

export default OnlineServiceCarousel

