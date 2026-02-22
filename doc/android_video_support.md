# saavn_play API - Android & Video Support Documentation

This document details the findings from testing Android-specific features and video content support in the saavn_play API.

## Executive Summary

| Feature                    | Status          | Notes                                           |
| -------------------------- | --------------- | ----------------------------------------------- |
| Android-specific endpoints | ❌ Not available | Only `app.getLaunchData` works                  |
| Video content search       | ✅ Available     | `search.getVideoResults` returns video content  |
| Video details endpoint     | ⚠️ Limited       | `video.getDetails` exists but returns null data |
| Download URLs              | ⚠️ Limited       | `song.getDownloadUrl` exists but returns empty  |
| Stream configuration       | ✅ Available     | In `app.getLaunchData`                          |
| Video fields in songs      | ✅ Available     | `vcode`, `vlink`, `triller_available`           |

---

## 1. Android-Specific Endpoints

### 1.1 Working Endpoints

#### `app.getLaunchData`

The only Android-specific endpoint that returns meaningful data.

**URL:** `https://www.saavn_play.com/api.php?__call=app.getLaunchData`

**Parameters:**
| Parameter     | Required | Description                           |
| ------------- | -------- | ------------------------------------- |
| `_format`     | Yes      | Response format (`json`)              |
| `_marker`     | No       | Marker value (`0`)                    |
| `ctx`         | No       | Context (`android`, `web6dot0`, etc.) |
| `api_version` | No       | API version (`1`-`20`)                |

**Response Keys (23 total):**
```
open_in_app, show_google_smart_lock, stream_config, 
global_config, featured_radio, featured_playlists, 
promo_banner, top_playlists, radio, 
partner_tune_config, ads, products, 
user_plans, homepage_experiments, enable_pwa_in_android, 
enable_pwa_in_ios, enable_pwa_in_jiophone, enable_pwa_in_web, 
show_made_for_you, show_new_release, show_charts, 
show_trending, show_recently_played
```

**Stream Configuration:**
```json
{
  "stream_config": {
    "available_bitrates": [128, 64, 32, 16, 8],
    "bitrates_map": {
      "128": {"name": "High Quality", "code": 1},
      "64": {"name": "Medium Quality", "code": 2},
      "32": {"name": "Low Quality", "code": 3},
      "16": {"name": "Poor Quality", "code": 4},
      "8": {"name": "Lowest", "code": 5}
    },
    "bitrate": {
      "gprs": 16, "dc": 16, "cdma": 16, 
      "egprs": 16, "edge": 16
    }
  }
}
```

### 1.2 Non-Working Android Endpoints

All of the following return `operation is not supported`:

| Endpoint                    | Error         |
| --------------------------- | ------------- |
| `app.getConfig`             | INPUT_INVALID |
| `app.getSettings`           | INPUT_INVALID |
| `app.getFeatures`           | INPUT_INVALID |
| `app.getVersion`            | INPUT_INVALID |
| `app.getNotifications`      | INPUT_INVALID |
| `app.getUpdates`            | INPUT_INVALID |
| `android.getHome`           | INPUT_INVALID |
| `android.getConfig`         | INPUT_INVALID |
| `android.getSettings`       | INPUT_INVALID |
| `android.getDownloads`      | INPUT_INVALID |
| `android.getOfflineContent` | INPUT_INVALID |
| `content.getHome`           | INPUT_INVALID |
| `content.getBrowse`         | INPUT_INVALID |
| `content.getDiscover`       | INPUT_INVALID |

---

## 2. Video Content Support

### 2.1 Video Search Endpoint

#### `search.getVideoResults`

**Status:** ✅ Working

**URL:** `https://www.saavn_play.com/api.php?__call=search.getVideoResults`

**Parameters:**
| Parameter | Required | Description                     |
| --------- | -------- | ------------------------------- |
| `q`       | Yes      | Search query                    |
| `n`       | No       | Number of results (default: 10) |
| `_format` | Yes      | Response format (`json`)        |
| `ctx`     | No       | Context                         |

