# Webapi Endpoint Documentation

## Overview

The `webapi.get` endpoint is a versatile unified API that retrieves details for various entity types including shows, albums, playlists, artists, songs, radio stations, episodes, and mixes.

## Endpoint

```
GET https://www.saavn_play.com/api.php?__call=webapi.get
```

## Parameters

### Required Parameters

| Parameter | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| `token`   | string | Entity token/ID (from URL or API response) |
| `type`    | string | Entity type (see supported types below)    |

### Optional Parameters

| Parameter         | Type   | Default | Description                    |
| ----------------- | ------ | ------- | ------------------------------ |
| `season_number`   | string | -       | Season number for shows        |
| `sort_order`      | string | -       | Sort order for content         |
| `includeMetaTags` | string | `0`     | Include meta tags (`0` or `1`) |

### Standard Parameters

| Parameter     | Value      | Description     |
| ------------- | ---------- | --------------- |
| `_format`     | `json`     | Response format |
| `_marker`     | `0`        | Response marker |
| `ctx`         | `web6dot0` | Client context  |
| `api_version` | `4`        | API version     |

## Supported Entity Types

| Type       | Description      | Response Structure                |
| ---------- | ---------------- | --------------------------------- |
| `show`     | Podcast show     | Show details, seasons, episodes   |
| `album`    | Music album      | Album details with song list      |
| `playlist` | Curated playlist | Playlist details with songs       |
| `artist`   | Music artist     | Artist details, top songs, albums |
| `song`     | Individual song  | Song details                      |
| `radio`    | Radio station    | Station details                   |
| `episode`  | Podcast episode  | Episode list                      |
| `mix`      | User-created mix | Mix details with songs            |

> **Note:** The `mix` type is a newly discovered entity type that returns a similar structure to playlists. The `episode` type returns episodes from a show when provided with a valid show token.

## Usage Examples

### Get Show Details

```dart
import 'package:saavn_play/saavn_play.dart';

final webapi = WebapiEndpoint();
final show = await webapi.getShow(token: 'q3nfP8Sr8ZM_');

print('Show: ${show.showDetails?.title}');
print('Seasons: ${show.seasons?.length}');
print('Episodes: ${show.episodes?.length}');
```

### Get Album Details

```dart
final album = await webapi.get(token: 'album_token', type: 'album');
print('Album: ${album['title']}');
print('Songs: ${album['list']?.length}');
```

### Get Artist Details

```dart
final artist = await webapi.get(token: 'artist_id', type: 'artist');
print('Artist: ${artist['name']}');
print('Followers: ${artist['follower_count']}');
print('Top Songs: ${artist['topSongs']?.length}');
```

## Response Models

### ShowResponse

```dart
class ShowResponse {
  ShowDetails? showDetails;
  List<Season>? seasons;
  List<Episode>? episodes;
  Map<String, dynamic>? modules;
}
```

### ShowDetails

```dart
class ShowDetails {
  String id;
  String title;
  String? subtitle;
  String? headerDesc;
  String type;
  String? permaUrl;
  String? image;
  String? language;
  String? year;
  String? playCount;
  String? explicitContent;
  Map<String, dynamic>? moreInfo;
}
```

### Season

```dart
class Season {
  String id;
  String title;
  String? subtitle;
  String type;
  String? image;
  String? permaUrl;
  Map<String, dynamic>? moreInfo;
}
```

### Episode

```dart
class Episode {
  String id;
  String title;
  String? subtitle;
  String? headerDesc;
  String type;
  String? permaUrl;
  String? image;
  String? language;
  String? year;
  String? playCount;
  String? explicitContent;
  Map<String, dynamic>? moreInfo;
}
```

## Related Endpoints

- [`webapi.getLaunchData`](home.md) - Get home/launch data
- [`webapi.getFooterDetails`](#webapigetfooterdetails) - Get footer content
- [`webapi.getBrowseHoverDetails`](#webapigetbrowsehoverdetails) - Get mega menu content

---

## webapi.getFooterDetails

Retrieves footer content for the saavn_play website including featured playlists, artists, albums, and actors.

### Endpoint

```
GET https://www.saavn_play.com/api.php?__call=webapi.getFooterDetails
```

### Parameters

| Parameter  | Type   | Required | Description                              |
| ---------- | ------ | -------- | ---------------------------------------- |
| `language` | string | Yes      | Language code (e.g., `hindi`, `english`) |

### Example

```dart
final footer = await webapi.getFooterDetails(language: 'hindi');
print('Playlists: ${footer.playlists.length}');
print('Artists: ${footer.artists.length}');
```

### Response

```dart
class FooterDetails {
  List<FooterPlaylistItem> playlists;
  List<FooterArtistItem> artists;
  List<FooterPlaylistItem> albums;
  List<FooterArtistItem> actors;
}
```

---

## webapi.getBrowseHoverDetails

Retrieves mega menu content for the browse section including top artists, playlists, and new releases.

### Endpoint

```
GET https://www.saavn_play.com/api.php?__call=webapi.getBrowseHoverDetails
```

### Parameters

| Parameter        | Type   | Required | Default | Description                 |
| ---------------- | ------ | -------- | ------- | --------------------------- |
| `language`       | string | Yes      | -       | Language code               |
| `is_entity_page` | string | No       | `true`  | Whether it's an entity page |

### Example

```dart
final hover = await webapi.getBrowseHoverDetails(language: 'hindi');
print('Top Artists: ${hover.topArtists.length}');
print('Top Playlists: ${hover.topPlaylists.length}');
print('New Releases: ${hover.newReleases.length}');
```

### Response

```dart
class BrowseHoverDetails {
  List<MegaMenuItem> topArtists;
  List<MegaMenuItem> topPlaylists;
  List<MegaMenuItem> newReleases;
}
```

## Error Handling

All methods may throw `DioException` on failure:

```dart
try {
  final show = await webapi.getShow(token: 'invalid_token');
} on DioException catch (e) {
  print('Error: ${e.message}');
}
```

## API Version Compatibility

All webapi endpoints work with API versions 1-6. Version 4 is recommended for best compatibility.

| Endpoint                       | v1  | v2  | v3  | v4  | v5  | v6  |
| ------------------------------ | --- | --- | --- | --- | --- | --- |
| `webapi.get`                   | ✓   | ✓   | ✓   | ✓   | ✓   | ✓   |
| `webapi.getFooterDetails`      | ✓   | ✓   | ✓   | ✓   | ✓   | ✓   |
| `webapi.getBrowseHoverDetails` | ✓   | ✓   | ✓   | ✓   | ✓   | ✓   |
