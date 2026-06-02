import GlassCard from './GlassCard';

interface ScoreMetric {
    name: string;
    score: number;
    color: string;
    bgColor: string;
    icon: React.ReactNode;
}

const scores: ScoreMetric[] = [
    {
        name: 'Performance',
        score: 98,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20 border-green-500/30',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        name: 'Accessibility',
        score: 100,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20 border-green-500/30',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
    },
    {
        name: 'Best Practices',
        score: 100,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20 border-green-500/30',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        name: 'SEO',
        score: 100,
        color: 'text-green-400',
        bgColor: 'bg-green-500/20 border-green-500/30',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
];

const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
};

const getScoreGradient = (score: number): string => {
    if (score >= 90) return 'from-green-500 to-emerald-500';
    if (score >= 50) return 'from-orange-500 to-yellow-500';
    return 'from-red-500 to-pink-500';
};

const LighthouseScore = () => {
    return (
        <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/20">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Lighthouse Score</h3>
                    <p className="text-xs text-gray-400">Performance audit results</p>
                </div>
            </div>

            {/* Overall Score */}
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/30">
                    <span className="text-3xl font-bold text-green-400">99</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Overall Score</p>
            </div>

            {/* Individual Scores */}
            <div className="space-y-4">
                {scores.map((metric) => (
                    <div key={metric.name} className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${metric.bgColor}`}>
                            <div className={metric.color}>{metric.icon}</div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-300">{metric.name}</span>
                                <span className={`text-sm font-bold ${getScoreColor(metric.score)}`}>
                                    {metric.score}
                                </span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(metric.score)} transition-all duration-1000`}
                                    style={{ width: `${metric.score}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Metrics Summary */}
            <div className="mt-6 pt-4 border-t border-white/5">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-xs text-gray-500 mb-1">First Contentful Paint</p>
                        <p className="text-sm font-medium text-green-400">0.8s</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-xs text-gray-500 mb-1">Largest Contentful Paint</p>
                        <p className="text-sm font-medium text-green-400">1.2s</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-xs text-gray-500 mb-1">Time to Interactive</p>
                        <p className="text-sm font-medium text-green-400">0.9s</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-xs text-gray-500 mb-1">Total Blocking Time</p>
                        <p className="text-sm font-medium text-green-400">0ms</p>
                    </div>
                </div>
            </div>

            {/* Last Audited */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-500">Last audited: Today</span>
            </div>
        </GlassCard>
    );
};

export default LighthouseScore;