**Response Structure:**
```json
{
  "total": 50,
  "start": 0,
  "results": [
    {
      "id": "YgFWOsrw",
      "title": "Sitaare (From 'Ikkis')",
      "type": "video",
      "image": "...",
      "more_info": {
        "vcode": "010910092464548",
        "vlink": "https://jiotunepreview.jio.com/content/Converted/...",
        "encrypted_media_url": "...",
        "encrypted_drm_media_url": "...",
        "thumbnail_url": "...",
        "duration": "240",
        "video_rate_cap": "...",
        "preview_url": "...",
        "content_category": "video"
      }
    }
  ]
}
```

**Video-Specific Fields in `more_info`:**
| Field                     | Description                     |
| ------------------------- | ------------------------------- |
| `vcode`                   | Video code identifier           |
| `vlink`                   | Video preview link (MP3 format) |
| `encrypted_media_url`     | Encrypted media URL             |
| `encrypted_drm_media_url` | Encrypted DRM media URL         |
| `thumbnail_url`           | Video thumbnail                 |
| `duration`                | Video duration in seconds       |
| `video_rate_cap`          | Rate limiting info              |
| `preview_url`             | Preview URL                     |
| `content_category`        | Content type (`video`)          |

### 2.2 Video Details Endpoint

#### `video.getDetails`

**Status:** ⚠️ Limited - Returns null data

**URL:** `https://www.saavn_play.com/api.php?__call=video.getDetails`

**Parameters:**
| Parameter   | Required | Description                   |
| ----------- | -------- | ----------------------------- |
| `video_pid` | Yes      | Video ID (from `vcode` field) |
| `_format`   | Yes      | Response format (`json`)      |

**Response:**
```json
{
  "status": "success",
  "data": null
}
```

**Note:** The endpoint exists and accepts the `video_pid` parameter, but returns null data. This may require:
- Authentication/session
- Different video ID format
- Premium subscription

### 2.3 Non-Working Video Endpoints

| Endpoint                 | Error         |
| ------------------------ | ------------- |
| `video.getTrending`      | INPUT_INVALID |
| `video.getFeatured`      | INPUT_INVALID |
| `video.getNew`           | INPUT_INVALID |
| `video.getTop`           | INPUT_INVALID |
| `video.getByArtist`      | INPUT_INVALID |
| `video.getByAlbum`       | INPUT_INVALID |
| `content.getVideos`      | INPUT_INVALID |
| `content.getMusicVideos` | INPUT_INVALID |
| `content.getVideoCharts` | INPUT_INVALID |

---

## 3. Download/Stream URL Support

### 3.1 Download URL Endpoint

#### `song.getDownloadUrl`

**Status:** ⚠️ Limited - Returns empty URLs

**URL:** `https://www.saavn_play.com/api.php?__call=song.getDownloadUrl`

**Parameters:**
| Parameter | Required | Description              |
| --------- | -------- | ------------------------ |
| `pid`     | Yes      | Song ID                  |
| `_format` | Yes      | Response format (`json`) |

**Response:**
```json
{
  "aRZbUYD7": ""
}
```

**Note:** The endpoint exists but returns empty download URLs. This likely requires:
- User authentication
- Premium subscription
- Additional parameters (bitrate, quality)

### 3.2 Non-Working Stream Endpoints

| Endpoint            | Error         |
| ------------------- | ------------- |
| `song.getStreamUrl` | INPUT_INVALID |
| `song.getMediaUrl`  | INPUT_INVALID |
| `media.getStream`   | INPUT_INVALID |
| `media.getDownload` | INPUT_INVALID |
| `media.getUrl`      | INPUT_INVALID |
| `stream.getUrl`     | INPUT_INVALID |
| `download.getUrl`   | INPUT_INVALID |

---

## 4. Video Fields in Song Responses

Songs returned from various endpoints contain video-related fields:

### 4.1 Standard Video Fields

