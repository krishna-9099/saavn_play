import CodeBlock from '../../components/ui/CodeBlock';

const SearchEndpoint = () => {
    const searchSongsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for songs
  final songs = await client.search.songs('Malibu - Miley Cyrus');
  
  for (final song in songs) {
    print('Song: \${song.name}');
    print('Artist: \${song.primaryArtists}');
    print('Album: \${song.album?.name}');
    print('---');
  }

  client.close();
}`;

    const searchAlbumsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for albums
  final albums = await client.search.albums('Bangerz');
  
  for (final album in albums) {
    print('Album: \${album.name}');
    print('Artist: \${album.primaryArtists}');
    print('Year: \${album.year}');
    print('---');
  }

  client.close();
}`;

    const searchArtistsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for artists
  final artists = await client.search.artists('Miley Cyrus');
  
  for (final artist in artists) {
    print('Artist: \${artist.name}');
    print('Followers: \${artist.followerCount}');
    print('---');
  }

  client.close();
}`;

    const searchPlaylistsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for playlists
  final playlists = await client.search.playlists('Top Hits');
  
  for (final playlist in playlists) {
    print('Playlist: \${playlist.name}');
    print('Songs: \${playlist.songCount}');
    print('---');
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Search API</h1>
                <p className="text-gray-400 text-lg">
                    Search for songs, albums, artists, and playlists across the JioSaavn catalog.
                </p>
            </div>

            {/* Overview */}
            <section>
                <h2 id="overview" className="text-2xl font-bold text-white mb-4">
                    Overview
                </h2>
                <p className="text-gray-400 mb-4">
                    The Search API provides methods to search across different content types. All search methods
                    return a list of results matching the query.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`// Available search methods
client.search.songs(query)      // Search songs
client.search.albums(query)     // Search albums
client.search.artists(query)    // Search artists
client.search.playlists(query)  // Search playlists`}
                    </pre>
                </div>
            </section>

            {/* Search Songs */}
            <section>
                <h2 id="songs" className="text-2xl font-bold text-white mb-4">
                    Search Songs
                </h2>
                <p className="text-gray-400 mb-4">
                    Search for songs by title, artist, or a combination.
                </p>
                <CodeBlock
                    code={searchSongsExample}
                    language="dart"
                    title="search_songs.dart"
                    showLineNumbers
                />
            </section>

            {/* Search Albums */}
            <section>
                <h2 id="albums" className="text-2xl font-bold text-white mb-4">
                    Search Albums
                </h2>
                <p className="text-gray-400 mb-4">
                    Search for albums by name or artist.
                </p>
                <CodeBlock
                    code={searchAlbumsExample}
                    language="dart"
                    title="search_albums.dart"
                    showLineNumbers
                />
            </section>

            {/* Search Artists */}
            <section>
                <h2 id="artists" className="text-2xl font-bold text-white mb-4">
                    Search Artists
                </h2>
                <p className="text-gray-400 mb-4">
                    Search for artists by name.
                </p>
                <CodeBlock
                    code={searchArtistsExample}
                    language="dart"
                    title="search_artists.dart"
                    showLineNumbers
                />
            </section>

            {/* Search Playlists */}
            <section>
                <h2 id="playlists" className="text-2xl font-bold text-white mb-4">
                    Search Playlists
                </h2>
                <p className="text-gray-400 mb-4">
                    Search for playlists by name.
                </p>
                <CodeBlock
                    code={searchPlaylistsExample}
                    language="dart"
                    title="search_playlists.dart"
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
                                <td className="py-3 px-4"><code className="text-primary-400">query</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">String</code></td>
                                <td className="py-3 px-4">The search query string</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">limit</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">int?</code></td>
                                <td className="py-3 px-4">Maximum number of results (optional, default: 10)</td>
                            </tr>
                            <tr className="border-b border-border">
                                <td className="py-3 px-4"><code className="text-primary-400">offset</code></td>
                                <td className="py-3 px-4"><code className="text-secondary-400">int?</code></td>
                                <td className="py-3 px-4">Offset for pagination (optional, default: 0)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default SearchEndpoint;