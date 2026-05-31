import CodeBlock from '../../components/ui/CodeBlock';

const SongEndpoint = () => {
    const getSongExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get single song by ID
    final songs = await client.songs.detailsById(['5WXAlMNt']);
  
    final song = songs['5WXAlMNt'] as Map<String, dynamic>;
    print('Song: \${song['song'] ?? song['title']}');
    print('Artist: \${song['primary_artists']}');
    print('Duration: \${song['duration']} seconds');

  client.close();
}`;

    const getMultipleSongsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get multiple songs by ID
    final songs = await client.songs.detailsById([
    '5WXAlMNt',
    'csaEsVWV',
    'another_song_id',
  ]);
  
    for (final item in songs.values) {
        final song = item as Map<String, dynamic>;
        print('\${song['song'] ?? song['title']} - \${song['primary_artists']}');
  }

  client.close();
}`;

    const getRecommendationsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get song recommendations based on a song ID
  final recommendations = await client.songs.getRecommendations(
    songId: '5WXAlMNt',
    language: 'hindi',
  );
  
  print('Recommended songs: \${recommendations['results']?.length ?? 0}');

  client.close();
}`;

    const getTrendingExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get currently trending songs
  final trending = await client.songs.getCurrentlyTrending(
    entityType: 'song',
    entityLanguage: 'hindi',
  );
  
  print('Trending songs: \${trending['results']?.length ?? 0}');

  client.close();
}`;

    const getSongsBySameArtistsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get top songs by the same artists
  final songsByArtists = await client.songs.getSongsBySameArtists(
    artistIds: '459320,455917',
    songId: '5WXAlMNt',
    language: 'hindi',
  );
  
  print('Songs by same artists: \${songsByArtists['results']?.length ?? 0}');

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Song API</h1>
                <p className="text-gray-400 text-lg">
                    Retrieve detailed information about songs including metadata, streaming URLs, lyrics, and recommendations.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Song API provides methods to retrieve song details by their IDs, get recommendations,
                    find trending songs, and discover songs by the same artists.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available song methods
client.songs.detailsById(ids)                    // Get song details by ID(s)
client.songs.getRecommendations(songId: id)      // Get song recommendations
client.songs.getCurrentlyTrending()              // Get trending songs
client.songs.getSongsBySameArtists(...)          // Get songs by same artists
client.songs.getSongsBySameActors(...)           // Get songs by same actors`}
                    </pre>
                </div>
            </section>

            {/* Get Song Details */}
            <section>
                <h2 id="get-details" className="text-2xl font-bold text-white mb-4">
                    Get Song Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve detailed information about a single song.
                </p>
                <CodeBlock
                    code={getSongExample}
                    language="dart"
                    title="get_song.dart"
                    showLineNumbers
                />
            </section>

            {/* Get Multiple Songs */}
            <section>
                <h2 id="get-multiple" className="text-2xl font-bold text-white mb-4">
                    Get Multiple Songs
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve details for multiple songs in a single request.
                </p>
                <CodeBlock
                    code={getMultipleSongsExample}
                    language="dart"
                    title="get_multiple_songs.dart"
                    showLineNumbers
                />
            </section>

            {/* Get Recommendations */}
            <section>
                <h2 id="get-recommendations" className="text-2xl font-bold text-white mb-4">
                    Get Song Recommendations
                </h2>
                <p className="text-gray-400 mb-4">
                    Get personalized song recommendations based on a song ID.
                </p>
                <CodeBlock
                    code={getRecommendationsExample}
                    language="dart"
                    title="get_recommendations.dart"
                    showLineNumbers
                />
            </section>

            {/* Get Trending Songs */}
            <section>
                <h2 id="get-trending" className="text-2xl font-bold text-white mb-4">
                    Get Trending Songs
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve currently trending songs by language.
                </p>
                <CodeBlock
                    code={getTrendingExample}
                    language="dart"
                    title="get_trending.dart"
                    showLineNumbers
                />
            </section>

            {/* Get Songs By Same Artists */}
            <section>
                <h2 id="get-songs-by-artists" className="text-2xl font-bold text-white mb-4">
                    Get Songs By Same Artists
                </h2>
                <p className="text-gray-400 mb-4">
                    Discover top songs by the same artists as a given song.
                </p>
                <CodeBlock
                    code={getSongsBySameArtistsExample}
                    language="dart"
                    title="get_songs_by_artists.dart"
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
                                <td className="py-3 px-4"><code className="text-primary-400">ids</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">{'List<String>'}</code></td>
                                <td className="py-3 px-4">List of song IDs to fetch</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">songId</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">Song ID for recommendations</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">language</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">Language for results (default: 'hindi')</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">artistIds</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">Comma-separated artist IDs</td>
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
                    Returns a map keyed by song ID. Each value contains song metadata fields including
                    title, artists, duration, album info, and streaming URLs.
                </p>
            </section>
        </div>
    );
};

export default SongEndpoint;