| Field               | Type    | Description                          |
| ------------------- | ------- | ------------------------------------ |
| `vcode`             | string  | Video code (e.g., `010910092464548`) |
| `vlink`             | string  | Preview URL (MP3 format)             |
| `triller_available` | boolean | Triller video availability           |

### 4.2 Example from Search Results

```json
{
  "id": "aRZbUYD7",
  "title": "Tum Hi Ho",
  "type": "song",
  "more_info": {
    "vcode": "010910092464548",
    "vlink": "https://jiotunepreview.jio.com/content/Converted/010910092419390.mp3",
    "triller_available": false
  }
}
```

### 4.3 vlink URL Format

The `vlink` field contains a preview URL:
```
https://jiotunepreview.jio.com/content/Converted/{code}.mp3
```

This appears to be a low-quality audio preview, not the actual video.

---

## 5. Context Comparison

Different contexts return different response structures:

| Context    | Keys in webapi.get | Notes             |
| ---------- | ------------------ | ----------------- |
| `web6dot0` | 18                 | Full web response |
| `android`  | 17                 | Slightly reduced  |
| `ios`      | 17                 | Slightly reduced  |
| `mobile`   | 17                 | Slightly reduced  |
| `app`      | 17                 | Slightly reduced  |

---

## 6. API Version Compatibility

All API versions from v1 to v20 work identically for most endpoints. The `app.getLaunchData` endpoint works across all versions.

---

## 7. Summary of Discoveries

### New Undocumented Endpoints Found

| Endpoint                 | Status    | Description              |
| ------------------------ | --------- | ------------------------ |
| `search.getVideoResults` | ✅ Working | Search for video content |
| `video.getDetails`       | ⚠️ Limited | Returns null data        |
| `song.getDownloadUrl`    | ⚠️ Limited | Returns empty URLs       |
| `app.getLaunchData`      | ✅ Working | App configuration data   |

### Video Support Status

1. **Video Search:** Fully functional via `search.getVideoResults`
2. **Video Details:** Endpoint exists but requires authentication/premium
3. **Video Streams:** Not available without authentication
4. **Video Preview:** Available via `vlink` field (audio preview only)

### Android Support Status

1. **App Configuration:** Available via `app.getLaunchData`
2. **Stream Configuration:** Available in launch data
3. **Android-specific endpoints:** Not available
4. **Offline/Download:** Requires authentication

---

## 8. Recommendations

### For Video Content

1. Use `search.getVideoResults` to search for video content
2. Extract `vcode` and `vlink` from `more_info` for preview URLs
3. Note that full video streaming likely requires premium subscription

### For Android Development

1. Use `app.getLaunchData` for app configuration
2. Use standard endpoints with `ctx=android` parameter
3. Stream configuration is available for bitrate selection

### For Download/Stream URLs

1. These endpoints require authentication
2. May require premium subscription
3. Consider using encrypted media URLs from song details instead

---

## 9. Legacy Domain (saavn.com)

### Domain Redirect

The old `saavn.com` domain redirects to `saavn_play.com`:

```
https://www.saavn.com/api.php 
  → 301 Redirect → 
https://www.saavn_play.com/api.php
```

### Domain History

| Domain           | Era          | Status             |
| ---------------- | ------------ | ------------------ |
| `saavn.com`      | 2006-2018    | Legacy (redirects) |
| `saavn_play.com` | 2018-present | Primary            |

### Test Results

- Both domains return **identical responses**
- No unique endpoints on `saavn.com`
- All `saavn.*`, `legacy.*`, `home.*` endpoints return "operation not supported"
- The redirect is permanent (HTTP 301)

### Conclusion

The `saavn.com` domain is **not a separate API** - it's a legacy redirect. Use `saavn_play.com` as the primary API endpoint.

---

## 10. Testing Scripts

The following test scripts were created during this analysis:

- `tool/test_android_video.dart` - Comprehensive Android/video testing
- `tool/test_video_download.dart` - Video and download endpoint deep dive
- `tool/api_version_mobile_test.dart` - API version and context testing

Run with:
```bash
dart run tool/test_android_video.dart
dart run tool/test_video_download.dart
```
