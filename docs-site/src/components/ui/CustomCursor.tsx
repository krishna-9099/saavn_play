import { useEffect, useRef, useState, useCallback } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();
    const [isHovering, setIsHovering] = useState(false);
    const position = useRef({ x: 0, y: 0 });
    const targetPosition = useRef({ x: 0, y: 0 });

    const updateCursor = useCallback(() => {
        position.current.x += (targetPosition.current.x - position.current.x) * 0.15;
        position.current.y += (targetPosition.current.y - position.current.y) * 0.15;

        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px) scale(${isHovering ? 1.5 : 1})`;
        }
        if (dotRef.current) {
            dotRef.current.style.transform = `translate(${targetPosition.current.x}px, ${targetPosition.current.y}px)`;
        }

        animationRef.current = requestAnimationFrame(updateCursor);
    }, [isHovering]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            targetPosition.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseEnter = () => {
            document.body.classList.add('custom-cursor-active');
        };

        const handleMouseLeave = () => {
            document.body.classList.remove('custom-cursor-active');
        };

        const handleInteractiveHover = (e: Event) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            }
        };

        const handleInteractiveLeave = () => {
            setIsHovering(false);
        };

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseover', handleInteractiveHover, { passive: true });
        document.addEventListener('mouseout', handleInteractiveLeave, { passive: true });

        animationRef.current = requestAnimationFrame(updateCursor);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseover', handleInteractiveHover);
            document.removeEventListener('mouseout', handleInteractiveLeave);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [updateCursor]);

    return (
        <>
            <div
                ref={cursorRef}
                className="custom-cursor-ring hidden md:block"
                style={{
                    position: 'fixed',
                    top: -15,
                    left: -15,
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    border: '1.5px solid rgba(16, 185, 129, 0.5)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s',
                    mixBlendMode: 'difference',
                }}
            />
            <div
                ref={dotRef}
                className="custom-cursor-dot hidden md:block"
                style={{
                    position: 'fixed',
                    top: -3,
                    left: -3,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
                }}
            />
        </>
    );
};

export default CustomCursor;
