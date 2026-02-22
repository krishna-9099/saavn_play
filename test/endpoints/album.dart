import 'package:test/test.dart';
import 'package:saavn_play/src/endpoints/album.dart';
import 'package:saavn_play/src/models/album.dart';

void main(List<String> args) {
  final album = AlbumEndpoint();

  group('Album Endpoint => ', () {
    test('Get Album Details by Id', () async {
      final res = await album.detailsById('1142502');

      expect(res, isA<AlbumResponse>());
    });
  });
}
