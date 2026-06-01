import { CSSProperties, ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    style?: CSSProperties;
}

const GlassCard = ({ children, className = '', hover = true, style }: GlassCardProps) => {
    return (
        <div
            className={`
                relative rounded-2xl
                bg-white/[0.05] backdrop-blur-md
                border border-white/[0.08]
                shadow-lg shadow-black/20
                ${hover ? 'transition-all duration-300 hover:scale-[1.03] hover:bg-white/[0.08] hover:border-emerald-500/30 hover:shadow-emerald-500/10 hover:shadow-xl active:scale-[0.98]' : ''}
                ${className}
            `}
            style={style}
        >
            {children}
        </div>
    );
};

export default GlassCard;
