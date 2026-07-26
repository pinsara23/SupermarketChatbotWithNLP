import React, { useState, useRef, useEffect } from 'react';
import { Send, Printer, Bot, User, Loader2, MapPin, ShoppingBag, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your Supermarket Assistant. What are you looking for today?',
      locations: [],
      unrecognized: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_input: input })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      let botText = '';
      if (data.locations && data.locations.length > 0) {
        botText = 'I found some items for you:';
      } else if (data.unrecognized && data.unrecognized.length > 0) {
        botText = "I couldn't find some of those items.";
      } else {
        botText = "I'm not sure how to help with that.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botText,
          locations: data.locations || [],
          unrecognized: data.unrecognized || []
        }
      ]);
    } catch (error) {
      console.error('Error fetching chat:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Sorry, I encountered an error connecting to the server.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm transition-all duration-300 print-hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4 sm:px-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200/50 transform transition hover:scale-105">
              <Bot size={26} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-indigo-900 tracking-tight">
                Supermarket Assistant
              </h1>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium text-slate-500">Online and ready</span>
              </div>
            </div>
          </div>
          <button className="hidden sm:flex items-center space-x-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors shadow-sm">
            <Sparkles size={16} />
            <span>Smart Search</span>
          </button>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col space-y-8 pb-36 pt-8">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex w-full animate-slide-up-fade ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} style={{ animationDelay: `${Math.min(idx * 50, 300)}ms` }}>
            <div className={`flex max-w-[90%] sm:max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md z-10
                ${msg.sender === 'user' 
                  ? 'bg-gradient-to-tr from-indigo-100 to-blue-50 text-indigo-600 ml-3 sm:ml-4 border border-white' 
                  : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mr-3 sm:mr-4 border-2 border-white shadow-indigo-200'}`}>
                {msg.sender === 'user' ? <User size={20} className="sm:w-6 sm:h-6" /> : <Bot size={20} className="sm:w-6 sm:h-6" />}
              </div>

              {/* Message Bubble */}
              <div className="group relative">
                <div className={`p-4 sm:p-5 rounded-3xl shadow-sm text-sm sm:text-base relative transition-all duration-200
                  ${msg.sender === 'user' 
                    ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-tr-sm shadow-indigo-200 hover:shadow-md hover:shadow-indigo-300' 
                    : 'bg-white/95 backdrop-blur-sm text-slate-700 rounded-tl-sm border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200/50'}`}>
                  
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  
                  {/* Bot Data Display */}
                  {msg.sender === 'bot' && (msg.locations?.length > 0 || msg.unrecognized?.length > 0) && (
                    <div className="mt-5 space-y-4">
                      {msg.locations?.length > 0 && (
                        <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-inner">
                          <div className="flex items-center space-x-2 mb-3">
                            <ShoppingBag size={16} className="text-emerald-500" />
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Found in Store</h4>
                          </div>
                          <ul className="space-y-2.5">
                            {msg.locations.map((loc, i) => (
                              <li key={i} className="group/item flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all duration-200">
                                <div className="flex items-center space-x-3">
                                  <div className="bg-indigo-50 p-1.5 rounded-lg text-indigo-500 group-hover/item:scale-110 group-hover/item:bg-indigo-100 transition-transform">
                                    <ChevronRight size={16} />
                                  </div>
                                  <span className="font-semibold text-slate-700 capitalize">{loc.item}</span>
                                </div>
                                <div className="flex items-center space-x-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg shadow-sm">
                                  <MapPin size={14} />
                                  <span className="text-xs font-bold whitespace-nowrap">Shelf {loc.shelf}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {msg.unrecognized?.length > 0 && (
                        <div className="bg-orange-50/60 rounded-2xl p-4 sm:p-5 border border-orange-100/50 shadow-inner">
                          <div className="flex items-center space-x-2 mb-3">
                            <AlertCircle size={16} className="text-orange-500" />
                            <h4 className="text-xs font-bold text-orange-600 uppercase tracking-wider">Not Found</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {msg.unrecognized.map((item, i) => (
                              <span key={i} className="bg-white text-orange-700 border border-orange-200/60 text-sm font-medium px-3 py-1.5 rounded-xl capitalize shadow-sm">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Print Button */}
                      {(msg.locations?.length > 0 || msg.unrecognized?.length > 0) && (
                        <button 
                          onClick={handlePrint}
                          className="mt-4 flex items-center justify-center w-full space-x-2 bg-indigo-50/80 hover:bg-indigo-600 text-indigo-700 hover:text-white py-3 rounded-2xl text-sm font-bold transition-all duration-300 print-hidden group/print shadow-sm hover:shadow-md border border-indigo-100 hover:border-transparent"
                        >
                          <Printer size={18} className="group-hover/print:scale-110 transition-transform" />
                          <span>Print Shopping List</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Message Timestamp */}
                <span className={`text-[10px] text-slate-400 absolute -bottom-6 ${msg.sender === 'user' ? 'right-2' : 'left-2'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  Just now
                </span>
              </div>

            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-slide-up-fade">
            <div className="flex flex-row max-w-[85%]">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mr-3 sm:mr-4 border-2 border-white">
                <Bot size={20} className="sm:w-6 sm:h-6 animate-pulse" />
              </div>
              <div className="p-4 sm:p-5 rounded-3xl shadow-xl shadow-slate-200/30 bg-white border border-slate-100 rounded-tl-sm flex items-center space-x-3 text-slate-500">
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm font-medium">Searching aisles...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-6" />
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 w-full p-4 sm:p-6 pb-6 sm:pb-8 print-hidden pointer-events-none z-40">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <form onSubmit={handleSend} className="relative flex items-center group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="E.g., where is the milk, bread, and eggs?"
              className="w-full relative bg-white/95 backdrop-blur-xl text-slate-800 placeholder-slate-400 rounded-full py-4 sm:py-5 pl-6 sm:pl-8 pr-16 border border-white/60 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all shadow-2xl shadow-slate-300/40"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 sm:right-3 p-3 sm:p-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-300 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Send size={20} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
