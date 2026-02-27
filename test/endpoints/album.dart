import 'package:test/test.dart';
import 'package:saavn_play/src/endpoints/album.dart';
import 'package:saavn_play/src/models/album.dart';

void main(List<String> args) {
  final album = AlbumEndpoint();

  group('Album Endpoint => ', () {
    test('Get Album Details by Id', () async {
      final res = await album.detailsById('68566149');

      expect(res, isA<AlbumResponse>());
    });

    // test('Get Album Details by webapi token', () async {
    //   // token extracted from real URL (example from browser)
    //   const token = 'HvA1Hqgh83E_';
    //   final res = await album.detailsByToken(token);

    //   expect(res, isA<AlbumResponse>());
    //   // ensure the response id or token matches
    //   expect(res.id, isNotEmpty);
    // });
  });
}
