# saavn_play API v6 Documentation

## Overview

API version 6 (`api_version=6`) is the latest version of the saavn_play API. This document provides comprehensive documentation for all working endpoints with v6.

## Base Configuration

```
Base URL: https://www.saavn_play.com/api.php
Default Parameters:
  - _format: json
  - _marker: 0
  - ctx: web6dot0
  - api_version: 6
```

## Endpoint Categories

### 1. Unified Entity Endpoint

#### `webapi.get`

A versatile endpoint that retrieves details for various entity types.

**Parameters:**

| Parameter         | Type   | Required | Description             |
| ----------------- | ------ | -------- | ----------------------- |
| `token`           | string | Yes      | Entity token/ID         |
| `type`            | string | Yes      | Entity type             |
| `season_number`   | string | No       | Season number for shows |
| `sort_order`      | string | No       | Sort order              |
| `includeMetaTags` | string | No       | Include meta tags (0/1) |

**Supported Types:**

| Type       | Description      | Response Keys                                               |
| ---------- | ---------------- | ----------------------------------------------------------- |
| `show`     | Podcast show     | `show_details`, `seasons`, `episodes`, `modules`            |
| `album`    | Music album      | 18 keys including `list`, `more_info`, `modules`            |
| `playlist` | Curated playlist | 18 keys including `list`, `more_info`, `modules`            |
| `artist`   | Music artist     | 23 keys including `topSongs`, `topAlbums`, `similarArtists` |
| `mix`      | User-created mix | 18 keys including `list`, `more_info`, `description`        |
| `episode`  | Podcast episode  | `episodes`, `modules`                                       |

**Response Structure (Album Example):**

```json
{
  "id": "string",
  "title": "string",
  "subtitle": "string",
  "header_desc": "string",
  "type": "album",
  "perma_url": "string",
  "image": "string",
  "language": "string",
  "year": "string",
  "play_count": "string",
  "explicit_content": 0,
  "list_count": 10,
  "list_type": "song",
  "list": [...],
  "more_info": {
    "artistMap": {
      "primary_artists": [...],
      "featured_artists": [...],
      "artists": [...]
    },
    "song_count": "10",
    "copyright_text": "string",
    "is_dolby_content": false,
    "label_url": "string"
  },
  "modules": {...}
}
```

**Response Structure (Artist Example):**

```json
{
  "artistId": "string",
  "name": "string",
  "subtitle": "string",
  "image": "string",
  "follower_count": "string",
  "type": "artist",
  "isVerified": false,
  "dominantLanguage": "string",
  "dominantType": "string",
  "topSongs": [...],
  "topAlbums": [...],
  "dedicated_artist_playlist": {...},
  "featured_artist_playlist": {...},
  "singles": [...],
  "latest_release": [...],
  "similarArtists": [...],
  "isRadioPresent": true,
  "urls": {
    "albums": "string",
    "bio": "string",
    "comments": "string",
    "songs": "string",
    "overview": "string"
  },
  "availableLanguages": [...],
  "fan_count": 0
}
```

---

### 2. Footer & Navigation Endpoints

#### `webapi.getFooterDetails`

Retrieves footer content for the website.

**Parameters:**

| Parameter  | Type   | Required | Description                          |
| ---------- | ------ | -------- | ------------------------------------ |
| `language` | string | Yes      | Language code (hindi, english, etc.) |

**Response Structure:**

```json
{
  "playlist": [
    {"id": "string", "title": "string", "action": "string"}
  ],
  "artist": [
    {"id": "string", "title": "string", "action": "string"}
  ],
  "album": [
    {"id": "string", "title": "string", "action": "string"}
  ],
  "actor": [
    {"id": "string", "title": "string", "action": "string"}
  ]
}
```

#### `webapi.getBrowseHoverDetails`

Retrieves mega menu content for navigation.

**Parameters:**

| Parameter        | Type   | Required | Description                   |
| ---------------- | ------ | -------- | ----------------------------- |
| `language`       | string | Yes      | Language code                 |
| `is_entity_page` | string | No       | Entity page flag (true/false) |

**Response Structure:**

```json
{
  "mega_menu": {
    "top_artists": [
      {"title": "string", "perma_url": "string"}
    ],
    "top_playlists": [
      {"title": "string", "perma_url": "string"}
    ],
    "new_releases": [
      {"title": "string", "perma_url": "string"}
    ]
  }
}
```

---

### 3. Content Endpoints

#### `content.getFeaturedPlaylists`

Retrieves paginated featured playlists.

**Parameters:**

| Parameter  | Type   | Required | Description          |
| ---------- | ------ | -------- | -------------------- |
| `n`        | string | Yes      | Number of results    |
| `p`        | string | No       | Page number          |
| `language` | string | No       | Language filter      |
| `type`     | string | No       | Playlist type filter |
| `category` | string | No       | Category filter      |

**Response Structure (v6):**

