# saavn_play API Comprehensive Audit Report

## Executive Summary

This document presents the findings from a comprehensive audit of the saavn_play API infrastructure, covering authentication, streaming URLs, encrypted media, bitrate configurations, and more.

---

## 1. API Version Differences (CRITICAL DISCOVERY)

### Key Finding

| API Version | Response Keys | encrypted_media_url | Notes                                 |
| ----------- | ------------- | ------------------- | ------------------------------------- |
| v1-v3       | 44 keys       | ✅ Present           | Full song details with encrypted URLs |
| v4-v6       | 17 keys       | ❌ Absent            | Minimal song details                  |
| v7-v20      | 17 keys       | ❌ Absent            | Same as v4-v6                         |

### Recommendation

**Use API v1, v2, or v3 to get `encrypted_media_url` for streaming URLs.**

### Example Response Comparison

**API v1 Response (44 keys):**
```
id, type, song, album, year, music, music_id, primary_artists, 
primary_artists_id, featured_artists, featured_artists_id, singers, 
starring, image, label, albumid, language, origin, play_count, 
is_drm, copyright_text, 320kbps, is_dolby_content, explicit_content, 
has_lyrics, lyrics_snippet, encrypted_drm_media_url, 
encrypted_media_url, encrypted_media_path, media_preview_url, 
perma_url, album_url, duration, rights, webp, cache_state, 
starred, artistMap, release_date, vcode, vlink, 
triller_available, label_url, label_id
```

**API v6 Response (17 keys):**
```
id, title, subtitle, header_desc, type, perma_url, image, 
language, year, play_count, explicit_content, list_count, 
list_type, list, more_info, button_tooltip_info, pro_hva_campaigns
```

**Note:** API v6 search results include `encrypted_media_url` in the `more_info` object.

---

## 2. Encrypted Media URL Decryption (VERIFIED WORKING)

### Encryption Details

| Property  | Value                         |
| --------- | ----------------------------- |
| Algorithm | **DES-ECB**                   |
| Key       | `"38346591"` (ASCII, 8 bytes) |
| Key (hex) | `3338333436353931`            |
| Encoding  | Base64                        |

### Decryption Process

1. Base64 decode the `encrypted_media_url`
2. DES-ECB decrypt with key `"38346591"`
3. UTF-8 decode and trim null bytes
4. Result is the CDN URL for the media file

### Dart Implementation (VERIFIED)

```dart
import 'package:dart_des/dart_des.dart';
import 'dart:convert';
import 'dart:typed_data';

String decryptMediaUrl(String encryptedUrl) {
  final key = Uint8List.fromList(utf8.encode('38346591'));
  final des = DES(key: key);
  final decrypted = des.decrypt(base64Decode(encryptedUrl));
  return utf8.decode(decrypted).replaceAll('\x00', '').trim();
}

// Example
final encrypted = "ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyRofh8YQPTqjR2tIxTYXqGEQHgqnNfsetouo4rsD0s4RZKObWAyHrEhw7tS9a8Gtq";
final url = decryptMediaUrl(encrypted);
// Result: https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_96.mp4
```

### Python Implementation

```python
from Crypto.Cipher import DES
import base64

def decrypt_media_url(encrypted_url: str) -> str:
    key = b'38346591'  # ASCII key, 8 bytes
    cipher = DES.new(key, DES.MODE_ECB)
    decrypted = cipher.decrypt(base64.b64decode(encrypted_url))
    return decrypted.decode('utf-8').rstrip('\x00').strip()

# Example
encrypted = "ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyRofh8YQPTqjR2tIxTYXqGEQHgqnNfsetouo4rsD0s4RZKObWAyHrEhw7tS9a8Gtq"
url = decrypt_media_url(encrypted)
# Result: https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_96.mp4
```

### Decrypted URL Format

```
https://aac.saavncdn.com/{folder}/{hash}_96.mp4
```

| Component | Description                            |
| --------- | -------------------------------------- |
| Domain    | `aac.saavncdn.com` or `h.saavncdn.com` |
| Folder    | 3-digit folder identifier              |
| Hash      | Unique file identifier                 |
| Quality   | `_96` = 96kbps (default)               |

### Quality Variants

The decrypted URL defaults to 96kbps. Other qualities may be available:
- `_320` - 320kbps
- `_160` - 160kbps
- `_96` - 96kbps (default)
- `_48` - 48kbps
- `_12` - 12kbps

