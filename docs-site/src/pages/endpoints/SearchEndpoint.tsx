import CodeBlock from '../../components/ui/CodeBlock';
import GlassCard from '../../components/ui/GlassCard';

const SearchEndpoint = () => {
    const searchSongsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for songs
    final songs = await client.search.songs('Malibu - Miley Cyrus', page: 0, limit: 10);
  
    final results = songs['results'] as List<dynamic>? ?? [];
    for (final item in results) {
        final song = item as Map<String, dynamic>;
        print('Song: \${song['title']}');
        print('Artist: \${song['primary_artists']}');
    print('---');
  }

  client.close();
}`;

    const searchAlbumsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for albums
    final albums = await client.search.albums('Bangerz', page: 0, limit: 10);
  
    final results = albums['results'] as List<dynamic>? ?? [];
    for (final item in results) {
        final album = item as Map<String, dynamic>;
        print('Album: \${album['title']}');
        print('Artist: \${album['primary_artists']}');
        print('Year: \${album['year']}');
    print('---');
  }

  client.close();
}`;

    const searchArtistsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for artists
    final artists = await client.search.artists('Miley Cyrus', page: 0, limit: 10);
  
    final results = artists['results'] as List<dynamic>? ?? [];
    for (final item in results) {
        final artist = item as Map<String, dynamic>;
        print('Artist: \${artist['title']}');
    print('---');
  }

  client.close();
}`;

    const searchPlaylistsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for playlists
    final playlists = await client.search.playlists('Top Hits', page: 0, limit: 10);
  
    final results = playlists['results'] as List<dynamic>? ?? [];
    for (final item in results) {
        final playlist = item as Map<String, dynamic>;
        print('Playlist: \${playlist['title']}');
    print('---');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Search</span> API
                </h1>
                <p className="text-gray-400 text-lg">
                    Search for songs, albums, artists, and playlists across the JioSaavn catalog.
                </p>
            </div>

            {/* Overview */}
            <GlassCard className="p-6">
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Overview</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    The Search API provides methods to search across different content types. All search methods
                    return a list of results matching the query.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <pre className="text-sm text-gray-300 font-mono">
                        {`// Available search methods
client.search.songs(query)      // Search songs
client.search.albums(query)     // Search albums
client.search.artists(query)    // Search artists
client.search.playlists(query)  // Search playlists`}
                    </pre>
                </div>
            </GlassCard>

            {/* Search Songs */}
            <GlassCard className="p-6">
                <h2 id="songs" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Search</span> Songs
                </h2>
                <p className="text-gray-400 mb-4">
                    Search for songs by title, artist, or a combination.
                </p>
                <CodeBlock
                    code={searchSongsExample}
                    language="dart"
                    title="search_songs.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Search Albums */}
            <GlassCard className="p-6">
                <h2 id="albums" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Search</span> Albums
                </h2>
                <p className="text-gray-400 mb-4">
                    Search for albums by name or artist.
                </p>
                <CodeBlock
                    code={searchAlbumsExample}
                    language="dart"
                    title="search_albums.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Search Artists */}
            <GlassCard className="p-6">
                <h2 id="artists" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Search</span> Artists
                </h2>
                <p className="text-gray-400 mb-4">
                    Search for artists by name.
                </p>
                <CodeBlock
                    code={searchArtistsExample}
                    language="dart"
                    title="search_artists.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Search Playlists */}
            <GlassCard className="p-6">
                <h2 id="playlists" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Search</span> Playlists
                </h2>
                <p className="text-gray-400 mb-4">
                    Search for playlists by name.
                </p>
                <CodeBlock
                    code={searchPlaylistsExample}
                    language="dart"
                    title="search_playlists.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Parameters */}
            <GlassCard className="p-6">
                <h2 id="parameters" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Parameters</span>
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-3 px-4 text-emerald-400 font-semibold">Parameter</th>
                                <th className="py-3 px-4 text-emerald-400 font-semibold">Type</th>
                                <th className="py-3 px-4 text-emerald-400 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">query</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">The search query string</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">limit</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">int?</code></td>
                                <td className="py-3 px-4">Maximum number of results (optional, default: 10)</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">page</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">int?</code></td>
                                <td className="py-3 px-4">Page index for pagination (optional, default: 0)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default SearchEndpoint;
