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
}
