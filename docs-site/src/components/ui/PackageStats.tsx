import { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

interface PubDevPackage {
    name: string;
    latest: {
        version: string;
        pubspec: {
            description: string;
        };
    };
    likeCount: number;
    grantedPoints: number;
    popularity: number;
    downloadCount: number;
}

const PACKAGE_NAME = 'saavn_play';
const CACHE_KEY = 'package_stats_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

const getCachedData = (): PubDevPackage | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
        return data;
    } catch {
        return null;
    }
};

const setCachedData = (data: PubDevPackage): void => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now(),
        }));
    } catch {
        // localStorage might be full or unavailable
    }
};

const PackageStats = () => {
    const [packageData, setPackageData] = useState<PubDevPackage | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check cache first
                const cached = getCachedData();
                if (cached) {
                    setPackageData(cached);
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `https://pub.dev/api/packages/${PACKAGE_NAME}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch package data');
                }

                const data = await response.json();
                setPackageData(data);
                setCachedData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load package data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    const getScoreColor = (score: number): string => {
        if (score >= 90) return 'text-green-400';
        if (score >= 70) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreBg = (score: number): string => {
        if (score >= 90) return 'bg-green-500/20 border-green-500/30';
        if (score >= 70) return 'bg-yellow-500/20 border-yellow-500/30';
        return 'bg-red-500/20 border-red-500/30';
    };

    if (loading) {
        return (
            <GlassCard hover={false} className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/20">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Package Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-8 bg-white/10 rounded-lg mb-2" />
                            <div className="h-4 bg-white/5 rounded w-2/3" />
                        </div>
                    ))}
                </div>
            </GlassCard>
        );
    }

    if (error) {
        return (
            <GlassCard hover={false} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/20">
                        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Package Stats</h3>
                </div>
                <p className="text-gray-400 text-sm">{error}</p>
            </GlassCard>
        );
    }

    return (
        <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-500/20">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">Package Stats</h3>
                    <p className="text-xs text-gray-400">pub.dev</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="text-2xl font-bold text-white">
                            {formatNumber(packageData?.downloadCount || 0)}
                        </span>
                    </div>
                    <span className="text-xs text-gray-400">Downloads</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-2xl font-bold text-white">
                            {packageData?.likeCount || 0}
                        </span>
                    </div>
                    <span className="text-xs text-gray-400">Likes</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className={`text-2xl font-bold ${getScoreColor(packageData?.grantedPoints || 0)}`}>
                            {packageData?.grantedPoints || 0}
                        </span>
                    </div>
                    <span className="text-xs text-gray-400">Pub Points</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span className={`text-2xl font-bold ${getScoreColor(packageData?.popularity || 0)}`}>
                            {packageData?.popularity || 0}%
                        </span>
                    </div>
                    <span className="text-xs text-gray-400">Popularity</span>
                </div>
            </div>

            {/* Score Breakdown */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Score Breakdown</h4>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Pub Points</span>
                        <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${getScoreBg(packageData?.grantedPoints || 0)} ${getScoreColor(packageData?.grantedPoints || 0)}`}>
                            {packageData?.grantedPoints || 0}/160
                        </span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                                (packageData?.grantedPoints || 0) >= 90 ? 'bg-green-500' :
                                (packageData?.grantedPoints || 0) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${((packageData?.grantedPoints || 0) / 160) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Version Info */}
            {packageData?.latest?.version && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-emerald-400 font-medium">
                        Latest: v{packageData.latest.version}
                    </span>
                </div>
            )}

            {/* View on pub.dev Link */}
            <a
                href={`https://pub.dev/packages/${PACKAGE_NAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-6 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all"
            >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                View on pub.dev
            </a>
        </GlassCard>
    );
};

export default PackageStats;
