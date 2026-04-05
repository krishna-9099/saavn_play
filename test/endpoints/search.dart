import 'package:saavn_play/src/endpoints/search.dart';
import 'package:test/test.dart';

void main() {
  final search = SearchEndpoint();

  group('Search Endpoint => ', () {
    test('All types of search', () async {
      final res = await search.all('Arijit singh');

      expect(res, isA<Map<String, dynamic>>());

      // Print total count of search results from each source
      print('\n=== All Search Results Count ===');
      print('Top Query results: ${res['topQuery']?['results']?.length ?? 0}');
      print('Songs results: ${res['songs']?['results']?.length ?? 0}');
      print('Albums results: ${res['albums']?['results']?.length ?? 0}');
      print('Artists results: ${res['artists']?['results']?.length ?? 0}');
      print('Playlists results: ${res['playlists']?['results']?.length ?? 0}');
      print(
        'Total results across all sources: ${res['topQuery']?['results']?.length ?? 0 + res['songs']?['results']?.length ?? 0 + res['albums']?['results']?.length ?? 0 + res['artists']?['results']?.length ?? 0 + res['playlists']?['results']?.length ?? 0}',
      );
    });

    test('Song search', () async {
      final res = await search.songs('Arijit singh');

      expect(res, isA<Map<String, dynamic>>());

      // Print total count of song search results
      print('\n=== Song Search Results Count ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
    });

    test('Album search', () async {
      final res = await search.albums('Scaled and Icy');

      expect(res, isA<Map<String, dynamic>>());

      // Print total count of album search results
      print('\n=== Album Search Results Count ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
    });

    test('Artist search', () async {
      final res = await search.artists('Twenty One Pilots');

      expect(res, isA<Map<String, dynamic>>());

      // Print total count of artist search results
      print('\n=== Artist Search Results Count ===');
      print('Total available: ${res['total'] ?? 0}');
      print('Results returned: ${res['results']?.length ?? 0}');
    });

    test('Playlist search', () async {
      final res = await search.playlists('Workout Hits');

      expect(res, isA<Map<String, dynamic>>());
    });
  });
}
