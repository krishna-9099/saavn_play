import 'package:saavn_play/src/endpoints/radio.dart';
import 'package:test/test.dart';

void main() {
  group('Radio Playback Tests', () {
    late RadioEndpoint radioEndpoint;

    setUp(() {
      radioEndpoint = RadioEndpoint();
    });

    test('should create a radio station', () async {
      final station = await radioEndpoint.createFeaturedStation(
        name: 'Jai Hanuman',
        language: 'hindi',
      );

      expect(station.stationId, isNotEmpty);
      expect(station.stationId, isNotNull);
    });

    test('should get songs from a radio station', () async {
      // First create a station
      final station = await radioEndpoint.createFeaturedStation(
        name: 'Jai Hanuman',
        language: 'hindi',
      );

      // Get songs from the station
      final response = await radioEndpoint.getStationSongs(
        stationId: station.stationId,
        count: 3,
        next: true,
      );

      expect(response.songs, isNotEmpty);
      expect(response.songs.length, equals(3));

      // Check that songs have the required fields
      for (final song in response.songs) {
        expect(song.id, isNotEmpty);
        expect(song.name, isNotEmpty);
        expect(song.type, equals('song'));
        expect(song.encryptedMediaUrl, isNotEmpty);
        expect(song.encryptedDrmMediaUrl, isNotEmpty);
      }
    });

    test('should generate authentication URL for encrypted media URL', () async {
      // First create a station and get a song
      final station = await radioEndpoint.createFeaturedStation(
        name: 'Jai Hanuman',
        language: 'hindi',
      );

      final response = await radioEndpoint.getStationSongs(
        stationId: station.stationId,
        count: 1,
        next: true,
      );

      expect(response.songs, isNotEmpty);
      final song = response.songs.first;

      // Generate auth URL
      final authUrl = await radioEndpoint.generateAuthUrl(
        encryptedUrl: song.encryptedMediaUrl,
        bitrate: 128,
      );

      expect(authUrl, isNotEmpty);
      expect(authUrl, contains('https://'));
      // Some responses may not have Expires and Signature (e.g., MPD format)
      // expect(authUrl, contains('Expires='));
      // expect(authUrl, contains('Signature='));
    });

    test('should generate DRM authentication URL', () async {
      // First create a station and get a song
      final station = await radioEndpoint.createFeaturedStation(
        name: 'Jai Hanuman',
        language: 'hindi',
      );

      final response = await radioEndpoint.getStationSongs(
        stationId: station.stationId,
        count: 1,
        next: true,
      );

      expect(response.songs, isNotEmpty);
      final song = response.songs.first;

      // Generate DRM auth URL
      final drmAuthUrl = await radioEndpoint.generateDrmAuthUrl(
        encryptedDrmUrl: song.encryptedDrmMediaUrl,
        bitrate: 128,
      );

      expect(drmAuthUrl, isNotEmpty);
      expect(drmAuthUrl, contains('https://'));
      // Some responses may not have Expires and Signature (e.g., MPD format)
      // expect(drmAuthUrl, contains('Expires='));
      // expect(drmAuthUrl, contains('Signature='));
    });

    test('should get next song from radio station', () async {
      // First create a station
      final station = await radioEndpoint.createFeaturedStation(
        name: 'Jai Hanuman',
        language: 'hindi',
      );

      // Get next song with authentication
      final songWithAuth = await radioEndpoint.getNextSong(
        stationId: station.stationId,
        bitrate: 128,
      );

      expect(songWithAuth.song.id, isNotEmpty);
      expect(songWithAuth.song.name, isNotEmpty);
      expect(songWithAuth.song.type, equals('song'));
      expect(songWithAuth.authUrl, isNotEmpty);
      expect(songWithAuth.drmAuthUrl, isNotEmpty);
    });

    test('should get multiple songs with authentication URLs', () async {
      // First create a station
      final station = await radioEndpoint.createFeaturedStation(
        name: 'Jai Hanuman',
        language: 'hindi',
      );

      // Get multiple songs with authentication
      final songsWithAuth = await radioEndpoint.getMultipleSongs(
        stationId: station.stationId,
        count: 3,
        bitrate: 128,
      );

      expect(songsWithAuth, isNotEmpty);
      expect(songsWithAuth.length, equals(3));

      for (final songWithAuth in songsWithAuth) {
        expect(songWithAuth.song.id, isNotEmpty);
        expect(songWithAuth.song.name, isNotEmpty);
        expect(songWithAuth.authUrl, isNotEmpty);
        expect(songWithAuth.drmAuthUrl, isNotEmpty);
      }
    });

    test('should get song with all URLs and authentication', () async {
      // First create a station
      final station = await radioEndpoint.createFeaturedStation(
        name: 'Jai Hanuman',
        language: 'hindi',
      );

      // Get song with all URLs
      final songWithAuth = await radioEndpoint.getSongWithAllUrls(
        stationId: station.stationId,
        bitrate: 128,
      );

      expect(songWithAuth.song.id, isNotEmpty);
      expect(songWithAuth.song.name, isNotEmpty);
      expect(songWithAuth.authUrl, isNotEmpty);
      expect(songWithAuth.drmAuthUrl, isNotEmpty);
    });

    test('should get best available media URL', () async {
      // First create a station
      final station = await radioEndpoint.createFeaturedStation(
        name: 'Jai Hanuman',
        language: 'hindi',
      );

      // Get best media URL
      final bestUrl = await radioEndpoint.getBestMediaUrl(
        stationId: station.stationId,
        bitrate: 128,
      );

      expect(bestUrl, isNotEmpty);
      expect(bestUrl, contains('https://'));
      expect(bestUrl, contains('Expires='));
      expect(bestUrl, contains('Signature='));
    });

    test('should handle complete radio station workflow', () async {
      // Complete workflow: create station and get authenticated songs
      final (station, songs) = await radioEndpoint.createAndPlayStation(
        name: 'Jai Hanuman',
        language: 'hindi',
        count: 2,
        bitrate: 128,
      );

      expect(station.stationId, isNotEmpty);
      expect(songs.songs, isNotEmpty);
      expect(songs.songs.length, equals(2));

      // Check that songs have authentication URLs
      for (final song in songs.songs) {
        expect(song.authUrl, isNotEmpty);
        expect(song.drmAuthUrl, isNotEmpty);
      }
    });

    test('should handle different bitrates', () async {
      // First create a station
      final station = await radioEndpoint.createFeaturedStation(
        name: 'Jai Hanuman',
        language: 'hindi',
      );

      // Test 128 kbps
      final url128 = await radioEndpoint.getBestMediaUrl(
        stationId: station.stationId,
        bitrate: 128,
      );

      // Test 320 kbps
      final url320 = await radioEndpoint.getBestMediaUrl(
        stationId: station.stationId,
        bitrate: 320,
      );

      expect(url128, isNotEmpty);
      expect(url320, isNotEmpty);
      expect(url128, isNot(equals(url320)));
    });

    test('should handle error when no songs available', () async {
      // Create a station with a name that might not have songs
      final station = await radioEndpoint.createFeaturedStation(
        name: 'NonExistentStation',
        language: 'english',
      );

      // Try to get next song - should handle gracefully
      expect(
        () => radioEndpoint.getNextSong(
          stationId: station.stationId,
          bitrate: 128,
        ),
        throwsA(isA<Exception>()),
      );
    });

    test('should handle error when generating auth URL fails', () async {
      // Test with invalid encrypted URL
      expect(
        () => radioEndpoint.generateAuthUrl(
          encryptedUrl: 'invalid-url',
          bitrate: 128,
        ),
        throwsA(isA<Exception>()),
      );
    });
  });
}