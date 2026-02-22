'use client';

import { useState, useEffect } from 'react';
import { Bell, MessageSquare, Sparkles, Check, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Notification {
    id: string;
    title: string;
    message: string;
    link: string;
    read: boolean;
    created_at: string;
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/api/notifications');
            const data = await res.json();
            if (Array.isArray(data)) {
                setNotifications(data);
            }
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll every 60 seconds for new notifications
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = async (id?: string) => {
        try {
            await fetch('/api/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });

            if (id) {
                setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
            } else {
                setNotifications(notifications.map(n => ({ ...n, read: true })));
            }
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-3 rounded-2xl hover:bg-white border border-transparent hover:border-[#E7DED1] transition-all group"
            >
                <Bell className={`w-5 h-5 ${unreadCount > 0 ? 'text-accent animate-pulse' : 'text-[#6B6B6B]/40 group-hover:text-[#141414]'}`} />
                {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-[#FBF7EF]" />
                )}
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full mt-4 w-80 bg-white rounded-[2.5rem] border border-[#E7DED1] shadow-2xl shadow-black/10 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-6 border-b border-[#E7DED1] flex items-center justify-between bg-[#FBF7EF]/50">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#141414]">Intelligence Feed</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={() => markAsRead()}
                                className="text-[9px] font-bold uppercase tracking-widest text-accent hover:text-accent/70 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                        {loading ? (
                            <div className="p-12 flex justify-center">
                                <Loader2 className="w-5 h-5 animate-spin text-accent/40" />
                            </div>
                        ) : notifications.length > 0 ? (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    className={`p-6 border-b border-[#E7DED1]/50 last:border-0 hover:bg-[#FBF7EF]/50 transition-all relative group ${!n.read ? 'bg-accent/5' : ''}`}
                                >
                                    <div className="flex gap-4">
                                        <div className={`mt-1 p-2 rounded-xl ${n.title.includes('REMIX') ? 'bg-[#141414] text-accent' : 'bg-accent/10 text-accent'}`}>
                                            {n.title.includes('REMIX') ? <Sparkles className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] font-bold text-[#141414] uppercase tracking-wide truncate pr-4">{n.title}</p>
                                                {!n.read && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            markAsRead(n.id);
                                                        }}
                                                        className="text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Check className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-[#6B6B6B] leading-relaxed line-clamp-2 italic">{n.message}</p>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-[8px] text-[#6B6B6B]/40 uppercase font-mono">{new Date(n.created_at).toLocaleDateString()}</span>
                                                {n.link && (
                                                    <Link
                                                        href={n.link}
                                                        onClick={() => {
                                                            markAsRead(n.id);
                                                            setIsOpen(false);
                                                        }}
                                                        className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#141414] hover:text-accent transition-colors"
                                                    >
                                                        Review <ExternalLink className="w-2.5 h-2.5" />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <p className="text-[10px] text-[#6B6B6B] uppercase font-bold tracking-[0.3em] opacity-30">No new alerts</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-[#FBF7EF]/30 border-t border-[#E7DED1] text-center">
                        <p className="text-[8px] text-[#6B6B6B]/40 uppercase tracking-[0.2em] font-bold italic">Real-time Agency Intelligence</p>
                    </div>
                </div>
            )}
        </div>
    );
}
