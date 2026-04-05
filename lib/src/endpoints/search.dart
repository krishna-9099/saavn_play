import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';

class SearchEndpoint extends BaseClient {
  SearchEndpoint([super.options]);

  Future<Map<String, dynamic>> all(String query) async {
    // api v4 doest not provide positions
    final result = await request(
      call: endpoints.search.all,
      queryParameters: {'query': query},
    );

    return result;
  }

  Future<Map<String, dynamic>> songs(
    String query, {
    int page = 0,
    int limit = 10,
  }) async {
    // api v4 does not contain media_preview_url
    final response = await request(
      call: endpoints.search.songs,
      queryParameters: {'q': query, 'p': page, 'n': limit},
    );

    return response;
  }

  Future<Map<String, dynamic>> albums(
    String query, {
    int page = 0,
    int limit = 10,
  }) async {
    // api v4 does not contain media_preview_url
    final response = await request(
      call: endpoints.search.albums,
      queryParameters: {'q': query, 'p': page, 'n': limit},
    );

    return response;
  }

  Future<Map<String, dynamic>> artists(
    String query, {
    int page = 0,
    int limit = 10,
  }) async {
    // api v4 does not contain media_preview_url
    final response = await request(
      call: endpoints.search.artists,
      queryParameters: {'q': query, 'p': page, 'n': limit},
    );

    return response;
  }

  Future<Map<String, dynamic>> playlists(
    String query, {
    int page = 0,
    int limit = 10,
  }) async {
    final response = await request(
      call: endpoints.search.playlists,
      queryParameters: {'q': query, 'p': page, 'n': limit},
    );

    return response;
  }
}
