import { useState, useEffect } from 'react';

const MOCK_STORAGE_KEY = 'saavn_playground_mocks';
const MOCK_MODE_KEY = 'saavn_playground_mock_mode';

const defaultMocks: Record<string, unknown> = {
    'search-songs': {
        total: 2,
        start: 0,
        results: [
            {
                id: '5WXAlMNt',
                title: 'Tum Hi Ho',
                subtitle: 'Arijit Singh - Aashiqui 2',
                type: 'song',
                image: 'https://c.saavncdn.com/702/Aashiqui-2-Hindi-2013-20221215173318-500x500.jpg',
                url: '/song/tum-hi-ho/Tum-Hi-Ho',
                language: 'hindi',
                duration: 262,
            },
            {
                id: 'abc123',
                title: 'Kesariya',
                subtitle: 'Arijit Singh - Brahmastra',
                type: 'song',
                image: 'https://c.saavncdn.com/888/Brahmastra-Hindi-2022-20220915172707-500x500.jpg',
                url: '/song/kesariya/Kesariya',
                language: 'hindi',
                duration: 295,
            },
        ],
    },
    'search-albums': {
        total: 1,
        start: 0,
        results: [
            {
                id: '1142502',
                title: 'Aashiqui 2',
                subtitle: 'Mithoon, Ankit Tiwari, Jeet Gannguli',
                type: 'album',
                image: 'https://c.saavncdn.com/702/Aashiqui-2-Hindi-2013-20221215173318-500x500.jpg',
                url: '/album/aashiqui-2/Aashiqui-2',
                language: 'hindi',
                year: 2013,
                song_count: 11,
            },
        ],
    },
    'search-artists': {
        total: 1,
        start: 0,
        results: [
            {
                id: '459320',
                title: 'Arijit Singh',
                type: 'artist',
                image: 'https://c.saavncdn.com/artists/Arijit_Singh_002_20241118062907_500x500.jpg',
                url: '/artist/arijit-singh-songs/aIm0VkaYViGXR0rycOQV6A',
                description: 'Indian playback singer',
                follower_count: '100M+',
            },
        ],
    },
    'search-playlists': {
        total: 1,
        start: 0,
        results: [
            {
                id: '839276881',
                title: 'Bollywood Hits',
                subtitle: 'JioSaavn',
                type: 'playlist',
                image: 'https://c.saavncdn.com/editorial/Bollywood-Hits_20240101_500x500.jpg',
                url: '/featured/bollywood-hits/839276881',
                language: 'hindi',
                song_count: 50,
            },
        ],
    },
    'song-details': {
        songs: [
            {
                id: '5WXAlMNt',
                title: 'Tum Hi Ho',
                subtitle: 'Arijit Singh',
                album: 'Aashiqui 2',
                year: 2013,
                duration: 262,
                language: 'hindi',
                has_lyrics: true,
                lyrics_id: 'lyrics_5WXAlMNt',
                image: 'https://c.saavncdn.com/702/Aashiqui-2-Hindi-2013-20221215173318-500x500.jpg',
                download_url: [
                    { quality: '12kbps', url: 'https://aac.saavncdn.com/702/abc123_12.mp4' },
                    { quality: '48kbps', url: 'https://aac.saavncdn.com/702/abc123_48.mp4' },
                    { quality: '96kbps', url: 'https://aac.saavncdn.com/702/abc123_96.mp4' },
                    { quality: '160kbps', url: 'https://aac.saavncdn.com/702/abc123_160.mp4' },
                    { quality: '320kbps', url: 'https://aac.saavncdn.com/702/abc123_320.mp4' },
                ],
            },
        ],
    },
    'album-details': {
        id: '1142502',
        title: 'Aashiqui 2',
        year: 2013,
        language: 'hindi',
        artist: 'Mithoon, Ankit Tiwari, Jeet Gannguli',
        image: 'https://c.saavncdn.com/702/Aashiqui-2-Hindi-2013-20221215173318-500x500.jpg',
        song_count: 11,
        songs: [
            { id: '5WXAlMNt', title: 'Tum Hi Ho', duration: 262 },
            { id: 'abc124', title: 'Sunn Raha Hai', duration: 312 },
            { id: 'abc125', title: 'Chahun Main Ya Naa', duration: 285 },
        ],
    },
    'artist-details': {
        id: '459320',
        name: 'Arijit Singh',
        image: 'https://c.saavncdn.com/artists/Arijit_Singh_002_20241118062907_500x500.jpg',
        bio: 'Indian playback singer known for romantic and soulful songs',
        follower_count: '100M+',
        top_songs: [
            { id: '5WXAlMNt', title: 'Tum Hi Ho', album: 'Aashiqui 2' },
            { id: 'abc126', title: 'Kesariya', album: 'Brahmastra' },
            { id: 'abc127', title: 'Apna Bana Le', album: 'Bhediya' },
        ],
        top_albums: [
            { id: '1142502', title: 'Aashiqui 2', year: 2013 },
            { id: 'abc128', title: 'Ae Dil Hai Mushkil', year: 2016 },
        ],
    },
    'artist-songs': {
        total: 2,
        start: 0,
        results: [
            { id: '5WXAlMNt', title: 'Tum Hi Ho', album: 'Aashiqui 2', duration: 262 },
            { id: 'abc126', title: 'Kesariya', album: 'Brahmastra', duration: 295 },
        ],
    },
    'artist-albums': {
        total: 2,
        start: 0,
        results: [
            { id: '1142502', title: 'Aashiqui 2', year: 2013, song_count: 11 },
            { id: 'abc128', title: 'Ae Dil Hai Mushkil', year: 2016, song_count: 8 },
        ],
    },
    'home-data': {
        modules: [
            { title: 'Trending Now', type: 'songs', items: [{ id: '5WXAlMNt', title: 'Tum Hi Ho' }] },
            { title: 'Top Playlists', type: 'playlists', items: [{ id: '839276881', title: 'Bollywood Hits' }] },
            { title: 'New Releases', type: 'albums', items: [{ id: '1142502', title: 'Aashiqui 2' }] },
            { title: 'Top Artists', type: 'artists', items: [{ id: '459320', title: 'Arijit Singh' }] },
        ],
    },
    'featured-playlists': {
        total: 2,
        start: 0,
        results: [
            { id: '839276881', title: 'Bollywood Hits', song_count: 50, image: '' },
            { id: '839276882', title: 'Chill Vibes', song_count: 30, image: '' },
        ],
    },
    'radio-stations': {
        modules: [
            { title: 'Radio Mirchi', type: 'radio', url: 'https://radio.saavn.com/mirchi' },
            { title: 'Radio City', type: 'radio', url: 'https://radio.saavn.com/city' },
        ],
    },
    'podcast-shows': {
        total: 2,
        start: 0,
        results: [
            { id: 'pod1', title: 'The Ranveer Show', subtitle: 'BeerBiceps', episodes: 500 },
            { id: 'pod2', title: 'Cyrus Says', subtitle: 'Cyrus Broacha', episodes: 200 },
        ],
    },
    'lyrics': {
        lyrics: 'Hum tere bin ab reh nahi sakte\nTere bina kya wajood mera\nHum tere bin ab reh nahi sakte\nTere bina kya wajood mera\n\nTujhse juda gar ho jayenge\nToh khud se hi ho jayenge juda',
        snippet: 'Hum tere bin ab reh nahi sakte...',
    },
};

