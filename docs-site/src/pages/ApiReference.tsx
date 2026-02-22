import { Link } from 'react-router-dom';
import ApiCard from '../components/ui/ApiCard';

const ApiReference = () => {
    const endpoints = [
        {
            title: 'Search API',
            description: 'Search for songs, albums, artists, and playlists across the JioSaavn catalog.',
            path: '/api/search',
            methods: ['GET'],
        },
        {
            title: 'Song API',
            description: 'Retrieve detailed song information including lyrics, download URLs, and metadata.',
            path: '/api/song',
            methods: ['GET'],
        },
        {
            title: 'Album API',
            description: 'Get album details with full track listings, cover art, and artist information.',
            path: '/api/album',
            methods: ['GET'],
        },
        {
            title: 'Artist API',
            description: 'Access artist profiles, top songs, albums, biography, and related artists.',
            path: '/api/artist',
            methods: ['GET'],
        },
        {
            title: 'Playlist API',
            description: 'Fetch playlist details with full song lists and metadata.',
            path: '/api/playlist',
            methods: ['GET'],
        },
        {
            title: 'Radio API',
            description: 'Access radio stations and streaming content for music discovery.',
            path: '/api/radio',
            methods: ['GET'],
        },
        {
            title: 'Lyrics API',
            description: 'Retrieve song lyrics with timing information for synced display.',
            path: '/api/lyrics',
            methods: ['GET'],
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">API Reference</h1>
                <p className="text-gray-400 text-lg">
                    Complete reference for all available API endpoints in saavn_play.
                </p>
            </div>

            {/* Client Overview */}
            <section>
                <h2 id="client" className="text-2xl font-bold text-white mb-4">
                    SaavnPlayClient
                </h2>
                <p className="text-gray-400 mb-4">
                    The main entry point for all API operations. Create an instance to access all endpoints.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`final client = SaavnPlayClient();

// Access endpoints through the client
client.search    // Search operations
client.song      // Song operations
client.album     // Album operations
client.artist    // Artist operations
client.playlist  // Playlist operations
client.radio     // Radio operations
client.lyrics    // Lyrics operations`}
                    </pre>
                </div>
            </section>

            {/* Endpoints Grid */}
            <section>
                <h2 id="endpoints" className="text-2xl font-bold text-white mb-4">
                    Available Endpoints
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {endpoints.map((endpoint, index) => (
                        <ApiCard
                            key={index}
                            title={endpoint.title}
                            description={endpoint.description}
                            path={endpoint.path}
                            methods={endpoint.methods}
                        />
                    ))}
                </div>
            </section>

            {/* Response Models */}
            <section>
                <h2 id="models" className="text-2xl font-bold text-white mb-4">
                    Response Models
                </h2>
                <p className="text-gray-400 mb-4">
                    All API responses are strongly typed. See the Models documentation for detailed information about each model.
                </p>
                <Link
                    to="/models"
                    className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300"
                >
                    View Models Documentation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </section>

            {/* Error Handling */}
            <section>
                <h2 id="errors" className="text-2xl font-bold text-white mb-4">
                    Error Handling
                </h2>
                <p className="text-gray-400 mb-4">
                    The API uses standard Dart exceptions for error handling. Wrap your calls in try-catch blocks:
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`try {
  final songs = await client.search.songs('query');
  // Handle success
} on SaavnPlayException catch (e) {
  // Handle API-specific errors
  print('API Error: \${e.message}');
} catch (e) {
  // Handle other errors
  print('Error: \$e');
}`}
                    </pre>
                </div>
            </section>
        </div>
    );
};

export default ApiReference;