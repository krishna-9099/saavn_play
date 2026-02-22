import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { searchIndex, SearchDocument } from '../../data/searchIndex';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchDocument[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Initialize Fuse.js
    const fuse = useRef<Fuse<SearchDocument>>(
        new Fuse(searchIndex, {
            keys: [
                { name: 'title', weight: 0.4 },
                { name: 'description', weight: 0.3 },
                { name: 'keywords', weight: 0.2 },
                { name: 'section', weight: 0.1 },
            ],
            threshold: 0.4,
            includeScore: true,
            ignoreLocation: true,
            minMatchCharLength: 2,
        })
    ).current;

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            setQuery('');
            setResults([]);
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Handle search
    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const searchResults = fuse.search(query, { limit: 8 });
        setResults(searchResults.map((result) => result.item));
        setSelectedIndex(0);
    }, [query, fuse]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex((prev) => Math.max(prev - 1, 0));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (results[selectedIndex]) {
                        navigate(results[selectedIndex].path);
                        onClose();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
            }
        },
        [results, selectedIndex, navigate, onClose]
    );

    // Handle result click
    const handleResultClick = (path: string) => {
        navigate(path);
        onClose();
    };

    // Get section icon
    const getSectionIcon = (section: string) => {
        switch (section) {
            case 'Getting Started':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                );
            case 'API Reference':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                );
            case 'Examples':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                );
            case 'Models':
                return (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                );
            default:
                return null;
        }
    };

    // Get section color
    const getSectionColor = (section: string) => {
        switch (section) {
            case 'Getting Started':
                return 'text-yellow-400';
            case 'API Reference':
                return 'text-primary-400';
            case 'Examples':
                return 'text-green-400';
            case 'Models':
                return 'text-purple-400';
            default:
                return 'text-gray-400';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
                <div className="relative w-full max-w-2xl bg-[#1a1a2e] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                        <svg
                            className="w-5 h-5 text-gray-400 flex-shrink-0"
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
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search documentation..."
                            className="flex-1 bg-transparent text-white text-lg placeholder-gray-500 outline-none"
                        />
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded border border-white/10">
                            ESC
                        </kbd>
                    </div>

                    {/* Results */}
                    <div className="max-h-[60vh] overflow-y-auto">
                        {query.trim() === '' ? (
                            <div className="px-4 py-12 text-center">
                                <svg
                                    className="w-12 h-12 mx-auto text-gray-600 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <p className="text-gray-500 text-sm">
                                    Start typing to search the documentation
                                </p>
                                <div className="flex items-center justify-center gap-4 mt-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↑</kbd>
                                        <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↓</kbd>
                                        <span>to navigate</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">Enter</kbd>
                                        <span>to select</span>
                                    </div>
                                </div>
                            </div>
                        ) : results.length === 0 ? (
                            <div className="px-4 py-12 text-center">
                                <svg
                                    className="w-12 h-12 mx-auto text-gray-600 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p className="text-gray-500 text-sm">
                                    No results found for "{query}"
                                </p>
                            </div>
                        ) : (
                            <ul className="py-2">
                                {results.map((result, index) => (
                                    <li key={result.id}>
                                        <button
                                            onClick={() => handleResultClick(result.path)}
                                            className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors ${index === selectedIndex
                                                    ? 'bg-primary-500/10 border-l-2 border-primary-500'
                                                    : 'hover:bg-white/5 border-l-2 border-transparent'
                                                }`}
                                        >
                                            <div className={`mt-0.5 ${getSectionColor(result.section)}`}>
                                                {getSectionIcon(result.section)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-medium truncate">
                                                        {result.title}
                                                    </span>
                                                    <span className={`text-xs px-1.5 py-0.5 rounded ${getSectionColor(result.section)} bg-white/5`}>
                                                        {result.section}
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">
                                                    {result.description}
                                                </p>
                                            </div>
                                            <svg
                                                className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {results.length > 0 && (
                        <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-white/[0.02]">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↑</kbd>
                                    <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">↓</kbd>
                                    <span className="ml-1">to navigate</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">Enter</kbd>
                                    <span className="ml-1">to select</span>
                                </div>
                            </div>
                            <span className="text-xs text-gray-600">
                                {results.length} result{results.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
