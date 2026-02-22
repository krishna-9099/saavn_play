import CodeBlock from '../../components/ui/CodeBlock';

const LyricsEndpoint = () => {
    const getLyricsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get lyrics for a song
  final lyrics = await client.lyrics.get('song_id');
  
  print('Lyrics:');
  print(lyrics.text);

  // Check if synced lyrics are available
  if (lyrics.synced) {
    print('\\nSynced Lyrics:');
    for (final line in lyrics.syncedLyrics ?? []) {
      print('[\${line.timestamp}] \${line.text}');
    }
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Lyrics API</h1>
                <p className="text-gray-400 text-lg">
                    Retrieve song lyrics including synced lyrics for karaoke-style display.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Lyrics API provides methods to retrieve lyrics for songs, including
                    time-synced lyrics when available.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available lyrics methods
client.lyrics.get(songId)  // Get lyrics for a song`}
                    </pre>
                </div>
            </section>

            {/* Get Lyrics */}
            <section>
                <h2 id="get-lyrics" className="text-2xl font-bold text-white mb-4">
                    Get Lyrics
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve lyrics for a specific song by ID.
                </p>
                <CodeBlock
                    code={getLyricsExample}
                    language="dart"
                    title="get_lyrics.dart"
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
                                <td className="py-3 px-4"><code className="text-primary-400">songId</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">The song ID to get lyrics for</td>
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
                    Returns a <code className="text-primary-400">Lyrics</code> object containing:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li><code className="text-secondary-400">text</code> - Plain text lyrics</li>
                    <li><code className="text-secondary-400">synced</code> - Whether synced lyrics are available</li>
                    <li><code className="text-secondary-400">syncedLyrics</code> - List of synced lines with timestamps</li>
                </ul>
            </section>
        </div>
    );
};

export default LyricsEndpoint;