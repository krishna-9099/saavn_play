import { Endpoint, ExampleRequest } from './types';

const BASE_URL = 'https://www.jiosaavn.com/api.php';
const COMMON_PARAMS = '_format=json&_marker=0&ctx=web6dot0&api_version=4';

const buildUrl = (call: string, params: Record<string, string> = {}): string => {
    const searchParams = new URLSearchParams(COMMON_PARAMS);
    searchParams.set('__call', call);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== '' && value !== undefined) {
            searchParams.set(key, value);
        }
    });
    return `${BASE_URL}?${searchParams.toString()}`;
};

export const endpoints: Endpoint[] = [
    {
        id: 'search-songs',
        name: 'Search Songs',
        category: 'Search',
        call: 'search.getResults',
        description: 'Search for songs by query',
        params: [
            { name: 'q', label: 'Query', type: 'text', placeholder: 'e.g. Tum Hi Ho', required: true },
            { name: 'p', label: 'Page', type: 'number', placeholder: '1', defaultValue: '1' },
            { name: 'n', label: 'Limit', type: 'number', placeholder: '10', defaultValue: '10' },
        ],
        urlBuilder: (params) => buildUrl('search.getResults', params),
    },
    {
        id: 'search-albums',
        name: 'Search Albums',
        category: 'Search',
        call: 'search.getAlbumResults',
        description: 'Search for albums by query',
        params: [
            { name: 'q', label: 'Query', type: 'text', placeholder: 'e.g. Bangerz', required: true },
            { name: 'p', label: 'Page', type: 'number', placeholder: '1', defaultValue: '1' },
            { name: 'n', label: 'Limit', type: 'number', placeholder: '10', defaultValue: '10' },
        ],
        urlBuilder: (params) => buildUrl('search.getAlbumResults', params),
    },
    {
        id: 'search-artists',
        name: 'Search Artists',
        category: 'Search',
        call: 'search.getArtistResults',
        description: 'Search for artists by query',
        params: [
            { name: 'q', label: 'Query', type: 'text', placeholder: 'e.g. Arijit Singh', required: true },
            { name: 'p', label: 'Page', type: 'number', placeholder: '1', defaultValue: '1' },
            { name: 'n', label: 'Limit', type: 'number', placeholder: '10', defaultValue: '10' },
        ],
        urlBuilder: (params) => buildUrl('search.getArtistResults', params),
    },
    {
        id: 'search-playlists',
        name: 'Search Playlists',
        category: 'Search',
        call: 'search.getPlaylistResults',
        description: 'Search for playlists by query',
        params: [
            { name: 'q', label: 'Query', type: 'text', placeholder: 'e.g. Bollywood Hits', required: true },
            { name: 'p', label: 'Page', type: 'number', placeholder: '1', defaultValue: '1' },
            { name: 'n', label: 'Limit', type: 'number', placeholder: '10', defaultValue: '10' },
        ],
        urlBuilder: (params) => buildUrl('search.getPlaylistResults', params),
    },
    {
        id: 'song-details',
        name: 'Song Details',
        category: 'Songs',
        call: 'song.getDetails',
        description: 'Get detailed information about songs by ID',
        params: [
            { name: 'pids', label: 'Song IDs', type: 'text', placeholder: 'e.g. 5WXAlMNt', required: true },
        ],
        urlBuilder: (params) => buildUrl('song.getDetails', params),
    },
    {
        id: 'album-details',
        name: 'Album Details',
        category: 'Albums',
        call: 'content.getAlbumDetails',
        description: 'Get album details with track listing',
        params: [
            { name: 'albumid', label: 'Album ID', type: 'text', placeholder: 'e.g. 1142502', required: true },
        ],
        urlBuilder: (params) => buildUrl('content.getAlbumDetails', params),
    },
    {
        id: 'artist-details',
        name: 'Artist Details',
        category: 'Artists',
        call: 'artist.getArtistPageDetails',
        description: 'Get artist page with top songs and albums',
        params: [
            { name: 'artistId', label: 'Artist ID', type: 'text', placeholder: 'e.g. 459320', required: true },
        ],
        urlBuilder: (params) => buildUrl('artist.getArtistPageDetails', params),
    },
    {
        id: 'artist-songs',
        name: 'Artist Songs',
        category: 'Artists',
        call: 'artist.getArtistMoreSong',
        description: 'Get more songs by an artist',
        params: [
            { name: 'artistId', label: 'Artist ID', type: 'text', placeholder: 'e.g. 459320', required: true },
            { name: 'page', label: 'Page', type: 'number', placeholder: '1', defaultValue: '1' },
            { name: 'language', label: 'Language', type: 'select', options: [
                { label: 'All', value: '' },
                { label: 'Hindi', value: 'hindi' },
                { label: 'English', value: 'english' },
                { label: 'Tamil', value: 'tamil' },
                { label: 'Telugu', value: 'telugu' },
                { label: 'Punjabi', value: 'punjabi' },
                { label: 'Marathi', value: 'marathi' },
                { label: 'Bengali', value: 'bengali' },
                { label: 'Kannada', value: 'kannada' },
                { label: 'Malayalam', value: 'malayalam' },
            ]},
        ],
        urlBuilder: (params) => buildUrl('artist.getArtistMoreSong', params),
    },
    {
        id: 'artist-albums',
        name: 'Artist Albums',
        category: 'Artists',
        call: 'artist.getArtistMoreAlbum',
        description: 'Get more albums by an artist',
        params: [
            { name: 'artistId', label: 'Artist ID', type: 'text', placeholder: 'e.g. 459320', required: true },
            { name: 'page', label: 'Page', type: 'number', placeholder: '1', defaultValue: '1' },
        ],
        urlBuilder: (params) => buildUrl('artist.getArtistMoreAlbum', params),
    },
    {
        id: 'home-data',
        name: 'Home / Launch Data',
        category: 'Home',
        call: 'webapi.getLaunchData',
        description: 'Get homepage data with charts, playlists, and radio modules',
        params: [],
        urlBuilder: () => buildUrl('webapi.getLaunchData'),
    },
    {
        id: 'featured-playlists',
        name: 'Featured Playlists',
        category: 'Home',
        call: 'content.getFeaturedPlaylists',
        description: 'Get curated featured playlists',
        params: [
            { name: 'n', label: 'Limit', type: 'number', placeholder: '10', defaultValue: '10' },
            { name: 'p', label: 'Page', type: 'number', placeholder: '1', defaultValue: '1' },
        ],
        urlBuilder: (params) => buildUrl('content.getFeaturedPlaylists', params),
    },
    {
        id: 'radio-stations',
        name: 'Radio Stations',
        category: 'Radio',
        call: 'content.getBrowseModules',
        description: 'Get browse modules including radio stations',
        params: [],
        urlBuilder: () => buildUrl('content.getBrowseModules'),
    },
    {
        id: 'podcast-shows',
        name: 'Top Podcast Shows',
        category: 'Podcasts',
        call: 'content.getTopShows',
        description: 'Get top podcast shows',
        params: [
            { name: 'n', label: 'Limit', type: 'number', placeholder: '10', defaultValue: '10' },
            { name: 'p', label: 'Page', type: 'number', placeholder: '1', defaultValue: '1' },
        ],
        urlBuilder: (params) => buildUrl('content.getTopShows', params),
    },
    {
        id: 'lyrics',
        name: 'Lyrics',
        category: 'Songs',
        call: 'lyrics.getLyrics',
        description: 'Get lyrics for a song by ID',
        params: [
            { name: 'lyrics_id', label: 'Lyrics ID', type: 'text', placeholder: 'e.g. 5WXAlMNt', required: true },
        ],
        urlBuilder: (params) => buildUrl('lyrics.getLyrics', params),
    },
];

