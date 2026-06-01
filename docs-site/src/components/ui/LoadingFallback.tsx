const LoadingFallback = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-4xl mx-auto px-4 space-y-6">
                {/* Header skeleton */}
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/[0.08] animate-pulse" />
                    <div className="space-y-2 flex-1">
                        <div className="h-5 w-48 rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/[0.08] animate-pulse" />
                        <div className="h-3 w-72 rounded-lg bg-white/[0.04] backdrop-blur-md border border-white/[0.06] animate-pulse" />
                    </div>
                </div>

                {/* Content blocks skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] p-6 space-y-3"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="h-4 w-3/4 rounded-lg bg-white/[0.06] animate-pulse" />
                            <div className="h-3 w-full rounded-lg bg-white/[0.04] animate-pulse" />
                            <div className="h-3 w-5/6 rounded-lg bg-white/[0.04] animate-pulse" />
                            <div className="h-8 w-24 rounded-lg bg-emerald-500/10 animate-pulse mt-4" />
                        </div>
                    ))}
                </div>

                {/* Wide block skeleton */}
                <div className="rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] p-6 space-y-4">
                    <div className="h-5 w-1/3 rounded-lg bg-white/[0.06] animate-pulse" />
                    <div className="space-y-2">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-3 rounded-lg bg-white/[0.03] animate-pulse" style={{ width: `${90 - i * 10}%` }} />
                        ))}
                    </div>
                </div>

                {/* Loading indicator */}
                <div className="flex justify-center pt-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/[0.08]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-gray-500">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingFallback;
