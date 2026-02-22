# saavn_play Dart API Documentation

A comprehensive Dart client library for interacting with the saavn_play music streaming service API.

## Installation

Add this to your `pubspec.yaml`:

```yaml
dependencies:
  saavn_play:
    path: /path/to/saavn_play
```

## Quick Start

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for songs
  final results = await client.search.songs('Blinding Lights');
  
  for (final song in results.results) {
    print('${song.name} - ${song.primaryArtists}');
  }
}
```

## Available Endpoints

| Endpoint                                  | Access             | Description                           |
| ----------------------------------------- | ------------------ | ------------------------------------- |
| [Album](album.md)                         | `client.albums`    | Get album details by ID               |
| [Artist](artist.md)                       | `client.artists`   | Get artist details, songs, and albums |
| [Song](song.md)                           | `client.songs`     | Get song details by ID(s)             |
| [Search](search.md)                       | `client.search`    | Search for songs, albums, and artists |
| [Lyrics](lyrics.md)                       | `client.lyrics`    | Get lyrics for songs                  |
| [Playlist](playlist.md)                   | `client.playlists` | Get playlist details by ID            |
| [Home](home.md)                           | `client.home`      | Get home/launch data                  |
| [Podcast](podcast.md)                     | `client.podcasts`  | Get top podcast shows                 |
| [Radio](radio.md)                         | `client.radio`     | Get radio stations and songs          |
| [Webapi](webapi.md)                       | `client.webapi`    | Unified entity details endpoint       |
| [Featured Playlist](featured_playlist.md) | -                  | Get featured playlists with filters   |

## Common Usage Patterns

### Search and Get Details

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for a song
  final searchResults = await client.search.songs('Señorita', limit: 5);
  
  // Get detailed information
  if (searchResults.results.isNotEmpty) {
    final songId = searchResults.results.first.id;
    final songs = await client.songs.detailsById([songId]);
    final song = songs.first;
    
    print('Song: ${song.name}');
    print('Album: ${song.album.name}');
    print('Duration: ${song.duration}s');
  }
}
```

### Get Artist Discography

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for an artist
  final artistResults = await client.search.artists('The Weeknd', limit: 1);
  
  if (artistResults.results.isNotEmpty) {
    final artistId = artistResults.results.first.id;
    
    // Get artist's albums
    final albums = await client.artists.artistAlbums(artistId, page: 0);
    
    print('Albums by artist:');
    for (final album in albums.results) {
      print('  ${album.name} (${album.year})');
    }
  }
}
```

### Listen to Radio

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get songs from a radio station
  final radioSongs = await client.radio.getFeaturedStationSongs(
    name: 'Hit Factory',
    language: 'english',
    count: 10,
  );
  
  print('Radio songs:');
  for (final song in radioSongs.songs) {
    print('  ${song.name} by ${song.primaryArtists}');
  }
}
```

### Browse Home Content

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get home data
  final homeData = await client.home.getLaunchData();
  
  // Browse new trending
  print('New Trending:');
  for (final item in homeData.newTrending?.take(5) ?? []) {
    print('  ${item.title}');
  }
  
  // Browse new albums
  print('\nNew Albums:');
  for (final album in homeData.newAlbums?.take(5) ?? []) {
    print('  ${album.title}');
  }
}
```

### Get Song Lyrics

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for a song
  final results = await client.search.songs('Blinding Lights', limit: 1);
  
  if (results.results.isNotEmpty) {
    final song = results.results.first;
    
    // Check if lyrics are available
    if (song.hasLyrics == 'true') {
      final lyrics = await client.lyrics.get(song.id);
      print('Lyrics:');
      print(lyrics.lyrics);
    }
  }
}
```

## Error Handling

```dart
import 'package:saavn_play/saavn_play.dart';
import 'package:dio/dio.dart';

void main() async {
  final client = saavn_playClient();
  
  try {
    final album = await client.albums.detailsById('invalid_id');
    print(album.name);
  } on DioException catch (e) {
    print('Network error: ${e.message}');
  } catch (e) {
    print('Error: $e');
  }
}
```

## Response Models

### SongResponse

| Property         | Type                  | Description         |
| ---------------- | --------------------- | ------------------- |
| `id`             | `String`              | Song ID             |
| `name`           | `String?`             | Song name           |
| `album`          | `SongResponseAlbum`   | Album information   |
| `duration`       | `String`              | Duration in seconds |
| `primaryArtists` | `String`              | Primary artists     |
| `language`       | `String`              | Song language       |
| `url`            | `String`              | Permalink URL       |
| `image`          | `List<DownloadLink>?` | Image URLs          |
| `downloadUrl`    | `List<DownloadLink>?` | Download URLs       |

### AlbumResponse

| Property         | Type                  | Description     |
| ---------------- | --------------------- | --------------- |
| `id`             | `String`              | Album ID        |
| `name`           | `String`              | Album name      |
| `year`           | `String`              | Release year    |
| `primaryArtists` | `String`              | Primary artists |
| `songs`          | `List<SongResponse>`  | Songs in album  |
| `image`          | `List<DownloadLink>?` | Image URLs      |

### ArtistResponse

| Property        | Type                  | Description    |
| --------------- | --------------------- | -------------- |
| `id`            | `String`              | Artist ID      |
| `name`          | `String`              | Artist name    |
| `followerCount` | `String?`             | Follower count |
| `topSongs`      | `List<SongResponse>`  | Top songs      |
| `image`         | `List<DownloadLink>?` | Image URLs     |

## Documentation Index

- [Album Endpoint](album.md) - Retrieve album details
- [Artist Endpoint](artist.md) - Retrieve artist information
- [Song Endpoint](song.md) - Retrieve song details
- [Search Endpoint](search.md) - Search for content
- [Lyrics Endpoint](lyrics.md) - Get song lyrics
- [Playlist Endpoint](playlist.md) - Retrieve playlist details
- [Home Endpoint](home.md) - Browse home content
- [Podcast Endpoint](podcast.md) - Browse podcasts
- [Radio Endpoint](radio.md) - Listen to radio stations
- [Webapi Endpoint](webapi.md) - Unified entity details endpoint
- [Featured Playlist Endpoint](featured_playlist.md) - Get featured playlists with filters
- [API v6 Documentation](api_v6.md) - Comprehensive API v6 reference

## License

See the [LICENSE](../LICENSE) file for details.
