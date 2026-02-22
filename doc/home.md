# Home Endpoint

The Home endpoint provides access to saavn_play's home/launch data including trending content, playlists, albums, charts, and radio stations.

## Overview

| Property           | Description               |
| ------------------ | ------------------------- |
| **Endpoint Class** | `HomeEndpoint`            |
| **Access Via**     | `saavn_playClient().home` |

## Methods

### `getLaunchData()`

Retrieves the complete home/launch data from saavn_play.

#### Parameters

None

#### Returns

`Future<HomeLaunchData>` - A future that resolves to home data containing:
- `history` - User's recently played content
- `newTrending` - New trending songs and albums
- `topPlaylists` - Top playlists
- `newAlbums` - New album releases
- `browseDiscover` - Browse and discover content
- `globalConfig` - Global configuration
- `charts` - Music charts
- `radio` - Radio stations
- `artistRecos` - Artist recommendations
- `promoSections` - Promotional sections
- `modules` - Module configurations

## Model Classes

### HomeSectionItem

Represents an item in a home section (playlist, album, or song).

| Property          | Type                    | Description            |
| ----------------- | ----------------------- | ---------------------- |
| `id`              | `String`                | Item ID                |
| `title`           | `String`                | Item title             |
| `subtitle`        | `String`                | Item subtitle          |
| `headerDesc`      | `String?`               | Header description     |
| `type`            | `String`                | Content type           |
| `permaUrl`        | `String?`               | Permalink URL          |
| `image`           | `String?`               | Image URL              |
| `language`        | `String?`               | Language               |
| `year`            | `String?`               | Release year           |
| `playCount`       | `String?`               | Play count             |
| `explicitContent` | `String?`               | Explicit content flag  |
| `moreInfo`        | `Map<String, dynamic>?` | Additional information |

### ChartItem

Represents a chart item.

| Property   | Type                    | Description            |
| ---------- | ----------------------- | ---------------------- |
| `id`       | `String`                | Chart ID               |
| `title`    | `String`                | Chart title            |
| `type`     | `String`                | Content type           |
| `image`    | `String?`               | Image URL              |
| `count`    | `int?`                  | Item count             |
| `permaUrl` | `String?`               | Permalink URL          |
| `moreInfo` | `Map<String, dynamic>?` | Additional information |

### HomeRadioStation

Represents a radio station in home section.

| Property   | Type                    | Description            |
| ---------- | ----------------------- | ---------------------- |
| `id`       | `String`                | Station ID             |
| `title`    | `String`                | Station title          |
| `subtitle` | `String`                | Station subtitle       |
| `type`     | `String`                | Content type           |
| `image`    | `String?`               | Image URL              |
| `permaUrl` | `String?`               | Permalink URL          |
| `moreInfo` | `Map<String, dynamic>?` | Additional information |

## Usage Examples

### Get Home Data

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  // Get home/launch data
  final homeData = await client.home.getLaunchData();
  
  print('New Trending: ${homeData.newTrending?.length ?? 0} items');
  print('Top Playlists: ${homeData.topPlaylists?.length ?? 0} items');
  print('New Albums: ${homeData.newAlbums?.length ?? 0} items');
  print('Charts: ${homeData.charts?.length ?? 0} items');
  print('Radio Stations: ${homeData.radio?.length ?? 0} items');
}
```

### Browse New Trending Content

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final homeData = await client.home.getLaunchData();
  
  print('=== New Trending ===');
  final trending = homeData.newTrending ?? [];
  
  for (final item in trending.take(10)) {
    print('${item.title}');
    print('  Type: ${item.type}');
    print('  Subtitle: ${item.subtitle}');
  }
}
```

### Browse Top Playlists

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final homeData = await client.home.getLaunchData();
  
  print('=== Top Playlists ===');
  final playlists = homeData.topPlaylists ?? [];
  
  for (final playlist in playlists) {
    print('${playlist.title}');
    print('  ID: ${playlist.id}');
    print('  Language: ${playlist.language}');
  }
}
```

### Browse New Albums

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final homeData = await client.home.getLaunchData();
  
  print('=== New Albums ===');
  final albums = homeData.newAlbums ?? [];
  
  for (final album in albums) {
    print('${album.title}');
    print('  Year: ${album.year}');
    print('  Language: ${album.language}');
  }
}
```

### Browse Charts

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final homeData = await client.home.getLaunchData();
  
  print('=== Charts ===');
  final charts = homeData.charts ?? [];
  
  for (final chart in charts) {
    print('${chart.title}');
    print('  Type: ${chart.type}');
    print('  Count: ${chart.count}');
  }
}
```

### Browse Radio Stations

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final homeData = await client.home.getLaunchData();
  
  print('=== Radio Stations ===');
  final radioStations = homeData.radio ?? [];
  
  for (final station in radioStations) {
    print('${station.title}');
    print('  Subtitle: ${station.subtitle}');
    print('  Type: ${station.type}');
  }
}
```

### Access Promo Sections

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final homeData = await client.home.getLaunchData();
  
  // Promo sections have dynamic keys like 'promo:vx:data:31'
  final promoSections = homeData.promoSections;
  
  if (promoSections != null) {
    print('=== Promo Sections ===');
    for (final entry in promoSections.entries) {
      print('Section: ${entry.key}');
      print('  Items: ${entry.value.length}');
    }
  }
}
```

### Get Module Configurations

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final homeData = await client.home.getLaunchData();
  
  // Module configurations define how sections are displayed
  final modules = homeData.modules;
  
  if (modules != null) {
    print('=== Module Configurations ===');
    for (final entry in modules.entries) {
      final module = entry.value;
      print('${module.id}: ${module.title}');
      print('  Position: ${module.position}');
      print('  Type: ${module.type}');
    }
  }
}
```

### Complete Home Data Overview

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = saavn_playClient();
  
  final homeData = await client.home.getLaunchData();
  
  print('=== saavn_play Home Data ===\n');
  
  // History
  if (homeData.history != null && homeData.history!.isNotEmpty) {
    print('Recently Played: ${homeData.history!.length} items');
  }
  
  // New Trending
  if (homeData.newTrending != null) {
    print('New Trending: ${homeData.newTrending!.length} items');
  }
  
  // Top Playlists
  if (homeData.topPlaylists != null) {
    print('Top Playlists: ${homeData.topPlaylists!.length} items');
  }
  
  // New Albums
  if (homeData.newAlbums != null) {
    print('New Albums: ${homeData.newAlbums!.length} items');
  }
  
  // Browse & Discover
  if (homeData.browseDiscover != null) {
    print('Browse & Discover: ${homeData.browseDiscover!.length} items');
  }
  
  // Charts
  if (homeData.charts != null) {
    print('Charts: ${homeData.charts!.length} items');
  }
  
  // Radio
  if (homeData.radio != null) {
    print('Radio Stations: ${homeData.radio!.length} items');
  }
  
  // Artist Recommendations
  if (homeData.artistRecos != null) {
    print('Artist Recommendations: ${homeData.artistRecos!.length} items');
  }
  
  // Promo Sections
  if (homeData.promoSections != null) {
    print('Promo Sections: ${homeData.promoSections!.length} sections');
  }
  
  // Modules
  if (homeData.modules != null) {
    print('Module Configurations: ${homeData.modules!.length} modules');
  }
}
```

## Related Endpoints

- [Radio](radio.md) - Get radio station details and songs
- [Playlist](playlist.md) - Get playlist details
- [Album](album.md) - Get album details
