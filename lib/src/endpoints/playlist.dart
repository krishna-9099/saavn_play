import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';

class PlaylistEndpoint extends BaseClient {
  PlaylistEndpoint([super.options]);

  Future<Map<String, dynamic>> detailsById(String id) async {
    final response = await request(
      call: endpoints.playlists.id,
      queryParameters: {'listid': id},
    );

    return response;
  }
}
