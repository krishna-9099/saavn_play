import CodeBlock from '../../components/ui/CodeBlock';

const RadioEndpoint = () => {
    const getRadioExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get radio stations
  final stations = await client.radio.getStations();
  
  for (final station in stations) {
    print('Station: \${station.name}');
    print('Description: \${station.description}');
    print('---');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Radio API</h1>
                <p className="text-gray-400 text-lg">
                    Access radio stations and streaming content for music discovery.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Radio API provides methods to access radio stations and streaming content.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available radio methods
client.radio.getStations()      // Get available radio stations
client.radio.getById(id)        // Get specific radio station`}
                    </pre>
                </div>
            </section>

            {/* Get Radio Stations */}
            <section>
                <h2 id="get-stations" className="text-2xl font-bold text-white mb-4">
                    Get Radio Stations
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve a list of available radio stations.
                </p>
                <CodeBlock
                    code={getRadioExample}
                    language="dart"
                    title="get_radio.dart"
                    showLineNumbers
                />
            </section>

            {/* Response */}
            <section>
                <h2 id="response" className="text-2xl font-bold text-white mb-4">
                    Response
                </h2>
                <p className="text-gray-400 mb-4">
                    Returns a list of radio station objects with metadata and streaming URLs.
                </p>
            </section>
        </div>
    );
};

export default RadioEndpoint;