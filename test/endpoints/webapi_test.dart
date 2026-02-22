import 'package:saavn_play/saavn_play.dart';
import 'package:test/test.dart';

void main() {
  group('WebapiEndpoint', () {
    late WebapiEndpoint webapi;

    setUp(() {
      webapi = WebapiEndpoint();
    });

    group('getShow', () {
      test('returns valid show response for known show token', () async {
        // Using a known podcast show token
        final response = await webapi.getShow(token: 'q3nfP8Sr8ZM_');

        // Verify show details exist
        expect(response.showDetails, isNotNull);
        expect(response.showDetails!.id, isNotEmpty);
        expect(response.showDetails!.title, isNotEmpty);
        expect(response.showDetails!.type, equals('show'));

        // Verify seasons exist
        expect(response.seasons, isNotEmpty);

        // Verify episodes exist
        expect(response.episodes, isNotEmpty);
      });

      test('ShowDetails toJson/fromJson round trip', () async {
        final response = await webapi.getShow(token: 'q3nfP8Sr8ZM_');
        final showDetails = response.showDetails!;

        // Convert to JSON and back
        final json = showDetails.toJson();
        final fromJson = ShowDetails.fromJson(json);

        // Verify all fields match
        expect(fromJson.id, equals(showDetails.id));
        expect(fromJson.title, equals(showDetails.title));
        expect(fromJson.subtitle, equals(showDetails.subtitle));
        expect(fromJson.type, equals(showDetails.type));
        expect(fromJson.permaUrl, equals(showDetails.permaUrl));
        expect(fromJson.language, equals(showDetails.language));
      });

      test('Season toJson/fromJson round trip', () async {
        final response = await webapi.getShow(token: 'q3nfP8Sr8ZM_');
        final season = response.seasons!.first;

        // Convert to JSON and back
        final json = season.toJson();
        final fromJson = Season.fromJson(json);

        // Verify all fields match
        expect(fromJson.id, equals(season.id));
        expect(fromJson.title, equals(season.title));
        expect(fromJson.type, equals(season.type));
      });

      test('Episode toJson/fromJson round trip', () async {
        final response = await webapi.getShow(token: 'q3nfP8Sr8ZM_');
        final episode = response.episodes!.first;

        // Convert to JSON and back
        final json = episode.toJson();
        final fromJson = Episode.fromJson(json);

        // Verify all fields match
        expect(fromJson.id, equals(episode.id));
        expect(fromJson.title, equals(episode.title));
        expect(fromJson.type, equals(episode.type));
      });

      test('ShowResponse toJson/fromJson round trip', () async {
        final response = await webapi.getShow(token: 'q3nfP8Sr8ZM_');

        // Convert to JSON and back
        final json = response.toJson();
        final fromJson = ShowResponse.fromJson(json);

        // Verify show details match
        expect(fromJson.showDetails!.id, equals(response.showDetails!.id));
        expect(fromJson.seasons!.length, equals(response.seasons!.length));
        expect(fromJson.episodes!.length, equals(response.episodes!.length));
      });
    });

    group('getFooterDetails', () {
      test('returns valid footer details for hindi language', () async {
        final response = await webapi.getFooterDetails(language: 'hindi');

        // Verify playlists exist
        expect(response.playlists, isNotEmpty);
        expect(response.playlists.first.id, isNotEmpty);
        expect(response.playlists.first.title, isNotEmpty);

        // Verify artists exist
        expect(response.artists, isNotEmpty);
        expect(response.artists.first.id, isNotEmpty);
        expect(response.artists.first.title, isNotEmpty);

        // Verify albums exist
        expect(response.albums, isNotEmpty);

        // Verify actors exist
        expect(response.actors, isNotEmpty);
      });

      test('returns valid footer details for english language', () async {
        final response = await webapi.getFooterDetails(language: 'english');

        // Verify at least some lists have content (english may have fewer items)
        expect(
          response.playlists.isNotEmpty ||
              response.artists.isNotEmpty ||
              response.albums.isNotEmpty ||
              response.actors.isNotEmpty,
          isTrue,
        );
      });

      test('FooterDetails toJson/fromJson round trip', () async {
        final response = await webapi.getFooterDetails(language: 'hindi');

        // Convert to JSON and back
        final json = response.toJson();
        final fromJson = FooterDetails.fromJson(json);

        // Verify counts match
        expect(fromJson.playlists.length, equals(response.playlists.length));
        expect(fromJson.artists.length, equals(response.artists.length));
        expect(fromJson.albums.length, equals(response.albums.length));
        expect(fromJson.actors.length, equals(response.actors.length));
      });

      test('FooterPlaylistItem toJson/fromJson round trip', () async {
        final response = await webapi.getFooterDetails(language: 'hindi');
        final item = response.playlists.first;

        // Convert to JSON and back
        final json = item.toJson();
        final fromJson = FooterPlaylistItem.fromJson(json);

        expect(fromJson.id, equals(item.id));
        expect(fromJson.title, equals(item.title));
        expect(fromJson.action, equals(item.action));
      });

      test('FooterArtistItem toJson/fromJson round trip', () async {
        final response = await webapi.getFooterDetails(language: 'hindi');
        final item = response.artists.first;

        // Convert to JSON and back
        final json = item.toJson();
        final fromJson = FooterArtistItem.fromJson(json);

        expect(fromJson.id, equals(item.id));
        expect(fromJson.title, equals(item.title));
        expect(fromJson.action, equals(item.action));
      });
    });

    group('getBrowseHoverDetails', () {
      test('returns valid browse hover details for hindi language', () async {
        final response = await webapi.getBrowseHoverDetails(language: 'hindi');

        // Verify top artists exist
        expect(response.topArtists, isNotEmpty);
        expect(response.topArtists.first.title, isNotEmpty);
        expect(response.topArtists.first.permaUrl, isNotEmpty);

        // Verify top playlists exist
        expect(response.topPlaylists, isNotEmpty);

        // Verify new releases exist
        expect(response.newReleases, isNotEmpty);
      });

      test('returns valid browse hover details for english language', () async {
        final response = await webapi.getBrowseHoverDetails(
          language: 'english',
        );

        // Verify all lists exist
        expect(response.topArtists, isNotEmpty);
        expect(response.topPlaylists, isNotEmpty);
        expect(response.newReleases, isNotEmpty);
      });

      test('BrowseHoverDetails toJson/fromJson round trip', () async {
        final response = await webapi.getBrowseHoverDetails(language: 'hindi');

        // Convert to JSON and back
        final json = response.toJson();
        final fromJson = BrowseHoverDetails.fromJson(json);

        // Verify counts match
        expect(fromJson.topArtists.length, equals(response.topArtists.length));
        expect(
          fromJson.topPlaylists.length,
          equals(response.topPlaylists.length),
        );
        expect(
          fromJson.newReleases.length,
          equals(response.newReleases.length),
        );
      });

      test('MegaMenuItem toJson/fromJson round trip', () async {
        final response = await webapi.getBrowseHoverDetails(language: 'hindi');
        final item = response.topArtists.first;

        // Convert to JSON and back
        final json = item.toJson();
        final fromJson = MegaMenuItem.fromJson(json);

        expect(fromJson.title, equals(item.title));
        expect(fromJson.permaUrl, equals(item.permaUrl));
      });
    });

    group('get', () {
      test('returns valid response for album type', () async {
        // Using a known album token
        final response = await webapi.get(token: 'OYy6wO7P', type: 'album');

        expect(response, isNotEmpty);
        expect(response['id'], isNotNull);
      });

      test('returns valid response for playlist type', () async {
        // Using a known playlist token
        final response = await webapi.get(token: '88063483', type: 'playlist');

        expect(response, isNotEmpty);
      });
    });
  });
}
