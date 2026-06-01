import CodeBlock from '../../components/ui/CodeBlock';
import GlassCard from '../../components/ui/GlassCard';

const LyricsEndpoint = () => {
    const getLyricsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get lyrics for a song
  final lyrics = await client.songs.getLyrics(songId: '5WXAlMNt');

  print('Lyrics ID: \${lyrics.id}');
  print('Synced: \${lyrics.synced}');
  print('Lyrics: \${lyrics.text}');

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Lyrics</span> API
                </h1>
                <p className="text-gray-400 text-lg">
                    Retrieve song lyrics with optional sync information.
                </p>
            </div>

            {/* Overview */}
            <GlassCard className="p-6">
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Overview</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    The Lyrics API is accessed through the Song API and provides lyrics data for songs.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <pre className="text-sm text-gray-300 font-mono">
                        {`// Lyrics method
client.songs.getLyrics(songId: id)  // Get song lyrics`}
                    </pre>
                </div>
            </GlassCard>

            {/* Get Lyrics */}
            <GlassCard className="p-6">
                <h2 id="get-lyrics" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Lyrics
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve lyrics for a specific song. Returns both plain text and synced lyrics (if available).
                </p>
                <CodeBlock
                    code={getLyricsExample}
                    language="dart"
                    title="get_lyrics.dart"
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
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">songId</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">The song ID to get lyrics for</td>
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
                    Returns a <code className="text-emerald-400 font-mono text-sm">Lyrics</code> object containing the lyrics text,
                    sync status, and optional synced lyrics with timestamps.
                </p>
            </GlassCard>
        </div>
    );
};

export default LyricsEndpoint;
