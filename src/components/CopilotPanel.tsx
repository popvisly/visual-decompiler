'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X, Sparkles, AlertCircle, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    sources?: { id: string; brand: string; headline: string }[];
}

export default function CopilotPanel({ boardId }: { boardId?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({ prompt: input, boardId }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.answer,
                sources: data.sources
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (err: any) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Error: ${err.message}. Please try again.`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-[#141414] text-[#FBF7EF] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-40 group no-print"
            >
                <Bot className="w-6 h-6 group-hover:hidden" />
                <Sparkles className="w-6 h-6 hidden group-hover:block transition-all" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-ping opacity-20" />
            </button>

            {/* Sidebar Panel */}
            <div className={`fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-surface/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-xl">
                            <Bot className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-txt-on-dark uppercase tracking-widest">Strategy Copilot</h3>
                            <p className="text-[10px] text-txt-on-dark-muted font-bold uppercase tracking-tight">
                                {boardId ? 'Context: Current Board' : 'Context: Global Library'}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <X className="w-5 h-5 text-txt-on-dark-muted" />
                    </button>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth custom-scrollbar">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                            <Sparkles className="w-12 h-12 text-accent" />
                            <div className="space-y-2">
                                <p className="text-sm text-txt-on-dark font-medium">Ask your Library anything.</p>
                                <p className="text-xs text-txt-on-dark-muted max-w-xs mx-auto">
                                    "Which competitor is most focused on price?"<br />
                                    "What are the dominant triggers in Luxury?"
                                </p>
                            </div>
                        </div>
                    )}

                    {messages.map((m, i) => (
                        <div key={i} className={`flex gap-4 ${m.role === 'assistant' ? '' : 'flex-row-reverse'}`}>
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'assistant' ? 'bg-accent/10' : 'bg-white/10'}`}>
                                {m.role === 'assistant' ? <Bot className="w-4 h-4 text-accent" /> : <User className="w-4 h-4 text-txt-on-dark" />}
                            </div>
                            <div className={`space-y-4 max-w-[85%]`}>
                                <div className={`p-4 rounded-2xl text-[13px] leading-relaxed ${m.role === 'assistant' ? 'bg-white/5 text-txt-on-dark-muted' : 'bg-[#FBF7EF] text-[#141414] font-medium'}`}>
                                    {m.content}
                                </div>
                                {m.sources && m.sources.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-[9px] font-bold text-accent uppercase tracking-widest">Retrieved Intel</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {m.sources.map(s => (
                                                <Link key={s.id} href={`/dashboard/${s.id}`} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-accent/40 transition-all group">
                                                    <Bookmark className="w-3 h-3 text-txt-on-dark-muted group-hover:text-accent" />
                                                    <span className="text-[10px] text-txt-on-dark-muted truncate font-medium">
                                                        <span className="text-txt-on-dark mr-1">{s.brand}:</span> {s.headline}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-4 animate-in fade-in duration-500">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                <Loader2 className="w-4 h-4 text-accent animate-spin" />
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 text-txt-on-dark-muted flex gap-1">
                                <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-6 border-t border-white/10 bg-[#0A0A0A]">
                    <div className="relative group">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Ask for strategic patterns..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 pr-12 text-sm text-txt-on-dark placeholder-txt-on-dark-muted focus:outline-none focus:border-accent transition-all resize-none h-24"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="absolute bottom-4 right-4 p-2 bg-[#FBF7EF] text-[#141414] rounded-xl hover:scale-110 transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] animate-in fade-in duration-500"
                />
            )}
        </>
    );
}

function Loader2(props: any) {
    return <AlertCircle {...props} />; // Using AlertCircle as fallback since Loader2 missing in types sometimes
}
