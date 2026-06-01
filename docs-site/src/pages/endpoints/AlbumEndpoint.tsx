import CodeBlock from '../../components/ui/CodeBlock';
import GlassCard from '../../components/ui/GlassCard';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const AlbumEndpoint = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: overviewRef, isVisible: overviewVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: detailsRef, isVisible: detailsVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: tokenRef, isVisible: tokenVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: recommendationsRef, isVisible: recommendationsVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: trendingRef, isVisible: trendingVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: yearRef, isVisible: yearVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: paramsRef, isVisible: paramsVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: responseRef, isVisible: responseVisible } = useScrollAnimation({ threshold: 0.2 });

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
            <div ref={headerRef} className={`transition-all duration-600 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Album</span> API
                </h1>
                <p className="text-gray-400 text-lg">
                    Retrieve album information including track listings, cover art, artist details, and recommendations.
                </p>
            </div>

            {/* Overview */}
            <div ref={overviewRef} className={`transition-all duration-600 ease-out ${overviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Overview</span>
                    </h2>
                    <p className="text-gray-400 mb-4">
                        The Album API provides methods to retrieve album details by ID and token, get recommendations,
                        find trending albums, and discover albums from the same year.
                    </p>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <pre className="text-sm text-gray-300 font-mono">
                            {`// Available album methods
client.albums.detailsById(id)                // Get album details by ID
client.albums.detailsByToken(token)          // Get album details by web token
client.albums.getRecommendations(albumId: id) // Get album recommendations
client.albums.getCurrentlyTrending()         // Get trending albums
client.albums.getTopAlbumsFromSameYear(...)  // Get albums from same year`}
                        </pre>
                    </div>
                </GlassCard>
            </div>

            {/* Get Album Details */}
            <div ref={detailsRef} className={`transition-all duration-600 ease-out ${detailsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-details" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Album Details
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
                </GlassCard>
            </div>

            {/* Get Album By Token */}
            <div ref={tokenRef} className={`transition-all duration-600 ease-out ${tokenVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-by-token" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Album By Token
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
                </GlassCard>
            </div>

            {/* Get Recommendations */}
            <div ref={recommendationsRef} className={`transition-all duration-600 ease-out ${recommendationsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-recommendations" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Album Recommendations
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
                </GlassCard>
            </div>

            {/* Get Trending Albums */}
            <div ref={trendingRef} className={`transition-all duration-600 ease-out ${trendingVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-trending" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Trending Albums
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
                </GlassCard>
            </div>

            {/* Get Top Albums From Same Year */}
            <div ref={yearRef} className={`transition-all duration-600 ease-out ${yearVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <GlassCard className="p-6">
                    <h2 id="get-albums-by-year" className="text-2xl font-bold text-white mb-4">
                        <span className="text-emerald-500">Get</span> Top Albums From Same Year
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
                                    <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">id</code></td>
                                    <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                    <td className="py-3 px-4">The album ID</td>
                                </tr>
                                <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">token</code></td>
                                    <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                    <td className="py-3 px-4">The album token from URL</td>
                                </tr>
                                <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">albumId</code></td>
                                    <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                    <td className="py-3 px-4">Album ID for recommendations</td>
                                </tr>
                                <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">albumYear</code></td>
                                    <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                    <td className="py-3 px-4">Year to get albums from</td>
                                </tr>
                                <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                    <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">albumLang</code></td>
                                    <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                    <td className="py-3 px-4">Language for results (default: 'hindi')</td>
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
                        Returns an <code className="text-emerald-400 font-mono text-sm">Album</code> object with all songs included.
                        See the Models documentation for detailed field information.
                    </p>
                </GlassCard>
            </div>
        </div>
    );
};

export default AlbumEndpoint;
