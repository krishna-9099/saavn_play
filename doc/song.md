# Song Endpoint

The Song endpoint provides access to song details from saavn_play.

## Overview

| Property           | Description                |
| ------------------ | -------------------------- |
| **Endpoint Class** | `SongEndpoint`             |
| **Access Via**     | `saavn_playClient().songs` |

## Methods

### `detailsById(List<String> ids)`

Retrieves detailed information about one or more songs by their IDs.

#### Parameters

| Parameter | Type           | Required | Description                     |
| --------- | -------------- | -------- | ------------------------------- |
| `ids`     | `List<String>` | Yes      | List of unique song identifiers |

#### Returns

`Future<List<SongResponse>>` - A future that resolves to a list of song responses, each containing:
- `id` - Song ID
- `name` - Song name
- `type` - Content type (usually "song")
- `album` - Album information (`SongResponseAlbum`)
  - `id` - Album ID
  - `name` - Album name
  - `url` - Album URL
- `year` - Release year
- `releaseDate` - Release date
- `duration` - Duration in seconds
- `label` - Record label
- `primaryArtists` - Primary artists names
- `primaryArtistsId` - Primary artists IDs
- `featuredArtists` - Featured artists names
- `featuredArtistsId` - Featured artists IDs
- `explicitContent` - Explicit content flag (0 or 1)
- `playCount` - Play count
- `language` - Song language
- `hasLyrics` - Whether lyrics are available
- `url` - Permalink URL
- `copyright` - Copyright information
- `image` - List of image download links
- `downloadUrl` - List of audio download links

## Usage Examples

### Single Song Lookup

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get details for a single song
  final songs = await client.songs.detailsById(['S3dGvXSb']);
  
  final song = songs.first;
  print('Song: ${song.name}');
  print('Album: ${song.album.name}');
  print('Duration: ${song.duration}s');
  print('Artists: ${song.primaryArtists}');
}
```

### Multiple Songs Lookup

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get details for multiple songs at once
  final songIds = ['S3dGvXSb', 'fW-Mxsnu', 'xKlnh38y'];
  final songs = await client.songs.detailsById(songIds);
  
  print('Retrieved ${songs.length} songs:');
  for (final song in songs) {
    print('  - ${song.name} by ${song.primaryArtists}');
  }
}
```

### Accessing Download URLs

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final songs = await client.songs.detailsById(['S3dGvXSb']);
  final song = songs.first;
  
  // Get download URLs in different qualities
  if (song.downloadUrl != null && song.downloadUrl!.isNotEmpty) {
    // Download links are available in multiple qualities
    // Typically: 96kbps, 160kbps, 320kbps
    for (final link in song.downloadUrl!) {
      print('Quality: ${link.quality}');
      print('URL: ${link.url}');
    }
  }
}
```

### Working with Song Images

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final songs = await client.songs.detailsById(['S3dGvXSb']);
  final song = songs.first;
  
  // Get song artwork in different sizes
  if (song.image != null && song.image!.isNotEmpty) {
    // Images are available in sizes: 50x50, 150x150, 500x500
    final thumbnail = song.image!.first;  // Smallest
    final fullSize = song.image!.last;     // Largest
    
    print('Thumbnail: ${thumbnail.url}');
    print('Full Size: ${fullSize.url}');
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
    final songs = await client.songs.detailsById(['invalid_id']);
    print('Found ${songs.length} songs');
  } on DioException catch (e) {
    if (e.error == 'No songs found') {
      print('No songs found for the given IDs');
    } else {
      print('Error: ${e.message}');
    }
  }
}
```

### Complete Song Information

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final songs = await client.songs.detailsById(['S3dGvXSb']);
  final song = songs.first;
  
  print('=== Song Information ===');
  print('ID: ${song.id}');
  print('Name: ${song.name}');
  print('Album: ${song.album.name}');
  print('Album ID: ${song.album.id}');
  print('Year: ${song.year}');
  print('Release Date: ${song.releaseDate}');
  print('Duration: ${song.duration} seconds');
  print('Language: ${song.language}');
  print('Label: ${song.label}');
  print('Primary Artists: ${song.primaryArtists}');
  print('Featured Artists: ${song.featuredArtists}');
  print('Play Count: ${song.playCount}');
  print('Explicit: ${song.explicitContent == 1}');
  print('Has Lyrics: ${song.hasLyrics}');
  print('URL: ${song.url}');
  print('Copyright: ${song.copyright}');
}
```

## Related Endpoints

- [Album](album.md) - Get album details
- [Artist](artist.md) - Get artist details
- [Lyrics](lyrics.md) - Get song lyrics
- [Search](search.md) - Search for songs
