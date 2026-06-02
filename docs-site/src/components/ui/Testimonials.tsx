import { useState, useEffect, useCallback } from 'react';
import GlassCard from './GlassCard';

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    avatar?: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
    className?: string;
}

const Testimonials = ({ testimonials, className = '' }: TestimonialsProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const goToNext = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, goToNext]);

    const current = testimonials[currentIndex];

    return (
        <div className={`relative ${className}`}>
            <GlassCard hover={false} className="p-8 md:p-12">
                <div className="text-center">
                    <svg
                        className="w-12 h-12 text-emerald-500/30 mx-auto mb-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>

                    <blockquote className="text-xl md:text-2xl text-white font-medium mb-6 leading-relaxed">
                        {current.quote}
                    </blockquote>

                    <div className="flex items-center justify-center gap-4">
                        {current.avatar ? (
                            <img
                                src={current.avatar}
                                alt={current.author}
                                className="w-12 h-12 rounded-full border-2 border-emerald-500/30"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center">
                                <span className="text-emerald-400 font-semibold text-lg">
                                    {current.author.charAt(0)}
                                </span>
                            </div>
                        )}
                        <div className="text-left">
                            <div className="text-white font-semibold">{current.author}</div>
                            <div className="text-gray-400 text-sm">{current.role}</div>
                        </div>
                    </div>
                </div>
            </GlassCard>

            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    onClick={goToPrev}
                    className="p-2 rounded-full bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] hover:border-emerald-500/30 transition-all"
                    aria-label="Previous testimonial"
                >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                                index === currentIndex
                                    ? 'bg-emerald-500 w-6'
                                    : 'bg-white/20 hover:bg-white/40'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={goToNext}
                    className="p-2 rounded-full bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] hover:border-emerald-500/30 transition-all"
                    aria-label="Next testimonial"
                >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Testimonials;