export const loadCustomMocks = (): Record<string, unknown> => {
    try {
        const raw = localStorage.getItem(MOCK_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
};

export const saveCustomMocks = (mocks: Record<string, unknown>) => {
    try {
        localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(mocks));
    } catch {
        // ignore
    }
};

export const loadMockMode = (): boolean => {
    try {
        return localStorage.getItem(MOCK_MODE_KEY) === 'true';
    } catch {
        return false;
    }
};

export const saveMockMode = (enabled: boolean) => {
    try {
        localStorage.setItem(MOCK_MODE_KEY, String(enabled));
    } catch {
        // ignore
    }
};

export const getMockData = (endpointId: string): unknown => {
    const custom = loadCustomMocks();
    if (endpointId in custom) return custom[endpointId];
    return defaultMocks[endpointId] ?? { error: 'No mock data for this endpoint' };
};

export const getAllDefaultMocks = (): Record<string, unknown> => ({ ...defaultMocks });

interface MockResponseProps {
    endpointId: string;
    isMockMode: boolean;
    onToggleMockMode: (enabled: boolean) => void;
}

const MockResponse = ({ endpointId, isMockMode, onToggleMockMode }: MockResponseProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState('');
    const [hasCustomMock, setHasCustomMock] = useState(false);

    const customMocks = loadCustomMocks();

    useEffect(() => {
        setHasCustomMock(endpointId in customMocks);
    }, [endpointId]);

    const handleEdit = () => {
        const currentMock = getMockData(endpointId);
        setEditText(JSON.stringify(currentMock, null, 2));
        setIsEditing(true);
    };

    const handleSave = () => {
        try {
            const parsed = JSON.parse(editText);
            const custom = loadCustomMocks();
            custom[endpointId] = parsed;
            saveCustomMocks(custom);
            setHasCustomMock(true);
            setIsEditing(false);
        } catch {
            alert('Invalid JSON');
        }
    };

    const handleReset = () => {
        const custom = loadCustomMocks();
        delete custom[endpointId];
        saveCustomMocks(custom);
        setHasCustomMock(false);
        setIsEditing(false);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">Mock Mode</span>
                    {hasCustomMock && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/20 text-amber-400">
                            Custom
                        </span>
                    )}
                </div>
                <button
                    onClick={() => onToggleMockMode(!isMockMode)}
                    className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                        isMockMode
                            ? 'bg-emerald-500/40 border-emerald-500/60'
                            : 'bg-white/10 border-white/20'
                    } border`}
                >
                    <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${
                            isMockMode
                                ? 'left-[22px] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                                : 'left-0.5 bg-gray-400'
                        }`}
                    />
                </button>
            </div>

            {isMockMode && (
                <div className="space-y-2">
                    <p className="text-xs text-gray-600">
                        Mock data will be returned instead of hitting the API
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleEdit}
                            className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-gray-200 hover:bg-white/[0.08] transition-all"
                        >
                            {hasCustomMock ? 'Edit Mock' : 'Customize Mock'}
                        </button>
                        {hasCustomMock && (
                            <button
                                onClick={handleReset}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    {isEditing && (
                        <div className="space-y-2">
                            <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-full h-48 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-gray-300 resize-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 outline-none"
                                spellCheck={false}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-all"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MockResponse;
