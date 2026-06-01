import { useEffect, useState } from 'react';
import { useThrottle } from '../../hooks/useThrottle';

const ScrollToTop = () => {
    const [scrollY, setScrollY] = useState(0);
    const throttledScrollY = useThrottle(scrollY, 100);
    const visible = throttledScrollY > 300;

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-6 right-6 z-40
                w-12 h-12 rounded-full
                flex items-center justify-center
                bg-emerald-500/20 backdrop-blur-xl
                border border-emerald-500/30
                text-emerald-400
                shadow-lg shadow-emerald-500/20
                hover:bg-emerald-500/30 hover:border-emerald-400/50
                hover:shadow-emerald-500/30 hover:scale-110
                active:scale-95
                transition-all duration-300
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}
            aria-label="Scroll to top"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
};

export default ScrollToTop;
