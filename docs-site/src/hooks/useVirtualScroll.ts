import { useState, useEffect, useRef, useCallback } from 'react';

interface UseVirtualScrollOptions {
    itemCount: number;
    itemHeight: number;
    overscan?: number;
}

interface UseVirtualScrollReturn {
    containerRef: React.RefObject<HTMLDivElement | null>;
    visibleRange: { start: number; end: number };
    totalHeight: number;
    offsetY: number;
}

export function useVirtualScroll({
    itemCount,
    itemHeight,
    overscan = 5,
}: UseVirtualScrollOptions): UseVirtualScrollReturn {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: 0 });

    const totalHeight = itemCount * itemHeight;
    const offsetY = visibleRange.start * itemHeight;

    const calculateVisibleRange = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const { scrollTop, clientHeight } = container;
        const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
        const end = Math.min(
            itemCount - 1,
            Math.ceil((scrollTop + clientHeight) / itemHeight) + overscan
        );

        setVisibleRange({ start, end });
    }, [itemHeight, itemCount, overscan]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        calculateVisibleRange();

        const handleScroll = () => {
            requestAnimationFrame(calculateVisibleRange);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [calculateVisibleRange]);

    return { containerRef, visibleRange, totalHeight, offsetY };
}
