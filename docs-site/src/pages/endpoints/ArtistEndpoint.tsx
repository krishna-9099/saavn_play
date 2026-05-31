import CodeBlock from '../../components/ui/CodeBlock';

const ArtistEndpoint = () => {
    const getArtistExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

    // Get full artist page details by ID
    final artist = await client.artists.getArtistPageDetails('artist_id');
  
  print('Artist: \${artist.name}');
    print('Bio: \${artist.bio}');
    print('Followers: \${artist.followerCount}');
    print('Date of Birth: \${artist.dob}');
    print('Wikipedia: \${artist.wiki}');
    print('Available Languages: \${artist.availableLanguages?.join(', ')}');
  print('');
  
  // Top songs
  print('Top Songs:');
    for (final song in artist.topSongs) {
    print('  \${song.name}');
  }

  client.close();
}`;

    const getArtistUrlsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

    // Get artist page details with URLs
    final artist = await client.artists.getArtistPageDetails('artist_id');
  
    if (artist.urls != null) {
    print('Albums URL: \${artist.urls?.albums}');
    print('Bio URL: \${artist.urls?.bio}');
    print('Songs URL: \${artist.urls?.songs}');
    print('Overview URL: \${artist.urls?.overview}');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Artist API</h1>
                <p className="text-gray-400 text-lg">
                    Retrieve artist profiles, top songs, albums, biography, social links, and related artists.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Artist API provides map-based and strongly typed methods for artist details including
                    biography, social media links, available languages, and page navigation URLs.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available artist methods
client.artists.detailsById(id)               // Raw artist data map
client.artists.getArtistPageDetails(id)      // Typed ArtistPageDetails model
client.artists.artistSongs(id, page: 0)      // Paginated artist songs
client.artists.artistAlbums(id, page: 0)     // Paginated artist albums`}
                    </pre>
                </div>
            </section>

            {/* Get Artist Details */}
            <section>
                <h2 id="get-details" className="text-2xl font-bold text-white mb-4">
                    Get Artist Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve detailed artist page information including top songs, top albums,
                    latest releases, playlist sections, biography, and social links.
                </p>
                <CodeBlock
                    code={getArtistExample}
                    language="dart"
                    title="get_artist.dart"
                    showLineNumbers
                />
            </section>

            {/* Get Artist URLs */}
            <section>
                <h2 id="get-urls" className="text-2xl font-bold text-white mb-4">
                    Get Artist URLs
                </h2>
                <p className="text-gray-400 mb-4">
                    Access artist page navigation URLs for albums, bio, songs, and overview pages.
                </p>
                <CodeBlock
                    code={getArtistUrlsExample}
                    language="dart"
                    title="get_artist_urls.dart"
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
                    Returns an <code className="text-primary-400">ArtistPageDetails</code> model with
                    all artist page sections including:
                </p>
                <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                    <li><code className="text-primary-400">topSongs</code> - Artist's top songs</li>
                    <li><code className="text-primary-400">topAlbums</code> - Artist's top albums</li>
                    <li><code className="text-primary-400">latestRelease</code> - Latest album releases</li>
                    <li><code className="text-primary-400">singles</code> - Single tracks</li>
                    <li><code className="text-primary-400">dedicatedPlaylists</code> - Playlists dedicated to artist</li>
                    <li><code className="text-primary-400">featuredInPlaylists</code> - Playlists where artist is featured</li>
                    <li><code className="text-primary-400">bio</code> - Artist biography</li>
                    <li><code className="text-primary-400">dob</code> - Date of birth</li>
                    <li><code className="text-primary-400">fb</code> - Facebook profile URL</li>
                    <li><code className="text-primary-400">twitter</code> - Twitter profile URL</li>
                    <li><code className="text-primary-400">wiki</code> - Wikipedia URL</li>
                    <li><code className="text-primary-400">urls</code> - Page navigation URLs</li>
                    <li><code className="text-primary-400">availableLanguages</code> - Languages with content</li>
                </ul>
            </section>
        </div>
    );
};

export default ArtistEndpoint;