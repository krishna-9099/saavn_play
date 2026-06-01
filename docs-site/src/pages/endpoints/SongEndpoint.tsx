import CodeBlock from '../../components/ui/CodeBlock';
import GlassCard from '../../components/ui/GlassCard';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const SongEndpoint = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: detailsRef, isVisible: detailsVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: multipleRef, isVisible: multipleVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: recommendationsRef, isVisible: recommendationsVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: trendingRef, isVisible: trendingVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: artistsRef, isVisible: artistsVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: paramsRef, isVisible: paramsVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: responseRef, isVisible: responseVisible } = useScrollAnimation({ threshold: 0.2 });

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
            <div ref={headerRef} className={`transition-all duration-600 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Song</span> API
                </h1>
                <p className="text-gray-400 text-lg">
                    Retrieve detailed information about songs including metadata, streaming URLs, lyrics, and recommendations.
                </p>
            </div>

            {/* Overview */}
            <div ref={overviewRef} className={`transition-all duration-600 ease-out ${overviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Overview</span>
                    </h2>
                    <p className="text-gray-400 mb-4">
                        The Song API provides methods to retrieve song details by their IDs, get recommendations,
                        find trending songs, and discover songs by the same artists.
                    </p>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <pre className="text-sm text-gray-300 font-mono">
                            {`// Available song methods
client.songs.detailsById(ids)                    // Get song details by ID(s)
client.songs.getRecommendations(songId: id)      // Get song recommendations
client.songs.getCurrentlyTrending()              // Get trending songs
client.songs.getSongsBySameArtists(...)          // Get songs by same artists
client.songs.getSongsBySameActors(...)           // Get songs by same actors`}
                        </pre>
                    </div>
                </GlassCard>
            </div>

            {/* Get Song Details */}
            <div ref={detailsRef} className={`transition-all duration-600 ease-out ${detailsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-details" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Song Details
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
                </GlassCard>
            </div>

            {/* Get Multiple Songs */}
            <div ref={multipleRef} className={`transition-all duration-600 ease-out ${multipleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-multiple" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Multiple Songs
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
                </GlassCard>
            </div>

            {/* Get Recommendations */}
            <div ref={recommendationsRef} className={`transition-all duration-600 ease-out ${recommendationsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-recommendations" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Song Recommendations
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
                </GlassCard>
            </div>

            {/* Get Trending Songs */}
            <div ref={trendingRef} className={`transition-all duration-600 ease-out ${trendingVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-trending" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Trending Songs
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
                </GlassCard>
            </div>

            {/* Get Songs By Same Artists */}
            <div ref={artistsRef} className={`transition-all duration-600 ease-out ${artistsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-songs-by-artists" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Songs By Same Artists
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
                </GlassCard>
            </div>

            {/* Parameters */}
            <div ref={paramsRef} className={`transition-all duration-600 ease-out ${paramsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                                    <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">ids</code></td>
                                    <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">{'List<String>'}</code></td>
                                    <td className="py-3 px-4">List of song IDs to fetch</td>
                                </tr>
                                <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">songId</code></td>
                                    <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                    <td className="py-3 px-4">Song ID for recommendations</td>
                                </tr>
                                <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">language</code></td>
                                    <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                    <td className="py-3 px-4">Language for results (default: 'hindi')</td>
                                </tr>
                                <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">artistIds</code></td>
                                    <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                    <td className="py-3 px-4">Comma-separated artist IDs</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </div>

            {/* Response */}
            <div ref={responseRef} className={`transition-all duration-600 ease-out ${responseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="response" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Response</span>
                    </h2>
                    <p className="text-gray-400 mb-4">
                        Returns a map keyed by song ID. Each value contains song metadata fields including
                        title, artists, duration, album info, and streaming URLs.
                    </p>
                </GlassCard>
            </div>
        </div>
    );
};

export default SongEndpoint;
