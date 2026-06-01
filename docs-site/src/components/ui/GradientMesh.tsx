const GradientMesh = () => {
    return (
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
            <div className="absolute inset-0 bg-background-darkest" />

            <div
                className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
                    animation: 'meshFloat1 12s ease-in-out infinite',
                }}
            />
            <div
                className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full opacity-20"
                style={{
                    background: 'radial-gradient(circle, rgba(1,117,194,0.4) 0%, transparent 70%)',
                    animation: 'meshFloat2 15s ease-in-out infinite',
                }}
            />
            <div
                className="absolute top-1/4 right-1/4 w-3/4 h-3/4 rounded-full opacity-15"
                style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                    animation: 'meshFloat3 18s ease-in-out infinite',
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
