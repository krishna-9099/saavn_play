import CodeBlock from '../components/ui/CodeBlock';

const Models = () => {
    const songModelExample = `class Song {
  final String id;
  final String name;
  final String? subtitle;
  final Album? album;
  final List<Artist> artists;
  final String? primaryArtists;
  final String? featuredArtists;
  final int? duration;
  final String? playUrl;
  final String? downloadUrl;
  final String? copyright;
  final int? releaseDate;
  final List<Image>? images;
  final bool? hasLyrics;
  final String? lyricsId;
}`;

    const albumModelExample = `class Album {
  final String id;
  final String name;
  final String? subtitle;
  final String? description;
  final int? year;
  final int? songCount;
  final List<Artist>? artists;
  final String? primaryArtists;
  final List<Image>? images;
  final List<Song>? songs;
  final String? copyright;
}`;

    const artistModelExample = `class Artist {
  final String id;
  final String name;
  final String? subtitle;
  final String? bio;
  final int? followerCount;
  final bool? isVerified;
  final List<Image>? images;
  final List<Song>? topSongs;
  final List<Album>? albums;
  final List<Artist>? similarArtists;
}`;

    const playlistModelExample = `class Playlist {
  final String id;
  final String name;
  final String? subtitle;
  final String? description;
  final int? songCount;
  final int? followerCount;
  final List<Image>? images;
  final List<Song>? songs;
  final User? createdBy;
}`;

    const searchResultExample = `class SearchResult {
  final List<Song> songs;
  final List<Album> albums;
  final List<Artist> artists;
  final List<Playlist> playlists;
}`;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">Data Models</h1>
                <p className="text-gray-400 text-lg">
                    All API responses are strongly typed using Dart models. Here's a reference of the available models.
                </p>
            </div>

            {/* Song Model */}
            <section>
                <h2 id="song" className="text-2xl font-bold text-white mb-4">
                    Song
                </h2>
                <p className="text-gray-400 mb-4">
                    Represents a song with all its metadata including audio URLs, album info, and artist details.
                </p>
                <CodeBlock
                    code={songModelExample}
                    language="dart"
                    title="song.dart"
                />
            </section>

            {/* Album Model */}
            <section>
                <h2 id="album" className="text-2xl font-bold text-white mb-4">
                    Album
                </h2>
                <p className="text-gray-400 mb-4">
                    Represents an album with track listing, artist information, and cover art.
                </p>
                <CodeBlock
                    code={albumModelExample}
                    language="dart"
                    title="album.dart"
                />
            </section>

            {/* Artist Model */}
            <section>
                <h2 id="artist" className="text-2xl font-bold text-white mb-4">
                    Artist
                </h2>
                <p className="text-gray-400 mb-4">
                    Represents an artist with biography, top songs, albums, and similar artists.
                </p>
                <CodeBlock
                    code={artistModelExample}
                    language="dart"
                    title="artist.dart"
                />
            </section>

            {/* Playlist Model */}
            <section>
                <h2 id="playlist" className="text-2xl font-bold text-white mb-4">
                    Playlist
                </h2>
                <p className="text-gray-400 mb-4">
                    Represents a playlist with songs, metadata, and creator information.
                </p>
                <CodeBlock
                    code={playlistModelExample}
                    language="dart"
                    title="playlist.dart"
                />
            </section>

            {/* Search Result Model */}
            <section>
                <h2 id="search-result" className="text-2xl font-bold text-white mb-4">
                    SearchResult
                </h2>
                <p className="text-gray-400 mb-4">
                    Container for search results containing songs, albums, artists, and playlists.
                </p>
                <CodeBlock
                    code={searchResultExample}
                    language="dart"
                    title="search.dart"
                />
            </section>

            {/* Common Models */}
            <section>
                <h2 id="common" className="text-2xl font-bold text-white mb-4">
                    Common Models
                </h2>

                <h3 className="text-lg font-semibold text-white mb-2">Image</h3>
                <p className="text-gray-400 mb-2">
                    Represents an image with different quality levels.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border mb-4">
                    <pre className="text-sm text-gray-300">
                        {`class Image {
  final String url;
  final String? quality; // 'low', 'medium', 'high'
  final int? width;
  final int? height;
}`}
                    </pre>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">Lyrics</h3>
                <p className="text-gray-400 mb-2">
                    Represents song lyrics with optional sync information.
                </p>
                <div className="p-4 rounded-xl bg-background-darker border border-border">
                    <pre className="text-sm text-gray-300">
                        {`class Lyrics {
  final String id;
  final String text;
  final bool synced;
  final List<SyncedLine>? syncedLyrics;
}

class SyncedLine {
  final Duration timestamp;
  final String text;
}`}
                    </pre>
                </div>
            </section>
        </div>
    );
};

export default Models;