import CodeBlock from '../../components/ui/CodeBlock';
import GlassCard from '../../components/ui/GlassCard';

const PodcastEndpoint = () => {
    const getTopShowsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get top podcast shows
  final podcasts = await client.podcasts.getTopShows(n: 5, page: 1);

  for (final show in podcasts.shows) {
    print('Show: \${show.title}');
    print('Episodes: \${show.episodeCount}');
    print('---');
  }

  client.close();
}`;

    const getShowDetailsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get podcast show details
  final show = await client.podcasts.getShowDetails(
    showId: 'podcast_show_id',
    page: 0,
  );

  print('Title: \${show.title}');
  print('Description: \${show.description}');
  print('Episodes: \${show.episodes.length}');

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Podcast</span> API
                </h1>
                <p className="text-gray-400 text-lg">
                    Discover top podcast shows with pagination support.
                </p>
            </div>

            {/* Overview */}
            <GlassCard className="p-6">
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Overview</span>
                </h2>
                <p className="text-gray-400 mb-4">
                    The Podcast API provides methods to browse and retrieve podcast shows and episodes.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <pre className="text-sm text-gray-300 font-mono">
                        {`// Available podcast methods
client.podcasts.getTopShows(...)      // Get top podcast shows
client.podcasts.getShowDetails(...)   // Get show details with episodes`}
                    </pre>
                </div>
            </GlassCard>

            {/* Get Top Shows */}
            <GlassCard className="p-6">
                <h2 id="get-top-shows" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Top Shows
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve a paginated list of top podcast shows.
                </p>
                <CodeBlock
                    code={getTopShowsExample}
                    language="dart"
                    title="get_top_shows.dart"
                    showLineNumbers
                />
            </GlassCard>

            {/* Get Show Details */}
            <GlassCard className="p-6">
                <h2 id="get-show-details" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Get</span> Show Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve detailed information about a podcast show including episodes.
                </p>
                <CodeBlock
                    code={getShowDetailsExample}
                    language="dart"
                    title="get_show_details.dart"
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
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">n</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">int</code></td>
                                <td className="py-3 px-4">Number of results per page</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">page</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">int</code></td>
                                <td className="py-3 px-4">Page number for pagination</td>
                            </tr>
                            <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                                <td className="py-3 px-4"><code className="text-emerald-400 font-mono text-sm">showId</code></td>
                                <td className="py-3 px-4"><code className="text-cyan-400 font-mono text-sm">String</code></td>
                                <td className="py-3 px-4">The podcast show ID</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default PodcastEndpoint;
