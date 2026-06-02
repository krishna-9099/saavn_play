import { useRef, useState, useCallback, type ReactNode } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
}

const TiltCard = ({ children, className = '', tiltAmount = 10 }: TiltCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (mouseY / (rect.height / 2)) * -tiltAmount;
        const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;

        setTilt({ x: rotateX, y: rotateY });
    }, [tiltAmount]);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
        setTilt({ x: 0, y: 0 });
    }, []);

    return (
        <div
            ref={cardRef}
            className={`relative transition-transform duration-200 ease-out ${className}`}
            style={{
                transform: isHovering
                    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isHovering && (
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${50 + tilt.y * 5}% ${50 - tilt.x * 5}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
                    }}
                />
            )}
        </div>
    );
};

export default TiltCard;
