import 'package:saavn_play/saavn_play.dart';
import 'package:test/test.dart';

void main() {
  group('RadioEndpoint', () {
    late SaavnPlayClient client;

    setUpAll(() {
      client = SaavnPlayClient();
    });

    test('getFeaturedStations returns a list of radio stations', () async {
      final response = await client.radio.getFeaturedStations();

      expect(response, isNotNull);
      expect(response.featuredStations, isA<List<RadioStation>>());
      expect(response.featuredStations.length, greaterThan(0));

      final station = response.featuredStations.first;
      expect(station.name, isNotEmpty);
      expect(station.image, isNotEmpty);
      expect(station.language, isNotEmpty);
    });

    test(
      'createFeaturedStation creates a station and returns station ID',
      () async {
        final response = await client.radio.createFeaturedStation(
          name: 'Hit Factory',
          language: 'english',
        );

        expect(response, isNotNull);
        expect(response.stationId, isNotEmpty);
        expect(response.stationId, isA<String>());
      },
    );

    test('getStationSongs returns songs from a station', () async {
      // First create a station
      final station = await client.radio.createFeaturedStation(
        name: 'Hit Factory',
        language: 'english',
      );

      // Then get songs from the station
      final response = await client.radio.getStationSongs(
        stationId: station.stationId,
        count: 3,
      );

      expect(response, isNotNull);
      expect(response.songs, isA<List<SongResponse>>());
      expect(response.songs.length, greaterThan(0));
      expect(response.songs.length, lessThanOrEqualTo(3));

      final song = response.songs.first;
      expect(song.id, isNotEmpty);
      expect(song.name, isNotNull);
      expect(song.url, isNotEmpty);
    });

    test('getFeaturedStationSongs convenience method works', () async {
      final response = await client.radio.getFeaturedStationSongs(
        name: 'Chill',
        language: 'english',
        count: 5,
      );

      expect(response, isNotNull);
      expect(response.songs, isA<List<SongResponse>>());
      expect(response.songs.length, greaterThan(0));

      for (final song in response.songs) {
        expect(song.id, isNotEmpty);
        expect(song.url, isNotEmpty);
      }
    });

    test('RadioStation model serializes correctly', () {
      final json = {
        'name': 'Test Station',
        'description': 'Test Description',
        'image': 'https://example.com/image.jpg',
        'featured_station_type': 'artist',
        'query': 'test_query',
        'color': '#FF0000',
        'language': 'english',
        'station_display_text': 'Test Display Text',
      };

      final station = RadioStation.fromJson(json);

      expect(station.name, equals('Test Station'));
      expect(station.description, equals('Test Description'));
      expect(station.image, equals('https://example.com/image.jpg'));
      expect(station.stationType, equals('artist'));
      expect(station.query, equals('test_query'));
      expect(station.color, equals('#FF0000'));
      expect(station.language, equals('english'));
      expect(station.stationDisplayText, equals('Test Display Text'));

      final toJson = station.toJson();
      expect(toJson['name'], equals('Test Station'));
      expect(toJson['featured_station_type'], equals('artist'));
    });

    test('CreatedRadioStation model serializes correctly', () {
      final json = {'stationid': 'test_station_123'};

      final station = CreatedRadioStation.fromJson(json);

      expect(station.stationId, equals('test_station_123'));

      final toJson = station.toJson();
      expect(toJson['stationid'], equals('test_station_123'));
    });
  });
}
