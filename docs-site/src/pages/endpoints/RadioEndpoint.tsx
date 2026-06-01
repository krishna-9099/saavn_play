import CodeBlock from '../../components/ui/CodeBlock';
import GlassCard from '../../components/ui/GlassCard';

const RadioEndpoint = () => {
    const getFeaturedStationsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get featured stations
  final featured = await client.radio.getFeaturedStations();

  for (final station in featured.featuredStations) {
    print('Station: \${station.name}');
    print('Type: \${station.stationType}');
    print('---');
  }

  client.close();
}`;

    const createStationExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get featured stations first
  final featured = await client.radio.getFeaturedStations();
  final first = featured.featuredStations.first;

  // Create a station and fetch songs
  final station = await client.radio.createFeaturedStation(
    stationType: first.stationType,
    query: first.query,
    language: first.language,
  );

  final songs = await client.radio.getStationSongs(stationId: station.stationId);
  print('Songs fetched: \${songs.songs.length}');

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Radio</span> API
                </h1>
                <p className="text-gray-400 text-lg">
                    Access radio stations and streaming content for music discovery.
                </p>
            </div>

            {/* Overview */}
            <GlassCard className="p-6">
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Overview</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    The Radio API provides methods to discover and stream radio stations.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <pre className="text-sm text-gray-300 font-mono">
                        {`// Available radio methods
client.radio.getFeaturedStations()        // Get featured stations
client.radio.createFeaturedStation(...)   // Create a station
client.radio.getStationSongs(...)         // Get songs from station`}
                    </pre>
                </div>
            </GlassCard>

            {/* Get Featured Stations */}
            <GlassCard className="p-6">
                <h2 id="get-featured" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Featured Stations
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve a list of featured radio stations.
                </p>
                <CodeBlock
                    code={getFeaturedStationsExample}
                    language="dart"
                    title="get_featured_stations.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Create Station */}
            <GlassCard className="p-6">
                <h2 id="create-station" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Create</span> Station & Get Songs
                </h2>
                <p className="text-gray-400 mb-4">
                    Create a radio station from featured metadata and fetch playable songs.
                </p>
                <CodeBlock
                    code={createStationExample}
                    language="dart"
                    title="create_station.dart"
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
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">stationType</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">Type of station to create</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">query</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">Search query for station content</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">language</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">Language preference for station</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">stationId</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">The station ID to fetch songs from</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default RadioEndpoint;
