import CodeBlock from '../../components/ui/CodeBlock';
import GlassCard from '../../components/ui/GlassCard';

const HomeEndpoint = () => {
    const getLaunchDataExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get home/launch data
  final home = await client.home.getLaunchData();

  print('Charts: \${home.charts?.length ?? 0}');
  print('Top playlists: \${home.topPlaylists?.length ?? 0}');
  print('Radio modules: \${home.radio?.length ?? 0}');
  print('New releases: \${home.newAlbums?.length ?? 0}');

  client.close();
}`;

    const getTopSearchesExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get top/trending searches
  final topSearches = await client.home.getTopSearches();

  for (final item in topSearches) {
    print('Trending: \${item['title'] ?? item['name']}');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Home</span> API
                </h1>
                <p className="text-gray-400 text-lg">
                    Fetch launch/home feed modules including trending, playlists, charts, and radio.
                </p>
            </div>

            {/* Overview */}
            <GlassCard className="p-6">
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Overview</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    The Home API provides methods to fetch the main feed data shown on the app's home screen.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <pre className="text-sm text-gray-300 font-mono">
                        {`// Available home methods
client.home.getLaunchData()      // Get home feed data
client.home.getTopSearches()     // Get trending searches`}
                    </pre>
                </div>
            </GlassCard>

            {/* Get Launch Data */}
            <GlassCard className="p-6">
                <h2 id="get-launch-data" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Launch Data
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve the main home feed with charts, playlists, radio modules, and new releases.
                </p>
                <CodeBlock
                    code={getLaunchDataExample}
                    language="dart"
                    title="get_launch_data.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Get Top Searches */}
            <GlassCard className="p-6">
                <h2 id="get-top-searches" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Top Searches
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve currently trending search queries.
                </p>
                <CodeBlock
                    code={getTopSearchesExample}
                    language="dart"
                    title="get_top_searches.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Response */}
            <GlassCard className="p-6">
                <h2 id="response" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Response</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    The launch data response includes sections for charts, playlists, radio, and new albums.
                    Each section contains a list of items with metadata and images.
                </p>
            </GlassCard>
        </div>
    );
};

export default HomeEndpoint;
