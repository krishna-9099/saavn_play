import CodeBlock from '../../components/ui/CodeBlock';
import GlassCard from '../../components/ui/GlassCard';

const PlaylistEndpoint = () => {
    const getPlaylistExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get playlist details by ID
  final playlist = await client.playlists.detailsById('playlist_id');

  print('Playlist: \${playlist.name}');
  print('Songs: \${playlist.songs.length}');
  print('Followers: \${playlist.followerCount}');

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Playlist</span> API
                </h1>
                <p className="text-gray-400 text-lg">
                    Retrieve playlist details with songs and metadata.
                </p>
            </div>

            {/* Overview */}
            <GlassCard className="p-6">
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Overview</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    The Playlist API provides methods to retrieve playlist details and songs.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <pre className="text-sm text-gray-300 font-mono">
                        {`// Available playlist methods
client.playlists.detailsById(id)  // Get playlist details by ID`}
                    </pre>
                </div>
            </GlassCard>

            {/* Get Playlist Details */}
            <GlassCard className="p-6">
                <h2 id="get-details" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Playlist Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve detailed information about a playlist including all songs.
                </p>
                <CodeBlock
                    code={getPlaylistExample}
                    language="dart"
                    title="get_playlist.dart"
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
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">id</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">The playlist ID</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            {/* Response */}
            <GlassCard className="p-6">
                <h2 id="response" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Response</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    Returns a <code className="text-emerald-400 font-mono text-sm">Playlist</code> object with songs, metadata, and creator information.
                    See the Models documentation for detailed field information.
                </p>
            </GlassCard>
        </div>
    );
};

export default PlaylistEndpoint;
