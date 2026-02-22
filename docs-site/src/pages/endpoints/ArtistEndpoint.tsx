import CodeBlock from '../../components/ui/CodeBlock';

const ArtistEndpoint = () => {
    const getArtistExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get artist details by ID
  final artist = await client.artist.detailsById('artist_id');
  
  print('Artist: \${artist.name}');
  print('Bio: \${artist.bio}');
  print('Followers: \${artist.followerCount}');
  print('');
  
  // Top songs
  print('Top Songs:');
  for (final song in artist.topSongs ?? []) {
    print('  \${song.name}');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Artist API</h1>
                <p className="text-gray-400 text-lg">
                    Retrieve artist profiles, top songs, albums, and related artists.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Artist API provides methods to retrieve artist details by ID.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available artist methods
client.artist.detailsById(id)  // Get artist details by ID`}
                    </pre>
                </div>
            </section>

            {/* Get Artist Details */}
            <section>
                <h2 id="get-details" className="text-2xl font-bold text-white mb-4">
                    Get Artist Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve detailed information about an artist including top songs and albums.
                </p>
                <CodeBlock
                    code={getArtistExample}
                    language="dart"
                    title="get_artist.dart"
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
                                <td className="py-3 px-4">The artist ID</td>
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
                    Returns an <code className="text-primary-400">Artist</code> object. See the Models
                    documentation for detailed field information.
                </p>
            </section>
        </div>
    );
};

export default ArtistEndpoint;