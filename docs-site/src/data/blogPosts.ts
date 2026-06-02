export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'getting-started-with-saavn-play',
    title: 'Getting Started with saavn_play',
    date: '2025-01-20',
    excerpt: 'Learn how to install and set up saavn_play in your Flutter project. This comprehensive guide covers everything from installation to your first API call.',
    author: 'Krishna',
    tags: ['beginner', 'tutorial', 'installation'],
    readTime: '5 min read',
    content: `# Getting Started with saavn_play

## Introduction

saavn_play is a powerful Dart package that provides a clean, type-safe interface to the JioSaavn API. Whether you're building a music streaming app or just want to explore music data, saavn_play makes it easy.

## Installation

Add saavn_play to your \`pubspec.yaml\`:

\`\`\`yaml
dependencies:
  saavn_play: ^1.3.0
\`\`\`

Then run:

\`\`\`bash
flutter pub get
\`\`\`

## Quick Start

Here's how to make your first API call:

\`\`\`dart
import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  
  // Search for songs
  final results = await client.search('Tum Hi Ho');
  
  print('Found \${results.songs.length} songs');
  
  // Get song details
  if (results.songs.isNotEmpty) {
    final song = await client.getSong(results.songs.first.id);
    print('Song: \${song.name}');
    print('Artist: \${song.artists.first.name}');
  }
}
\`\`\`

## Configuration

You can customize the client with your own base URL:

\`\`\`dart
final client = SaavnPlayClient(
  baseUrl: 'https://your-api.com',
);
\`\`\`

## Next Steps

- Check out the [API Reference](/api-reference) for detailed endpoint documentation
- Explore [Examples](/examples) for more use cases
- Try the [Playground](/playground) to test API calls interactively

## Need Help?

If you run into any issues, check our [Contributing Guide](/contributing) or open an issue on GitHub.`,
  },
  {
    id: 'building-music-app-with-flutter',
    title: 'Building a Music App with Flutter',
    date: '2025-01-15',
    excerpt: 'A step-by-step tutorial on building a complete music streaming application using Flutter and the saavn_play package.',
    author: 'Krishna',
    tags: ['flutter', 'tutorial', 'advanced'],
    readTime: '12 min read',
    content: `# Building a Music App with Flutter

## Overview

In this tutorial, we'll build a feature-rich music app using Flutter and saavn_play. By the end, you'll have a working app with search, playback, and playlist features.

## Prerequisites

- Flutter SDK installed
- Basic knowledge of Dart
- saavn_play package installed

## Project Setup

Create a new Flutter project:

\`\`\`bash
flutter create music_app
cd music_app
\`\`\`

Add dependencies to \`pubspec.yaml\`:

\`\`\`yaml
dependencies:
  flutter:
    sdk: flutter
  saavn_play: ^1.3.0
  just_audio: ^0.9.36
  provider: ^6.1.1
\`\`\`

## Architecture

We'll use a clean architecture approach:

\`\`\`
lib/
├── models/
│   └── player_state.dart
├── providers/
│   ├── search_provider.dart
│   └── player_provider.dart
├── screens/
│   ├── home_screen.dart
│   ├── search_screen.dart
│   └── player_screen.dart
├── widgets/
│   ├── song_card.dart
│   └── player_controls.dart
└── main.dart
\`\`\`

## Building the Search Screen

First, let's create a search provider:

\`\`\`dart
import 'package:flutter/foundation.dart';
import 'package:saavn_play/saavn_play.dart';

class SearchProvider extends ChangeNotifier {
  final SaavnPlayClient _client = SaavnPlayClient();
  
  List<Song> _songs = [];
  bool _isLoading = false;
  String _error = '';
  
  List<Song> get songs => _songs;
  bool get isLoading => _isLoading;
  String get error => _error;
  
  Future<void> search(String query) async {
    _isLoading = true;
    _error = '';
    notifyListeners();
    
    try {
      final results = await _client.search(query);
      _songs = results.songs;
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
\`\`\`

## Adding Audio Playback

Integrate just_audio for music playback:

\`\`\`dart
import 'package:just_audio/just_audio.dart';

class PlayerProvider extends ChangeNotifier {
  final AudioPlayer _audioPlayer = AudioPlayer();
  Song? _currentSong;
  bool _isPlaying = false;
  
  Song? get currentSong => _currentSong;
  bool get isPlaying => _isPlaying;
  
  Future<void> play(Song song) async {
    _currentSong = song;
    await _audioPlayer.setUrl(song.downloadUrl);
    await _audioPlayer.play();
    _isPlaying = true;
    notifyListeners();
  }
  
  Future<void> pause() async {
    await _audioPlayer.pause();
    _isPlaying = false;
    notifyListeners();
  }
  
  Future<void> resume() async {
    await _audioPlayer.play();
    _isPlaying = true;
    notifyListeners();
  }
}
\`\`\`

## Conclusion

You now have the foundation for a music streaming app! Continue building by:

1. Adding playlist management
2. Implementing offline caching
3. Adding user authentication
4. Creating a beautiful UI with animations

Happy coding!`,
  },
  {
    id: 'understanding-jiosaavn-api',
    title: 'Understanding JioSaavn API',
    date: '2025-01-10',
    excerpt: 'A deep dive into the JioSaavn API structure, endpoints, and how saavn_play wraps them into a clean Dart interface.',
    author: 'Krishna',
    tags: ['api', 'technical', 'deep-dive'],
    readTime: '8 min read',
    content: `# Understanding JioSaavn API

## Overview

The JioSaavn API provides access to a vast library of Indian music. saavn_play wraps this API into a type-safe, easy-to-use Dart package.

## API Structure

The API is organized around these main resources:

### Songs
- Search songs by query
- Get song details by ID
- Fetch song recommendations
- Access lyrics and metadata

### Albums
- Search albums
- Get album details with track listing
- Album recommendations

### Artists
- Search artists
- Get artist profile with bio
- Artist's songs and albums
- Social media links

### Playlists
- Featured playlists
- Playlist details
- Curated collections

## How saavn_play Works

### Client Architecture

\`\`\`dart
class SaavnPlayClient {
  final String baseUrl;
  final http.Client _httpClient;
  
  SaavnPlayClient({
    String? baseUrl,
  }) : baseUrl = baseUrl ?? 'https://saavn.me',
       _httpClient = http.Client();
  
  // Search endpoint
  Future<SearchResults> search(String query) async {
    final response = await _get('/search', {'query': query});
    return SearchResults.fromJson(response);
  }
  
  // Song endpoint
  Future<Song> getSong(String id) async {
    final response = await _get('/songs/$id');
    return Song.fromJson(response);
  }
}
\`\`\`

### Type Safety

All models are fully typed:

\`\`\`dart
class Song {
  final String id;
  final String name;
  final String album;
  final List<Artist> artists;
  final String downloadUrl;
  final Duration duration;
  final String? lyrics;
  
  Song({
    required this.id,
    required this.name,
    required this.album,
    required this.artists,
    required this.downloadUrl,
    required this.duration,
    this.lyrics,
  });
  
  factory Song.fromJson(Map<String, dynamic> json) {
    return Song(
      id: json['id'],
      name: json['name'],
      album: json['album']['name'],
      artists: (json['artists'] as List)
          .map((a) => Artist.fromJson(a))
          .toList(),
      downloadUrl: json['download_url'],
      duration: Duration(seconds: json['duration']),
      lyrics: json['lyrics'],
    );
  }
}
\`\`\`

## Rate Limiting

The API has rate limits. saavn_play handles this gracefully:

- Automatic retry with exponential backoff
- Configurable timeout settings
- Error handling for rate limit responses

## Error Handling

\`\`\`dart
try {
  final song = await client.getSong('invalid-id');
} on ApiException catch (e) {
  print('API Error: \${e.message}');
  print('Status Code: \${e.statusCode}');
} on NetworkException catch (e) {
  print('Network Error: \${e.message}');
}
\`\`\`

## Best Practices

1. **Cache responses** - Avoid unnecessary API calls
2. **Handle errors gracefully** - Always wrap calls in try-catch
3. **Use pagination** - Don't fetch all results at once
4. **Respect rate limits** - Implement proper throttling

## Conclusion

Understanding the API structure helps you build better apps. saavn_play abstracts the complexity while giving you full access to the data.`,
  },
  {
    id: 'saavn-play-v1-3-release',
    title: 'saavn_play v1.3.0 Release',
    date: '2025-01-05',
    excerpt: 'Announcing saavn_play v1.3.0 with new Podcast API, Radio API, Lyrics support, and more!',
    author: 'Krishna',
    tags: ['release', 'news', 'podcast', 'radio'],
    readTime: '4 min read',
    content: `# saavn_play v1.3.0 Release

We're excited to announce the release of saavn_play v1.3.0! This is our biggest update yet, bringing new APIs and improved reliability.

## What's New

### Podcast API

Discover and explore podcasts with our new Podcast API:

\`\`\`dart
final podcasts = await client.searchPodcasts('technology');
final topShows = await client.getTopPodcasts();
final episodeDetails = await client.getEpisode(episodeId);
\`\`\`

### Radio API

Access radio stations and streaming content:

\`\`\`dart
final stations = await client.getRadioStations();
final station = await client.getRadioStation(stationId);
final mirchiTop = await client.getMirchiTop();
\`\`\`

### Lyrics API

Fetch song lyrics with copyright information:

\`\`\`dart
final song = await client.getSong(songId);
if (song.lyrics != null) {
  print(song.lyrics);
}
\`\`\`

### Home Endpoint

Get launch data with trending modules and charts:

\`\`\`dart
final homeData = await client.getHomeData();
print(homeData.trending.length); // Trending songs
print(homeData.charts.length);   // Featured charts
\`\`\`

## Improvements

- **Better Error Handling**: More descriptive error messages
- **Enhanced Type Safety**: Stricter types across all models
- **Performance**: Faster response times for large result sets
- **Documentation**: Updated API docs with examples

## Breaking Changes

None! This release is fully backward compatible.

## Upgrade

Update your dependency:

\`\`\`yaml
dependencies:
  saavn_play: ^1.3.0
\`\`\`

\`\`\`bash
flutter pub upgrade saavn_play
\`\`\`

## What's Next

We're working on:
- Playlist management APIs
- User authentication support
- Offline caching utilities
- More comprehensive examples

Thank you for using saavn_play!`,
  },
  {
    id: 'best-practices-for-music-apps',
    title: 'Best Practices for Music Apps',
    date: '2024-12-28',
    excerpt: 'Tips and best practices for building performant and user-friendly music applications with Flutter.',
    author: 'Krishna',
    tags: ['best-practices', 'performance', 'ux'],
    readTime: '7 min read',
    content: `# Best Practices for Music Apps

Building a great music app requires attention to performance, user experience, and reliability. Here are our top recommendations.

## Performance Optimization

### 1. Lazy Loading

Don't load all songs at once. Use pagination:

\`\`\`dart
class PaginatedSearch {
  final SaavnPlayClient _client;
  final int pageSize = 20;
  int _currentPage = 0;
  bool _hasMore = true;
  
  Future<List<Song>> loadMore(String query) async {
    if (!_hasMore) return [];
    
    final results = await _client.search(
      query,
      page: _currentPage,
      limit: pageSize,
    );
    
    _currentPage++;
    _hasMore = results.songs.length == pageSize;
    
    return results.songs;
  }
}
\`\`\`

### 2. Image Caching

Cache album art and artist images:

\`\`\`dart
CachedNetworkImage(
  imageUrl: song.albumArt,
  placeholder: (context, url) => CircularProgressIndicator(),
  errorWidget: (context, url, error) => Icon(Icons.error),
  memCacheWidth: 300, // Optimize memory usage
)
\`\`\`

### 3. Audio Buffering

Implement smart buffering for smooth playback:

\`\`\`dart
await audioPlayer.setUrl(
  song.downloadUrl,
  preload: true,
);
\`\`\`

## User Experience

### 1. Offline Support

Cache recently played songs:

\`\`\`dart
class OfflineCache {
  final HiveBox _box = Hive.box('songs');
  
  Future<void> cacheSong(Song song) async {
    final bytes = await http.get(song.downloadUrl);
    await _box.put(song.id, bytes.bodyBytes);
  }
  
  bool isCached(String songId) {
    return _box.containsKey(songId);
  }
}
\`\`\`

### 2. Background Audio

Enable background playback:

\`\`\`dart
await AudioService.start(
  backgroundTaskEntrypoint: backgroundTask,
  androidNotificationChannelId: 'com.example.music',
  androidNotificationChannelName: 'Music Playback',
);
\`\`\`

### 3. Smooth Animations

Use animations for a polished feel:

\`\`\`dart
AnimatedSwitcher(
  duration: Duration(milliseconds: 300),
  child: isPlaying 
    ? PauseIcon(key: ValueKey(1))
    : PlayIcon(key: ValueKey(2)),
)
\`\`\`

## Error Handling

Always provide fallback UI:

\`\`\`dart
FutureBuilder<Song>(
  future: client.getSong(id),
  builder: (context, snapshot) {
    if (snapshot.hasError) {
      return ErrorWidget(
        message: 'Failed to load song',
        onRetry: () => refresh(),
      );
    }
    if (!snapshot.hasData) {
      return LoadingWidget();
    }
    return SongWidget(song: snapshot.data!);
  },
)
\`\`\`

## Testing

Write comprehensive tests:

\`\`\`dart
test('search returns results', () async {
  final client = MockSaavnPlayClient();
  when(client.search('test'))
      .thenAnswer((_) async => mockResults);
  
  final results = await client.search('test');
  expect(results.songs, isNotEmpty);
});
\`\`\`

## Conclusion

Following these best practices will help you build a music app that's fast, reliable, and delightful to use. Happy building!`,
  },
];

export default blogPosts;
