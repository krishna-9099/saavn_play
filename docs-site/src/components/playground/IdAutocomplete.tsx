import { useState, useEffect, useRef, useMemo } from 'react';

const ID_STORAGE_KEY = 'saavn_playground_ids';
const MAX_IDS = 100;

interface StoredIds {
    songs: string[];
    albums: string[];
    artists: string[];
    playlists: string[];
}

interface IdAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    placeholder?: string;
    idType?: 'songs' | 'albums' | 'artists' | 'playlists' | 'auto';
    className?: string;
}

const loadStoredIds = (): StoredIds => {
    try {
        const raw = localStorage.getItem(ID_STORAGE_KEY);
        return raw ? JSON.parse(raw) : { songs: [], albums: [], artists: [], playlists: [] };
    } catch {
        return { songs: [], albums: [], artists: [], playlists: [] };
    }
};

const saveStoredIds = (ids: StoredIds) => {
    try {
        localStorage.setItem(ID_STORAGE_KEY, JSON.stringify(ids));
    } catch {
        // ignore
    }
};

export const extractIdsFromResponse = (data: unknown, url: string): Partial<StoredIds> => {
    const ids: Partial<StoredIds> = {};

    const findIds = (obj: unknown, path: string = '') => {
        if (!obj || typeof obj !== 'object') return;

        if (Array.isArray(obj)) {
            obj.forEach((item, i) => findIds(item, `${path}[${i}]`));
            return;
        }

        const record = obj as Record<string, unknown>;
        for (const [key, value] of Object.entries(record)) {
            const currentPath = path ? `${path}.${key}` : key;

            if (key === 'id' && typeof value === 'string' && value.length > 5) {
                if (currentPath.includes('song') || url.includes('song')) {
                    if (!ids.songs) ids.songs = [];
                    if (!ids.songs.includes(value)) ids.songs.push(value);
                } else if (currentPath.includes('album') || url.includes('album')) {
                    if (!ids.albums) ids.albums = [];
                    if (!ids.albums.includes(value)) ids.albums.push(value);
                } else if (currentPath.includes('artist') || url.includes('artist')) {
                    if (!ids.artists) ids.artists = [];
                    if (!ids.artists.includes(value)) ids.artists.push(value);
                } else if (currentPath.includes('playlist') || url.includes('playlist')) {
                    if (!ids.playlists) ids.playlists = [];
                    if (!ids.playlists.includes(value)) ids.playlists.push(value);
                }
            }

            if (typeof value === 'object' && value !== null) {
                findIds(value, currentPath);
            }
        }
    };

    findIds(data);
    return ids;
};

export const storeIds = (newIds: Partial<StoredIds>) => {
    const existing = loadStoredIds();

    for (const [key, values] of Object.entries(newIds)) {
        const category = key as keyof StoredIds;
        if (!existing[category]) existing[category] = [];

        for (const id of values || []) {
            if (!existing[category].includes(id)) {
                existing[category].unshift(id);
                if (existing[category].length > MAX_IDS) {
                    existing[category] = existing[category].slice(0, MAX_IDS);
                }
            }
        }
    }

    saveStoredIds(existing);
};

const IdAutocomplete = ({
    value,
    onChange,
    onKeyDown,
    placeholder,
    idType = 'auto',
    className = '',
}: IdAutocompleteProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const allIds = useMemo(() => {
        const stored = loadStoredIds();
        if (idType === 'auto') {
            return [
                ...stored.songs.map((id) => ({ id, type: 'song' })),
                ...stored.albums.map((id) => ({ id, type: 'album' })),
                ...stored.artists.map((id) => ({ id, type: 'artist' })),
                ...stored.playlists.map((id) => ({ id, type: 'playlist' })),
            ];
        }
        return (stored[idType] || []).map((id) => ({ id, type: idType.slice(0, -1) }));
    }, [idType, value]);

    const suggestions = useMemo(() => {
        if (!value || value.length < 2) return allIds.slice(0, 8);
        const lower = value.toLowerCase();
        return allIds
            .filter((item) => item.id.toLowerCase().includes(lower))
            .slice(0, 8);
    }, [value, allIds]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (id: string) => {
        onChange(id);
        setIsOpen(false);
        setFocusedIndex(-1);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' && suggestions.length > 0) {
                setIsOpen(true);
                setFocusedIndex(0);
                e.preventDefault();
                return;
            }
            onKeyDown?.(e);
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
                break;
            case 'Enter':
                if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
                    e.preventDefault();
                    handleSelect(suggestions[focusedIndex].id);
                } else {
                    onKeyDown?.(e);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setFocusedIndex(-1);
                break;
            default:
                onKeyDown?.(e);
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'song':
                return 'text-emerald-400 bg-emerald-500/20';
            case 'album':
                return 'text-blue-400 bg-blue-500/20';
            case 'artist':
                return 'text-purple-400 bg-purple-500/20';
            case 'playlist':
                return 'text-orange-400 bg-orange-500/20';
            default:
                return 'text-gray-400 bg-gray-500/20';
        }
    };

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    if (e.target.value.length >= 2) setIsOpen(true);
                }}
                onFocus={() => {
                    if (suggestions.length > 0) setIsOpen(true);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                className={className}
            />

            {isOpen && suggestions.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-1 rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/[0.1] shadow-2xl overflow-hidden"
                >
                    <div className="p-1.5 max-h-[240px] overflow-y-auto">
                        {suggestions.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item.id)}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                                    index === focusedIndex
                                        ? 'bg-white/[0.1] text-white'
                                        : 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-200'
                                }`}
                            >
                                <span
                                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase ${getTypeColor(item.type)}`}
                                >
                                    {item.type}
                                </span>
                                <span className="text-sm font-mono truncate">{item.id}</span>
                            </button>
                        ))}
                    </div>
                    <div className="px-3 py-2 border-t border-white/[0.08] bg-white/[0.02]">
                        <p className="text-[10px] text-gray-600">
                            ↑↓ navigate · Enter select · Esc close
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IdAutocomplete;
