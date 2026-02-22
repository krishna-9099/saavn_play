import CodeBlock from '../../components/ui/CodeBlock';

const AlbumEndpoint = () => {
    const getAlbumExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get album details by ID
  final album = await client.album.detailsById('1142502');
  
  print('Album: \${album.name}');
  print('Artist: \${album.primaryArtists}');
  print('Year: \${album.year}');
  print('Song Count: \${album.songCount}');
  print('');
  
  // List all songs in the album
  print('Tracks:');
  for (final song in album.songs ?? []) {
    print('  \${song.name}');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Album API</h1>
                <p className="text-gray-400 text-lg">
                    Retrieve album information including track listings, cover art, and artist details.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Album API provides methods to retrieve album details by ID.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available album methods
client.album.detailsById(id)  // Get album details by ID`}
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