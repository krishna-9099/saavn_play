import CodeBlock from '../../components/ui/CodeBlock';

const AlbumEndpoint = () => {
    const getAlbumExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get album details by ID
    final album = await client.albums.detailsById('1142502');
  
    print('Album: \${album['title'] ?? album['name']}');
    print('Artist: \${album['primary_artists']}');
    print('Year: \${album['year']}');
    print('Song Count: \${(album['songs'] as List<dynamic>? ?? []).length}');
  print('');
  
  // List all songs in the album
  print('Tracks:');
    for (final item in (album['songs'] as List<dynamic>? ?? [])) {
        final song = item as Map<String, dynamic>;
        print('  \${song['song'] ?? song['title']}');
  }

  client.close();
}`;

    const getAlbumByTokenExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get album details by token (from URL)
  final album = await client.albums.detailsByToken('HvA1Hqgh83E_');
  
  print('Album: \${album['title']}');
  print('Songs: \${(album['songs'] as List<dynamic>? ?? []).length}');

  client.close();
}`;

    const getRecommendationsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get album recommendations based on an album ID
  final recommendations = await client.albums.getRecommendations(
    albumId: '1142502',
  );
  
  print('Recommended albums: \${recommendations['results']?.length ?? 0}');

  client.close();
}`;

    const getTrendingExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get currently trending albums
  final trending = await client.albums.getCurrentlyTrending(
    entityType: 'album',
    entityLanguage: 'hindi',
  );
  
  print('Trending albums: \${trending['results']?.length ?? 0}');

  client.close();
}`;

    const getTopAlbumsFromSameYearExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get top albums from the same year
  final albumsFromYear = await client.albums.getTopAlbumsFromSameYear(
    albumYear: '2025',
    albumLang: 'hindi',
  );
  
  print('Albums from 2025: \${albumsFromYear['results']?.length ?? 0}');

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Album API</h1>
                <p className="text-gray-400 text-lg">
                    Retrieve album information including track listings, cover art, artist details, and recommendations.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Album API provides methods to retrieve album details by ID and token, get recommendations,
                    find trending albums, and discover albums from the same year.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available album methods
client.albums.detailsById(id)                // Get album details by ID
client.albums.detailsByToken(token)          // Get album details by web token
client.albums.getRecommendations(albumId: id) // Get album recommendations
client.albums.getCurrentlyTrending()         // Get trending albums
client.albums.getTopAlbumsFromSameYear(...)  // Get albums from same year`}
                    </pre>
                </div>
            </section>

            {/* Get Album Details */}
            <section>
                <h2 id="get-details" className="text-2xl font-bold text-white mb-4">
                    Get Album Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve detailed information about an album including all tracks.
                </p>
                <CodeBlock
                    code={getAlbumExample}
                    language="dart"
                    title="get_album.dart"
                    showLineNumbers
                />
            </section>

            {/* Get Album By Token */}
            <section>
                <h2 id="get-by-token" className="text-2xl font-bold text-white mb-4">
                    Get Album By Token
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve album details using the token from the album page URL.
                </p>
                <CodeBlock
                    code={getAlbumByTokenExample}
                    language="dart"
                    title="get_album_by_token.dart"
                    showLineNumbers
                />
            </section>

            {/* Get Recommendations */}
            <section>
                <h2 id="get-recommendations" className="text-2xl font-bold text-white mb-4">
                    Get Album Recommendations
                </h2>
                <p className="text-gray-400 mb-4">
                    Get personalized album recommendations based on an album ID.
                </p>
                <CodeBlock
                    code={getRecommendationsExample}
                    language="dart"
                    title="get_recommendations.dart"
                    showLineNumbers
                />
            </section>

            {/* Get Trending Albums */}
            <section>
                <h2 id="get-trending" className="text-2xl font-bold text-white mb-4">
                    Get Trending Albums
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve currently trending albums by language.
                </p>
                <CodeBlock
                    code={getTrendingExample}
                    language="dart"
                    title="get_trending.dart"
                    showLineNumbers
                />
            </section>

            {/* Get Top Albums From Same Year */}
            <section>
                <h2 id="get-albums-by-year" className="text-2xl font-bold text-white mb-4">
                    Get Top Albums From Same Year
                </h2>
                <p className="text-gray-400 mb-4">
                    Discover top albums released in the same year as a given album.
                </p>
                <CodeBlock
                    code={getTopAlbumsFromSameYearExample}
                    language="dart"
                    title="get_albums_by_year.dart"
                    showLineNumbers
                />
            </section>

            {/* Parameters */}
            <section>
                <h2 id="parameters" className="text-2xl font-bold text-white mb-4">
                    Parameters
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="py-3 px-4 text-gray-300 font-semibold">Parameter</th>
                                <th className="py-3 px-4 text-gray-300 font-semibold">Type</th>
                                <th className="py-3 px-4 text-gray-300 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-400">
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">id</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">The album ID</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">token</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">The album token from URL</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">albumId</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">Album ID for recommendations</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">albumYear</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">Year to get albums from</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">albumLang</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">Language for results (default: 'hindi')</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Response */}
            <section>
                <h2 id="response" className="text-2xl font-bold text-white mb-4">
                    Response
                </h2>
                <p className="text-gray-400 mb-4">
                    Returns an <code className="text-primary-400">Album</code> object with all songs included.
                    See the Models documentation for detailed field information.
                </p>
            </section>
        </div>
    );
};

export default AlbumEndpoint;