---

## 3. Media URL Types

### URL Types in API Response

| Field                     | Description                        | Quality       |
| ------------------------- | ---------------------------------- | ------------- |
| `encrypted_media_url`     | Full quality audio URL (encrypted) | Up to 320kbps |
| `encrypted_drm_media_url` | DRM protected URL                  | Variable      |
| `encrypted_media_path`    | Media path component               | -             |
| `media_preview_url`       | Direct preview URL                 | 96kbps        |

### Preview URL Format

```
https://preview.saavncdn.com/{path}/{hash}_96_p.mp4
```

Example:
```
https://preview.saavncdn.com/430/VMv6rC09saiCpejD7voimmUb4hG2vzCDpbB1h80tY_96_p.mp4
```

### CDN Domains

| Domain                   | Purpose             |
| ------------------------ | ------------------- |
| `h.saavncdn.com`         | High quality audio  |
| `aac.saavncdn.com`       | AAC format audio    |
| `preview.saavncdn.com`   | Preview/low quality |
| `jiocdn.saavn.com`       | Jio CDN             |
| `jiotunepreview.jio.com` | JioTune previews    |

---

## 4. Bitrate Configuration

### Available Bitrates

| Bitrate  | Name              | Code |
| -------- | ----------------- | ---- |
| 320 kbps | Super Duper High  | 1    |
| 160 kbps | Really High       | 2    |
| 96 kbps  | Pretty High       | 3    |
| 48 kbps  | Less High         | 4    |
| 12 kbps  | Sorta High...ish? | 5    |

### Network-Based Defaults

| Network | Default Bitrate |
| ------- | --------------- |
| 2G      | 12 kbps         |
| 3G      | 48 kbps         |
| 4G      | 96 kbps         |
| 5G      | 96 kbps         |
| WiFi    | 96 kbps         |

### Stream Configuration (from `app.getLaunchData`)

```json
{
  "stream_config": {
    "available_bitrates": ["320", "160", "96", "48", "12"],
    "bitrates_map": {
      "320": {"name": "Super Duper High", "code": 1},
      "160": {"name": "Really High", "code": 2},
      "96": {"name": "Pretty High", "code": 3},
      "48": {"name": "Less High", "code": 4},
      "12": {"name": "Sorta High...ish?", "code": 5}
    },
    "bitrate": {
      "2g": 12, "3g": 48, "4g": 96, "5g": 96, "wifi": 96
    }
  }
}
```

---

## 5. Authentication Endpoints

### Discovered Endpoints

| Endpoint                 | Status               | Description         |
| ------------------------ | -------------------- | ------------------- |
| `user.login`             | ⚠️ Requires RECAPTCHA | User login          |
| `user.logout`            | ⚠️ Requires Login     | User logout         |
| `subscription.getStatus` | ⚠️ Requires user_id   | Subscription status |

### Error Responses

**user.login:**
```json
{
  "code": "MISSING_RECAPTCHA_KEY",
  "msg": "RECAPTCHA KEY FAILURE"
}
```

**user.logout:**
```json
{
  "code": "LOGIN_REQUIRED",
  "msg": "Login required to call this API."
}
```

**subscription.getStatus:**
```json
{
  "status": "failure",
  "message": "No user ID provided"
}
```

### Authentication Flow

1. **Web Login**: Requires reCAPTCHA verification
2. **Mobile Login**: May use different authentication method
3. **Session Token**: Required for user-specific operations
4. **Premium Check**: Via `subscription.getStatus`

---

## 6. Video Support

### Video Search Endpoint

**Endpoint:** `search.getVideoResults`

**Parameters:**
| Parameter | Required | Description       |
| --------- | -------- | ----------------- |
| `q`       | Yes      | Search query      |
| `n`       | No       | Number of results |

**Response:**
```json
{
  "total": 50,
  "start": 0,
  "results": [
    {
      "id": "YgFWOsrw",
      "title": "Video Title",
      "type": "video",
      "more_info": {
        "vcode": "010910092464548",
        "vlink": "https://jiotunepreview.jio.com/...",
        "encrypted_media_url": "...",
        "content_category": "video"
      }
    }
  ]
}
```

### Video Fields in Songs

| Field               | Description                |
| ------------------- | -------------------------- |
| `vcode`             | Video code identifier      |
| `vlink`             | Video preview link (MP3)   |
| `triller_available` | Triller video availability |

---

