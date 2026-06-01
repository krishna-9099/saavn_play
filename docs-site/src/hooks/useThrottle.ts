import { useState, useEffect, useRef } from 'react';

export function useThrottle<T>(value: T, delay: number = 100): T {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastUpdated = useRef(Date.now());

    useEffect(() => {
        const now = Date.now();
        if (now - lastUpdated.current >= delay) {
            setThrottledValue(value);
            lastUpdated.current = now;
        } else {
            const timer = setTimeout(() => {
                setThrottledValue(value);
                lastUpdated.current = Date.now();
            }, delay - (now - lastUpdated.current));
            return () => clearTimeout(timer);
        }
    }, [value, delay]);

    return throttledValue;
}
