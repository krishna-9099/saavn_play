import 'package:saavn_play/src/endpoints/song.dart';
import 'package:saavn_play/src/endpoints/search.dart';
import 'package:saavn_play/src/models/song.dart';
import 'package:test/test.dart';

void main(List<String> args) {
  final song = SongEndpoint();

  group("Song Endpoint => ", () {
    test("Get song Details by Ids", () async {
      // Fetch each id individually to avoid batch failures
      final ids = ["5WXAlMNt", "csaEsVWV"];
      for (final id in ids) {
        final res = await song.detailsById([id]);
        print('Fetched details for $id (count: ${res.length})');
        for (final s in res) {
          print('--- Song ---');
          print('id: ${s.id}');
          print('name: ${s.name}');
          print('type: ${s.type}');
          print('album: ${s.album.name} (id: ${s.album.id})');
          print('album url: ${s.album.url}');
          print('year: ${s.year}');
          print('release_date: ${s.releaseDate}');
          print('duration: ${s.duration}');
          print('label: ${s.label}');
          print('primary_artists: ${s.primaryArtists}');
          print('featured_artists: ${s.featuredArtists}');
          print('explicit_content: ${s.explicitContent}');
          print('play_count: ${s.playCount}');
          print('language: ${s.language}');
          print('has_lyrics: ${s.hasLyrics}');
          print('url: ${s.url}');
          print('copyright: ${s.copyright}');
          if (s.image != null && s.image!.isNotEmpty) {
            print('images:');
            for (final img in s.image!) {
              print('  - ${img.quality}: ${img.link}');
            }
          }
          if (s.downloadUrl != null && s.downloadUrl!.isNotEmpty) {
            print('download links:');
            for (final d in s.downloadUrl!) {
              print('  - ${d.quality}: ${d.link}');
            }
          }
        }
        expect(res, isA<List<SongResponse>>());
        expect(res, hasLength(1));
      }
    });

    test("Get song Details by URL id", () async {
      // The perma_url contains AjBfaz1SXWE, but the API pid can differ.
      // We'll search for the title to discover the actual API id, then fetch details.
      final sendpoint = SearchEndpoint();
      final searchRes = await sendpoint.songs('saiya sewa kare', limit: 30);
      final match = searchRes.results.firstWhere(
        (r) => r.url.contains('AjBfaz1SXWE'),
        orElse: () => throw Exception('No matching perma_url found'),
      );
      print('Found song id: ${match.id} - ${match.name}');

      final res = await song.detailsById([match.id]);
      // Print full details for the requested song
      for (final s in res) {
        print('--- Song ---');
        print('id: ${s.id}');
        print('name: ${s.name}');
        print('type: ${s.type}');
        print('album: ${s.album.name} (id: ${s.album.id})');
        print('album url: ${s.album.url}');
        print('year: ${s.year}');
        print('release_date: ${s.releaseDate}');
        print('duration: ${s.duration}');
        print('label: ${s.label}');
        print('primary_artists: ${s.primaryArtists}');
        print('featured_artists: ${s.featuredArtists}');
        print('explicit_content: ${s.explicitContent}');
        print('play_count: ${s.playCount}');
        print('language: ${s.language}');
        print('has_lyrics: ${s.hasLyrics}');
        print('url: ${s.url}');
        print('copyright: ${s.copyright}');
        if (s.image != null && s.image!.isNotEmpty) {
          print('images:');
          for (final img in s.image!) {
            print('  - ${img.quality}: ${img.link}');
          }
        }
        if (s.downloadUrl != null && s.downloadUrl!.isNotEmpty) {
          print('download links:');
          for (final d in s.downloadUrl!) {
            print('  - ${d.quality}: ${d.link}');
          }
        }
      }
      expect(res, isA<List<SongResponse>>());
      expect(res, hasLength(1));
    });
  });
}
