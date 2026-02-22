# Podcast Endpoint

The Podcast endpoint provides access to podcast shows from saavn_play.

## Overview

| Property           | Description                   |
| ------------------ | ----------------------------- |
| **Endpoint Class** | `PodcastEndpoint`             |
| **Access Via**     | `saavn_playClient().podcasts` |

## Methods

### `getTopShows({int n = 20, int page = 1})`

Retrieves top podcast shows with pagination support.

#### Parameters

| Parameter | Type  | Required | Description                              |
| --------- | ----- | -------- | ---------------------------------------- |
| `n`       | `int` | No       | Number of results per page (default: 20) |
| `page`    | `int` | No       | Page number (default: 1)                 |

#### Returns

`Future<PodcastShowsResponse>` - A future that resolves to:
- `shows` - List of `PodcastShow` objects

## Model Classes

### PodcastShow

Represents a podcast show.

| Property          | Type      | Description                   |
| ----------------- | --------- | ----------------------------- |
| `id`              | `String`  | Show ID                       |
| `title`           | `String`  | Show title                    |
| `subtitle`        | `String`  | Show subtitle                 |
| `type`            | `String`  | Content type (usually "show") |
| `image`           | `String`  | Show cover image URL          |
| `permaUrl`        | `String`  | Permalink URL                 |
| `seasonNumber`    | `String`  | Season number                 |
| `releaseDate`     | `String`  | Release date                  |
| `badge`           | `String?` | Badge text                    |
| `squareImage`     | `String`  | Square image URL              |
| `explicitContent` | `String`  | Explicit content flag         |
| `miniObj`         | `bool`    | Whether this is a mini object |

## Usage Examples

### Get Top Podcast Shows

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get top podcast shows
  final response = await client.podcasts.getTopShows();
  
  print('Found ${response.shows.length} podcast shows');
  
  for (final show in response.shows) {
    print('${show.title}');
    print('  Season: ${show.seasonNumber}');
    print('  Released: ${show.releaseDate}');
  }
}
```

### Get Shows with Pagination

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get first page with 10 shows
  final page1 = await client.podcasts.getTopShows(n: 10, page: 1);
  print('Page 1: ${page1.shows.length} shows');
  
  // Get second page
  final page2 = await client.podcasts.getTopShows(n: 10, page: 2);
  print('Page 2: ${page2.shows.length} shows');
  
  // Verify pages have different content
  final page1Ids = page1.shows.map((s) => s.id).toSet();
  final page2Ids = page2.shows.map((s) => s.id).toSet();
  
  print('Unique shows across pages: ${page1Ids.intersection(page2Ids).isEmpty}');
}
```

### Display Show Details

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final response = await client.podcasts.getTopShows(n: 5);
  
  print('=== Top Podcast Shows ===\n');
  
  for (final show in response.shows) {
    print('Title: ${show.title}');
    print('Subtitle: ${show.subtitle}');
    print('Type: ${show.type}');
    print('Season: ${show.seasonNumber}');
    print('Release Date: ${show.releaseDate}');
    print('URL: ${show.permaUrl}');
    print('Image: ${show.image}');
    print('Square Image: ${show.squareImage}');
    
    if (show.badge != null) {
      print('Badge: ${show.badge}');
    }
    
    print('Explicit: ${show.explicitContent}');
    print('---');
  }
}
```

### Filter Shows by Type

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final response = await client.podcasts.getTopShows(n: 50);
  
  // Filter shows by type
  final showsByType = <String, List<PodcastShow>>{};
  
  for (final show in response.shows) {
    showsByType.putIfAbsent(show.type, () => []).add(show);
  }
  
  for (final entry in showsByType.entries) {
    print('${entry.key}: ${entry.value.length} shows');
  }
}
```

### Collect All Shows

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final allShows = <PodcastShow>[];
  var page = 1;
  const pageSize = 20;
  
  // Fetch multiple pages
  while (page <= 5) {
    final response = await client.podcasts.getTopShows(n: pageSize, page: page);
    
    if (response.shows.isEmpty) break;
    
    allShows.addAll(response.shows);
    print('Fetched page $page: ${response.shows.length} shows');
    page++;
  }
  
  print('\nTotal shows collected: ${allShows.length}');
}
```

### Error Handling

```dart
import 'package:saavn_play/saavn_play.dart';
import 'package:dio/dio.dart';

void main() async {
  final client = saavn_playClient();
  
  try {
    final response = await client.podcasts.getTopShows();
    print('Found ${response.shows.length} shows');
  } on DioException catch (e) {
    print('Network error: ${e.message}');
  } catch (e) {
    print('Error: $e');
  }
}
```

### Model Serialization

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final response = await client.podcasts.getTopShows(n: 1);
  final show = response.shows.first;
  
  // Convert to JSON
  final json = show.toJson();
  print('JSON keys: ${json.keys}');
  
  // Convert back from JSON
  final fromJson = PodcastShow.fromJson(json);
  print('Title matches: ${show.title == fromJson.title}');
  print('ID matches: ${show.id == fromJson.id}');
}
```

## Related Endpoints

- [Home](home.md) - Get home data which may include podcast sections
- [Search](search.md) - Search for podcasts
