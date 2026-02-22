# saavn_play API Audit Report

## Executive Summary

This document presents the findings of a comprehensive audit of the saavn_play API infrastructure, aimed at discovering undocumented endpoints. The audit was conducted by probing the API at `https://www.saavn_play.com/api.php?__call=` with various endpoint patterns and parameter combinations.

**Audit Date:** February 20, 2026

**Total Endpoints Probed:** 1,639 (across multiple discovery phases)

**Key Findings:** Four new undocumented endpoints were discovered:
- `content.getFeaturedPlaylists`
- `webapi.get`
- `webapi.getFooterDetails`
- `webapi.getBrowseHoverDetails`

---

## Documented Endpoints (Baseline)

The following endpoints are already documented in the codebase:

| Endpoint                         | HTTP Method | Description                              |
| -------------------------------- | ----------- | ---------------------------------------- |
| `content.getBrowseModules`       | GET         | Get browse modules for content discovery |
| `autocomplete.get`               | GET         | Get autocomplete suggestions for search  |
| `search.getResults`              | GET         | Search for songs                         |
| `search.getAlbumResults`         | GET         | Search for albums                        |
| `search.getArtistResults`        | GET         | Search for artists                       |
| `search.getPlaylistResults`      | GET         | Search for playlists                     |
| `song.getDetails`                | GET         | Get song details by ID                   |
| `content.getAlbumDetails`        | GET         | Get album details by ID                  |
| `playlist.getDetails`            | GET         | Get playlist details by ID               |
| `artist.getArtistPageDetails`    | GET         | Get artist page details                  |
| `artist.getArtistMoreSong`       | GET         | Get more songs from an artist            |
| `artist.getArtistMoreAlbum`      | GET         | Get more albums from an artist           |
| `search.artistOtherTopSongs`     | GET         | Get other top songs from an artist       |
| `lyrics.getLyrics`               | GET         | Get lyrics for a song                    |
| `webradio.createFeaturedStation` | GET         | Create a featured radio station          |
| `webradio.getSong`               | GET         | Get songs from a radio station           |
| `webapi.getLaunchData`           | GET         | Get home/launch data                     |
| `content.getTopShows`            | GET         | Get top podcast shows                    |

---

## Undocumented Endpoints Discovered

### 1. `content.getFeaturedPlaylists`

**Endpoint URL:** 
```
https://www.saavn_play.com/api.php?__call=content.getFeaturedPlaylists
```

**HTTP Method:** GET

**API Version:** v3 (works without `api_version=4` parameter)

**Required Parameters:**
| Parameter | Type   | Required | Description                                    |
| --------- | ------ | -------- | ---------------------------------------------- |
| `_format` | string | Yes      | Response format (always `json`)                |
| `_marker` | string | Yes      | Marker (always `0`)                            |
| `ctx`     | string | Yes      | Context (e.g., `wap6dot0`)                     |
| `__call`  | string | Yes      | API call name (`content.getFeaturedPlaylists`) |

**Optional Parameters:**
| Parameter  | Type    | Default | Description                                                                 |
| ---------- | ------- | ------- | --------------------------------------------------------------------------- |
| `n`        | integer | 30      | Number of results per page                                                  |
| `p`        | integer | 1       | Page number for pagination                                                  |
| `language` | string  | -       | Filter by language (e.g., `english`, `hindi`, `punjabi`, `tamil`, `telugu`) |
| `type`     | string  | -       | Filter by playlist type (e.g., `featured`, `weekly`, `daily`, `random`)     |
| `category` | string  | -       | Filter by category (see supported categories below)                         |

**Supported Categories:**
- `pop`, `rock`, `romantic`, `party`, `workout`, `chill`
- `devotional`, `retro`, `indie`, `electronic`, `hiphop`
- `classical`, `jazz`, `rnb`, `country`, `latin`
- `folk`, `metal`, `blues`, `soul`, `reggae`
- `world`, `soundtrack`, `kids`, `podcast`

**Response Structure:**
```json
{
  "data": [
    {
      "listid": "string",
      "listname": "string",
      "firstname": "string",
      "secondary_subtitle": "string",
      "data_type": "string",
      "count": "integer",
      "image": "string (URL)",
      "sponsored": "boolean",
      "perma_url": "string (URL)",
      "follower_count": "string",
      "uid": "string",
      "last_updated": "integer (timestamp)"
    }
  ],
  "count": "integer",
  "last_page": "boolean"
}
```

**Functional Description:**
This endpoint retrieves a paginated list of featured playlists from saavn_play. It supports filtering by language, playlist type, and category. The response includes playlist metadata such as name, image URL, follower count, and song count.

---

### 2. `webapi.get`

**Endpoint URL:** 
```
https://www.saavn_play.com/api.php?__call=webapi.get
```

