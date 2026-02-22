import CodeBlock from '../components/ui/CodeBlock';

const Installation = () => {
  const pubspecCode = `dependencies:
  saavn_play: ^1.0.0`;

  const installCode = `dart pub get`;

  const flutterInstallCode = `flutter pub get`;

  const importCode = `import 'package:saavn_play/saavn_play.dart';`;

  const basicUsageCode = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  // Create a client instance
  final client = SaavnPlayClient();

  // Search for songs
  final searchResult = await client.search.songs('Malibu - Miley Cyrus');
  print('Found \${searchResult.length} songs');

  // Get album details
  final album = await client.album.detailsById('1142502');
  print('Album: \${album.name}');

  // Get song details
  final songs = await client.song.detailsById(['5WXAlMNt', 'csaEsVWV']);
  for (final song in songs) {
    print('Song: \${song.name}');
  }

  // Don't forget to close the client when done
  client.close();
}`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">Installation</h1>
        <p className="text-gray-400 text-lg">
          Get started with saavn_play by adding it to your Dart or Flutter project.
        </p>
      </div>

      {/* Requirements */}
      <section>
        <h2 id="requirements" className="text-2xl font-bold text-white mb-4">
          Requirements
        </h2>
        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>Dart SDK: ^3.0.0</li>
          <li>Flutter: ^3.0.0 (for Flutter projects)</li>
          <li>Internet connection for API calls</li>
        </ul>
      </section>

      {/* Adding Dependency */}
      <section>
        <h2 id="add-dependency" className="text-2xl font-bold text-white mb-4">
          Add Dependency
        </h2>
        <p className="text-gray-400 mb-4">
          Add the following to your <code className="text-primary-400">pubspec.yaml</code> file:
        </p>
        <CodeBlock
          code={pubspecCode}
          language="yaml"
          title="pubspec.yaml"
        />
      </section>

      {/* Install */}
      <section>
        <h2 id="install" className="text-2xl font-bold text-white mb-4">
          Install
        </h2>
        <p className="text-gray-400 mb-4">
          Run the following command in your terminal:
        </p>

        <h3 className="text-lg font-semibold text-white mb-2">For Dart projects:</h3>
        <CodeBlock code={installCode} language="bash" />

        <h3 className="text-lg font-semibold text-white mb-2 mt-6">For Flutter projects:</h3>
        <CodeBlock code={flutterInstallCode} language="bash" />
      </section>

      {/* Import */}
      <section>
        <h2 id="import" className="text-2xl font-bold text-white mb-4">
          Import
        </h2>
        <p className="text-gray-400 mb-4">
          Import the package in your Dart code:
        </p>
        <CodeBlock code={importCode} language="dart" />
      </section>

      {/* Basic Usage */}
      <section>
        <h2 id="basic-usage" className="text-2xl font-bold text-white mb-4">
          Basic Usage
        </h2>
        <p className="text-gray-400 mb-4">
          Here's a quick example to get you started:
        </p>
        <CodeBlock
          code={basicUsageCode}
          language="dart"
          title="main.dart"
          showLineNumbers
        />
      </section>

      {/* Next Steps */}
      <section className="p-6 rounded-2xl bg-primary-500/10 border border-primary-500/20">
        <h3 className="text-lg font-semibold text-white mb-2">
          Next Steps
        </h3>
        <p className="text-gray-400 mb-4">
          Now that you have saavn_play installed, explore the API documentation to learn about all available features.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/api-reference" className="btn btn-primary">
            API Reference
          </a>
          <a href="/examples" className="btn btn-secondary">
            Examples
          </a>
        </div>
      </section>
    </div>
  );
};

export default Installation;