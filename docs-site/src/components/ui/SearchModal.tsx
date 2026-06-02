import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { searchIndex, SearchDocument } from '../../data/searchIndex';
import { useRecentSearches } from '../../hooks/useRecentSearches';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FilterType = 'all' | 'pages' | 'api' | 'examples';

const filterLabels: Record<FilterType, string> = {
    all: 'All',
    pages: 'Pages',
    api: 'API',
    examples: 'Examples',
};

const filterSections: Record<FilterType, string[]> = {
    all: [],
    pages: ['Getting Started', 'Models'],
    api: ['API Reference'],
    examples: ['Examples'],
};

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchDocument[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { recentSearches, addSearch, removeSearch, clearSearches } = useRecentSearches();

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

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            setQuery('');
            setResults([]);
            setSelectedIndex(0);
            setActiveFilter('all');
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        let searchResults = fuse.search(query, { limit: 20 });

        if (activeFilter !== 'all') {
            const allowedSections = filterSections[activeFilter];
            searchResults = searchResults.filter((r) =>
                allowedSections.includes(r.item.section)
            );
        }

        setResults(searchResults.map((result) => result.item));
        setSelectedIndex(0);
    }, [query, fuse, activeFilter]);

    const groupedResults = useMemo(() => {
        const groups: Record<string, SearchDocument[]> = {};
        results.forEach((result) => {
            if (!groups[result.section]) {
                groups[result.section] = [];
            }
            groups[result.section].push(result);
        });
        return groups;
    }, [results]);

    const flatResults = useMemo(() => {
        const flat: SearchDocument[] = [];
        Object.values(groupedResults).forEach((group) => {
            flat.push(...group);
        });
        return flat;
    }, [groupedResults]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex((prev) => Math.min(prev + 1, flatResults.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex((prev) => Math.max(prev - 1, 0));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (flatResults[selectedIndex]) {
                        addSearch(query);
                        navigate(flatResults[selectedIndex].path);
                        onClose();
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
                case 'Tab':
                    e.preventDefault();
                    const filters: FilterType[] = ['all', 'pages', 'api', 'examples'];
                    const currentIndex = filters.indexOf(activeFilter);
                    const nextIndex = e.shiftKey
                        ? (currentIndex - 1 + filters.length) % filters.length
                        : (currentIndex + 1) % filters.length;
                    setActiveFilter(filters[nextIndex]);
                    break;
            }
        },
        [flatResults, selectedIndex, navigate, onClose, query, addSearch, activeFilter]
    );

    const handleResultClick = (path: string) => {
        addSearch(query);
        navigate(path);
        onClose();
    };

    const handleRecentSearchClick = (search: string) => {
        setQuery(search);
    };

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

    const getSectionColor = (section: string) => {
        switch (section) {
            case 'Getting Started':
                return 'text-yellow-400';
            case 'API Reference':
                return 'text-primary-400';
            case 'Examples':
                return 'text-emerald-400';
            case 'Models':
                return 'text-purple-400';
            default:
                return 'text-gray-400';
        }
    };

    const getFlatIndex = (section: string, sectionIndex: number) => {
        let index = 0;
        for (const [sec, items] of Object.entries(groupedResults)) {
            if (sec === section) {
                return index + sectionIndex;
            }
            index += items.length;
        }
        return index;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
                <div className="relative w-full max-w-2xl bg-white/[0.05] backdrop-blur-[10px] rounded-2xl shadow-2xl border border-white/[0.1] overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.08]">
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
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-400 bg-white/[0.05] rounded border border-white/[0.1]">
                            ESC
                        </kbd>
                    </div>

                    <div className="flex gap-1 px-4 py-2 border-b border-white/[0.08]">
                        {(Object.keys(filterLabels) as FilterType[]).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                                    activeFilter === filter
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : 'text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent'
                                }`}
                            >
                                {filterLabels[filter]}
                            </button>
                        ))}
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto">
                        {query.trim() === '' ? (
                            <div className="px-4 py-6">
                                {recentSearches.length > 0 ? (
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Recent Searches
                                            </h4>
                                            <button
                                                onClick={clearSearches}
                                                className="text-xs text-gray-500 hover:text-white transition-colors"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                        <ul className="space-y-1">
                                            {recentSearches.map((search) => (
                                                <li key={search} className="group flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleRecentSearchClick(search)}
                                                        className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all duration-200"
                                                    >
                                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {search}
                                                    </button>
                                                    <button
                                                        onClick={() => removeSearch(search)}
                                                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-white transition-all"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
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
                                    </div>
                                )}

                                <div className="mt-6 pt-4 border-t border-white/[0.08]">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                        Suggestions
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['search songs', 'installation', 'album details', 'pagination', 'error handling'].map((suggestion) => (
                                            <button
                                                key={suggestion}
                                                onClick={() => setQuery(suggestion)}
                                                className="px-3 py-1.5 text-xs text-gray-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] rounded-full transition-all duration-200 border border-white/[0.08]"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-4 mt-6">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <kbd className="px-1.5 py-0.5 bg-white/[0.05] rounded border border-white/[0.1]">↑</kbd>
                                        <kbd className="px-1.5 py-0.5 bg-white/[0.05] rounded border border-white/[0.1]">↓</kbd>
                                        <span>to navigate</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <kbd className="px-1.5 py-0.5 bg-white/[0.05] rounded border border-white/[0.1]">Enter</kbd>
                                        <span>to select</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <kbd className="px-1.5 py-0.5 bg-white/[0.05] rounded border border-white/[0.1]">Tab</kbd>
                                        <span>to switch filter</span>
                                    </div>
                                </div>
                            </div>
                        ) : flatResults.length === 0 ? (
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
                                {activeFilter !== 'all' && (
                                    <p className="text-gray-600 text-xs mt-2">
                                        Try changing the filter or{' '}
                                        <button
                                            onClick={() => setActiveFilter('all')}
                                            className="text-green-400 hover:underline"
                                        >
                                            search all
                                        </button>
                                    </p>
                                )}
                            </div>
                        ) : (
                            <ul className="py-2">
                                {Object.entries(groupedResults).map(([section, items]) => (
                                    <li key={section}>
                                        <div className="px-4 py-2 flex items-center gap-2">
                                            <div className={getSectionColor(section)}>
                                                {getSectionIcon(section)}
                                            </div>
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                {section}
                                            </span>
                                        </div>
                                        {items.map((result, sectionIndex) => {
                                            const flatIndex = getFlatIndex(section, sectionIndex);
                                            return (
                                                <button
                                                    key={result.id}
                                                    onClick={() => handleResultClick(result.path)}
                                                    className={`w-full flex items-start gap-3 px-4 py-3 pl-10 text-left transition-all duration-200 ${
                                                        flatIndex === selectedIndex
                                                            ? 'bg-emerald-500/10 border-l-2 border-emerald-500'
                                                            : 'hover:bg-white/[0.05] border-l-2 border-transparent'
                                                    }`}
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-white font-medium truncate">
                                                                {result.title}
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
                                            );
                                        })}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {flatResults.length > 0 && (
                        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.08] bg-white/[0.02]">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white/[0.05] rounded border border-white/[0.1]">↑</kbd>
                                    <kbd className="px-1.5 py-0.5 bg-white/[0.05] rounded border border-white/[0.1]">↓</kbd>
                                    <span className="ml-1">navigate</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white/[0.05] rounded border border-white/[0.1]">Enter</kbd>
                                    <span className="ml-1">select</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white/[0.05] rounded border border-white/[0.1]">Tab</kbd>
                                    <span className="ml-1">filter</span>
                                </div>
                            </div>
                            <span className="text-xs text-gray-600">
                                {flatResults.length} result{flatResults.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