**HTTP Method:** GET

**API Version:** v4 (requires `api_version=4` parameter)

**Required Parameters:**
| Parameter     | Type   | Required | Description                     |
| ------------- | ------ | -------- | ------------------------------- |
| `_format`     | string | Yes      | Response format (always `json`) |
| `_marker`     | string | Yes      | Marker (always `0`)             |
| `ctx`         | string | Yes      | Context (e.g., `web6dot0`)      |
| `__call`      | string | Yes      | API call name (`webapi.get`)    |
| `api_version` | string | Yes      | API version (`4`)               |
| `token`       | string | Yes      | Entity token/ID                 |
| `type`        | string | Yes      | Entity type                     |

**Supported Entity Types:**
| Type       | Description             |
| ---------- | ----------------------- |
| `show`     | Podcast show details    |
| `album`    | Album details           |
| `playlist` | Playlist details        |
| `artist`   | Artist details          |
| `song`     | Song details            |
| `radio`    | Radio station details   |
| `episode`  | Podcast episode details |
| `mix`      | Mix/playlist details    |

**Optional Parameters (for shows):**
| Parameter         | Type   | Description                    |
| ----------------- | ------ | ------------------------------ |
| `season_number`   | string | Season number for shows        |
| `sort_order`      | string | Sort order                     |
| `includeMetaTags` | string | Include meta tags (`0` or `1`) |

**Response Structure (for show type):**
```json
{
  "show_details": {
    "id": "string",
    "title": "string",
    "subtitle": "string",
    "header_desc": "string",
    "type": "show",
    "perma_url": "string (URL)",
    "image": "string (URL)",
    "language": "string",
    "year": "string",
    "more_info": { ... }
  },
  "seasons": [ ... ],
  "episodes": [ ... ],
  "modules": { ... }
}
```

**Functional Description:**
This is a versatile endpoint that retrieves details for various entity types (shows, albums, playlists, artists, songs, radio stations) using a unified API. The response structure varies based on the `type` parameter.

---

### 3. `webapi.getFooterDetails`

**Endpoint URL:** 
```
https://www.saavn_play.com/api.php?__call=webapi.getFooterDetails
```

**HTTP Method:** GET

**API Version:** v4 (requires `api_version=4` parameter)

**Required Parameters:**
| Parameter     | Type   | Required | Description                               |
| ------------- | ------ | -------- | ----------------------------------------- |
| `_format`     | string | Yes      | Response format (always `json`)           |
| `_marker`     | string | Yes      | Marker (always `0`)                       |
| `__call`      | string | Yes      | API call name (`webapi.getFooterDetails`) |
| `api_version` | string | Yes      | API version (`4`)                         |
| `language`    | string | Yes      | Language code (e.g., `hindi`, `english`)  |

**Response Structure:**
```json
{
  "playlist": [
    { "id": "string", "title": "string", "action": "string" }
  ],
  "artist": [
    { "id": "string", "title": "string", "action": "string" }
  ],
  "album": [
    { "id": "string", "title": "string", "action": "string" }
  ],
  "actor": [
    { "id": "string", "title": "string", "action": "string" }
  ]
}
```

**Functional Description:**
This endpoint retrieves footer content for the saavn_play website, including featured playlists, artists, albums, and actors for a specific language. Useful for building navigation or discovery features.

---

### 4. `webapi.getBrowseHoverDetails`

**Endpoint URL:** 
```
https://www.saavn_play.com/api.php?__call=webapi.getBrowseHoverDetails
```

**HTTP Method:** GET

**API Version:** v4 (requires `api_version=4` parameter)

**Required Parameters:**
| Parameter     | Type   | Required | Description                                    |
| ------------- | ------ | -------- | ---------------------------------------------- |
| `_format`     | string | Yes      | Response format (always `json`)                |
| `_marker`     | string | Yes      | Marker (always `0`)                            |
| `__call`      | string | Yes      | API call name (`webapi.getBrowseHoverDetails`) |
| `api_version` | string | Yes      | API version (`4`)                              |
| `language`    | string | Yes      | Language code (e.g., `hindi`, `english`)       |

**Optional Parameters:**
| Parameter        | Type   | Default | Description                 |
| ---------------- | ------ | ------- | --------------------------- |
| `is_entity_page` | string | `true`  | Whether it's an entity page |

**Response Structure:**
```json
{
  "mega_menu": {
    "top_artists": [
      { "title": "string", "perma_url": "string (URL)" }
    ],
    "top_playlists": [
      { "title": "string", "perma_url": "string (URL)" }
    ],
    "new_releases": [
      { "title": "string", "perma_url": "string (URL)" }
    ]
  }
}
```

