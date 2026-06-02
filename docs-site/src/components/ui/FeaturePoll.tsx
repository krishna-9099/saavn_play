import { useState, useEffect, useCallback } from 'react';
import GlassCard from './GlassCard';

interface PollOption {
    id: string;
    label: string;
    icon: string;
}

const POLL_OPTIONS: PollOption[] = [
    { id: 'lyrics-sync', label: 'Synced Lyrics', icon: '🎵' },
    { id: 'offline-mode', label: 'Offline Mode', icon: '📥' },
    { id: 'playlist-export', label: 'Playlist Export', icon: '📋' },
    { id: 'audio-quality', label: 'Lossless Audio', icon: '🎧' },
    { id: 'social-sharing', label: 'Social Features', icon: '👥' },
    { id: 'ai-recommend', label: 'AI Recommendations', icon: '🤖' },
];

const STORAGE_KEY = 'saavn_play_feature_votes';

interface Votes {
    [key: string]: number;
}

const FeaturePoll = () => {
    const [votes, setVotes] = useState<Votes>({});
    const [userVote, setUserVote] = useState<string | null>(null);
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setVotes(parsed.votes || {});
                setUserVote(parsed.userVote || null);
                setHasVoted(!!parsed.userVote);
            }
        } catch {
            // Ignore parsing errors
        }
    }, []);

    const handleVote = useCallback((optionId: string) => {
        if (hasVoted) return;

        const newVotes = { ...votes };
        newVotes[optionId] = (newVotes[optionId] || 0) + 1;

        setVotes(newVotes);
        setUserVote(optionId);
        setHasVoted(true);

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ votes: newVotes, userVote: optionId })
            );
        } catch {
            // Ignore storage errors
        }
    }, [votes, hasVoted]);

    const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

    const getPercentage = (optionId: string) => {
        if (totalVotes === 0) return 0;
        return Math.round(((votes[optionId] || 0) / totalVotes) * 100);
    };

    const sortedOptions = [...POLL_OPTIONS].sort(
        (a, b) => (votes[b.id] || 0) - (votes[a.id] || 0)
    );

    return (
        <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Feature Poll</h3>
                <span className="ml-auto text-xs text-gray-500">
                    {totalVotes} vote{totalVotes !== 1 ? 's' : ''}
                </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
                Vote for the next feature you want to see!
            </p>

            <div className="space-y-3">
                {sortedOptions.map((option) => {
                    const percentage = getPercentage(option.id);
                    const isUserVote = userVote === option.id;
                    const voteCount = votes[option.id] || 0;

                    return (
                        <button
                            key={option.id}
                            onClick={() => handleVote(option.id)}
                            disabled={hasVoted}
                            className={`w-full text-left p-3 rounded-xl border transition-all ${
                                hasVoted
                                    ? isUserVote
                                        ? 'bg-emerald-500/10 border-emerald-500/30'
                                        : 'bg-white/[0.02] border-white/[0.05]'
                                    : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] cursor-pointer'
                            }`}
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <span className="text-lg">{option.icon}</span>
                                <span className={`text-sm font-medium flex-1 ${isUserVote ? 'text-emerald-400' : 'text-white'}`}>
                                    {option.label}
                                </span>
                                {hasVoted && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">
                                            {voteCount} vote{voteCount !== 1 ? 's' : ''}
                                        </span>
                                        <span className={`text-sm font-bold ${isUserVote ? 'text-emerald-400' : 'text-gray-400'}`}>
                                            {percentage}%
                                        </span>
                                    </div>
                                )}
                                {isUserVote && (
                                    <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                )}
                            </div>
                            {hasVoted && (
                                <div className="mt-2 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                                            isUserVote
                                                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500'
                                                : 'bg-white/[0.1]'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {hasVoted && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => {
                            setVotes({});
                            setUserVote(null);
                            setHasVoted(false);
                            localStorage.removeItem(STORAGE_KEY);
                        }}
                        className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                    >
                        Reset vote
                    </button>
                </div>
            )}
        </GlassCard>
    );
};

export default FeaturePoll;
