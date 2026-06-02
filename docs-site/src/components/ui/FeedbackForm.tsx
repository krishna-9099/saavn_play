import { useState, useCallback } from 'react';

const STORAGE_KEY = 'saavn_play_feedback';

interface Feedback {
    rating: number;
    comment: string;
    timestamp: string;
}

const FeedbackForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = useCallback(() => {
        if (rating === 0) return;

        setIsSubmitting(true);

        const feedback: Feedback = {
            rating,
            comment,
            timestamp: new Date().toISOString(),
        };

        try {
            const existing = localStorage.getItem(STORAGE_KEY);
            const feedbacks = existing ? JSON.parse(existing) : [];
            feedbacks.push(feedback);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
            console.log('Feedback submitted:', feedback);
        } catch {
            console.log('Feedback (localStorage unavailable):', feedback);
        }

        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsSubmitted(false);
                setRating(0);
                setComment('');
            }, 2000);
        }, 500);
    }, [rating, comment]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-600/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
                title="Send Feedback"
            >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-white/[0.1] backdrop-blur-md border border-white/[0.1] text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Send Feedback
                </span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => !isSubmitted && setIsOpen(false)}
                    />

                    <div className="relative w-full max-w-md rounded-2xl bg-white/[0.05] backdrop-blur-xl border border-white/[0.15] shadow-2xl shadow-black/40 overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 bg-white/[0.03] border-b border-white/[0.08]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-white">Send Feedback</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {isSubmitted ? (
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Thank you!</h4>
                                <p className="text-gray-400">Your feedback helps us improve.</p>
                            </div>
                        ) : (
                            <div className="p-6">
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-3">
                                        How would you rate your experience?
                                    </label>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                onClick={() => setRating(star)}
                                                className="p-1 transition-transform hover:scale-110 active:scale-95"
                                            >
                                                <svg
                                                    className={`w-10 h-10 transition-colors ${
                                                        star <= (hoveredRating || rating)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-600'
                                                    }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                    {rating > 0 && (
                                        <p className="text-center text-sm text-gray-500 mt-2">
                                            {rating === 1 && 'Poor'}
                                            {rating === 2 && 'Fair'}
                                            {rating === 3 && 'Good'}
                                            {rating === 4 && 'Very Good'}
                                            {rating === 5 && 'Excellent'}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Comments (optional)
                                    </label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Tell us what you think..."
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={rating === 0 || isSubmitting}
                                    className="w-full py-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-semibold hover:bg-emerald-500/30 hover:border-emerald-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : (
                                        'Submit Feedback'
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default FeedbackForm;
