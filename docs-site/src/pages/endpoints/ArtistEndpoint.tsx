import CodeBlock from '../../components/ui/CodeBlock';
import GlassCard from '../../components/ui/GlassCard';

const ArtistEndpoint = () => {
    const getArtistExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get artist details by ID
  final artist = await client.artists.getArtistPageDetails('123456');

  print('Artist: \${artist.name}');
  print('Verified: \${artist.isVerified}');
  print('Followers: \${artist.followerCount}');
  print('Top songs: \${artist.topSongs.length}');

  client.close();
}`;

    const getArtistSongsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get artist's top songs
  final songs = await client.artists.getArtistSongs(
    artistId: '123456',
    page: 0,
    sortBy: 'popularity',
    sortOrder: 'desc',
  );

  print('Songs: \${songs.length}');

  client.close();
}`;

    const getArtistAlbumsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get artist's albums
  final albums = await client.artists.getArtistAlbums(
    artistId: '123456',
    page: 0,
  );

  print('Albums: \${albums.length}');

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Artist</span> API
                </h1>
                <p className="text-gray-400 text-lg">
                    Access artist profiles, top songs, albums, and full artist page sections.
                </p>
            </div>

            {/* Overview */}
            <GlassCard className="p-6">
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Overview</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    The Artist API provides methods to retrieve artist details, songs, and albums.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <pre className="text-sm text-gray-300 font-mono">
                        {`// Available artist methods
client.artists.getArtistPageDetails(id)   // Get full artist page
client.artists.getArtistSongs(...)        // Get artist songs
client.artists.getArtistAlbums(...)       // Get artist albums`}
                    </pre>
                </div>
            </GlassCard>

            {/* Get Artist Details */}
            <GlassCard className="p-6">
                <h2 id="get-details" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Artist Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve complete artist page data including top songs, albums, and similar artists.
                </p>
                <CodeBlock
                    code={getArtistExample}
                    language="dart"
                    title="get_artist.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Get Artist Songs */}
            <GlassCard className="p-6">
                <h2 id="get-songs" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Artist Songs
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve an artist's songs with sorting and pagination options.
                </p>
                <CodeBlock
                    code={getArtistSongsExample}
                    language="dart"
                    title="get_artist_songs.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Get Artist Albums */}
            <GlassCard className="p-6">
                <h2 id="get-albums" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Artist Albums
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve an artist's albums with pagination.
                </p>
                <CodeBlock
                    code={getArtistAlbumsExample}
                    language="dart"
                    title="get_artist_albums.dart"
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
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">artistId</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">The artist ID</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">page</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">int</code></td>
                                <td className="py-3 px-4">Page index for pagination (default: 0)</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">sortBy</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">Sort field ('popularity', 'date', etc.)</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">sortOrder</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">Sort direction ('asc' or 'desc')</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default ArtistEndpoint;
