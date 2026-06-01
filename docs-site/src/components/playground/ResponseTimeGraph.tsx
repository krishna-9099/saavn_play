import { useMemo } from 'react';
import { HistoryEntry } from './types';

interface ResponseTimeGraphProps {
    history: HistoryEntry[];
}

const ResponseTimeGraph = ({ history }: ResponseTimeGraphProps) => {
    const last10 = useMemo(() => history.slice(0, 10).reverse(), [history]);

    const { maxTime, avgTime } = useMemo(() => {
        if (last10.length === 0) return { maxTime: 0, avgTime: 0 };
        const times = last10.map((e) => e.duration);
        const max = Math.max(...times);
        const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
        return { maxTime: max, avgTime: avg };
    }, [last10]);

    if (last10.length === 0) {
        return (
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                    Response Times
                </label>
                <p className="text-xs text-gray-600 italic">No data yet.</p>
            </div>
        );
    }

    const chartHeight = 120;
    const barWidth = 28;
    const barGap = 6;
    const chartWidth = last10.length * (barWidth + barGap) - barGap;
    const leftPadding = 40;

    const getBarHeight = (duration: number) => {
        if (maxTime === 0) return 0;
        return Math.max(4, (duration / maxTime) * (chartHeight - 30));
    };

    const getBarColor = (status: number | null) => {
        if (status === null) return 'bg-gray-500';
        if (status >= 200 && status < 300) return 'bg-emerald-500';
        return 'bg-red-500';
    };

    const getBarGlow = (status: number | null) => {
        if (status === null) return '';
        if (status >= 200 && status < 300) return 'shadow-[0_0_8px_rgba(52,211,153,0.3)]';
        return 'shadow-[0_0_8px_rgba(239,68,68,0.3)]';
    };

    const avgLineY = maxTime > 0
        ? chartHeight - 30 - (avgTime / maxTime) * (chartHeight - 30)
        : chartHeight - 30;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                    Response Times
                </label>
                <div className="flex items-center gap-3 text-[10px] text-gray-600">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        2xx
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        Error
                    </span>
                </div>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 overflow-x-auto">
                <svg
                    width={Math.max(chartWidth + leftPadding + 10, 200)}
                    height={chartHeight + 25}
                    className="w-full"
                    viewBox={`0 0 ${Math.max(chartWidth + leftPadding + 10, 200)} ${chartHeight + 25}`}
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Y-axis labels */}
                    <text x={leftPadding - 8} y={14} textAnchor="end" className="fill-gray-600" fontSize="9">
                        {maxTime}ms
                    </text>
                    <text x={leftPadding - 8} y={chartHeight - 16} textAnchor="end" className="fill-gray-600" fontSize="9">
                        0ms
                    </text>

                    {/* Grid lines */}
                    <line
                        x1={leftPadding}
                        y1={10}
                        x2={leftPadding + chartWidth}
                        y2={10}
                        stroke="rgba(255,255,255,0.05)"
                        strokeDasharray="4 4"
                    />
                    <line
                        x1={leftPadding}
                        y1={chartHeight - 20}
                        x2={leftPadding + chartWidth}
                        y2={chartHeight - 20}
                        stroke="rgba(255,255,255,0.1)"
                    />

                    {/* Average line */}
                    {maxTime > 0 && (
                        <>
                            <line
                                x1={leftPadding}
                                y1={avgLineY}
                                x2={leftPadding + chartWidth}
                                y2={avgLineY}
                                stroke="rgba(251,191,36,0.4)"
                                strokeDasharray="6 3"
                            />
                            <text
                                x={leftPadding + chartWidth + 2}
                                y={avgLineY + 3}
                                className="fill-amber-400"
                                fontSize="8"
                            >
                                {avgTime}ms
                            </text>
                        </>
                    )}

                    {/* Bars */}
                    {last10.map((entry, i) => {
                        const barHeight = getBarHeight(entry.duration);
                        const x = leftPadding + i * (barWidth + barGap);
                        const y = chartHeight - 20 - barHeight;
                        const isSuccess = entry.status !== null && entry.status >= 200 && entry.status < 300;
                        const isError = entry.status !== null && (entry.status < 200 || entry.status >= 300);

                        return (
                            <g key={entry.id}>
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight}
                                    rx={3}
                                    className={`${getBarColor(entry.status)} ${getBarGlow(entry.status)} transition-all duration-300`}
                                    opacity={0.85}
                                />
                                {/* Duration label */}
                                <text
                                    x={x + barWidth / 2}
                                    y={y - 4}
                                    textAnchor="middle"
                                    className={`${isSuccess ? 'fill-emerald-400' : isError ? 'fill-red-400' : 'fill-gray-500'}`}
                                    fontSize="8"
                                    fontWeight="600"
                                >
                                    {entry.duration}
                                </text>
                                {/* X-axis label (request number) */}
                                <text
                                    x={x + barWidth / 2}
                                    y={chartHeight - 4}
                                    textAnchor="middle"
                                    className="fill-gray-600"
                                    fontSize="8"
                                >
                                    #{i + 1}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-gray-600">
                <span>Avg: {avgTime}ms</span>
                <span>{last10.length} requests</span>
            </div>
        </div>
    );
};

export default ResponseTimeGraph;
