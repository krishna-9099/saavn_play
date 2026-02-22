# Artist Endpoint

The Artist endpoint provides access to artist details, songs, and albums from saavn_play.

## Overview

| Property           | Description                  |
| ------------------ | ---------------------------- |
| **Endpoint Class** | `ArtistEndpoint`             |
| **Access Via**     | `saavn_playClient().artists` |

## Methods

### `detailsById(String id)`

Retrieves detailed information about an artist by their ID.

#### Parameters

| Parameter | Type     | Required | Description                  |
| --------- | -------- | -------- | ---------------------------- |
| `id`      | `String` | Yes      | The unique artist identifier |

#### Returns

`Future<ArtistResponse>` - A future that resolves to an artist response containing:
- `id` - Artist ID
- `name` - Artist name
- `url` - Permalink URL
- `image` - List of image download links
- `followerCount` - Number of followers
- `topSongs` - List of top songs
- `topAlbums` - List of top albums

---

### `artistSongs(String artistId, {String? category, String? sort, required int page})`

Retrieves songs by an artist with pagination support.

#### Parameters

| Parameter  | Type      | Required | Description                  |
| ---------- | --------- | -------- | ---------------------------- |
| `artistId` | `String`  | Yes      | The unique artist identifier |
| `category` | `String?` | No       | Filter by category           |
| `sort`     | `String?` | No       | Sort order                   |
| `page`     | `int`     | Yes      | Page number (starts from 0)  |

#### Returns

`Future<ArtistSongResponse>` - A future that resolves to:
- `results` - List of `SongResponse` objects
- `total` - Total number of songs
- `lastPage` - Whether this is the last page

---

### `artistAlbums(String artistId, {int page = 0, String? category, String? sort})`

Retrieves albums by an artist with pagination support.

#### Parameters

| Parameter  | Type      | Required | Description                  |
| ---------- | --------- | -------- | ---------------------------- |
| `artistId` | `String`  | Yes      | The unique artist identifier |
| `page`     | `int`     | No       | Page number (default: 0)     |
| `category` | `String?` | No       | Filter by category           |
| `sort`     | `String?` | No       | Sort order                   |

#### Returns

`Future<ArtistAlbumResponse>` - A future that resolves to:
- `results` - List of `AlbumResponse` objects
- `total` - Total number of albums
- `lastPage` - Whether this is the last page

## Usage Examples

### Basic Artist Lookup

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get artist details by ID
  final artist = await client.artists.detailsById('123456');
  
  print('Artist: ${artist.name}');
  print('Followers: ${artist.followerCount}');
  print('Top Songs: ${artist.topSongs.length}');
}
```

### Get Artist's Songs with Pagination

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get first page of artist's songs
  final songsResponse = await client.artists.artistSongs(
    '123456',
    page: 0,
  );
  
  print('Total songs: ${songsResponse.total}');
  print('Is last page: ${songsResponse.lastPage}');
  
  for (final song in songsResponse.results) {
    print('  - ${song.name} (${song.duration}s)');
  }
}
```

### Get Artist's Albums

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get first page of artist's albums
  final albumsResponse = await client.artists.artistAlbums(
    '123456',
    page: 0,
  );
  
  print('Total albums: ${albumsResponse.total}');
  
  for (final album in albumsResponse.results) {
    print('  - ${album.name} (${album.year})');
  }
}
```

### Paginate Through All Artist Songs

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  final artistId = '123456';
  
  var page = 0;
  var lastPage = false;
  final allSongs = <SongResponse>[];
  
  while (!lastPage) {
    final response = await client.artists.artistSongs(
      artistId,
      page: page,
    );
    
    allSongs.addAll(response.results);
    lastPage = response.lastPage;
    page++;
    
    print('Fetched page $page, total songs: ${allSongs.length}');
  }
  
  print('Total songs collected: ${allSongs.length}');
}
```

### Get Artist Top Songs from Details

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get artist details which includes top songs
  final artist = await client.artists.detailsById('123456');
  
  print('Top songs for ${artist.name}:');
  for (final song in artist.topSongs) {
    print('  - ${song.name}');
    print('    Album: ${song.album.name}');
    print('    Duration: ${song.duration}s');
  }
}
```

### Error Handling

```dart
import 'package:saavn_play/saavn_play.dart';
import 'package:dio/dio.dart';

void main() async {
  final client = saavn_playClient();
  
  try {
    final artist = await client.artists.detailsById('invalid_id');
    print('Artist: ${artist.name}');
  } on DioException catch (e) {
    print('Error: ${e.message}');
  }
}
```

## Related Endpoints

- [Album](album.md) - Get album details
- [Song](song.md) - Get song details
- [Search](search.md) - Search for artists
