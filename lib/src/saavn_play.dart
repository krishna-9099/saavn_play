import 'package:dio/dio.dart';
import 'package:saavn_play/src/endpoints/album.dart';
import 'package:saavn_play/src/endpoints/artist.dart';
import 'package:saavn_play/src/endpoints/home.dart';
import 'package:saavn_play/src/endpoints/podcast.dart';
import 'package:saavn_play/src/endpoints/radio.dart';
import 'package:saavn_play/src/endpoints/search.dart';
import 'package:saavn_play/src/endpoints/song.dart';

/// Main client for interacting with the JioSaavn API.
///
/// Provides access to all API endpoints through dedicated endpoint classes.
///
/// Example:
/// ```dart
/// final client = SaavnPlayClient();
/// final songs = await client.search.songs('Imagine Dragons');
/// ```
class SaavnPlayClient {
  /// Album-related API endpoints.
  final AlbumEndpoint albums;

  /// Artist-related API endpoints.
  final ArtistEndpoint artists;

  /// Song-related API endpoints.
  final SongEndpoint songs;

  /// Search API endpoints.
  final SearchEndpoint search;

  /// Home/launch data API endpoints.
  final HomeEndpoint home;

  /// Podcast API endpoints.
  final PodcastEndpoint podcasts;

  /// Radio API endpoints.
  final RadioEndpoint radio;

  /// Creates a new [SaavnPlayClient] instance.
  ///
  /// Optionally accepts [options] to customize the Dio HTTP client.
  SaavnPlayClient([BaseOptions? options])
      : albums = AlbumEndpoint(options),
        artists = ArtistEndpoint(options),
        songs = SongEndpoint(options),
        search = SearchEndpoint(options),
        home = HomeEndpoint(options),
        podcasts = PodcastEndpoint(options),
        radio = RadioEndpoint(options);
}

/// Deprecated: Use [SaavnPlayClient] instead.
@Deprecated('Use SaavnPlayClient instead')
typedef SaavnPlayclient = SaavnPlayClient;
