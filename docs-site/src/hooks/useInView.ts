import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
    threshold?: number;
    triggerOnce?: boolean;
    rootMargin?: string;
}

export const useInView = ({
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px',
}: UseInViewOptions = {}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, triggerOnce, rootMargin]);

    return { ref, inView };
};
