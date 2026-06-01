import { useState } from 'react';
import CodeBlock from '../components/ui/CodeBlock';
import GlassCard from '../components/ui/GlassCard';

const Examples = () => {
    const [activeTab, setActiveTab] = useState('search');

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

    const tabs = [
        { id: 'search', label: 'Search', code: searchExample, title: 'search_example.dart' },
        { id: 'song', label: 'Song', code: songExample, title: 'song_example.dart' },
        { id: 'album', label: 'Album', code: albumExample, title: 'album_example.dart' },
        { id: 'artist', label: 'Artist', code: artistExample, title: 'artist_example.dart' },
        { id: 'home', label: 'Home', code: homeExample, title: 'home_example.dart' },
        { id: 'podcast', label: 'Podcast', code: podcastExample, title: 'podcast_example.dart' },
        { id: 'radio', label: 'Radio', code: radioExample, title: 'radio_example.dart' },
    ];

    const activeExample = tabs.find((tab) => tab.id === activeTab) || tabs[0];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Examples</span>
                </h1>
                <p className="text-gray-400 text-lg">
                    Practical examples for the current SaavnPlayClient endpoint surface.
                </p>
            </div>

            {/* Tabbed Examples */}
            <GlassCard className="overflow-hidden" hover={false}>
                {/* Tabs */}
                <div className="flex flex-wrap gap-1 p-2 border-b border-white/[0.08] bg-white/[0.02]">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        <span className="text-emerald-500">{activeExample.label}</span> Example
                    </h2>
                    <p className="text-gray-400 mb-4">
                        {activeTab === 'search' && 'Search for songs, albums, and artists across the JioSaavn catalog.'}
                        {activeTab === 'song' && 'Retrieve detailed information about specific songs.'}
                        {activeTab === 'album' && 'Get album information with full track listings.'}
                        {activeTab === 'artist' && 'Access full artist page data including top songs and top albums.'}
                        {activeTab === 'home' && 'Fetch launch data modules like charts, playlists, and radio blocks.'}
                        {activeTab === 'podcast' && 'Discover top podcast shows with pagination.'}
                        {activeTab === 'radio' && 'Create a station from featured metadata and fetch playable songs.'}
                    </p>
                    <CodeBlock
                        code={activeExample.code}
                        language="dart"
                        title={activeExample.title}
                        showLineNumbers
                    />
                </div>
            </GlassCard>
        </div>
    );
};

export default Examples;
