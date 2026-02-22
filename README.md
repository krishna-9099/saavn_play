# saavn_play

[![Pub Version](https://img.shields.io/pub/v/saavn_play.svg?label=pub&color=blue)](https://pub.dev/packages/saavn_play)
[![Dart SDK](https://img.shields.io/badge/Dart-%5E3.0.0-0175C2.svg?logo=dart)](https://dart.dev)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/krishna-9099/saavn_play/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/krishna-9099/saavn_play.svg?style=flat&logo=github&color=yellow)](https://github.com/krishna-9099/saavn_play/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/krishna-9099/saavn_play.svg?logo=github)](https://github.com/krishna-9099/saavn_play/issues)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/krishna-9099/saavn_play.svg?logo=github)](https://github.com/krishna-9099/saavn_play/commits/main)
[![Pub Likes](https://img.shields.io/pub/likes/saavn_play?logo=dart)](https://pub.dev/packages/saavn_play)
[![Pub Points](https://img.shields.io/pub/points/saavn_play?logo=dart)](https://pub.dev/packages/saavn_play/score)
[![Code Size](https://img.shields.io/github/languages/code-size/krishna-9099/saavn_play.svg?logo=github)](https://github.com/krishna-9099/saavn_play)

A comprehensive Dart package for interacting with the JioSaavn (saavn_play) API. This unofficial client provides easy access to search for songs, albums, playlists, artists, podcasts, radio stations, and more.

---

> ⚠️ **IMPORTANT: EDUCATIONAL PURPOSE ONLY**
>
> This project is intended for **educational and research purposes only**.
>
> - This is an **unofficial** project and is **NOT affiliated with, funded by, authorized, endorsed, or in any way associated with** JioSaavn, Reliance Industries, Saavn Media Pvt Ltd, or any other company, organization, or individual.
> - The maintainers are **NOT liable** for any legal issues, misuse, damages, or consequences resulting from the use of this software.
> - Users are solely responsible for ensuring their use complies with all applicable laws, regulations, and terms of service.
> - This software is provided "AS IS" without warranty of any kind. See [LICENSE](LICENSE) for full disclaimer.

---

## Table of Contents

- [saavn\_play](#saavn_play)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [API Reference](#api-reference)
    - [Search](#search)
    - [Songs](#songs)
    - [Albums](#albums)
    - [Artists](#artists)
    - [Playlists](#playlists)
    - [Lyrics](#lyrics)
    - [Radio](#radio)
    - [Podcasts](#podcasts)
    - [Home](#home)
    - [Featured Playlists](#featured-playlists)
    - [Web API](#web-api)
  - [Models](#models)
    - [Core Models](#core-models)
    - [Search Models](#search-models)
    - [Radio \& Podcast Models](#radio--podcast-models)
    - [Home Models](#home-models)
    - [Media Models](#media-models)
  - [API Versioning](#api-versioning)
  - [Examples](#examples)
    - [Complete Example: Search and Stream](#complete-example-search-and-stream)
    - [Complete Example: Browse Home Content](#complete-example-browse-home-content)
    - [Complete Example: Radio Station](#complete-example-radio-station)
  - [Documentation](#documentation)
  - [Repository](#repository)
  - [Contributing](#contributing)
    - [Development Setup](#development-setup)
    - [Code Style](#code-style)
  - [License](#license)
  - [Disclaimer](#disclaimer)
    - [No Affiliation](#no-affiliation)
    - [No Warranty](#no-warranty)
    - [Limitation of Liability](#limitation-of-liability)
    - [User Responsibility](#user-responsibility)

## Features

- 🔍 **Search**: Search for songs, albums, playlists, and artists
- 🎵 **Songs**: Fetch song details and download URLs by ID
- 💿 **Albums**: Retrieve album information and track listings
- 🎤 **Artists**: Get artist details, top songs, and albums
- 📋 **Playlists**: Access playlist details and songs
- 📜 **Lyrics**: Fetch song lyrics with copyright info
- 📻 **Radio**: Browse featured stations and get station songs
- 🎙️ **Podcasts**: Discover top podcast shows
- 🏠 **Home**: Get personalized home/launch data
- ⭐ **Featured Playlists**: Browse featured playlists with filters
- 🌐 **Web API**: Access footer details, browse menus, and show details

## Installation

Add the following to your `pubspec.yaml`:

```yaml
dependencies:
  saavn_play: ^0.1.1
```

Then run:

```bash
dart pub get
```

## Quick Start

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for songs
  final songs = await client.search.songs('Imagine Dragons');
  
  for (var song in songs.results) {
    print('${song.name} by ${song.primaryArtists}');
  }
}
```

## API Reference

### Search

The search endpoint provides methods to search across different content types.

```dart
final client = SaavnPlayClient();

// Search all content types at once
final allResults = await client.search.all('Malibu - Miley Cyrus');

// Search for songs with pagination
final songs = await client.search.songs(
  'Malibu - Miley Cyrus',
  page: 0,
  limit: 10,
);

// Search for albums
final albums = await client.search.albums(
  'Midnights',
  page: 0,
  limit: 10,
);

// Search for artists
final artists = await client.search.artists(
  'Taylor Swift',
  page: 0,
  limit: 10,
);

// Search for playlists
final playlists = await client.search.playlists(
  'Top Hits',
  page: 0,
  limit: 10,
);
```

### Songs

Fetch detailed information about one or more songs by their IDs.

```dart
final client = SaavnPlayClient();

// Fetch one or more songs by ID
final songs = await client.songs.detailsById([
  '5WXAlMNt',
  'csaEsVWV',
]);

for (var song in songs) {
  print('Song: ${song.name}');
  print('Album: ${song.album.name}');
  print('Duration: ${song.duration} seconds');
  print('Has Lyrics: ${song.hasLyrics}');
  
  // Access download URLs with different qualities
  if (song.downloadUrl != null) {
    for (var link in song.downloadUrl!) {
      print('Quality ${link.quality}: ${link.link}');
    }
  }
}
```

### Albums

Retrieve album details including all tracks.

```dart
final client = SaavnPlayClient();

// Get album details by ID
final album = await client.albums.detailsById('1142502');

print('Album: ${album.name}');
print('Artist: ${album.primaryArtists}');
print('Year: ${album.year}');
print('Language: ${album.language}');

// Access album songs
if (album.songs != null) {
  for (var song in album.songs!) {
    print('Track: ${song.name}');
  }
}
```

### Artists

Get artist information, top songs, and albums.

```dart
final client = SaavnPlayClient();

// Get artist details
final artist = await client.artists.detailsById('123456');
print('Artist: ${artist.name}');
print('Followers: ${artist.followerCount}');

// Get artist's top songs with pagination
final songs = await client.artists.artistSongs(
  '123456',
  page: 1,
  category: 'top',  // optional
  sort: 'asc',      // optional
);

// Get artist's albums
final albums = await client.artists.artistAlbums(
  '123456',
  page: 0,
  category: 'latest', // optional
  sort: 'desc',       // optional
);
```

### Playlists

Fetch playlist details and tracks.

```dart
final client = SaavnPlayClient();

// Get playlist details by ID
final playlist = await client.playlists.detailsById('playlist_id_here');

print('Playlist: ${playlist.listname}');
print('Song Count: ${playlist.listCount}');

// Access playlist songs
if (playlist.songs != null) {
  for (var song in playlist.songs!) {
    print('Song: ${song.name}');
  }
}
```

### Lyrics

Fetch lyrics for songs.

```dart
import 'package:saavn_play/src/endpoints/lyrics.dart';

final lyricsClient = LyricsEndpoint();

// Get lyrics by song ID
final lyrics = await lyricsClient.get('song_id_here');

print('Lyrics: ${lyrics.lyrics}');
print('Copyright: ${lyrics.copyright}');
print('Snippet: ${lyrics.snippet}');
```

### Radio

Browse and interact with radio stations.

```dart
final client = SaavnPlayClient();

// Get featured radio stations
final stations = await client.radio.getFeaturedStations();
for (var station in stations.featuredStations) {
  print('Station: ${station.name}');
  print('Description: ${station.description}');
}

// Create a featured station
final createdStation = await client.radio.createFeaturedStation(
  name: 'Hit Factory',
  language: 'english',
);
print('Station ID: ${createdStation.stationId}');

// Get songs from a station
final stationSongs = await client.radio.getStationSongs(
  stationId: createdStation.stationId,
  count: 5,
  next: true,
);

// Convenience method: Get songs directly by station name
final songs = await client.radio.getFeaturedStationSongs(
  name: 'Chill',
  language: 'english',
  count: 10,
);
```

### Podcasts

Discover and browse podcasts.

```dart
final client = SaavnPlayClient();

// Get top podcast shows with pagination
final podcasts = await client.podcasts.getTopShows(
  n: 20,   // results per page
  page: 1,
);

for (var show in podcasts.shows) {
  print('Show: ${show.title}');
  print('Season: ${show.seasonNumber}');
  print('Release Date: ${show.releaseDate}');
}
```

### Home

Get home/launch data including trending content.

```dart
final client = SaavnPlayClient();

// Get home launch data
final homeData = await client.home.getLaunchData();

// Access different sections
print('New Trending: ${homeData.newTrending?.length} items');
print('Top Playlists: ${homeData.topPlaylists?.length} items');
print('New Albums: ${homeData.newAlbums?.length} items');
print('Charts: ${homeData.charts?.length} items');
print('Radio Stations: ${homeData.radio?.length} items');

// Browse discover section
if (homeData.browseDiscover != null) {
  for (var item in homeData.browseDiscover!) {
    print('Discover: ${item.title}');
  }
}
```

### Featured Playlists

Browse featured playlists with various filters.

```dart
import 'package:saavn_play/src/endpoints/featured_playlist.dart';

final playlistClient = FeaturedPlaylistEndpoint();

// Get featured playlists with filters
final playlists = await playlistClient.getFeaturedPlaylists(
  n: 30,              // results per page
  p: 1,               // page number
  language: 'hindi',  // filter by language
  type: 'featured',   // playlist type
  category: 'romantic', // category filter
);

for (var playlist in playlists.data) {
  print('Playlist: ${playlist.listname}');
  print('Song Count: ${playlist.count}');
}
```

### Web API

Access additional web-specific endpoints.

```dart
import 'package:saavn_play/src/endpoints/webapi.dart';

final webClient = WebapiEndpoint();

// Get entity details by token and type
final entity = await webClient.get(
  token: 'entity_token',
  type: 'album', // 'show', 'album', 'playlist', 'artist', 'song', 'radio'
);

// Get show details
final show = await webClient.getShow(
  token: 'show_token',
  seasonNumber: '1', // optional
);

// Get footer details
final footer = await webClient.getFooterDetails(language: 'hindi');
print('Playlists: ${footer.playlists.length}');
print('Artists: ${footer.artists.length}');

// Get browse hover details (mega menu)
final browse = await webClient.getBrowseHoverDetails(language: 'english');
print('Top Artists: ${browse.topArtists.length}');
print('Top Playlists: ${browse.topPlaylists.length}');
```

## Models

The package provides strongly-typed models for all responses:

### Core Models

| Model              | Description                                       |
| ------------------ | ------------------------------------------------- |
| `SongResponse`     | Song with download URLs, album info, and metadata |
| `AlbumResponse`    | Album with songs list and metadata                |
| `ArtistResponse`   | Artist details with biography and stats           |
| `PlaylistResponse` | Playlist with songs and metadata                  |
| `LyricsResponse`   | Song lyrics with copyright info                   |

### Search Models

| Model                    | Description                       |
| ------------------------ | --------------------------------- |
| `AllSearchResponse`      | Combined search results           |
| `SongSearchResponse`     | Paginated song search results     |
| `AlbumSearchResponse`    | Paginated album search results    |
| `ArtistSearchResponse`   | Paginated artist search results   |
| `PlaylistSearchResponse` | Paginated playlist search results |

### Radio & Podcast Models

| Model                       | Description                |
| --------------------------- | -------------------------- |
| `RadioStation`              | Radio station details      |
| `RadioResponse`             | List of featured stations  |
| `RadioStationSongsResponse` | Songs from a radio station |
| `PodcastShow`               | Podcast show details       |
| `PodcastShowsResponse`      | List of podcast shows      |

### Home Models

| Model              | Description                   |
| ------------------ | ----------------------------- |
| `HomeLaunchData`   | Complete home page data       |
| `HomeSectionItem`  | Item in a home section        |
| `ChartItem`        | Chart/leaderboard item        |
| `HomeRadioStation` | Radio station in home section |

### Media Models

| Model          | Description                     |
| -------------- | ------------------------------- |
| `DownloadLink` | Download URL with quality level |
| `ImageLinks`   | Image URLs in various sizes     |

## API Versioning

The package supports multiple API versions:

```dart
enum ApiVersion {
  v1(1),
  v2(2),
  v3(3),
  v4(4),
  v5(5),
  v6(6);
}
```

By default, the client uses API v6, but some endpoints require v4 for compatibility. The package handles this automatically, but you can also configure it manually if needed.

## Examples

### Complete Example: Search and Stream

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Search for a song
  final results = await client.search.songs('Believer - Imagine Dragons');

  if (results.results.isNotEmpty) {
    final song = results.results.first;
    
    print('Found: ${song.name}');
    print('By: ${song.primaryArtists}');
    print('Album: ${song.album.name}');
    print('Duration: ${song.duration} seconds');
    
    // Get download URLs
    if (song.downloadUrl != null) {
      print('\nDownload URLs:');
      for (var link in song.downloadUrl!) {
        print('  ${link.quality}: ${link.link}');
      }
    }
    
    // Get image URLs
    if (song.image != null) {
      print('\nImage URLs:');
      for (var img in song.image!) {
        print('  ${img.quality}: ${img.link}');
      }
    }
  }
}
```

### Complete Example: Browse Home Content

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get home data
  final homeData = await client.home.getLaunchData();

  // Print new trending
  print('=== New Trending ===');
  for (var item in homeData.newTrending ?? []) {
    print('  ${item.title} - ${item.subtitle}');
  }

  // Print top playlists
  print('\n=== Top Playlists ===');
  for (var item in homeData.topPlaylists ?? []) {
    print('  ${item.title}');
  }

  // Print charts
  print('\n=== Charts ===');
  for (var chart in homeData.charts ?? []) {
    print('  ${chart.title}');
  }
}
```

### Complete Example: Radio Station

```dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();

  // Get songs from a featured station
  final songs = await client.radio.getFeaturedStationSongs(
    name: 'Romance',
    language: 'hindi',
    count: 5,
  );

  print('Radio Station Songs:');
  for (var song in songs.songs) {
    print('  ${song.name} by ${song.primaryArtists}');
  }
}
```

## Documentation

For more detailed documentation, see the [`doc/`](doc/) directory:

- [API Documentation](doc/README.md)
- [Search API](doc/search.md)
- [Song API](doc/song.md)
- [Album API](doc/album.md)
- [Artist API](doc/artist.md)
- [Playlist API](doc/playlist.md)
- [Lyrics API](doc/lyrics.md)
- [Radio API](doc/radio.md)
- [Podcast API](doc/podcast.md)
- [Home API](doc/home.md)
- [Featured Playlists](doc/featured_playlist.md)
- [Web API](doc/webapi.md)

## Repository

Source code and issue tracker live on GitHub:

<https://github.com/krishna-9099/saavn_play>

## Contributing

Contributions are welcome! Here's how you can help:

1. **Report bugs** - Open an issue with details about the problem
2. **Request features** - Open an issue with the "enhancement" label
3. **Submit pull requests** - Fork the repo, make your changes, and submit a PR

### Development Setup

```bash
# Clone the repository
git clone https://github.com/krishna-9099/saavn_play.git
cd saavn_play

# Install dependencies
dart pub get

# Run tests
dart test

# Generate code (if needed)
dart run build_runner build
```

### Code Style

- Follow the [Dart style guide](https://dart.dev/guides/language/effective-dart)
- Run `dart analyze` before committing
- Include tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Disclaimer

**THIS PROJECT IS PROVIDED FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY.**

### No Affiliation

This project and its content are **unofficial** and are:

- **NOT affiliated with, funded by, authorized by, or endorsed by** JioSaavn, Reliance Industries Limited, Saavn Media Pvt Ltd, or any of their subsidiaries, affiliates, or partners
- **NOT associated with** any other company, organization, or individual that may be referenced or accessed through this software
- **NOT an official API client** sanctioned by any third-party service

### No Warranty

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

### Limitation of Liability

IN NO EVENT SHALL THE AUTHORS, CONTRIBUTORS, OR MAINTAINERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### User Responsibility

By using this software, you acknowledge that:

1. You are solely responsible for ensuring your use complies with all applicable laws, regulations, and terms of service
2. You will not use this software for any illegal, harmful, or unauthorized purposes
3. You understand that the maintainers do not encourage, condone, or support any violation of terms of service, copyright infringement, or any other illegal activity
4. You will indemnify and hold harmless the authors and contributors from any claims, damages, or expenses arising from your use of the software

**If you do not agree with these terms, you must not use this software.**
