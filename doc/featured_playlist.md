# Featured Playlists Endpoint Documentation

## Overview

The `content.getFeaturedPlaylists` endpoint retrieves paginated featured playlists with optional filtering by language, type, and category.

## Endpoint

```
GET https://www.saavn_play.com/api.php?__call=content.getFeaturedPlaylists
```

## Parameters

### Required Parameters

| Parameter | Type    | Description                           |
| --------- | ------- | ------------------------------------- |
| `n`       | integer | Number of playlists to return (1-100) |

### Optional Parameters

| Parameter  | Type    | Default | Description                                           |
| ---------- | ------- | ------- | ----------------------------------------------------- |
| `p`        | integer | `1`     | Page number for pagination                            |
| `language` | string  | `hindi` | Language filter (e.g., `hindi`, `english`, `punjabi`) |
| `type`     | string  | -       | Playlist type filter                                  |
| `category` | string  | -       | Category filter                                       |

### Standard Parameters

| Parameter     | Value      | Description     |
| ------------- | ---------- | --------------- |
| `_format`     | `json`     | Response format |
| `_marker`     | `0`        | Response marker |
| `ctx`         | `web6dot0` | Client context  |
| `api_version` | `4`        | API version     |

## Usage Examples

### Basic Usage

```dart
import 'package:saavn_play/saavn_play.dart';

final featured = FeaturedPlaylistEndpoint();
final response = await featured.getFeaturedPlaylists(n: 10);

print('Total: ${response.total}');
for (final playlist in response.playlists) {
  print('${playlist.title} - ${playlist.songCount} songs');
}
```

### With Language Filter

```dart
final response = await featured.getFeaturedPlaylists(
  n: 20,
  language: 'english',
);
```

### With Pagination

```dart
// Get first page
final page1 = await featured.getFeaturedPlaylists(n: 10, p: 1);

// Get second page
final page2 = await featured.getFeaturedPlaylists(n: 10, p: 2);

print('Page 1: ${page1.playlists.length} playlists');
print('Page 2: ${page2.playlists.length} playlists');
```

### With Category Filter

```dart
final response = await featured.getFeaturedPlaylists(
  n: 15,
  language: 'punjabi',
  category: 'top',
);
```

## Response Model

### FeaturedPlaylistsResponse

```dart
class FeaturedPlaylistsResponse {
  String title;
  String position;
  int total;
  int start;
  List<FeaturedPlaylistItem> playlists;
}
```

### FeaturedPlaylistItem

```dart
class FeaturedPlaylistItem {
  String id;
  String title;
  String? subtitle;
  String type;
  String? permaUrl;
  String? image;
  String? language;
  String? year;
  String? playCount;
  String? explicitContent;
  int? songCount;
  Map<String, dynamic>? moreInfo;
}
```

## Response Structure

```json
{
  "title": "Featured Playlists",
  "position": 1,
  "total": 50,
  "start": 0,
  "list": [
    {
      "id": "123456",
      "title": "Top Bollywood Hits",
      "subtitle": "Best of Bollywood",
      "type": "playlist",
      "perma_url": "https://www.saavn_play.com/playlist/top-bollywood-hits/...",
      "image": "https://...",
      "language": "hindi",
      "year": "2024",
      "play_count": "1000000",
      "explicit_content": "0",
      "more_info": {
        "song_count": "50",
        "uid": "..."
      }
    }
  ]
}
```

## Supported Languages

The `language` parameter supports various language codes:

| Code         | Language   |
| ------------ | ---------- |
| `hindi`      | Hindi      |
| `english`    | English    |
| `punjabi`    | Punjabi    |
| `tamil`      | Tamil      |
| `telugu`     | Telugu     |
| `marathi`    | Marathi    |
| `gujarati`   | Gujarati   |
| `bengali`    | Bengali    |
| `kannada`    | Kannada    |
| `malayalam`  | Malayalam  |
| `urdu`       | Urdu       |
| `odia`       | Odia       |
| `assamese`   | Assamese   |
| `rajasthani` | Rajasthani |
| `haryanvi`   | Haryanvi   |
| `bhojpuri`   | Bhojpuri   |

## Error Handling

The method may throw `DioException` on failure:

```dart
try {
  final response = await featured.getFeaturedPlaylists(n: 10);
} on DioException catch (e) {
  print('Error: ${e.message}');
}
```

## API Version Compatibility

This endpoint works with API versions 1-6. Version 4 is recommended.

| v1  | v2  | v3  | v4  | v5  | v6  |
| --- | --- | --- | --- | --- | --- |
|     |     |     |     |     |     |

## Related Endpoints

- [`playlist.getPlaylist`](playlist.md) - Get playlist details by ID
- [`webapi.get`](webapi.md) - Unified entity details endpoint
- [`webapi.getFooterDetails`](webapi.md#webapigetfooterdetails) - Footer playlists

## Notes

- The `n` parameter is required and should be between 1-100
- Pagination starts at page 1 (not 0)
- Results may vary by language and region
- Some playlists may have restricted access based on user authentication