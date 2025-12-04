import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

// HelpSession.js Component
const HelpSession = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, 
        { type: 'user', text: inputMessage },
        { type: 'bot', text: 'धन्यवाद! हम आपकी मदद के लिए यहाँ हैं। कृपया अपना प्रश्न पूछें।' }
      ]);
      setInputMessage('');
    }
  };

  const handleSuggestionSubmit = () => {
    if (suggestion.trim()) {
      alert('आपका सुझाव सफलतापूर्वक सबमिट हो गया है! धन्यवाद!');
      setSuggestion('');
      setShowSuggestion(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-50 animate-bounce"
        style={{
          background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHp5hPtODab6NFmyLArtY5S3Rp1zrSAJe5bQ&s)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        aria-label="Help"
      >
        <span className="sr-only">Help</span>
      </button>

      {/* Help Options Modal */}
      {isOpen && !showChatbot && !showSuggestion && (
        <div className="fixed bottom-28 right-8 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border-2 border-green-500">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Help Center</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm mt-1 opacity-90">हम आपकी मदद के लिए यहाँ हैं</p>
          </div>
          
          <div className="p-6 space-y-4">
            {/* AI Chatbot Option */}
            <button
              onClick={() => {
                setShowChatbot(true);
                setShowSuggestion(false);
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg">AI Chatbot</h4>
                  <p className="text-sm opacity-90">तुरंत जवाब पाएं</p>
                </div>
              </div>
            </button>

            {/* Suggestion Option */}
            <button
              onClick={() => {
                setShowSuggestion(true);
                setShowChatbot(false);
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl">
                  💡
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg">Suggestion</h4>
                  <p className="text-sm opacity-90">वेबसाइट सुधार के लिए सुझाव दें</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* AI Chatbot Modal */}
      {showChatbot && (
        <div className="fixed bottom-28 right-8 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border-2 border-blue-500">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="text-xl font-bold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Online - यहाँ मदद के लिए</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowChatbot(false);
                  setMessages([{ type: 'bot', text: 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?' }]);
                }}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-md rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="अपना सवाल पूछें..."
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Suggestion Modal */}
      {showSuggestion && (
        <div className="fixed bottom-28 right-8 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border-2 border-purple-500">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="text-xl font-bold">Share Your Suggestion</h3>
                  <p className="text-xs opacity-90">हमें बेहतर बनाने में मदद करें</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowSuggestion(false);
                  setSuggestion('');
                }}
                className="hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <label className="block text-gray-700 font-semibold mb-2">
              आपका सुझाव:
            </label>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="कृपया अपना सुझाव यहाँ लिखें..."
              rows="6"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 resize-none"
            />
            
            <div className="mt-4 space-y-2">
              <button
                onClick={handleSuggestionSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg"
              >
                सुझाव सबमिट करें
              </button>
              <button
                onClick={() => {
                  setShowSuggestion(false);
                  setSuggestion('');
                }}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
              >
                रद्द करें
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};



export default HelpSession