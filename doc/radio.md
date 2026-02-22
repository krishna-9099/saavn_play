# Radio Endpoint

The Radio endpoint provides access to saavn_play's radio stations, allowing you to browse featured stations and retrieve songs from them.

## Overview

| Property           | Description                |
| ------------------ | -------------------------- |
| **Endpoint Class** | `RadioEndpoint`            |
| **Access Via**     | `saavn_playClient().radio` |

## Methods

### `getFeaturedStations()`

Retrieves a list of featured radio stations.

#### Parameters

None

#### Returns

`Future<RadioResponse>` - A future that resolves to:
- `featuredStations` - List of `RadioStation` objects

---

### `createFeaturedStation({required String name, required String language})`

Creates a radio station by name and language.

#### Parameters

| Parameter  | Type     | Required | Description                                            |
| ---------- | -------- | -------- | ------------------------------------------------------ |
| `name`     | `String` | Yes      | Station name (e.g., "Hit Factory", "Chill", "Romance") |
| `language` | `String` | Yes      | Language for the station (e.g., "english", "hindi")    |

#### Returns

`Future<CreatedRadioStation>` - A future that resolves to:
- `stationId` - The created station ID

---

### `getStationSongs({required String stationId, int count = 5, bool next = true})`

Retrieves songs from a radio station.

#### Parameters

| Parameter   | Type     | Required | Description                                            |
| ----------- | -------- | -------- | ------------------------------------------------------ |
| `stationId` | `String` | Yes      | The station ID from `createFeaturedStation`            |
| `count`     | `int`    | No       | Number of songs to retrieve (default: 5)               |
| `next`      | `bool`   | No       | Whether to get the next batch of songs (default: true) |

#### Returns

`Future<RadioStationSongsResponse>` - A future that resolves to:
- `songs` - List of `SongResponse` objects

---

### `getFeaturedStationSongs({required String name, required String language, int count = 5})`

Convenience method that creates a station and retrieves songs in one call.

#### Parameters

| Parameter  | Type     | Required | Description                                |
| ---------- | -------- | -------- | ------------------------------------------ |
| `name`     | `String` | Yes      | Station name (e.g., "Hit Factory")         |
| `language` | `String` | Yes      | Language for the station (e.g., "english") |
| `count`    | `int`    | No       | Number of songs to retrieve (default: 5)   |

#### Returns

`Future<RadioStationSongsResponse>` - A future that resolves to:
- `songs` - List of `SongResponse` objects

## Model Classes

### RadioStation

Represents a featured radio station.

| Property             | Type      | Description         |
| -------------------- | --------- | ------------------- |
| `name`               | `String`  | Station name        |
| `description`        | `String`  | Station description |
| `image`              | `String`  | Station image URL   |
| `stationType`        | `String`  | Type of station     |
| `query`              | `String`  | Query string        |
| `color`              | `String?` | Theme color         |
| `language`           | `String`  | Station language    |
| `stationDisplayText` | `String`  | Display text        |

### CreatedRadioStation

Represents a created radio station.

| Property    | Type     | Description                       |
| ----------- | -------- | --------------------------------- |
| `stationId` | `String` | The station ID for fetching songs |

### RadioStationSongsResponse

Represents the response from getting station songs.

| Property | Type                 | Description                    |
| -------- | -------------------- | ------------------------------ |
| `songs`  | `List<SongResponse>` | List of songs from the station |

## Usage Examples

### Get Featured Stations

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get featured radio stations
  final response = await client.radio.getFeaturedStations();
  
  print('Found ${response.featuredStations.length} stations');
  
  for (final station in response.featuredStations) {
    print('${station.name}');
    print('  Language: ${station.language}');
    print('  Type: ${station.stationType}');
  }
}
```

### Create Station and Get Songs (Two-Step Process)

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Step 1: Create a station
  final station = await client.radio.createFeaturedStation(
    name: 'Hit Factory',
    language: 'english',
  );
  
  print('Created station with ID: ${station.stationId}');
  
  // Step 2: Get songs from the station
  final songsResponse = await client.radio.getStationSongs(
    stationId: station.stationId,
    count: 5,
  );
  
  print('Received ${songsResponse.songs.length} songs');
  
  for (final song in songsResponse.songs) {
    print('  - ${song.name} by ${song.primaryArtists}');
  }
}
```