export const categories = [...new Set(endpoints.map((e) => e.category))];

export const exampleRequests: ExampleRequest[] = [
    {
        id: 'ex-1',
        label: 'Search for Arijit Singh',
        description: 'Search songs by a popular Bollywood singer',
        endpointId: 'search-songs',
        params: { q: 'Arijit Singh', p: '1', n: '5' },
    },
    {
        id: 'ex-2',
        label: 'Search for Tum Hi Ho',
        description: 'Find the iconic Aashiqui 2 song',
        endpointId: 'search-songs',
        params: { q: 'Tum Hi Ho', p: '1', n: '5' },
    },
    {
        id: 'ex-3',
        label: 'Get album details',
        description: 'Fetch details for album ID 1142502',
        endpointId: 'album-details',
        params: { albumid: '1142502' },
    },
    {
        id: 'ex-4',
        label: 'Artist page - Arijit Singh',
        description: 'Get Arijit Singh\'s artist page',
        endpointId: 'artist-details',
        params: { artistId: '459320' },
    },
    {
        id: 'ex-5',
        label: 'Home page data',
        description: 'Fetch the JioSaavn homepage launch data',
        endpointId: 'home-data',
        params: {},
    },
    {
        id: 'ex-6',
        label: 'Top podcasts',
        description: 'Get top 5 podcast shows',
        endpointId: 'podcast-shows',
        params: { n: '5', p: '1' },
    },
    {
        id: 'ex-7',
        label: 'Featured playlists',
        description: 'Browse curated playlists',
        endpointId: 'featured-playlists',
        params: { n: '5', p: '1' },
    },
    {
        id: 'ex-8',
        label: 'Search for Diljit Dosanjh',
        description: 'Search songs by a Punjabi artist',
        endpointId: 'search-songs',
        params: { q: 'Diljit Dosanjh', p: '1', n: '5' },
    },
];

export const getEndpointById = (id: string): Endpoint | undefined =>
    endpoints.find((e) => e.id === id);
