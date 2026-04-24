import CodeBlock from '../components/ui/CodeBlock';

const Examples = () => {
    const searchExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for songs
    final songs = await client.search.songs('Malibu - Miley Cyrus', limit: 5);
    final songResults = songs['results'] as List<dynamic>? ?? [];

    for (final item in songResults) {
        final song = item as Map<String, dynamic>;
        print('Song: \${song['title']}');
        print('Artist: \${song['primary_artists']}');
  }

  // Search for albums
    final albums = await client.search.albums('Bangerz', limit: 3);
    final albumResults = albums['results'] as List<dynamic>? ?? [];

    for (final item in albumResults) {
        final album = item as Map<String, dynamic>;
        print('Album: \${album['title']}');
  }

    // Search for artists
    final artists = await client.search.artists('Miley Cyrus', limit: 3);
    final artistResults = artists['results'] as List<dynamic>? ?? [];

    for (final item in artistResults) {
        final artist = item as Map<String, dynamic>;
        print('Artist: \${artist['title']}');
  }

  client.close();
}`;

    const songExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get song details by ID
    final songs = await client.songs.detailsById([
    '5WXAlMNt',
    'csaEsVWV',
  ]);

    final results = songs.values.toList();
    for (final item in results) {
        final song = item as Map<String, dynamic>;
        print('Song: \${song['song'] ?? song['title']}');
        print('Artists: \${song['primary_artists']}');
        print('Duration: \${song['duration']} seconds');
  }

  client.close();
}`;

    const albumExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get album details by ID
    final album = await client.albums.detailsById('1142502');

    print('Album: \${album['title'] ?? album['name']}');
    print('Artist: \${album['primary_artists']}');
    print('Year: \${album['year']}');
  print('');

  // List all songs in the album
    final songs = album['songs'] as List<dynamic>? ?? [];
    for (final item in songs) {
        final song = item as Map<String, dynamic>;
        print('  - \${song['song'] ?? song['title']}');
  }

  client.close();
}`;

    const artistExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

    // Get complete artist page details by ID
    final artist = await client.artists.getArtistPageDetails('123456');

    print('Artist: \${artist.name}');
    print('Verified: \${artist.isVerified}');
    print('Top songs: \${artist.topSongs.length}');
    print('Top albums: \${artist.topAlbums.length}');

  client.close();
}`;

    const homeExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

    final home = await client.home.getLaunchData();

    print('Charts: \${home.charts?.length ?? 0}');
    print('Top playlists: \${home.topPlaylists?.length ?? 0}');
    print('Radio modules: \${home.radio?.length ?? 0}');

  client.close();
}`;

    const podcastExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

    // Get top podcast shows
    final podcasts = await client.podcasts.getTopShows(n: 5, page: 1);

    for (final show in podcasts.shows) {
        print('Show: \${show.title}');
        print('Release date: \${show.releaseDate}');
        print('---');
  }

  client.close();
}`;

    const radioExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
    final client = SaavnPlayClient();

    // Get featured stations
    final featured = await client.radio.getFeaturedStations();
    final first = featured.featuredStations.first;

    // Create a station and fetch songs
    final station = await client.radio.createFeaturedStation(
        stationType: first.stationType,
        query: first.query,
        language: first.language,
    );

    final songs = await client.radio.getStationSongs(stationId: station.stationId);
    print('Songs fetched: \${songs.songs.length}');

    client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Examples</h1>
                <p className="text-gray-400 text-lg">
                    Practical examples for the current SaavnPlayClient endpoint surface.
                </p>
            </div>

            {/* Search Example */}
            <section>
                <h2 id="search" className="text-2xl font-bold text-white mb-4">
                    Search
                </h2>
                <p className="text-gray-400 mb-4">
                    Search for songs, albums, and artists across the JioSaavn catalog.
                </p>
                <CodeBlock
                    code={searchExample}
                    language="dart"
                    title="search_example.dart"
                    showLineNumbers
                />
            </section>

            {/* Song Example */}
            <section>
                <h2 id="song" className="text-2xl font-bold text-white mb-4">
                    Song Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve detailed information about specific songs.
                </p>
                <CodeBlock
                    code={songExample}
                    language="dart"
                    title="song_example.dart"
                    showLineNumbers
                />
            </section>

            {/* Album Example */}
            <section>
                <h2 id="album" className="text-2xl font-bold text-white mb-4">
                    Album Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Get album information with full track listings.
                </p>
                <CodeBlock
                    code={albumExample}
                    language="dart"
                    title="album_example.dart"
                    showLineNumbers
                />
            </section>

            {/* Artist Example */}
            <section>
                <h2 id="artist" className="text-2xl font-bold text-white mb-4">
                    Artist Page Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Access full artist page data including top songs and top albums.
                </p>
                <CodeBlock
                    code={artistExample}
                    language="dart"
                    title="artist_example.dart"
                    showLineNumbers
                />
            </section>

            {/* Home Example */}
            <section>
                <h2 id="home" className="text-2xl font-bold text-white mb-4">
                    Home Feed
                </h2>
                <p className="text-gray-400 mb-4">
                    Fetch launch data modules like charts, playlists, and radio blocks.
                </p>
                <CodeBlock
                    code={homeExample}
                    language="dart"
                    title="home_example.dart"
                    showLineNumbers
                />
            </section>

            {/* Podcast Example */}
            <section>
                <h2 id="podcast" className="text-2xl font-bold text-white mb-4">
                    Podcasts
                </h2>
                <p className="text-gray-400 mb-4">
                    Discover top podcast shows with pagination.
                </p>
                <CodeBlock
                    code={podcastExample}
                    language="dart"
                    title="podcast_example.dart"
                    showLineNumbers
                />
            </section>

            {/* Radio Example */}
            <section>
                <h2 id="radio" className="text-2xl font-bold text-white mb-4">
                    Radio
                </h2>
                <p className="text-gray-400 mb-4">
                    Create a station from featured metadata and fetch playable songs.
                </p>
                <CodeBlock
                    code={radioExample}
                    language="dart"
                    title="radio_example.dart"
                    showLineNumbers
                />
            </section>
        </div>
    );
};

export default Examples;