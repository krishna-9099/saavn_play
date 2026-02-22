# Lyrics Endpoint

The Lyrics endpoint provides access to song lyrics from saavn_play.

## Overview

| Property           | Description                 |
| ------------------ | --------------------------- |
| **Endpoint Class** | `LyricsEndpoint`            |
| **Access Via**     | `saavn_playClient().lyrics` |

## Methods

### `get(String songId)`

Retrieves lyrics for a song by its ID.

#### Parameters

| Parameter | Type     | Required | Description                |
| --------- | -------- | -------- | -------------------------- |
| `songId`  | `String` | Yes      | The unique song identifier |

#### Returns

`Future<LyricsResponse>` - A future that resolves to a lyrics response containing:
- `lyrics` - The full lyrics text (can be null if unavailable)
- `snippet` - A short snippet of the lyrics
- `copyright` - Copyright information

## Usage Examples

### Basic Lyrics Retrieval

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get lyrics for a song
  final lyrics = await client.lyrics.get('S3dGvXSb');
  
  print('Lyrics:');
  print(lyrics.lyrics);
  print('\nCopyright: ${lyrics.copyright}');
}
```

### Get Lyrics After Song Search

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for a song
  final searchResults = await client.search.songs('Blinding Lights', limit: 1);
  
  if (searchResults.results.isNotEmpty) {
    final song = searchResults.results.first;
    print('Song: ${song.name}');
    print('Has Lyrics: ${song.hasLyrics}');
    
    // Get lyrics if available
    if (song.hasLyrics == 'true') {
      final lyrics = await client.lyrics.get(song.id);
      print('\nLyrics:');
      print(lyrics.lyrics);
    }
  }
}
```

### Handle Missing Lyrics

```dart
import 'package:saavn_play/saavn_play.dart';
import 'package:dio/dio.dart';

void main() async {
  final client = saavn_playClient();
  
  try {
    final lyrics = await client.lyrics.get('song_id_without_lyrics');
    
    if (lyrics.lyrics != null) {
      print('Lyrics found:');
      print(lyrics.lyrics);
    } else {
      print('No lyrics available for this song');
    }
  } on DioException catch (e) {
    if (e.error == 'Lyrics not found for this song') {
      print('Lyrics are not available for this song');
    } else {
      print('Error: ${e.message}');
    }
  }
}
```

### Display Lyrics with Metadata

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get song details
  final songs = await client.songs.detailsById(['S3dGvXSb']);
  final song = songs.first;
  
  print('=== ${song.name} ===');
  print('Artist: ${song.primaryArtists}');
  print('Album: ${song.album.name}');
  print('');
  
  // Get and display lyrics
  try {
    final lyrics = await client.lyrics.get(song.id);
    
    if (lyrics.snippet != null && lyrics.snippet!.isNotEmpty) {
      print('Preview: "${lyrics.snippet}"');
      print('');
    }
    
    if (lyrics.lyrics != null) {
      print('--- Lyrics ---');
      print(lyrics.lyrics);
      print('');
      print('--- Copyright ---');
      print(lyrics.copyright);
    }
  } on DioException catch (e) {
    print('Could not retrieve lyrics: ${e.error}');
  }
}
```

### Check Lyrics Availability Before Fetching

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Search for songs
  final results = await client.search.songs('popular song', limit: 5);
  
  for (final song in results.results) {
    print('${song.name} - Has Lyrics: ${song.hasLyrics}');
    
    // Only fetch lyrics if available
    if (song.hasLyrics == 'true') {
      try {
        final lyrics = await client.lyrics.get(song.id);
        print('  Lyrics snippet: ${lyrics.snippet}');
      } catch (e) {
        print('  Could not fetch lyrics');
      }
    }
  }
}
```

## Notes

- Not all songs have lyrics available
- The `hasLyrics` property on `SongResponse` indicates if lyrics are available
- Lyrics may be restricted due to copyright in some regions
- Always check if `lyrics.lyrics` is null before displaying

## Related Endpoints

- [Song](song.md) - Get song details (includes `hasLyrics` property)
- [Search](search.md) - Search for songs
