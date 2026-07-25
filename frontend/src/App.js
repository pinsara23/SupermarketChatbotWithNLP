import React, { useState, useRef, useEffect } from 'react';
import { Send, Printer, Bot, User, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Bot size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Supermarket Assistant</h1>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto p-4 flex flex-col space-y-6 pb-32 pt-8">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm
                ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600 ml-3' : 'bg-white text-blue-500 mr-3'}`}>
                {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>

              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl shadow-sm text-sm sm:text-base relative
                ${msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'}`}>
                
                <p className="whitespace-pre-wrap">{msg.text}</p>
                
                {/* Bot Data Display */}
                {msg.sender === 'bot' && (msg.locations?.length > 0 || msg.unrecognized?.length > 0) && (
                  <div className="mt-4 space-y-4">
                    {msg.locations?.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Found in Store</h4>
                        <ul className="space-y-2">
                          {msg.locations.map((loc, i) => (
                            <li key={i} className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm border border-slate-50">
                              <span className="font-medium text-slate-700 capitalize">{loc.item}</span>
                              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">
                                Shelf {loc.shelf}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {msg.unrecognized?.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 opacity-80">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Not Found</h4>
                        <div className="flex flex-wrap gap-2">
                          {msg.unrecognized.map((item, i) => (
                            <span key={i} className="bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-md capitalize">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Print Button inside Bot response */}
                    {(msg.locations?.length > 0 || msg.unrecognized?.length > 0) && (
                      <button 
                        onClick={handlePrint}
                        className="mt-3 flex items-center justify-center w-full space-x-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 rounded-xl text-sm font-medium transition-colors print-hidden"
                      >
                        <Printer size={16} />
                        <span>Print Shopping List</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex flex-row max-w-[85%]">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm bg-white text-blue-500 mr-3">
                <Bot size={20} />
              </div>
              <div className="p-4 rounded-2xl shadow-sm bg-white border border-slate-100 rounded-tl-none flex items-center space-x-2 text-slate-500">
                <Loader2 size={20} className="animate-spin" />
                <span className="text-sm">Searching inventory...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 pb-6 print-hidden">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are you looking for? (e.g. eggs, milk, bread)"
              className="w-full bg-slate-100 text-slate-800 placeholder-slate-400 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-full transition-colors shadow-md"
            >
              <Send size={20} className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