### Get Station Songs (Convenience Method)

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // One-step: Create station and get songs
  final response = await client.radio.getFeaturedStationSongs(
    name: 'Chill',
    language: 'english',
    count: 10,
  );
  
  print('Songs from Chill station:');
  for (final song in response.songs) {
    print('  ${song.name}');
    print('    Album: ${song.album.name}');
    print('    Duration: ${song.duration}s');
  }
}
```

### Get Multiple Song Batches

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Create a station
  final station = await client.radio.createFeaturedStation(
    name: 'Romance',
    language: 'english',
  );
  
  // Get first batch
  final batch1 = await client.radio.getStationSongs(
    stationId: station.stationId,
    count: 5,
    next: true,
  );
  
  print('First batch: ${batch1.songs.length} songs');
  
  // Get next batch
  final batch2 = await client.radio.getStationSongs(
    stationId: station.stationId,
    count: 5,
    next: true,
  );
  
  print('Second batch: ${batch2.songs.length} songs');
}
```

### Different Station Types

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Try different station names
  final stationNames = ['Hit Factory', 'Chill', 'Romance', 'Workout', 'Party'];
  
  for (final name in stationNames) {
    try {
      final response = await client.radio.getFeaturedStationSongs(
        name: name,
        language: 'english',
        count: 3,
      );
      
      print('\n=== $name Station ===');
      for (final song in response.songs) {
        print('  ${song.name}');
      }
    } catch (e) {
      print('Could not create "$name" station: $e');
    }
  }
}
```

### Different Languages

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Try different languages
  final languages = ['english', 'hindi', 'punjabi'];
  
  for (final language in languages) {
    try {
      final response = await client.radio.getFeaturedStationSongs(
        name: 'Top Hits',
        language: language,
        count: 3,
      );
      
      print('\n=== $language Station ===');
      for (final song in response.songs) {
        print('  ${song.name} (${song.language})');
      }
    } catch (e) {
      print('Could not create station for "$language": $e');
    }
  }
}
```

### Access Song Details from Radio

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final response = await client.radio.getFeaturedStationSongs(
    name: 'Hit Factory',
    language: 'english',
    count: 5,
  );
  
  for (final song in response.songs) {
    print('=== ${song.name} ===');
    print('ID: ${song.id}');
    print('Album: ${song.album.name}');
    print('Artists: ${song.primaryArtists}');
    print('Duration: ${song.duration}s');
    print('Language: ${song.language}');
    print('Year: ${song.year}');
    print('Play Count: ${song.playCount}');
    print('Has Lyrics: ${song.hasLyrics}');
    print('URL: ${song.url}');
    print('');
  }
}
```

### Get Download Links from Radio Songs

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final response = await client.radio.getFeaturedStationSongs(
    name: 'Hit Factory',
    language: 'english',
    count: 1,
  );
  
  if (response.songs.isNotEmpty) {
    final song = response.songs.first;
    
    print('Song: ${song.name}');
    
    // Get download URLs
    if (song.downloadUrl != null) {
      print('\nDownload URLs:');
      for (final link in song.downloadUrl!) {
        print('  Quality: ${link.quality}');
        print('  URL: ${link.url}');
      }
    }
    
    // Get image URLs
    if (song.image != null) {
      print('\nImage URLs:');
      for (final img in song.image!) {
        print('  Size: ${img.quality}');
        print('  URL: ${img.url}');
      }
    }
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
    final response = await client.radio.getFeaturedStationSongs(
      name: 'Invalid Station Name',
      language: 'english',
    );
    
    print('Found ${response.songs.length} songs');
  } on DioException catch (e) {
    print('Network error: ${e.message}');
  } catch (e) {
    print('Error: $e');
  }
}
```

## API Flow

1. **Create Station**: Call `createFeaturedStation(name, language)` to get a `stationId`
2. **Get Songs**: Use the `stationId` with `getStationSongs(stationId, count, next)` to retrieve songs
3. **Convenience**: Or use `getFeaturedStationSongs(name, language, count)` to do both in one call

## Notes

- Station names are case-sensitive
- Not all station names may be available in all languages
- The `next` parameter in `getStationSongs` determines if you get the next batch of songs
- Radio stations return randomized songs each time they're created

## Related Endpoints

- [Home](home.md) - Get home data which includes radio stations
- [Song](song.md) - Get detailed song information
