import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';

class ArtistEndpoint extends BaseClient {
  ArtistEndpoint([super.options]);

  Future<Map<String, dynamic>> detailsById(String id) async {
    final response = await request(
      call: endpoints.artists.id,
      isAPIv4: true,
      queryParameters: {
        'artistId': id,
      },
    );

    return response;
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
        });

    return response;
  }
}
