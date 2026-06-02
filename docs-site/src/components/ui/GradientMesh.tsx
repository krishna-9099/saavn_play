import { useEffect, useRef, useState } from 'react';

const GradientMesh = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const targetPos = useRef({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            targetPos.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            };
        };

        const animate = () => {
            setMousePos(prev => ({
                x: prev.x + (targetPos.current.x - prev.x) * 0.05,
                y: prev.y + (targetPos.current.y - prev.y) * 0.05,
            }));
            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const gradientX = mousePos.x * 100;
    const gradientY = mousePos.y * 100;

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
            <div className="absolute inset-0 bg-background-darkest" />

            <div
                className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-30"
                style={{
                    background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(16,185,129,0.4) 0%, transparent 70%)`,
                    animation: 'meshFloat1 12s ease-in-out infinite',
                    transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`,
                }}
            />
            <div
                className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full opacity-20"
                style={{
                    background: `radial-gradient(circle at ${100 - gradientX}% ${100 - gradientY}%, rgba(1,117,194,0.4) 0%, transparent 70%)`,
                    animation: 'meshFloat2 15s ease-in-out infinite',
                    transform: `translate(${(mousePos.x - 0.5) * -15}px, ${(mousePos.y - 0.5) * -15}px)`,
                }}
            />
            <div
                className="absolute top-1/4 right-1/4 w-3/4 h-3/4 rounded-full opacity-15"
                style={{
                    background: `radial-gradient(circle at ${gradientX + 20}% ${gradientY - 10}%, rgba(139,92,246,0.3) 0%, transparent 70%)`,
                    animation: 'meshFloat3 18s ease-in-out infinite',
                    transform: `translate(${(mousePos.x - 0.5) * 10}px, ${(mousePos.y - 0.5) * -10}px)`,
                }}
            />

            <style>{`
                @keyframes meshFloat1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(10%, 5%) scale(1.1); }
                    66% { transform: translate(-5%, 10%) scale(0.95); }
                }
                @keyframes meshFloat2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-8%, -5%) scale(1.05); }
                    66% { transform: translate(5%, -8%) scale(1.1); }
                }
                @keyframes meshFloat3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-5%, 8%) scale(1.08); }
                    66% { transform: translate(8%, -3%) scale(0.92); }
                }
            `}</style>
        </div>
    );
};

export default GradientMesh;
