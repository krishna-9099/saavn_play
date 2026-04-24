import CodeBlock from '../../components/ui/CodeBlock';

const HomeEndpoint = () => {
    const launchDataExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  final homeData = await client.home.getLaunchData();

  print('Trending sections: \${homeData.newTrending?.length ?? 0}');
  print('Top playlists: \${homeData.topPlaylists?.length ?? 0}');
  print('Charts: \${homeData.charts?.length ?? 0}');

  client.close();
}`;

    const dynamicSectionExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  final homeData = await client.home.getLaunchDataWithDynamicSections();
  final unknown = homeData.unknownSections ?? {};

  print('Unknown sections discovered: \${unknown.keys.length}');

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Home API</h1>
                <p className="text-gray-400 text-lg">
                    Fetch launch/home feed data including trending content, charts, radio
                    modules, and dynamic sections.
                </p>
            </div>

            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Home endpoint provides multiple helpers for stable and
                    error-tolerant launch feed parsing.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available home methods
client.home.getLaunchData()
client.home.getLaunchDataWithDynamicSections()
client.home.getLaunchDataWithErrorHandling()`}
                    </pre>
                </div>
            </section>

            <section>
                <h2 id="launch-data" className="text-2xl font-bold text-white mb-4">
                    Get Launch Data
                </h2>
                <p className="text-gray-400 mb-4">
                    Fetch normalized home modules and strongly typed sections.
                </p>
                <CodeBlock
                    code={launchDataExample}
                    language="dart"
                    title="home_launch_data.dart"
                    showLineNumbers
                />
            </section>

            <section>
                <h2 id="dynamic" className="text-2xl font-bold text-white mb-4">
                    Dynamic Section Support
                </h2>
                <p className="text-gray-400 mb-4">
                    Use the dynamic variant when the API returns unknown section keys.
                </p>
                <CodeBlock
                    code={dynamicSectionExample}
                    language="dart"
                    title="home_dynamic_sections.dart"
                    showLineNumbers
                />
            </section>
        </div>
    );
};

export default HomeEndpoint;
