import 'package:saavn_play/src/endpoints/artist.dart';
import 'package:test/test.dart';

void main(List<String> args) {
  final artist = ArtistEndpoint();
  const artistId = '568707';
  group('Artist Endpoint => ', () {
    test('Get Artist Details by ID', () async {
      final res = await artist.detailsById(artistId);

      expect(res, isA<Map<String, dynamic>>());
      expect(res['id'], isNotEmpty);
    });

    test('Get Artist songs', () async {
      final res = await artist.artistSongs(artistId, page: 0);

      expect(res, isA<Map<String, dynamic>>());
      expect(res['songs'], isA<List>());
    });

    test('Get Artist albums', () async {
      final res = await artist.artistAlbums(artistId, page: 0);

      expect(res, isA<Map<String, dynamic>>());
      expect(res['albums'], isA<List>());
    });
  });
}
