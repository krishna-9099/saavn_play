import CodeBlock from '../components/ui/CodeBlock';

const Examples = () => {
    const searchExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for songs
  final songs = await client.search.songs('Malibu - Miley Cyrus');
  for (final song in songs) {
    print('Song: \${song.name}');
    print('Artist: \${song.primaryArtists}');
  }

  // Search for albums
  final albums = await client.search.albums('Bangerz');
  for (final album in albums) {
    print('Album: \${album.name}');
  }

  // Search for artists
  final artists = await client.search.artists('Miley Cyrus');
  for (final artist in artists) {
    print('Artist: \${artist.name}');
  }

  client.close();
}`;

    const songExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get song details by ID
  final songs = await client.song.detailsById([
    '5WXAlMNt',
    'csaEsVWV',
  ]);

  for (final song in songs) {
    print('Song: \${song.name}');
    print('Album: \${song.album.name}');
    print('Duration: \${song.duration} seconds');
    print('Play URL: \${song.playUrl}');
  }

  client.close();
}`;

    const albumExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get album details by ID
  final album = await client.album.detailsById('1142502');

  print('Album: \${album.name}');
  print('Artist: \${album.primaryArtists}');
  print('Year: \${album.year}');
  print('Song Count: \${album.songCount}');
  print('');

  // List all songs in the album
  for (final song in album.songs) {
    print('  - \${song.name}');
  }

  client.close();
}`;

    const artistExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get artist details by ID
  final artist = await client.artist.detailsById('123456');

  print('Artist: \${artist.name}');
  print('Bio: \${artist.bio}');
  print('Followers: \${artist.followerCount}');
  print('');

  // Top songs
  print('Top Songs:');
  for (final song in artist.topSongs) {
    print('  - \${song.name}');
  }

  // Albums
  print('\\nAlbums:');
  for (final album in artist.albums) {
    print('  - \${album.name}');
  }

  client.close();
}`;

    const playlistExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get playlist details by ID
  final playlist = await client.playlist.detailsById('playlist_id');

  print('Playlist: \${playlist.name}');
  print('Description: \${playlist.description}');
  print('Song Count: \${playlist.songCount}');
  print('');

  // List all songs
  for (final song in playlist.songs) {
    print('  - \${song.name} by \${song.primaryArtists}');
  }

  client.close();
}`;

    const lyricsExample = `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get lyrics for a song
  final lyrics = await client.lyrics.get('song_id');

  print('Lyrics:');
  print(lyrics.text);

  // Check if synced lyrics are available
  if (lyrics.synced) {
    print('\\nSynced Lyrics Available!');
    for (final line in lyrics.syncedLyrics) {
      print('[\${line.timestamp}] \${line.text}');
    }
  }

  client.close();
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Examples</h1>
                <p className="text-gray-400 text-lg">
                    Practical examples showing how to use saavn_play in your applications.
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
                    Artist Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Access artist profiles, top songs, and discographies.
                </p>
                <CodeBlock
                    code={artistExample}
                    language="dart"
                    title="artist_example.dart"
                    showLineNumbers
                />
            </section>

            {/* Playlist Example */}
            <section>
                <h2 id="playlist" className="text-2xl font-bold text-white mb-4">
                    Playlist Details
                </h2>
                <p className="text-gray-400 mb-4">
                    Fetch playlist information with all songs.
                </p>
                <CodeBlock
                    code={playlistExample}
                    language="dart"
                    title="playlist_example.dart"
                    showLineNumbers
                />
            </section>

            {/* Lyrics Example */}
            <section>
                <h2 id="lyrics" className="text-2xl font-bold text-white mb-4">
                    Lyrics
                </h2>
                <p className="text-gray-400 mb-4">
                    Retrieve song lyrics including synced lyrics for karaoke-style display.
                </p>
                <CodeBlock
                    code={lyricsExample}
                    language="dart"
                    title="lyrics_example.dart"
                    showLineNumbers
                />
            </section>
        </div>
    );
};

export default Examples;