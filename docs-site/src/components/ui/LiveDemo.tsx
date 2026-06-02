import { useState, useCallback } from 'react';
import GlassCard from './GlassCard';

interface SearchResult {
    id: string;
    title: string;
    artist: string;
    image: string;
    duration: string;
    previewUrl?: string;
}

const SAMPLE_RESULTS: SearchResult[] = [
    {
        id: '1',
        title: 'Malibu',
        artist: 'Miley Cyrus',
        image: '',
        duration: '3:45',
    },
    {
        id: '2',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        image: '',
        duration: '3:20',
    },
    {
        id: '3',
        title: 'Shape of You',
        artist: 'Ed Sheeran',
        image: '',
        duration: '3:53',
    },
    {
        id: '4',
        title: 'Levitating',
        artist: 'Dua Lipa',
        image: '',
        duration: '3:23',
    },
    {
        id: '5',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        image: '',
        duration: '5:55',
    },
];

const LiveDemo = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [playingId, setPlayingId] = useState<string | null>(null);

    const handleSearch = useCallback(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        setTimeout(() => {
            const filtered = SAMPLE_RESULTS.filter(
                (r) =>
                    r.title.toLowerCase().includes(query.toLowerCase()) ||
                    r.artist.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered.length > 0 ? filtered : SAMPLE_RESULTS.slice(0, 3));
            setIsSearching(false);
        }, 500);
    }, [query]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const togglePlay = (id: string) => {
        setPlayingId(playingId === id ? null : id);
    };

    return (
        <GlassCard hover={false} className="p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Live Demo</h3>
                <span className="ml-auto text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                    Try it!
                </span>
            </div>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for songs..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                />
                <button
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-medium hover:bg-emerald-500/30 hover:border-emerald-400/50 disabled:opacity-50 transition-all"
                >
                    {isSearching ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : (
                        'Search'
                    )}
                </button>
            </div>

            {results.length > 0 && (
                <div className="space-y-2">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        {results.length} results found
                    </div>
                    {results.map((result) => (
                        <div
                            key={result.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] hover:border-white/[0.1] transition-all group"
                        >
                            <button
                                onClick={() => togglePlay(result.id)}
                                className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/30 transition-all flex-shrink-0"
                            >
                                {playingId === result.id ? (
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">
                                    {result.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {result.artist}
                                </div>
                            </div>
                            <span className="text-xs text-gray-600">{result.duration}</span>
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {results.length === 0 && !isSearching && (
                <div className="text-center py-6 text-gray-600">
                    <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <p className="text-sm">Type a song name and hit Search</p>
                </div>
            )}

            {playingId && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-emerald-400 rounded-full animate-pulse"
                                    style={{
                                        height: `${12 + Math.random() * 12}px`,
                                        animationDelay: `${i * 100}ms`,
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-emerald-400">
                            Preview not available in demo mode
                        </span>
                    </div>
                </div>
            )}
        </GlassCard>
    );
};

export default LiveDemo;