## 7. Domain Information

### Legacy Domain

| Domain           | Status  | Behavior                        |
| ---------------- | ------- | ------------------------------- |
| `saavn.com`      | Legacy  | 301 Redirect → `saavn_play.com` |
| `saavn_play.com` | Current | Primary API server              |

Both domains serve **identical responses**. The old domain is maintained for backward compatibility.

---

## 8. Undocumented Endpoints Summary

### Working Endpoints

| Endpoint                       | Method | Parameters                 | Description                  |
| ------------------------------ | ------ | -------------------------- | ---------------------------- |
| `webapi.get`                   | GET    | `token`, `type`            | Unified entity details       |
| `webapi.getFooterDetails`      | GET    | None                       | Footer content               |
| `webapi.getBrowseHoverDetails` | GET    | None                       | Mega menu content            |
| `content.getFeaturedPlaylists` | GET    | `language`                 | Featured playlists           |
| `content.getRecommendations`   | GET    | `entity_type`, `entity_id` | Recommendations              |
| `playlist.getDetails`          | GET    | `listid`                   | Playlist details             |
| `app.getLaunchData`            | GET    | None                       | App configuration            |
| `search.getVideoResults`       | GET    | `q`                        | Video search                 |
| `video.getDetails`             | GET    | `video_pid`                | Video details (returns null) |
| `song.getDownloadUrl`          | GET    | `pid`                      | Download URL (returns empty) |
| `user.login`                   | GET    | -                          | Login (needs RECAPTCHA)      |
| `user.logout`                  | GET    | -                          | Logout (needs auth)          |
| `subscription.getStatus`       | GET    | `user_id`                  | Subscription status          |

### Non-Working Endpoints

All endpoints in these categories return "operation not supported":
- `auth.*` - Authentication
- `premium.*` - Premium features
- `drm.*` - DRM operations
- `download.*` - Download operations
- `share.*` - Social sharing
- `collaboration.*` - Playlist collaboration
- `mobile.*` - Mobile-specific
- `android.*` - Android-specific

---

## 9. Implementation Recommendations

### For Streaming URLs

1. Use API v1-v3 for `encrypted_media_url`
2. Decrypt using AES-128-ECB with known key
3. Result is direct CDN URL

### For Metadata

1. Use API v6 for cleaner response structure
2. `encrypted_media_url` available in `more_info`
3. Same decryption process applies

### For Video Content

1. Use `search.getVideoResults` for video search
2. Extract `vcode` and `vlink` for previews
3. Full video requires authentication

### For App Configuration

1. Use `app.getLaunchData` for stream config
2. Contains bitrate mappings and network defaults
3. 23 keys of configuration data

---

## 10. Test Scripts

The following test scripts were created:

| Script                                | Purpose                 |
| ------------------------------------- | ----------------------- |
| `tool/comprehensive_api_audit.dart`   | Full API investigation  |
| `tool/api_version_investigation.dart` | API version differences |
| `tool/encrypted_url_decryption.dart`  | URL decryption analysis |
| `tool/test_android_video.dart`        | Android/video testing   |
| `tool/test_saavn_domain.dart`         | Domain comparison       |

Run with:
```bash
dart run tool/comprehensive_api_audit.dart
dart run tool/api_version_investigation.dart
dart run tool/encrypted_url_decryption.dart
```

---

## 11. Security Considerations

### API Key/Token

- No API key required for public endpoints
- User authentication required for:
  - Personal playlists
  - Download URLs
  - Premium features
  - User profile data

### Rate Limiting

- Preview URLs return 429 (Too Many Requests) when rate limited
- Implement proper delays between requests
- Consider caching responses

### DRM Content

- `is_drm: 1` indicates DRM protected content
- `encrypted_drm_media_url` requires license acquisition
- License server URL not discovered in this audit

---

## 12. Conclusion

This audit discovered:

1. **API Version Secret**: v1-v3 return encrypted media URLs
2. **Decryption Method**: DES-ECB with key `"38346591"` (ASCII)
3. **Bitrate Configuration**: 5 quality levels from 12-320kbps
4. **Video Support**: Limited to search and previews
5. **Authentication**: Requires RECAPTCHA for web login
6. **Domain Legacy**: saavn.com redirects to saavn_play.com

The key discovery is that **streaming URLs are accessible** by using API v1-v3 and decrypting the `encrypted_media_url` field with DES-ECB using the key `"38346591"`.
