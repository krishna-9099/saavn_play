import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';
import 'package:saavn_play/src/models/album.dart';

class AlbumEndpoint extends BaseClient {
  AlbumEndpoint([super.options]);

  Future<AlbumResponse> detailsById(String id) async {
    // api v4 does not contain media_preview_url
    final response = await request(call: endpoints.albums.id, queryParameters: {
      'albumid': id,
    });

    final normalized = _normalizeAlbumResponse(response);
    final albumResults =
        AlbumResponse.fromAlbumRequest(AlbumRequest.fromJson(normalized));

    return albumResults;
  }

  /// Fetches album details using the generic `webapi.get` endpoint.
  ///
  /// This mirrors the browser request shown in the developer tools URL:
  ///
  /// ```
  /// https://www.jiosaavn.com/api.php?__call=webapi.get&token=HvA1Hqgh83E_&
  ///     type=album&includeMetaTags=0&ctx=web6dot0&api_version=4
  ///     &_format=json&_marker=0
  /// ```
  ///
  /// [token] is the album token/ID (the same string that appears in the
  /// album page URL). An optional [includeMetaTags] flag defaults to false.
  ///
  /// The returned structure is normalized just like [detailsById].
  Future<AlbumResponse> detailsByToken(
    String token, {
    bool includeMetaTags = false,
  }) async {
    final response = await request(
      call: endpoints.webapi.get,
      isAPIv4: true,
      queryParameters: {
        'token': token,
        'type': 'album',
        'includeMetaTags': includeMetaTags ? '1' : '0',
      },
    );

    final normalized = _normalizeAlbumResponse(response);
    return AlbumResponse.fromAlbumRequest(AlbumRequest.fromJson(normalized));
  }

  Map<String, dynamic> _normalizeAlbumResponse(Map<String, dynamic> response) {
    final normalized = Map<String, dynamic>.from(response);

    normalized['image'] = _extractImageLink(normalized['image']);

    final songs = _extractSongList(normalized);
    if (songs != null) {
      normalized['songs'] = songs.map(_normalizeSongMap).toList();
    }

    return normalized;
  }

  List<Map<String, dynamic>>? _extractSongList(Map<String, dynamic> response) {
    Object? songs = response['songs'] ??
        response['list'] ??
        response['items'] ??
        response['data'];

    if (songs is Map<String, dynamic>) {
      songs =
          songs['songs'] ?? songs['list'] ?? songs['items'] ?? songs['data'];
    }

    if (songs is List) {
      return songs.whereType<Map<String, dynamic>>().toList();
    }

    return null;
  }

  Map<String, dynamic> _normalizeSongMap(Map<String, dynamic> song) {
    final normalized = Map<String, dynamic>.from(song);

    // helper to turn literal "null"/"[]" into actual null
    String? sanitize(Object? value) {
      if (value == null) return null;
      final s = value.toString();
      if (s == 'null' || s == '[]' || s.isEmpty) return null;
      return s;
    }

    // sanitize any artist-related strings up front so later logic works correctly
    normalized['primary_artists'] = sanitize(normalized['primary_artists']);
    normalized['singers'] = sanitize(normalized['singers']);
    normalized['artist'] = sanitize(normalized['artist']);
    normalized['artists'] = sanitize(normalized['artists']);

    final title =
        normalized['song'] ?? normalized['title'] ?? normalized['name'];
    if (title != null) {
      normalized['song'] = title;
    }

    // Log what fields are available for artists
    print(
      '📀 _normalizeSongMap RAW FIELDS: song=${normalized['song']}, primary_artists="${normalized['primary_artists']}", singers="${normalized['singers']}", artist="${normalized['artist']}", artists="${normalized['artists']}"',
    );

    // Try to fill primary_artists from structured artistMap if missing
    bool hasPrimaryArtistsString() {
      final v = normalized['primary_artists'];
      return v is String && v.trim().isNotEmpty;
    }

    if (!hasPrimaryArtistsString()) {
      final artistMap = normalized['more_info']?['artistMap'] as Map? ??
          normalized['more_info']?['artist_map'] as Map?;

      final primaryFromMap = (artistMap?['primary_artists'] as List?)
          ?.whereType<Map>()
          .map((a) => a['name']?.toString().trim() ?? '')
          .where((name) => name.isNotEmpty)
          .toList();

      if (primaryFromMap != null && primaryFromMap.isNotEmpty) {
        normalized['primary_artists'] = primaryFromMap.join(', ');
        print(
          '📀 _normalizeSongMap SET primary_artists from artistMap: ${normalized['primary_artists']}',
        );
      }
    }

    if (!hasPrimaryArtistsString()) {
      var artists = normalized['singers'] ??
          normalized['artist'] ??
          normalized['artists'] ??
          normalized['more_info']?['artists'] ??
          normalized['more_info']?['singers'];
      // sanitize anything we grabbed from deeper maps
      artists = sanitize(artists);
      if (artists != null) {
        normalized['primary_artists'] = artists;
        print(
          '📀 _normalizeSongMap SET primary_artists to: $artists',
        );
      }
    }

    // Also set singers field to primary_artists if singers is missing
    if ((normalized['singers'] == null ||
            (normalized['singers'] is String &&
                (normalized['singers'] as String).isEmpty)) &&
        normalized['primary_artists'] != null) {
      normalized['singers'] = normalized['primary_artists'];
    }

    // Normalize duration to ensure it's always populated
    if (normalized['duration'] == null || normalized['duration'] == '') {
      final durationValue = normalized['more_info']?['duration'] ??
          normalized['duration_text'] ??
          normalized['length'];
      if (durationValue != null) {
        normalized['duration'] = durationValue.toString();
      }
    }

    normalized['image'] = _extractImageLink(normalized['image']);
    return normalized;
  }

  String? _extractImageLink(Object? image) {
    if (image is List) {
      for (final item in image.reversed) {
        if (item is Map<String, dynamic> && item['link'] != null) {
          return item['link'].toString();
        }
        if (item is String && item.isNotEmpty) {
          return item;
        }
      }
      return null;
    }

    return image?.toString();
  }
}
