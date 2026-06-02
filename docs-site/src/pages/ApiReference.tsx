import { Link } from 'react-router-dom';
import ApiCard from '../components/ui/ApiCard';
import ApiResponsePreview from '../components/ui/ApiResponsePreview';
import GlassCard from '../components/ui/GlassCard';
import CodeBlock from '../components/ui/CodeBlock';

const ApiReference = () => {
    const endpoints = [
        {
            title: 'Search API',
            description: 'Search for songs, albums, artists, and playlists across the JioSaavn catalog.',
            path: '/api/search',
            methods: ['GET'],
            sampleData: {
                total: 42,
                results: [
                    {
                        id: 'xyz123',
                        title: 'Malibu',
                        type: 'song',
                        language: 'english',
                        url: 'https://www.jiosaavn.com/song/malibu/abc123',
                    },
                ],
            },
        },
        {
            title: 'Song API',
            description: 'Retrieve detailed song information including lyrics, download URLs, and metadata.',
            path: '/api/song',
            methods: ['GET'],
            sampleData: {
                id: 'abc123',
                name: 'Malibu',
                type: 'song',
                year: '2017',
                duration: '225',
                language: 'english',
                hasLyrics: true,
                downloadUrl: 'https://...',
            },
        },
        {
            title: 'Album API',
            description: 'Get album details with full track listings, cover art, and artist information.',
            path: '/api/album',
            methods: ['GET'],
            sampleData: {
                id: 'album123',
                name: 'Younger Now',
                type: 'album',
                year: '2017',
                songCount: 11,
                songs: [{ id: 'abc123', name: 'Malibu' }],
            },
        },
        {
            title: 'Artist API',
            description: 'Access artist profiles, top songs, albums, and full artist page sections.',
            path: '/api/artist',
            methods: ['GET'],
            sampleData: {
                id: 'artist123',
                name: 'Miley Cyrus',
                type: 'artist',
                followerCount: '1234567',
                topSongs: [{ id: 'abc123', name: 'Malibu' }],
            },
        },
        {
            title: 'Home API',
            description: 'Fetch launch/home feed modules including trending, playlists, charts, and radio.',
            path: '/api/home',
            methods: ['GET'],
            sampleData: {
                trending: {
                    songs: [{ id: 'abc123', name: 'Malibu' }],
                },
                charts: [{ id: 'chart1', name: 'Top 50' }],
                modules: ['trending', 'charts', 'new_releases'],
            },
        },
        {
            title: 'Podcast API',
            description: 'Discover top podcast shows with pagination support.',
            path: '/api/podcast',
            methods: ['GET'],
            sampleData: {
                total: 100,
                results: [
                    {
                        id: 'pod123',
                        name: 'The Music Podcast',
                        type: 'podcast',
                        episodeCount: 50,
                    },
                ],
            },
        },
        {
            title: 'Radio API',
            description: 'Access radio stations and streaming content for music discovery.',
            path: '/api/radio',
            methods: ['GET'],
            sampleData: {
                stations: [
                    {
                        id: 'radio123',
                        name: 'Hits Radio',
                        type: 'radio',
                        language: 'hindi',
                    },
                ],
            },
        },
    ];

    const clientOverviewCode = `final client = SaavnPlayClient();

// Access endpoints through the client
client.search    // Search operations
client.songs     // Song operations
client.albums    // Album operations
client.artists   // Artist operations
client.home      // Home/launch feed operations
client.podcasts  // Podcast operations
client.radio     // Radio operations`;

    const errorHandlingCode = `try {
  final songs = await client.search.songs('query');
  // Handle success
} on SaavnPlayException catch (e) {
  // Handle API-specific errors
  print('API Error: \${e.message}');
} catch (e) {
  // Handle other errors
  print('Error: \$e');
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">API</span> Reference
                </h1>
                <p className="text-gray-400 text-lg">
                    Complete reference for all available API endpoints in saavn_play.
                </p>
            </div>

            {/* Client Overview */}
            <GlassCard className="p-6">
                <h2 id="client" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">SaavnPlayClient</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    The main entry point for all API operations. Create an instance to access all endpoints.
                </p>
                <CodeBlock
                    code={clientOverviewCode}
                    language="dart"
                    title="client.dart"
                />
            </GlassCard>

            {/* Endpoints Grid */}
            <section>
                <h2 id="endpoints" className="text-2xl font-bold text-white mb-6">
                    <span className="text-emerald-500">Available</span> Endpoints
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {endpoints.map((endpoint, index) => (
                        <ApiResponsePreview
                            key={index}
                            endpoint={endpoint.path}
                            sampleData={endpoint.sampleData}
                        >
                            <ApiCard
                                title={endpoint.title}
                                description={endpoint.description}
                                path={endpoint.path}
                                methods={endpoint.methods}
                            />
                        </ApiResponsePreview>
                    ))}
                </div>
            </section>

            {/* Response Models */}
            <GlassCard className="p-6">
                <h2 id="models" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Response</span> Models
                </h2>
                <p className="text-gray-400 mb-4">
                    All API responses are strongly typed. See the Models documentation for detailed information about each model.
                </p>
                <Link
                    to="/models"
                    className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                    View Models Documentation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </GlassCard>

            {/* Error Handling */}
            <GlassCard className="p-6">
                <h2 id="errors" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Error</span> Handling
                </h2>
                <p className="text-gray-400 mb-4">
                    The API uses standard Dart exceptions for error handling. Wrap your calls in try-catch blocks:
                </p>
                <CodeBlock
                    code={errorHandlingCode}
                    language="dart"
                    title="error_handling.dart"
                />
            </GlassCard>
        </div>
    );
};

export default ApiReference;
