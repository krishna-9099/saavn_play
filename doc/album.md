# Album Endpoint

The Album endpoint provides access to album details from saavn_play.

## Overview

| Property           | Description                 |
| ------------------ | --------------------------- |
| **Endpoint Class** | `AlbumEndpoint`             |
| **Access Via**     | `saavn_playClient().albums` |

## Methods

### `detailsById(String id)`

Retrieves detailed information about an album by its ID.

#### Parameters

| Parameter | Type     | Required | Description                 |
| --------- | -------- | -------- | --------------------------- |
| `id`      | `String` | Yes      | The unique album identifier |

#### Returns

`Future<AlbumResponse>` - A future that resolves to an album response containing:
- `id` - Album ID
- `name` - Album name
- `year` - Release year
- `releaseDate` - Release date
- `primaryArtists` - Primary artists names
- `primaryArtistsId` - Primary artists IDs
- `image` - List of image download links in various sizes
- `songs` - List of songs in the album
- `url` - Permalink URL

## Usage Examples

### Basic Album Lookup

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get album details by ID
  final album = await client.albums.detailsById('2428823');
  
  print('Album: ${album.name}');
  print('Year: ${album.year}');
  print('Artists: ${album.primaryArtists}');
  print('Songs: ${album.songs.length}');
}
```

### Accessing Album Songs

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final album = await client.albums.detailsById('2428823');
  
  // List all songs in the album
  for (final song in album.songs) {
    print('  - ${song.name} (${song.duration}s)');
  }
}
```

### Working with Album Images

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final album = await client.albums.detailsById('2428823');
  
  // Get different image sizes
  if (album.image != null && album.image!.isNotEmpty) {
    // Images are available in multiple sizes
    final smallImage = album.image!.first;  // 50x50
    final largeImage = album.image!.last;   // 500x500
    
    print('Small Image: ${smallImage.url}');
    print('Large Image: ${largeImage.url}');
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
    final album = await client.albums.detailsById('invalid_id');
    print('Album: ${album.name}');
  } on DioException catch (e) {
    print('Error: ${e.message}');
  }
}
```

## Related Endpoints

- [Artist](artist.md) - Get artist details and songs
- [Song](song.md) - Get song details
- [Search](search.md) - Search for albums
