# Search Endpoint

The Search endpoint provides comprehensive search functionality across songs, albums, and artists on saavn_play.

## Overview

| Property           | Description                 |
| ------------------ | --------------------------- |
| **Endpoint Class** | `SearchEndpoint`            |
| **Access Via**     | `saavn_playClient().search` |

## Methods

### `all(String query)`

Performs a global search across all content types.

#### Parameters

| Parameter | Type     | Required | Description         |
| --------- | -------- | -------- | ------------------- |
| `query`   | `String` | Yes      | Search query string |

#### Returns

`Future<AllSearchResponse>` - A future that resolves to a combined search response containing:
- `songs` - List of song results
- `albums` - List of album results
- `artists` - List of artist results
- `playlists` - List of playlist results

---

### `songs(String query, {int page = 0, int limit = 10})`

Searches for songs with pagination support.

#### Parameters

| Parameter | Type     | Required | Description                    |
| --------- | -------- | -------- | ------------------------------ |
| `query`   | `String` | Yes      | Search query string            |
| `page`    | `int`    | No       | Page number (default: 0)       |
| `limit`   | `int`    | No       | Results per page (default: 10) |

#### Returns

`Future<SongSearchResponse>` - A future that resolves to:
- `results` - List of `SongResponse` objects
- `total` - Total number of results
- `start` - Starting index

---

### `albums(String query, {int page = 0, int limit = 10})`

Searches for albums with pagination support.

#### Parameters

| Parameter | Type     | Required | Description                    |
| --------- | -------- | -------- | ------------------------------ |
| `query`   | `String` | Yes      | Search query string            |
| `page`    | `int`    | No       | Page number (default: 0)       |
| `limit`   | `int`    | No       | Results per page (default: 10) |

#### Returns

`Future<AlbumSearchResponse>` - A future that resolves to:
- `results` - List of `AlbumResponse` objects
- `total` - Total number of results
- `start` - Starting index

---

### `artists(String query, {int page = 0, int limit = 10})`

Searches for artists with pagination support.

#### Parameters

| Parameter | Type     | Required | Description                    |
| --------- | -------- | -------- | ------------------------------ |
| `query`   | `String` | Yes      | Search query string            |
| `page`    | `int`    | No       | Page number (default: 0)       |
| `limit`   | `int`    | No       | Results per page (default: 10) |

#### Returns

`Future<ArtistSearchResponse>` - A future that resolves to:
- `results` - List of `ArtistResponse` objects
- `total` - Total number of results
- `start` - Starting index

## Usage Examples

### Global Search

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search across all content types
  final results = await client.search.all('Shawn Mendes');
  
  print('Songs found: ${results.songs.length}');
  print('Albums found: ${results.albums.length}');
  print('Artists found: ${results.artists.length}');
  
  // Display top songs
  for (final song in results.songs.take(5)) {
    print('  Song: ${song.name}');
  }
  
  // Display artists
  for (final artist in results.artists) {
    print('  Artist: ${artist.name}');
  }
}
```

### Search for Songs

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for songs
  final response = await client.search.songs(
    'Blinding Lights',
    limit: 10,
  );
  
  print('Total results: ${response.total}');
  
  for (final song in response.results) {
    print('${song.name} - ${song.primaryArtists}');
    print('  Album: ${song.album.name}');
    print('  Duration: ${song.duration}s');
  }
}
```

### Search for Albums

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for albums
  final response = await client.search.albums(
    'After Hours',
    limit: 5,
  );
  
  print('Found ${response.total} albums');
  
  for (final album in response.results) {
    print('${album.name} (${album.year})');
    print('  Artists: ${album.primaryArtists}');
  }
}
```

### Search for Artists

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for artists
  final response = await client.search.artists(
    'The Weeknd',
    limit: 5,
  );
  
  print('Found ${response.total} artists');
  
  for (final artist in response.results) {
    print('${artist.name}');
    print('  Followers: ${artist.followerCount}');
  }
}
```

### Paginated Song Search

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  final query = 'love songs';
  
  // Get first page
  final page1 = await client.search.songs(query, page: 0, limit: 20);
  print('Page 1: ${page1.results.length} songs');
  
  // Get second page
  final page2 = await client.search.songs(query, page: 1, limit: 20);
  print('Page 2: ${page2.results.length} songs');
  
  // Combine results
  final allSongs = [...page1.results, ...page2.results];
  print('Total collected: ${allSongs.length} songs');
}
```

### Search and Get Details

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for a song
  final searchResults = await client.search.songs('Señorita', limit: 1);
  
  if (searchResults.results.isNotEmpty) {
    final song = searchResults.results.first;
    print('Found: ${song.name}');
    print('Song ID: ${song.id}');
    
    // Get full song details
    final fullDetails = await client.songs.detailsById([song.id]);
    print('Duration: ${fullDetails.first.duration}s');
  }
}
```

### Search with Error Handling

```dart
import 'package:saavn_play/saavn_play.dart';
import 'package:dio/dio.dart';

void main() async {
  final client = saavn_playClient();
  
  try {
    final results = await client.search.all('test query');
    print('Found ${results.songs.length} songs');
  } on DioException catch (e) {
    print('Network error: ${e.message}');
  } catch (e) {
    print('Error: $e');
  }
}
```

## Related Endpoints

- [Song](song.md) - Get detailed song information
- [Album](album.md) - Get album details
- [Artist](artist.md) - Get artist details
