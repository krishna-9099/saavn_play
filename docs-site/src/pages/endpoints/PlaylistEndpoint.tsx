import CodeBlock from '../../components/ui/CodeBlock';

const PlaylistEndpoint = () => {
    const getPlaylistExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get playlist details by ID
  final playlist = await client.playlist.detailsById('playlist_id');
  
  print('Playlist: \${playlist.name}');
  print('Description: \${playlist.description}');
  print('Song Count: \${playlist.songCount}');
  print('');
  
  // List all songs
  print('Songs:');
  for (final song in playlist.songs ?? []) {
    print('  \${song.name} - \${song.primaryArtists}');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Playlist API</h1>
                <p className="text-gray-400 text-lg">
                    Retrieve playlist information including all songs and metadata.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Playlist API provides methods to retrieve playlist details by ID.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available playlist methods
client.playlist.detailsById(id)  // Get playlist details by ID`}
                    </pre>
                </div>
            </section>

            {/* Get Playlist Details */}
            <section>
                <h2 id="get-details" className="text-2xl font-bold text-white mb-4">
                    Get Playlist Details
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
                                <td className="py-3 px-4">The playlist ID</td>
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
                    Returns a <code className="text-primary-400">Playlist</code> object with all songs included.
                    See the Models documentation for detailed field information.
                </p>
            </section>
        </div>
    );
};

export default PlaylistEndpoint;