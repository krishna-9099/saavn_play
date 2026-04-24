import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';
import 'package:saavn_play/src/models/artist_page_details.dart';

class ArtistEndpoint extends BaseClient {
  ArtistEndpoint([super.options]);

  Future<Map<String, dynamic>> detailsById(String id) async {
    final response = await request(
      call: endpoints.artists.id,
      isAPIv4: true,
      queryParameters: {'artistId': id},
    );

    return response;
  }

  /// Get artist page details with all sections as a typed model
  Future<ArtistPageDetails> getArtistPageDetails(String artistId) async {
    final response = await request(
      call: endpoints.artists.id,
      isAPIv4: true,
      queryParameters: {'artistId': artistId},
    );

    return ArtistPageDetails.fromJson(response);
  }

  Future<Map<String, dynamic>> artistSongs(
    String artistId, {
    String? category,
    String? sort,
    required int page,
  }) async {
    // api v4 does not contain media_preview_url
    final response = await request(
      call: endpoints.artists.songs,
      queryParameters: {
        'artistId': artistId,
        'page': page,
        if (category != null) 'category': category,
        if (sort != null) 'sort_order': sort,
      },
    );

    return response;
  }

  Future<Map<String, dynamic>> artistAlbums(
    String artistId, {
    int page = 0,
    String? category,
    String? sort,
  }) async {
    // without api v4 no data is returned
    final response = await request(
      call: endpoints.artists.albums,
      isAPIv4: true,
      queryParameters: {
        'artistId': artistId,
        'page': page,
        if (category != null) 'category': category,
        if (sort != null) 'sort_order': sort,
      },
    );

    return response;
  }
}
