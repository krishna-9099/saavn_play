import 'package:saavn_play/saavn_play.dart';
import 'package:saavn_play/src/saavn_play.dart';
import 'package:test/test.dart';

void main() {
  group('PodcastEndpoint', () {
    late saavn_playClient client;

    setUp(() {
      client = saavn_playClient();
    });

    test('getTopShows returns valid podcast shows response', () async {
      final response = await client.podcasts.getTopShows();

      // Verify shows list exists and is not empty
      expect(response.shows, isNotEmpty);

      // Verify first show has required fields
      final firstShow = response.shows.first;
      expect(firstShow.id, isNotEmpty);
      expect(firstShow.title, isNotEmpty);
      expect(firstShow.type, equals('show'));
      expect(firstShow.image, isNotEmpty);
      expect(firstShow.permaUrl, isNotEmpty);
      expect(firstShow.seasonNumber, isNotEmpty);
      expect(firstShow.releaseDate, isNotEmpty);
      expect(firstShow.squareImage, isNotEmpty);
    });

    test('getTopShows with pagination returns correct number of results',
        () async {
      final response = await client.podcasts.getTopShows(n: 10, page: 1);

      // Verify we get at most 10 results
      expect(response.shows.length, lessThanOrEqualTo(10));

      // Verify all shows have required fields
      for (final show in response.shows) {
        expect(show.id, isNotEmpty);
        expect(show.title, isNotEmpty);
        expect(show.type, equals('show'));
      }
    });

    test('getTopShows page 2 returns different results', () async {
      final page1 = await client.podcasts.getTopShows(n: 5, page: 1);
      final page2 = await client.podcasts.getTopShows(n: 5, page: 2);

      // Verify both pages have results
      expect(page1.shows, isNotEmpty);
      expect(page2.shows, isNotEmpty);

      // Verify pages have different shows (different IDs)
      final page1Ids = page1.shows.map((s) => s.id).toSet();
      final page2Ids = page2.shows.map((s) => s.id).toSet();

      // Pages should have different content
      expect(page1Ids.intersection(page2Ids), isEmpty);
    });

    test('PodcastShow toJson/fromJson round trip', () async {
      final response = await client.podcasts.getTopShows(n: 1);
      final firstShow = response.shows.first;

      // Convert to JSON and back
      final json = firstShow.toJson();
      final fromJson = PodcastShow.fromJson(json);

      // Verify all fields match
      expect(fromJson.id, equals(firstShow.id));
      expect(fromJson.title, equals(firstShow.title));
      expect(fromJson.subtitle, equals(firstShow.subtitle));
      expect(fromJson.type, equals(firstShow.type));
      expect(fromJson.image, equals(firstShow.image));
      expect(fromJson.permaUrl, equals(firstShow.permaUrl));
      expect(fromJson.seasonNumber, equals(firstShow.seasonNumber));
      expect(fromJson.releaseDate, equals(firstShow.releaseDate));
      expect(fromJson.badge, equals(firstShow.badge));
      expect(fromJson.squareImage, equals(firstShow.squareImage));
      expect(fromJson.explicitContent, equals(firstShow.explicitContent));
      expect(fromJson.miniObj, equals(firstShow.miniObj));
    });

    test('PodcastShowsResponse toJson/fromJson round trip', () async {
      final response = await client.podcasts.getTopShows(n: 3);

      // Convert to JSON and back
      final json = response.toJson();
      final fromJson = PodcastShowsResponse.fromJson(json);

      // Verify shows count matches
      expect(fromJson.shows.length, equals(response.shows.length));

      // Verify all shows match
      for (var i = 0; i < response.shows.length; i++) {
        expect(fromJson.shows[i].id, equals(response.shows[i].id));
        expect(fromJson.shows[i].title, equals(response.shows[i].title));
      }
    });
  });
}
