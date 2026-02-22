import CodeBlock from '../../components/ui/CodeBlock';

const SongEndpoint = () => {
    const getSongExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get single song by ID
  final songs = await client.song.detailsById(['5WXAlMNt']);
  
  final song = songs.first;
  print('Song: \${song.name}');
  print('Artist: \${song.primaryArtists}');
  print('Album: \${song.album?.name}');
  print('Duration: \${song.duration} seconds');

  client.close();
}`;

    const getMultipleSongsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get multiple songs by ID
  final songs = await client.song.detailsById([
    '5WXAlMNt',
    'csaEsVWV',
    'another_song_id',
  ]);
  
  for (final song in songs) {
    print('\${song.name} - \${song.primaryArtists}');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Song API</h1>
                <p className="text-gray-400 text-lg">
                    Retrieve detailed information about songs including metadata, streaming URLs, and lyrics.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Song API provides methods to retrieve song details by their IDs. You can fetch
                    single or multiple songs in one request.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available song methods
client.song.detailsById(ids)  // Get song details by ID(s)`}
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
                    Returns a list of <code className="text-primary-400">Song</code> objects. See the
                    Models documentation for detailed field information.
                </p>
            </section>
        </div>
    );
};

export default SongEndpoint;