// Search index for documentation content
// This file contains all searchable content from the documentation

export interface SearchDocument {
    id: string;
    title: string;
    description: string;
    path: string;
    section: 'Getting Started' | 'API Reference' | 'Examples' | 'Models';
    keywords: string[];
}

export const searchIndex: SearchDocument[] = [
    // Getting Started
    {
        id: 'home',
        title: 'Home',
        description: 'Welcome to saavn_play documentation. A powerful Dart package for interacting with the JioSaavn API.',
        path: '/',
        section: 'Getting Started',
        keywords: ['home', 'welcome', 'introduction', 'overview'],
    },
    {
        id: 'installation',
        title: 'Installation',
        description: 'Install saavn_play package. Add dependency to pubspec.yaml. Requires Dart SDK ^3.0.0 or Flutter ^3.0.0. Current docs target v1.2.0.',
        path: '/installation',
        section: 'Getting Started',
        keywords: ['install', 'setup', 'getting started', 'pubspec', 'dependency', 'dart pub get'],
    },
    {
        id: 'examples',
        title: 'Examples',
        description: 'Code examples for using saavn_play. Search songs, get album details, fetch lyrics, and more.',
        path: '/examples',
        section: 'Examples',
        keywords: ['example', 'code', 'usage', 'demo', 'sample'],
    },

    // API Reference
    {
        id: 'api-reference',
        title: 'API Reference',
        description: 'Complete API reference for saavn_play. Overview of all endpoints and client usage.',
        path: '/api-reference',
        section: 'API Reference',
        keywords: ['api', 'reference', 'client', 'endpoints', 'overview'],
    },
    {
        id: 'search-api',
        title: 'Search API',
        description: 'Search for songs, albums, artists, and playlists. Supports pagination and filtering by content type.',
        path: '/api/search',
        section: 'API Reference',
        keywords: ['search', 'songs', 'albums', 'artists', 'playlists', 'query', 'find', 'filter'],
    },
    {
        id: 'song-api',
        title: 'Song API',
        description: 'Retrieve detailed song information by ID. Returns a map keyed by song IDs.',
        path: '/api/song',
        section: 'API Reference',
        keywords: ['song', 'music', 'track', 'details', 'ids', 'map response'],
    },
    {
        id: 'album-api',
        title: 'Album API',
        description: 'Get album details with full track listings, cover art, artist information, and metadata.',
        path: '/api/album',
        section: 'API Reference',
        keywords: ['album', 'tracks', 'songs', 'cover', 'art', 'artist', 'year', 'language'],
    },
    {
        id: 'artist-api',
        title: 'Artist API',
        description: 'Access artist profiles, artist songs/albums, and typed ArtistPageDetails.',
        path: '/api/artist',
        section: 'API Reference',
        keywords: ['artist', 'profile', 'top songs', 'albums', 'biography', 'followers', 'artist page details'],
    },
    {
        id: 'home-api',
        title: 'Home API',
        description: 'Fetch launch data including trending, top playlists, charts, and dynamic modules.',
        path: '/api/home',
        section: 'API Reference',
        keywords: ['home', 'launch data', 'trending', 'charts', 'modules', 'dynamic sections'],
    },
    {
        id: 'podcast-api',
        title: 'Podcast API',
        description: 'Discover top podcast shows with page and limit controls.',
        path: '/api/podcast',
        section: 'API Reference',
        keywords: ['podcast', 'shows', 'top shows', 'page', 'limit'],
    },
    {
        id: 'radio-api',
        title: 'Radio API',
        description: 'Access featured stations, create station sessions, and fetch station songs.',
        path: '/api/radio',
        section: 'API Reference',
        keywords: ['radio', 'station', 'featured', 'music discovery', 'create station', 'station songs'],
    },

    // Models
    {
        id: 'models',
        title: 'Data Models',
        description: 'Documentation for all data models: Song, Album, Artist, Playlist, Lyrics, Search results.',
        path: '/models',
        section: 'Models',
        keywords: ['model', 'data', 'type', 'structure', 'response', 'song', 'album', 'artist', 'playlist'],
    },
    {
        id: 'model-song',
        title: 'Song Model',
        description: 'Song response model with fields: name, album, artists, duration, downloadUrl, hasLyrics, lyrics.',
        path: '/models#song',
        section: 'Models',
        keywords: ['song', 'model', 'name', 'album', 'artists', 'duration', 'download', 'lyrics'],
    },
    {
        id: 'model-album',
        title: 'Album Model',
        description: 'Album response model with fields: name, artists, songs, year, language, images.',
        path: '/models#album',
        section: 'Models',
        keywords: ['album', 'model', 'name', 'artists', 'songs', 'year', 'language', 'images'],
    },
    {
        id: 'model-artist',
        title: 'Artist Model',
        description: 'Artist response model with fields: name, followerCount, images, topSongs, albums.',
        path: '/models#artist',
        section: 'Models',
        keywords: ['artist', 'model', 'name', 'followers', 'images', 'top songs', 'albums'],
    },
    {
        id: 'model-playlist',
        title: 'Playlist Model',
        description: 'Playlist response model with fields: listname, listCount, songs, createdBy.',
        path: '/models#playlist',
        section: 'Models',
        keywords: ['playlist', 'model', 'listname', 'count', 'songs', 'creator'],
    },
    {
        id: 'model-search',
        title: 'Search Result Model',
        description: 'Search result model containing songs, albums, artists, and playlists arrays.',
        path: '/models#search-result',
        section: 'Models',
        keywords: ['search', 'result', 'model', 'songs', 'albums', 'artists', 'playlists'],
    },

    // Additional keywords for common searches
    {
        id: 'quick-start',
        title: 'Quick Start',
        description: 'Get started quickly with saavn_play. Basic usage examples and installation.',
        path: '/installation#basic-usage',
        section: 'Getting Started',
        keywords: ['quick', 'start', 'begin', 'tutorial', 'hello world', 'first'],
    },
    {
        id: 'download-urls',
        title: 'Download URLs',
        description: 'Song payloads include media and metadata fields for playback handling.',
        path: '/api/song',
        section: 'API Reference',
        keywords: ['download', 'url', 'audio', 'metadata', 'playback'],
    },
    {
        id: 'pagination',
        title: 'Pagination',
        description: 'All search endpoints support pagination with page and limit parameters.',
        path: '/api/search',
        section: 'API Reference',
        keywords: ['pagination', 'page', 'limit', 'results', 'offset', 'next', 'previous'],
    },
    {
        id: 'error-handling',
        title: 'Error Handling',
        description: 'Handle API errors and exceptions in saavn_play. Try-catch examples.',
        path: '/api-reference#errors',
        section: 'API Reference',
        keywords: ['error', 'exception', 'try', 'catch', 'handle', 'failure', 'status'],
    },
];

export default searchIndex;
