import CodeBlock from '../../components/ui/CodeBlock';

const PodcastEndpoint = () => {
    const topShowsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  final podcasts = await client.podcasts.getTopShows(n: 10, page: 1);

  for (final show in podcasts.shows) {
    print('\${show.title} - \${show.subtitle}');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Podcast API</h1>
                <p className="text-gray-400 text-lg">
                    Discover top podcast shows with pagination support.
                </p>
            </div>

            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Podcast endpoint currently exposes a top-shows feed with page and
                    size controls.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available podcast method
client.podcasts.getTopShows({ n = 20, page = 1 })`}
                    </pre>
                </div>
            </section>

            <section>
                <h2 id="top-shows" className="text-2xl font-bold text-white mb-4">
                    Get Top Shows
                </h2>
                <p className="text-gray-400 mb-4">
                    Fetch podcast show metadata including title, subtitle, release date,
                    and artwork.
                </p>
                <CodeBlock
                    code={topShowsExample}
                    language="dart"
                    title="podcast_top_shows.dart"
                    showLineNumbers
                />
            </section>
        </div>
    );
};

export default PodcastEndpoint;
