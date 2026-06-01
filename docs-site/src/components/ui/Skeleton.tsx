interface SkeletonProps {
    width?: string;
    height?: string;
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

const Skeleton = ({
    width,
    height,
    className = '',
    variant = 'text',
}: SkeletonProps) => {
    const variantClasses = {
        text: 'rounded-md',
        circular: 'rounded-full',
        rectangular: 'rounded-xl',
    };

    return (
        <div
            className={`
                bg-white/[0.06] backdrop-blur-sm
                border border-white/[0.08]
                animate-skeleton-pulse
                ${variantClasses[variant]}
                ${className}
            `}
            style={{ width, height }}
        />
    );
};

export default Skeleton;
