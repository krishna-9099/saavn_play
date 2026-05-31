import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';


class SongEndpoint extends BaseClient {
  SongEndpoint([super.options]);

  Future<Map<String, dynamic>> detailsById(List<String> ids) async {
    // api v4 does not contain media_preview_url
    final response = await request(call: endpoints.songs.id, queryParameters: {
      'pids': ids.join(','),
    });

    return response;
  }

  /// Get song recommendations based on a song ID
  ///
  /// [songId] - The song ID to get recommendations for
  /// [language] - The language for recommendations (default: 'hindi')
  Future<Map<String, dynamic>> getRecommendations({
    required String songId,
    String language = 'hindi',
  }) async {
    final response = await request(
      call: 'reco.getreco',
      isAPIv4: true,
      queryParameters: {
        'pid': songId,
        'language': language,
      },
    );

    return response;
  }

  /// Get currently trending songs
  ///
  /// [entityType] - The entity type (default: 'song')
  /// [entityLanguage] - The language for trending songs (default: 'hindi')
  Future<Map<String, dynamic>> getCurrentlyTrending({
    String entityType = 'song',
    String entityLanguage = 'hindi',
  }) async {
    final response = await request(
      call: endpoints.home.getTrending,
      isAPIv4: true,
      queryParameters: {
        'entity_type': entityType,
        'entity_language': entityLanguage,
      },
    );

    return response;
  }

  /// Get top songs by the same artists
  ///
  /// [artistIds] - Comma-separated artist IDs
  /// [songId] - The song ID to exclude from results
  /// [language] - The language for results (default: 'hindi')
  Future<Map<String, dynamic>> getSongsBySameArtists({
    required String artistIds,
    required String songId,
    String language = 'hindi',
  }) async {
    final response = await request(
      call: endpoints.artists.topSongs,
      isAPIv4: true,
      queryParameters: {
        'artist_ids': artistIds,
        'song_id': songId,
        'language': language,
      },
    );

    return response;
  }

  /// Get top songs by the same actors
  ///
  /// [actorIds] - Comma-separated actor IDs
  /// [songId] - The song ID to exclude from results
  /// [language] - The language for results (default: 'hindi')
  Future<Map<String, dynamic>> getSongsBySameActors({
    required String actorIds,
    required String songId,
    String language = 'hindi',
  }) async {
    final response = await request(
      call: 'search.actorOtherTopSongs',
      isAPIv4: true,
      queryParameters: {
        'actor_ids': actorIds,
        'song_id': songId,
        'language': language,
      },
    );

    return response;
  }
}
