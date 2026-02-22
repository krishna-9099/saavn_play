import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';
import 'package:saavn_play/src/models/playlist.dart';

class PlaylistEndpoint extends BaseClient {
  PlaylistEndpoint([super.options]);

  Future<PlaylistResponse> detailsById(String id) async {
    final response = await request(
      call: endpoints.playlists.id,
      queryParameters: {'listid': id},
    );

    final playlistResponse = PlaylistResponse.fromJson(response);

    return playlistResponse;
  }
}
