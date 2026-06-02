import GlassCard from './GlassCard';

interface BundleChunk {
    name: string;
    size: string;
    gzipSize: string;
    percentage: number;
    color: string;
}

const bundleChunks: BundleChunk[] = [
    {
        name: 'Main Bundle',
        size: '45.2 KB',
        gzipSize: '14.8 KB',
        percentage: 35,
        color: 'bg-emerald-500',
    },
    {
        name: 'Vendor (React)',
        size: '42.1 KB',
        gzipSize: '13.2 KB',
        percentage: 32,
        color: 'bg-blue-500',
    },
    {
        name: 'Router',
        size: '18.5 KB',
        gzipSize: '6.1 KB',
        percentage: 14,
        color: 'bg-purple-500',
    },
    {
        name: 'UI Components',
        size: '15.3 KB',
        gzipSize: '5.2 KB',
        percentage: 12,
        color: 'bg-orange-500',
    },
    {
        name: 'Styles',
        size: '9.2 KB',
        gzipSize: '3.1 KB',
        percentage: 7,
        color: 'bg-pink-500',
    },
];

const totalSize = '130.3 KB';
const totalGzipSize = '42.4 KB';

const BundleInfo = () => {
    return (
        <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500/20">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Bundle Size</h3>
                    <p className="text-xs text-gray-400">Production build analysis</p>
                </div>
            </div>

            {/* Total Size */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Total Bundle Size</span>
                    <span className="text-lg font-bold text-white">{totalSize}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Gzipped</span>
                    <span className="text-sm font-medium text-emerald-400">{totalGzipSize}</span>
                </div>
            </div>

            {/* Chunks Breakdown */}
            <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-400">Bundle Chunks</h4>
                {bundleChunks.map((chunk) => (
                    <div key={chunk.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">{chunk.name}</span>
                            <span className="text-xs text-gray-500">{chunk.size} ({chunk.gzipSize} gzipped)</span>
                        </div>
                        <div className="w-full bg-white/5 rounded-full h-2">
                            <div
                                className={`${chunk.color} h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${chunk.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-white/5">
                {bundleChunks.slice(0, 3).map((chunk) => (
                    <div key={chunk.name} className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${chunk.color}`} />
                        <span className="text-xs text-gray-500">{chunk.name}</span>
                    </div>
                ))}
            </div>

            {/* Performance Tips */}
            <div className="mt-6 pt-4 border-t border-white/5">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Optimization Tips</h4>
                <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-400">Tree shaking enabled</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-400">Code splitting active</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-gray-400">Gzip compression enabled</span>
                    </li>
                </ul>
            </div>
        </GlassCard>
    );
};

export default BundleInfo;