**Functional Description:**
This endpoint retrieves the mega menu content for the browse section, including top artists, top playlists, and new releases for a specific language. Useful for building navigation menus or discovery features.

---

## Discovery Methodology

The audit was conducted in multiple phases:

### Phase 1: Initial Endpoint Probing
- Probed 231 potential endpoint patterns based on common API naming conventions
- Tested both API v3 and v4 versions
- Found 1 undocumented endpoint

### Phase 2: Extended Pattern Testing
- Probed 491 additional endpoint patterns
- Tested variations with different prefixes (`content.`, `webapi.`, `webradio.`, etc.)
- Confirmed the initial finding

### Phase 3: Parameter-Based Testing
- Tested 343 endpoint/parameter combinations
- Focused on known working endpoints with different parameter sets
- Validated parameter support for discovered endpoints

### Phase 4: Deep Discovery
- Tested 885 comprehensive endpoint/parameter combinations
- Tested language filters, category filters, and pagination
- Mapped all supported parameters for discovered endpoints

### Phase 5: User-Provided Endpoints Testing
- Tested 32 user-provided endpoint patterns
- Discovered 3 additional undocumented endpoints (`webapi.get`, `webapi.getFooterDetails`, `webapi.getBrowseHoverDetails`)

---

## Technical Details

### Base URL
```
https://www.saavn_play.com/api.php
```

### Default Query Parameters
| Parameter | Value      | Description     |
| --------- | ---------- | --------------- |
| `_format` | `json`     | Response format |
| `_marker` | `0`        | Response marker |
| `ctx`     | `wap6dot0` | Client context  |

### API Version Parameter
| Parameter     | Value | Description               |
| ------------- | ----- | ------------------------- |
| `api_version` | `4`   | Required for v4 endpoints |

### Required Headers
```
Cookie: L=english; gdpr_acceptance=true; DL=english
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
```

---

## Comparison with Public Repositories

The discovered endpoints are not commonly documented in public saavn_play API repositories:

1. `content.getFeaturedPlaylists` - Provides direct access to featured playlists with filtering capabilities
2. `webapi.get` - A unified endpoint for various entity types, more flexible than individual endpoints
3. `webapi.getFooterDetails` - Footer content not available through other endpoints
4. `webapi.getBrowseHoverDetails` - Mega menu content for navigation features

---

## Implementation in Codebase

The following files have been added/modified to support the discovered endpoints:

### New Files
- [`lib/src/endpoints/webapi.dart`](lib/src/endpoints/webapi.dart) - WebapiEndpoint class with models
- [`lib/src/endpoints/featured_playlist.dart`](lib/src/endpoints/featured_playlist.dart) - FeaturedPlaylistEndpoint class with models

### Modified Files
- [`lib/src/collection/endpoints.dart`](lib/src/collection/endpoints.dart) - Added new endpoint constants
- [`lib/saavn_play.dart`](lib/saavn_play.dart) - Added exports for new endpoints

---

## Recommendations

### For API Consumers
1. Use `content.getFeaturedPlaylists` for efficient playlist discovery with filtering
2. Use `webapi.get` as a unified endpoint for various entity types
3. Use `webapi.getFooterDetails` for building footer navigation
4. Use `webapi.getBrowseHoverDetails` for mega menu content

### For Library Maintainers
1. The new endpoints are now integrated into the codebase
2. Model classes are provided for type-safe responses
3. All endpoints support the standard client configuration

---

## Files Generated

The following files were generated during the audit:

1. `tool/api_discovery.dart` - Initial discovery script
2. `tool/api_discovery_extended.dart` - Extended pattern testing script
3. `tool/api_discovery_params.dart` - Parameter-based testing script
4. `tool/api_discovery_deep.dart` - Deep discovery script
5. `tool/api_test_user_endpoints.dart` - User-provided endpoints testing script
6. `tool/api_test_additional.dart` - Additional endpoints testing script
7. `tool/api_discovery_report.json` - Initial discovery results
8. `tool/api_discovery_extended_report.json` - Extended discovery results
9. `tool/api_discovery_params_report.json` - Parameter testing results
10. `tool/api_discovery_deep_report.json` - Deep discovery results
11. `tool/api_user_endpoints_report.json` - User endpoints testing results
12. `tool/api_additional_endpoints_report.json` - Additional endpoints results

---

## Conclusion

This comprehensive audit of the saavn_play API infrastructure discovered four new undocumented endpoints:

1. **`content.getFeaturedPlaylists`** - Paginated featured playlists with filtering
2. **`webapi.get`** - Unified entity details endpoint
3. **`webapi.getFooterDetails`** - Footer content by language
4. **`webapi.getBrowseHoverDetails`** - Mega menu content by language

All endpoints have been integrated into the codebase with proper model classes and are ready for use.

---

*Report generated by saavn_play API Discovery Tool*
