import 'package:saavn_play/src/endpoints/search.dart';
import 'package:saavn_play/src/models/album.dart';
import 'package:saavn_play/src/models/artist.dart';
import 'package:saavn_play/src/models/playlist.dart';
import 'package:saavn_play/src/models/search.dart';
import 'package:saavn_play/src/models/song.dart';
import 'package:test/test.dart';

void main() {
  final search = SearchEndpoint();

  group('Search Endpoint => ', () {
    test('All types of search', () async {
      final res = await search.all('Arijit singh');

      expect(res, isA<AllSearchResponse>());

      // Print total count of search results from each source
      print('\n=== All Search Results Count ===');
      print('Top Query results: ${res.topQuery.results.length}');
      print('Songs results: ${res.songs.results.length}');
      print('Albums results: ${res.albums.results.length}');
      print('Artists results: ${res.artists.results.length}');
      print('Playlists results: ${res.playlists.results.length}');
      print(
        'Total results across all sources: ${res.topQuery.results.length + res.songs.results.length + res.albums.results.length + res.artists.results.length + res.playlists.results.length}',
      );
    });

    test('Song search', () async {
      final res = await search.songs('Arijit singh');

      expect(res, isA<SongSearchResponse>());

      // Print total count of song search results
      print('\n=== Song Search Results Count ===');
      print('Total available: ${res.total}');
      print('Results returned: ${res.results.length}');
    });

    test('Album search', () async {
      final res = await search.albums('Scaled and Icy');

      expect(res, isA<AlbumSearchResponse>());

      // Print total count of album search results
      print('\n=== Album Search Results Count ===');
      print('Total available: ${res.total}');
      print('Results returned: ${res.results.length}');
    });

    test('Artist search', () async {
      final res = await search.artists('Twenty One Pilots');

      expect(res, isA<ArtistSearchResponse>());

      // Print total count of artist search results
      print('\n=== Artist Search Results Count ===');
      print('Total available: ${res.total}');
      print('Results returned: ${res.results.length}');
    });

    test('Playlist search', () async {
      final res = await search.playlists('Workout Hits');

      expect(res, isA<PlaylistSearchResponse>());
    });
  });
}
