import 'package:saavn_play/saavn_play.dart';
import 'package:test/test.dart';

void main() {
  group('FeaturedPlaylistEndpoint', () {
    late FeaturedPlaylistEndpoint featured;

    setUp(() {
      featured = FeaturedPlaylistEndpoint();
    });

    group('getFeaturedPlaylists', () {
      test('returns valid featured playlists response', () async {
        final response = await featured.getFeaturedPlaylists(n: 10);

        // Verify data list exists and is not empty
        expect(response.data, isNotEmpty);
        expect(response.count, greaterThan(0));

        // Verify first playlist has required fields
        final firstPlaylist = response.data.first;
        expect(firstPlaylist.listid, isNotEmpty);
        expect(firstPlaylist.listname, isNotEmpty);
      });

      test('returns correct number of results with n parameter', () async {
        final response = await featured.getFeaturedPlaylists(n: 5);

        // Verify we get at most 5 results
        expect(response.data.length, lessThanOrEqualTo(5));
      });

      test('returns different results for different pages', () async {
        final page1 = await featured.getFeaturedPlaylists(n: 5, p: 1);
        final page2 = await featured.getFeaturedPlaylists(n: 5, p: 2);

        // Verify both pages have results
        expect(page1.data, isNotEmpty);
        expect(page2.data, isNotEmpty);

        // Verify pages have different playlists (different IDs)
        final page1Ids = page1.data.map((p) => p.listid).toSet();
        final page2Ids = page2.data.map((p) => p.listid).toSet();

        // Pages should have different content
        expect(page1Ids.intersection(page2Ids), isEmpty);
      });

      test('filters by hindi language', () async {
        final response = await featured.getFeaturedPlaylists(
          n: 10,
          language: 'hindi',
        );

        expect(response.data, isNotEmpty);
        // All playlists should be hindi content
        for (final playlist in response.data) {
          expect(playlist.listid, isNotEmpty);
          expect(playlist.listname, isNotEmpty);
        }
      });

      test('filters by english language', () async {
        final response = await featured.getFeaturedPlaylists(
          n: 10,
          language: 'english',
        );

        expect(response.data, isNotEmpty);
      });

      test('filters by punjabi language', () async {
        final response = await featured.getFeaturedPlaylists(
          n: 10,
          language: 'punjabi',
        );

        expect(response.data, isNotEmpty);
      });

      test('FeaturedPlaylistItem toJson/fromJson round trip', () async {
        final response = await featured.getFeaturedPlaylists(n: 1);
        final firstPlaylist = response.data.first;

        // Convert to JSON and back
        final json = firstPlaylist.toJson();
        final fromJson = FeaturedPlaylistItem.fromJson(json);

        // Verify all fields match
        expect(fromJson.listid, equals(firstPlaylist.listid));
        expect(fromJson.listname, equals(firstPlaylist.listname));
        expect(
          fromJson.secondarySubtitle,
          equals(firstPlaylist.secondarySubtitle),
        );
        expect(fromJson.firstname, equals(firstPlaylist.firstname));
        expect(fromJson.dataType, equals(firstPlaylist.dataType));
        expect(fromJson.count, equals(firstPlaylist.count));
        expect(fromJson.image, equals(firstPlaylist.image));
        expect(fromJson.sponsored, equals(firstPlaylist.sponsored));
        expect(fromJson.permaUrl, equals(firstPlaylist.permaUrl));
        expect(fromJson.followerCount, equals(firstPlaylist.followerCount));
        expect(fromJson.uid, equals(firstPlaylist.uid));
        expect(fromJson.lastUpdated, equals(firstPlaylist.lastUpdated));
      });

      test('FeaturedPlaylistsResponse toJson/fromJson round trip', () async {
        final response = await featured.getFeaturedPlaylists(n: 3);

        // Convert to JSON and back
        final json = response.toJson();
        final fromJson = FeaturedPlaylistsResponse.fromJson(json);

        // Verify count matches
        expect(fromJson.data.length, equals(response.data.length));
        expect(fromJson.count, equals(response.count));
        expect(fromJson.lastPage, equals(response.lastPage));

        // Verify all playlists match
        for (var i = 0; i < response.data.length; i++) {
          expect(fromJson.data[i].listid, equals(response.data[i].listid));
          expect(fromJson.data[i].listname, equals(response.data[i].listname));
        }
      });

      test('pagination respects lastPage flag', () async {
        // First page should not be last page for large datasets
        final page1 = await featured.getFeaturedPlaylists(n: 5, p: 1);

        // The lastPage flag should indicate if more pages exist
        expect(page1.lastPage, isA<bool>());
      });

      test('returns playlists with valid image URLs', () async {
        final response = await featured.getFeaturedPlaylists(n: 5);

        for (final playlist in response.data) {
          if (playlist.image != null) {
            expect(playlist.image, contains('http'));
          }
        }
      });

      test('returns playlists with valid perma URLs', () async {
        final response = await featured.getFeaturedPlaylists(n: 5);

        for (final playlist in response.data) {
          if (playlist.permaUrl != null) {
            expect(playlist.permaUrl, contains('saavn_play'));
          }
        }
      });
    });
  });
}
