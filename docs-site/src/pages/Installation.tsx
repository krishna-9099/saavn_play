import { Link } from 'react-router-dom';
import CodeBlock from '../components/ui/CodeBlock';
import GlassCard from '../components/ui/GlassCard';

const Installation = () => {
  const pubspecCode = `dependencies:
  saavn_play: ^1.2.0`;

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
  final album = await client.albums.detailsById('1142502');
  print('Album: \${album.name}');

  // Get song details
  final songs = await client.songs.detailsById(['5WXAlMNt', 'csaEsVWV']);
  for (final song in songs) {
    print('Song: \${song.name}');
  }

  // Don't forget to close the client when done
  client.close();
}`;

  const steps = [
    {
      number: 1,
      title: 'Add Dependency',
      id: 'add-dependency',
      content: (
        <>
          <p className="text-gray-400 mb-4">
            Add the following to your <code className="text-emerald-400 font-mono text-sm">pubspec.yaml</code> file:
          </p>
          <CodeBlock
            code={pubspecCode}
            language="yaml"
            title="pubspec.yaml"
          />
        </>
      ),
    },
    {
      number: 2,
      title: 'Install',
      id: 'install',
      content: (
        <>
          <p className="text-gray-400 mb-4">
            Run the following command in your terminal:
          </p>
          <h3 className="text-lg font-semibold text-white mb-2">For Dart projects:</h3>
          <CodeBlock code={installCode} language="bash" />
          <h3 className="text-lg font-semibold text-white mb-2 mt-6">For Flutter projects:</h3>
          <CodeBlock code={flutterInstallCode} language="bash" />
        </>
      ),
    },
    {
      number: 3,
      title: 'Import',
      id: 'import',
      content: (
        <>
          <p className="text-gray-400 mb-4">
            Import the package in your Dart code:
          </p>
          <CodeBlock code={importCode} language="dart" />
        </>
      ),
    },
    {
      number: 4,
      title: 'Basic Usage',
      id: 'basic-usage',
      content: (
        <>
          <p className="text-gray-400 mb-4">
            Here's a quick example to get you started:
          </p>
          <CodeBlock
            code={basicUsageCode}
            language="dart"
            title="main.dart"
            showLineNumbers
          />
        </>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">
          <span className="text-emerald-500">Installation</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Get started with saavn_play by adding it to your Dart or Flutter project.
        </p>
      </div>

      {/* Requirements */}
      <GlassCard className="p-6">
        <h2 id="requirements" className="text-2xl font-bold text-white mb-4">
          <span className="text-emerald-500">Requirements</span>
        </h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Dart SDK: ^3.0.0
          </li>
          <li className="flex items-center gap-3 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Flutter: ^3.0.0 (for Flutter projects)
          </li>
          <li className="flex items-center gap-3 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Internet connection for API calls
          </li>
        </ul>
      </GlassCard>

      {/* Steps */}
      {steps.map((step) => (
        <GlassCard key={step.number} className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-emerald-400 font-bold">{step.number}</span>
            </div>
            <h2 id={step.id} className="text-2xl font-bold text-white">
              <span className="text-emerald-500">{step.title}</span>
            </h2>
          </div>
          {step.content}
        </GlassCard>
      ))}

      {/* Next Steps */}
      <GlassCard className="p-6" hover={false}>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 -m-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            <span className="text-emerald-400">Next Steps</span>
          </h3>
          <p className="text-gray-400 mb-4">
            Now that you have saavn_play installed, explore the API documentation to learn about all available features.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/api-reference" className="btn btn-primary">
              API Reference
            </Link>
            <Link to="/examples" className="btn btn-secondary">
              Examples
            </Link>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Installation;
