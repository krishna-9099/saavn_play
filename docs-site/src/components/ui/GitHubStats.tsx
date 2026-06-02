import { useState, useEffect } from 'react';
import GlassCard from './GlassCard';

interface GitHubData {
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    subscribers_count: number;
}

interface Contributor {
    login: string;
    avatar_url: string;
    contributions: number;
}

interface Commit {
    sha: string;
    commit: {
        message: string;
        author: {
            date: string;
        };
    };
}

const REPO_OWNER = 'krishna-9099';
const REPO_NAME = 'saavn_play';
const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

const getCachedData = <T,>(key: string): T | null => {
    try {
        const cached = localStorage.getItem(`${CACHE_KEY}_${key}`);
        if (!cached) return null;
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_DURATION) {
            localStorage.removeItem(`${CACHE_KEY}_${key}`);
            return null;
        }
        return data;
    } catch {
        return null;
    }
};

const setCachedData = <T,>(key: string, data: T): void => {
    try {
        localStorage.setItem(`${CACHE_KEY}_${key}`, JSON.stringify({
            data,
            timestamp: Date.now(),
        }));
    } catch {
        // localStorage might be full or unavailable
    }
};

const GitHubStats = () => {
    const [repoData, setRepoData] = useState<GitHubData | null>(null);
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [recentCommits, setRecentCommits] = useState<Commit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check cache first
                const cachedRepo = getCachedData<GitHubData>('repo');
                const cachedContributors = getCachedData<Contributor[]>('contributors');
                const cachedCommits = getCachedData<Commit[]>('commits');

                if (cachedRepo && cachedContributors && cachedCommits) {
                    setRepoData(cachedRepo);
                    setContributors(cachedContributors);
                    setRecentCommits(cachedCommits);
                    setLoading(false);
                    return;
                }

                const [repoRes, contributorsRes, commitsRes] = await Promise.all([
                    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`),
                    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=5`),
                    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=5`),
                ]);

                if (!repoRes.ok || !contributorsRes.ok || !commitsRes.ok) {
                    throw new Error('Failed to fetch GitHub data');
                }

                const repo = await repoRes.json();
                const contribs = await contributorsRes.json();
                const commits = await commitsRes.json();

                setRepoData(repo);
                setContributors(contribs);
                setRecentCommits(commits);

                // Cache the data
                setCachedData('repo', repo);
                setCachedData('contributors', contribs);
                setCachedData('commits', commits);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (loading) {
        return (
            <GlassCard hover={false} className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white">GitHub Stats</h3>
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
                    <h3 className="text-lg font-semibold text-white">GitHub Stats</h3>
                </div>
                <p className="text-gray-400 text-sm">{error}</p>
            </GlassCard>
        );
    }

    return (
        <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">GitHub Stats</h3>
                    <p className="text-xs text-gray-400">{REPO_OWNER}/{REPO_NAME}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-2xl font-bold text-white">{formatNumber(repoData?.stargazers_count || 0)}</span>
                    </div>
                    <span className="text-xs text-gray-400">Stars</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-2xl font-bold text-white">{formatNumber(repoData?.forks_count || 0)}</span>
                    </div>
                    <span className="text-xs text-gray-400">Forks</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-2xl font-bold text-white">{formatNumber(contributors.length)}</span>
                    </div>
                    <span className="text-xs text-gray-400">Contributors</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-2xl font-bold text-white">{formatNumber(repoData?.open_issues_count || 0)}</span>
                    </div>
                    <span className="text-xs text-gray-400">Open Issues</span>
                </div>
            </div>

            {/* Contributors */}
            {contributors.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Top Contributors</h4>
                    <div className="flex -space-x-2">
                        {contributors.slice(0, 5).map((contributor) => (
                            <a
                                key={contributor.login}
                                href={`https://github.com/${contributor.login}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group"
                            >
                                <img
                                    src={contributor.avatar_url}
                                    alt={contributor.login}
                                    className="w-8 h-8 rounded-full border-2 border-gray-800 group-hover:border-emerald-500 transition-colors"
                                />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {contributor.login}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Commits */}
            {recentCommits.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Recent Activity</h4>
                    <div className="space-y-2">
                        {recentCommits.slice(0, 3).map((commit) => (
                            <a
                                key={commit.sha}
                                href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/commit/${commit.sha}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-300 truncate group-hover:text-white transition-colors">
                                        {commit.commit.message.split('\n')[0]}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatDate(commit.commit.author.date)}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* View on GitHub Link */}
            <a
                href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-6 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/10 hover:border-emerald-500/30 transition-all"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
            </a>
        </GlassCard>
    );
};

export default GitHubStats;
