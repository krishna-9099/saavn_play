/// A comprehensive Dart package for interacting with the JioSaavn API.
///
/// This unofficial client provides easy access to search for songs, albums,
/// playlists, artists, podcasts, radio stations, and more.
///
/// ## Usage
///
/// ```dart
/// import 'package:saavn_play/saavn_play.dart';
///
/// void main() async {
///   final client = SaavnPlayClient();
///
///   // Search for songs
///   final songs = await client.search.songs('Imagine Dragons');
///
///   // Get album details
///   final album = await client.albums.detailsById('1142502');
///
///   // Get song details with lyrics
///   final songDetails = await client.songs.detailsById(['5WXAlMNt']);
///
///   client.close();
/// }
/// ```
///
/// ## Features
///
/// - 🔍 **Search**: Search for songs, albums, playlists, and artists
/// - 🎵 **Songs**: Fetch song details and download URLs by ID
/// - 💿 **Albums**: Retrieve album information and track listings
/// - 🎤 **Artists**: Get artist details, top songs, and albums
/// - 📋 **Playlists**: Access playlist details and songs
/// - 📜 **Lyrics**: Fetch song lyrics with copyright info
/// - 📻 **Radio**: Browse featured stations and get station songs
/// - 🎙️ **Podcasts**: Discover top podcast shows
/// - 🏠 **Home**: Get personalized home/launch data
/// - ⭐ **Featured Playlists**: Browse featured playlists with filters
///
/// ## Disclaimer
///
/// This package is intended for educational and research purposes only.
/// It is not affiliated with, endorsed by, or connected to JioSaavn.
library saavn_play;

export 'src/saavn_play.dart';


export 'src/models/image.dart';
export 'src/models/lyrics.dart';


export 'src/endpoints/podcast.dart';
export 'src/endpoints/radio.dart';
export 'src/endpoints/webapi.dart';
export 'src/endpoints/featured_playlist.dart';
export 'src/endpoints/home.dart';