```json
{
  "data": [
    {
      "listid": "string",
      "listname": "string",
      "secondary_subtitle": "string",
      "firstname": "string",
      "data_type": "string",
      "count": 50,
      "image": "string",
      "sponsored": false,
      "perma_url": "string",
      "follower_count": "string",
      "uid": "string",
      "last_updated": 1234567890
    }
  ],
  "count": 10,
  "last_page": false
}
```

**Note:** v6 uses `listid` and `listname` instead of `id` and `title` used in v4.

#### `content.getAlbums`

Retrieves paginated albums.

**Parameters:**

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| `n`       | string | Yes      | Number of results |

**Response Structure:**

```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "subtitle": "string",
      "type": "album",
      "image": "string",
      "perma_url": "string",
      "more_info": {...}
    }
  ],
  "count": 5,
  "last_page": false
}
```

#### `content.getCharts`

Retrieves chart playlists.

**Parameters:**

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| `n`       | string | No       | Number of results |

**Response Structure:**

```json
[
  {
    "id": "string",
    "image": "string",
    "title": "string",
    "type": "playlist",
    "count": 50,
    "perma_url": "string",
    "more_info": {
      "firstname": "string"
    }
  }
]
```

#### `content.getTrending`

Retrieves trending content.

**Parameters:**

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| `n`       | string | No       | Number of results |

**Response Structure:**

```json
[
  {
    "id": "string",
    "title": "string",
    "subtitle": "string",
    "type": "album",
    "image": "string",
    "perma_url": "string",
    "language": "string",
    "more_info": {
      "release_date": "string",
      "song_count": "string",
      "artistMap": {...}
    }
  }
]
```

---

### 4. Search Endpoints

#### `search.getResults`

General search across all content types.

**Parameters:**

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| `q`       | string | Yes      | Search query      |
| `n`       | string | No       | Number of results |

**Response Structure:**

```json
{
  "total": 4617,
  "start": 1,
  "results": [
    {
      "id": "string",
      "title": "string",
      "subtitle": "string",
      "type": "song",
      "image": "string",
      "perma_url": "string",
      "more_info": {...}
    }
  ]
}
```

#### `search.getAlbumResults`

Search for albums only.

**Parameters:**

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| `q`       | string | Yes      | Search query      |
| `n`       | string | No       | Number of results |

#### `search.getArtistResults`

Search for artists only.

**Parameters:**

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| `q`       | string | Yes      | Search query      |
| `n`       | string | No       | Number of results |

**Response Structure:**

```json
{
  "total": 178,
  "start": 1,
  "results": [
    {
      "id": "string",
      "title": "string",
      "subtitle": "string",
      "type": "artist",
      "image": "string",
      "perma_url": "string"
    }
  ]
}
```

#### `search.getPlaylistResults`

Search for playlists only.

**Parameters:**

| Parameter | Type   | Required | Description       |
| --------- | ------ | -------- | ----------------- |
| `q`       | string | Yes      | Search query      |
| `n`       | string | No       | Number of results |

---

### 5. Home/Launch Endpoint

#### `webapi.getLaunchData`

Retrieves home page content.

**Parameters:**

| Parameter  | Type   | Required | Description   |
| ---------- | ------ | -------- | ------------- |
| `language` | string | No       | Language code |

**Response Structure:**

```json
{
  "history": [],
  "new_trending": [...],
  "top_playlists": [...],
  "new_albums": [...],
  "browse_discover": [...],
  "global_config": {
    "weekly_top_songs_listid": {...},
    "random_songs_listid": {...},
    "phn_otp_providers": {...}
  },
  "charts": [...],
  "radio": [...],
  "artist_recos": [...],
  "promo:vx:data:31": [...],
  "promo:vx:data:68": [...],
  "promo:vx:data:76": [...],
  "promo:vx:data:185": [...],
  "promo:vx:data:221": [...],
  "promo:vx:data:107": [...],
  "promo:vx:data:113": [...],
  "modules": {...}
}
```

---

### 6. Artist Endpoint

#### `artist.getArtistPageDetails`

Retrieves detailed artist information.

**Parameters:**

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| `artistId` | string | Yes      | Artist ID   |

**Response Structure:**

```json
{
  "artistId": "string",
  "name": "string",
  "subtitle": "string",
  "image": "string",
  "follower_count": "string",
  "type": "artist",
  "isVerified": false,
  "dominantLanguage": "string",
  "dominantType": "string",
  "topSongs": [...],
  "topAlbums": [...],
  "dedicated_artist_playlist": [...],
  "featured_artist_playlist": [...],
  "singles": [...],
  "latest_release": [...],
  "similarArtists": [...],
  "isRadioPresent": true,
  "bio": [],
  "dob": "string",
  "fb": "string",
  "urls": {...}
}
```

---

### 7. Recommendation Endpoints

#### `content.getRecommendations`

Retrieves recommended playlists and content.

**Parameters:**

