import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { Message } from '@shared/types';
import { sendMessageToGemini } from '@shared/services/geminiService';
import ReactMarkdown from 'react-markdown';

const CopyButton = ({ code }: { code: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-cyan-300"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello. I'm Abhinav's AI Assistant. Ask me anything about his work, skills, or experience.",
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages, input);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 z-40 bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:bg-white/20 transition-all duration-300 group animate-fade-in"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Chat with AI</span>
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-8 right-4 md:right-8 w-[90vw] md:w-[400px] h-[500px] bg-[#0c1221]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/20">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span className="text-sm font-medium tracking-wide">AI Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm leading-relaxed ${msg.role === 'user'
                    ? 'bg-cyan-900/40 text-cyan-100 border border-cyan-800/50'
                    : 'bg-white/5 text-gray-200 border border-white/10'
                    }`}
                >
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => <a {...props} className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/30 transition-colors" target="_blank" rel="noopener noreferrer" />,
                      code: ({ node, inline, className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeContent = String(children).replace(/\n$/, '');
                        
                        if (inline) {
                          return <code {...props} className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-xs" text-white>{children}</code>;
                        }

                        return (
                          <div className="relative group/code my-4">
                            <div className="bg-black/40 rounded-xl border border-white/10 font-mono text-xs overflow-hidden">
                              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                                  {match ? match[1] : 'code'}
                                </span>
                                <CopyButton code={codeContent} />
                              </div>
                              <div className="p-4 overflow-x-auto">
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              </div>
                            </div>
                          </div>
                        );
                      },
                      strong: ({ node, ...props }) => <strong {...props} className="font-bold text-white" />,
                      em: ({ node, ...props }) => <em {...props} className="italic text-gray-100" />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-lg border border-white/10 flex items-center space-x-2">
                  <Loader2 className="w-3 h-3 animate-spin text-cyan-300" />
                  <span className="text-xs text-gray-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-black/20">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my skills..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-cyan-300 disabled:opacity-50 disabled:hover:text-gray-400 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
