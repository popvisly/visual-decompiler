'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send, Loader2, User, Sparkles } from 'lucide-react';

interface Comment {
    id: string;
    client_name: string;
    content: string;
    feedback_type: string;
    created_at: string;
}

interface ClientCommentsProps {
    slug: string;
}

export default function ClientComments({ slug }: ClientCommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [clientName, setClientName] = useState('');
    const [isRemixRequest, setIsRemixRequest] = useState(false);

    useEffect(() => {
        fetch(`/api/share/feedback?slug=${slug}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setComments(data);
                setLoading(false);
            });
    }, [slug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment || !clientName) return;

        setSubmitting(true);
        try {
            const res = await fetch('/api/share/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slug,
                    clientName,
                    content: newComment,
                    feedbackType: isRemixRequest ? 'remix_request' : 'comment'
                })
            });

            const data = await res.json();
            if (data.id) {
                setComments([data, ...comments]);
                setNewComment('');
                setIsRemixRequest(false);
            }
        } catch (err) {
            console.error('Failed to post feedback:', err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex items-center gap-4 border-b border-[#E7DED1] pb-6">
                <MessageSquare className="w-5 h-5 text-accent" />
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#141414]">Client Deliberation</h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-[#E7DED1] shadow-xl shadow-black/[0.02] space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="flex-1 space-y-2">
                        <label className="text-[9px] md:text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest px-2">Your Identity</label>
                        <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-3.5 h-3.5 md:w-4 md:h-4 text-[#6B6B6B]/40" />
                            <input
                                type="text"
                                placeholder="Name / Title"
                                className="w-full bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl px-14 py-3 md:py-4 text-sm focus:outline-none focus:border-accent transition-all"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-end pb-1 md:px-2">
                        <button
                            type="button"
                            onClick={() => setIsRemixRequest(!isRemixRequest)}
                            className={`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${isRemixRequest ? 'bg-[#141414] text-accent border-[#141414] shadow-lg' : 'bg-white text-[#6B6B6B] border-[#E7DED1]'}`}
                        >
                            <Sparkles className={`w-3 h-3 ${isRemixRequest ? 'text-accent' : 'text-[#6B6B6B]/40'}`} />
                            {isRemixRequest ? 'Remix Requested' : 'Request Remix'}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest px-2">Observations</label>
                    <textarea
                        placeholder="Share your strategic feedback..."
                        className="w-full bg-[#FBF7EF] border border-[#E7DED1] rounded-[1.5rem] md:rounded-[2rem] px-8 py-5 md:py-6 text-sm min-h-[120px] focus:outline-none focus:border-accent transition-all resize-none"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting || !newComment || !clientName}
                    className="w-full py-4 md:py-5 bg-[#141414] text-white font-bold text-[10px] md:text-[11px] uppercase tracking-[0.3em] rounded-full shadow-2xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
                >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin text-accent" /> : <Send className="w-4 h-4 text-accent" />}
                    {isRemixRequest ? 'Dispatch Remix Request' : 'Post Deliberation'}
                </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4 md:space-y-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-accent/40" />
                    </div>
                ) : comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="group relative">
                            <div className={`p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all ${comment.feedback_type === 'remix_request' ? 'bg-[#141414] border-accent/30 text-white' : 'bg-white border-[#E7DED1] text-[#141414]'}`}>
                                <div className="flex justify-between items-start mb-4 md:mb-6">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold ${comment.feedback_type === 'remix_request' ? 'bg-accent text-[#FBF7EF]' : 'bg-[#FBF7EF] text-[#6B6B6B]'}`}>
                                            {comment.client_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest ${comment.feedback_type === 'remix_request' ? 'text-accent' : ''}`}>
                                                {comment.client_name}
                                            </p>
                                            <p className="text-[8px] md:text-[9px] opacity-40 uppercase tracking-widest mt-0.5">
                                                {new Date(comment.created_at).toLocaleDateString()} at {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                    {comment.feedback_type === 'remix_request' && (
                                        <span className="text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 bg-accent/10 border border-accent/20 text-accent rounded-full">
                                            Remix Request
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm leading-relaxed opacity-80 whitespace-pre-wrap">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-[#E7DED1] rounded-[3.5rem]">
                        <p className="text-[11px] text-[#6B6B6B] uppercase font-bold tracking-[0.4em] opacity-30">No deliberations recorded yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
