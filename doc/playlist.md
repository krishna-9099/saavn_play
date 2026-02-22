# Playlist Endpoint

The Playlist endpoint provides access to playlist details from saavn_play.

## Overview

| Property           | Description                    |
| ------------------ | ------------------------------ |
| **Endpoint Class** | `PlaylistEndpoint`             |
| **Access Via**     | `saavn_playClient().playlists` |

## Methods

### `detailsById(String id)`

Retrieves detailed information about a playlist by its ID.

#### Parameters

| Parameter | Type     | Required | Description                    |
| --------- | -------- | -------- | ------------------------------ |
| `id`      | `String` | Yes      | The unique playlist identifier |

#### Returns

`Future<PlaylistResponse>` - A future that resolves to a playlist response containing:
- `id` - Playlist ID
- `name` - Playlist name
- `subtitle` - Playlist subtitle/description
- `type` - Content type (usually "playlist")
- `permaUrl` - Permalink URL
- `image` - Playlist cover image
- `language` - Playlist language
- `songs` - List of songs in the playlist

## Usage Examples

### Basic Playlist Lookup

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get playlist details by ID
  final playlist = await client.playlists.detailsById('1111580647');
  
  print('Playlist: ${playlist.name}');
  print('Subtitle: ${playlist.subtitle}');
  print('Songs: ${playlist.songs.length}');
}
```

### Access Playlist Songs

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final playlist = await client.playlists.detailsById('1111580647');
  
  print('Songs in "${playlist.name}":');
  for (final song in playlist.songs) {
    print('  - ${song.name}');
    print('    Artist: ${song.primaryArtists}');
    print('    Duration: ${song.duration}s');
  }
}
```

### Get Playlist from URL

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Extract ID from saavn_play playlist URL
  // URL format: https://www.saavn_play.com/s/playlist/.../playlist_id
  final playlistUrl = 'https://www.saavn_play.com/s/playlist/2279/Best-of-2022/1111580647';
  final playlistId = playlistUrl.split('/').last;
  
  final playlist = await client.playlists.detailsById(playlistId);
  print('Playlist: ${playlist.name}');
  print('Total songs: ${playlist.songs.length}');
}
```

### Calculate Playlist Duration

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final playlist = await client.playlists.detailsById('1111580647');
  
  // Calculate total duration
  var totalSeconds = 0;
  for (final song in playlist.songs) {
    totalSeconds += int.tryParse(song.duration) ?? 0;
  }
  
  final hours = totalSeconds ~/ 3600;
  final minutes = (totalSeconds % 3600) ~/ 60;
  final seconds = totalSeconds % 60;
  
  print('Playlist: ${playlist.name}');
  print('Total duration: ${hours}h ${minutes}m ${seconds}s');
}
```

### Error Handling

```dart
import 'package:saavn_play/saavn_play.dart';
import 'package:dio/dio.dart';

void main() async {
  final client = saavn_playClient();
  
  try {
    final playlist = await client.playlists.detailsById('invalid_id');
    print('Playlist: ${playlist.name}');
  } on DioException catch (e) {
    print('Error fetching playlist: ${e.message}');
  }
}
```

### Complete Playlist Information

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final playlist = await client.playlists.detailsById('1111580647');
  
  print('=== Playlist Information ===');
  print('ID: ${playlist.id}');
  print('Name: ${playlist.name}');
  print('Subtitle: ${playlist.subtitle}');
  print('Type: ${playlist.type}');
  print('Language: ${playlist.language}');
  print('URL: ${playlist.permaUrl}');
  print('Total Songs: ${playlist.songs.length}');
  
  if (playlist.image != null && playlist.image!.isNotEmpty) {
    print('Cover Image: ${playlist.image!.last.url}');
  }
}
```

## Related Endpoints

- [Song](song.md) - Get detailed song information
- [Search](search.md) - Search for playlists