| Parameter  | Type   | Required | Description                                         |
| ---------- | ------ | -------- | --------------------------------------------------- |
| `n`        | string | No       | Number of results                                   |
| `language` | string | No       | Language filter                                     |
| `type`     | string | No       | Content type filter (song, album, playlist, artist) |
| `songId`   | string | No       | Song ID for recommendations                         |
| `albumId`  | string | No       | Album ID for recommendations                        |
| `artistId` | string | No       | Artist ID for recommendations                       |

**Response Structure:**

```json
[
  {
    "id": "string",
    "title": "string",
    "subtitle": "string",
    "type": "playlist",
    "image": "string",
    "perma_url": "string",
    "more_info": {
      "firstname": "string"
    },
    "explicit_content": "0",
    "mini_obj": true,
    "language": "string"
  }
]
```

---

### 8. Playlist Details Endpoint

#### `playlist.getDetails`

Retrieves detailed playlist information with songs.

**Parameters:**

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `listid`  | string | Yes      | Playlist ID |

**Response Structure:**

```json
{
  "id": "string",
  "title": "string",
  "subtitle": "string",
  "header_desc": "string",
  "type": "playlist",
  "perma_url": "string",
  "image": "string",
  "language": "string",
  "year": "string",
  "play_count": "string",
  "explicit_content": "0",
  "list_count": 7,
  "list_type": "song",
  "list": [
    {
      "id": "string",
      "title": "string",
      "subtitle": "string",
      "type": "song",
      "image": "string",
      "perma_url": "string",
      "language": "string",
      "year": "string",
      "play_count": "string",
      "more_info": {
        "music": "string",
        "album_id": "string",
        "album": "string",
        "label": "string",
        "duration": "223",
        "has_lyrics": "true",
        "artistMap": {
          "primary_artists": [...],
          "featured_artists": [...],
          "artists": [...]
        }
      }
    }
  ],
  "more_info": {
    "uid": "string",
    "contents": "string",
    "follower_count": "string",
    "fan_count": "string",
    "playlist_type": "playlist",
    "artists": [...]
  },
  "modules": {
    "list": {...},
    "relatedPlaylist": {...},
    "currentlyTrendingPlaylists": {...},
    "artists": {...}
  }
}
```

---

## Error Responses

Some endpoints return error responses within the response body (HTTP 200 with error):

```json
{
  "error": {
    "code": "string",
    "msg": "string"
  }
}
```

**Endpoints that may return errors:**
- `radio.getFeaturedStations`
- `radio.getArtistStations`
- `podcast.getTopShows`
- `artist.getArtistMoreAlbums`
- `album.getAlbumResults`
- `playlist.getPlaylistResults`
- `song.getSongDetails`
- `content.getArtists`
- `content.getNewAlbums`

These endpoints may require authentication or specific parameters.

---

## v4 vs v6 Differences

### `content.getFeaturedPlaylists` Field Mapping

| v4 Field               | v6 Field         | Description            |
| ---------------------- | ---------------- | ---------------------- |
| `id`                   | `listid`         | Playlist ID            |
| `title`                | `listname`       | Playlist name          |
| `subtitle`             | `follower_count` | Follower info          |
| `more_info.song_count` | `count`          | Song count (top-level) |
| `type`                 | `data_type`      | Content type           |
| -                      | `firstname`      | Creator name           |
| -                      | `sponsored`      | Sponsorship flag       |
| -                      | `uid`            | User ID                |
| -                      | `last_updated`   | Timestamp              |

### Recommendations

1. **Use v6 for new projects** - It provides more structured data with flattened fields
2. **Handle both response formats** - Some endpoints may return different structures
3. **Check for error responses** - Always validate response for `error` key
4. **Use `webapi.get` for entities** - Unified endpoint with consistent structure

---

## Implementation Example

```dart
import 'package:dio/dio.dart';

class saavn_playClient {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: 'https://www.saavn_play.com/api.php',
    queryParameters: {
      '_format': 'json',
      '_marker': '0',
      'ctx': 'web6dot0',
      'api_version': '6',
    },
  ));

  Future<Map<String, dynamic>> getEntity({
    required String token,
    required String type,
  }) async {
    final response = await _dio.get('', queryParameters: {
      '__call': 'webapi.get',
      'token': token,
      'type': type,
    });
    return response.data;
  }

  Future<List<dynamic>> search(String query, {int limit = 10}) async {
    final response = await _dio.get('', queryParameters: {
      '__call': 'search.getResults',
      'q': query,
      'n': limit.toString(),
    });
    return response.data['results'];
  }

  Future<Map<String, dynamic>> getFeaturedPlaylists({int count = 10}) async {
    final response = await _dio.get('', queryParameters: {
      '__call': 'content.getFeaturedPlaylists',
      'n': count.toString(),
    });
    return response.data;
  }
}
```

---

## Rate Limiting

The API does not have documented rate limits, but it's recommended to:
- Add delays between bulk requests
- Cache responses when possible
- Handle 429 (Too Many Requests) responses gracefully

## Authentication

Most endpoints work without authentication. Some endpoints may require:
- User session cookies
- OAuth tokens
- API keys (for premium features)
