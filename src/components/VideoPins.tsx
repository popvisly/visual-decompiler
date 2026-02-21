'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Clock, Send, Trash2, User } from 'lucide-react';

interface Pin {
    id: string;
    t_ms: number;
    note: string;
    user_id: string;
    created_at: string;
}

interface VideoPinsProps {
    adId: string;
    currentTimeMs: number;
    onSeek: (ms: number) => void;
}

export default function VideoPins({ adId, currentTimeMs, onSeek }: VideoPinsProps) {
    const [pins, setPins] = useState<Pin[]>([]);
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPins = async () => {
            const res = await fetch(`/api/ads/${adId}/pins`);
            const data = await res.json();
            if (data.pins) setPins(data.pins);
        };
        fetchPins();
    }, [adId]);

    const addPin = async () => {
        if (!note.trim()) return;
        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/ads/${adId}/pins`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ t_ms: Math.round(currentTimeMs), note })
            });
            const data = await res.json();
            if (data.pin) {
                setPins([...pins, data.pin].sort((a, b) => a.t_ms - b.t_ms));
                setNote('');
            }
        } catch (err) {
            console.error('Failed to add pin:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-[#E7DED1] overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-[#E7DED1] flex items-center justify-between bg-[#FBF7EF]/30">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    <h4 className="text-[10px] font-bold text-[#141414] uppercase tracking-widest">Strategic Pins</h4>
                </div>
                <span className="text-[8px] font-mono text-[#6B6B6B] uppercase">Collaborative Overlay</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[400px]">
                {pins.length > 0 ? pins.map((pin) => (
                    <div
                        key={pin.id}
                        onClick={() => onSeek(pin.t_ms)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer group ${Math.abs(currentTimeMs - pin.t_ms) < 500
                                ? 'bg-accent/5 border-accent'
                                : 'bg-[#FBF7EF] border-[#E7DED1] hover:border-accent/40'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Clock className="w-3 h-3 text-[#6B6B6B]" />
                                <span className="text-[9px] font-bold text-[#141414]">
                                    {Math.floor(pin.t_ms / 60000)}:
                                    {String(Math.floor((pin.t_ms % 60000) / 1000)).padStart(2, '0')}
                                </span>
                            </div>
                            <User className="w-3 h-3 text-[#6B6B6B] opacity-40" />
                        </div>
                        <p className="text-xs text-[#6B6B6B] leading-relaxed italic">"{pin.note}"</p>
                    </div>
                )) : (
                    <div className="py-10 text-center">
                        <MessageSquare className="w-8 h-8 text-[#6B6B6B] mx-auto mb-3 opacity-20" />
                        <p className="text-[10px] text-[#6B6B6B] uppercase font-bold tracking-tight">No annotations yet</p>
                    </div>
                )}
            </div>

            <div className="p-6 border-t border-[#E7DED1] bg-[#FBF7EF]/20">
                <div className="relative">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Drop a strategic note at current time..."
                        className="w-full bg-white border border-[#E7DED1] rounded-2xl p-4 pr-12 text-xs focus:ring-accent focus:border-accent min-h-[80px] resize-none"
                    />
                    <button
                        onClick={addPin}
                        disabled={isSubmitting || !note.trim()}
                        className="absolute bottom-3 right-3 p-2 bg-[#141414] text-accent rounded-xl hover:bg-black transition-all disabled:opacity-30 shadow-lg"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-[8px] text-[#6B6B6B] mt-3 font-mono uppercase text-center">
                    Pinning at {Math.floor(currentTimeMs / 1000)}s
                </p>
            </div>
        </div>
    );
}
