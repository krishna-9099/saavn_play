import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface ResponseSearchProps {
    onSearch: (query: string) => void;
    onNavigate: (direction: 'prev' | 'next') => void;
    matchCount: number;
    currentMatch: number;
    onClose: () => void;
}

const ResponseSearch = ({ onSearch, onNavigate, matchCount, currentMatch, onClose }: ResponseSearchProps) => {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 300);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery, onSearch]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                onNavigate(e.shiftKey ? 'prev' : 'next');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNavigate]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }, []);

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border-b border-white/[0.08]">
            <div className="relative flex-1">
                <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search in response..."
                    className="w-full pl-9 pr-3 py-1.5 bg-white/[0.05] border border-white/[0.1] rounded-lg text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all"
                />
            </div>
            {query && (
                <>
                    <span className="text-xs text-gray-500 min-w-[80px] text-center">
                        {matchCount > 0 ? `${currentMatch} of ${matchCount}` : 'No matches'}
                    </span>
                    <button
                        onClick={() => onNavigate('prev')}
                        disabled={matchCount === 0}
                        className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Previous match (Shift+Enter)"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => onNavigate('next')}
                        disabled={matchCount === 0}
                        className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Next match (Enter)"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </>
            )}
            <button
                onClick={onClose}
                className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                title="Close search (Esc)"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default ResponseSearch;
