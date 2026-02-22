# saavn_play

<div align="center">
  <img src="logo.svg" alt="saavn_play logo" width="240" height="48">
</div>

[![Pub Version](https://img.shields.io/pub/v/saavn_play.svg?label=pub&color=blue)](https://pub.dev/packages/saavn_play)
[![Dart SDK](https://img.shields.io/badge/Dart-%5E3.0.0-0175C2.svg?logo=dart)](https://dart.dev)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/krishna-9099/saavn_play/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/Documentation-GitHub%20Pages-blue?logo=github)](https://krishna-9099.github.io/saavn_play)
[![GitHub Stars](https://img.shields.io/github/stars/krishna-9099/saavn_play.svg?style=flat&logo=github&color=yellow)](https://github.com/krishna-9099/saavn_play/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/krishna-9099/saavn_play.svg?logo=github)](https://github.com/krishna-9099/saavn_play/issues)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/krishna-9099/saavn_play.svg?logo=github)](https://github.com/krishna-9099/saavn_play/commits/main)
[![Pub Likes](https://img.shields.io/pub/likes/saavn_play?logo=dart)](https://pub.dev/packages/saavn_play)
[![Pub Points](https://img.shields.io/pub/points/saavn_play?logo=dart)](https://pub.dev/packages/saavn_play/score)

A comprehensive Dart package for interacting with the JioSaavn API. This unofficial client provides easy access to search for songs, albums, playlists, artists, podcasts, radio stations, and more.

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

## 📚 Documentation

**For complete documentation with interactive examples, API reference, and guides, visit our documentation website:**

### 👉 [https://krishna-9099.github.io/saavn_play](https://krishna-9099.github.io/saavn_play)

The documentation website includes:

- 🚀 **Getting Started** - Installation and quick start guide
- 📖 **API Reference** - Complete endpoint documentation
- 💡 **Examples** - Code examples for all features
- 📦 **Models** - Data model documentation

---

## Installation

Add the following to your `pubspec.yaml`:

```yaml
dependencies:
  saavn_play: ^1.0.0
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

---

## Repository

Source code and issue tracker live on GitHub:

<https://github.com/krishna-9099/saavn_play>

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Disclaimer

**THIS PROJECT IS PROVIDED FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY.**

This project and its content are **unofficial** and are **NOT affiliated with, funded by, authorized by, or endorsed by** JioSaavn, Reliance Industries Limited, Saavn Media Pvt Ltd, or any of their subsidiaries, affiliates, or partners.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND. By using this software, you acknowledge that you are solely responsible for ensuring your use complies with all applicable laws, regulations, and terms of service.
