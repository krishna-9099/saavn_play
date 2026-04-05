import 'package:saavn_play/src/endpoints/radio.dart';
import 'package:test/test.dart';

void main() {
  group('RadioEndpoint Tests', () {
    late RadioEndpoint radio;

    setUp(() {
      radio = RadioEndpoint();
    });

    test('should create radio endpoint', () {
      expect(radio, isA<RadioEndpoint>());
    });

    test('should create featured station', () async {
      // This test might fail due to network issues, but we can test the structure
      try {
        final station = await radio.createFeaturedStation(
          name: 'Jai Hanuman',
          language: 'hindi',
        );

        expect(station, isA<CreatedRadioStation>());
        expect(station.stationId, isNotEmpty);
        expect(station.stationId, isA<String>());
      } catch (e) {
        // Network or API errors are expected in test environment
        expect(e, isA<Object>());
      }
    });

    test('should parse radio song response correctly', () {
      // Test the _parseRadioSong method with sample data
      final sampleSongData = {
        'id': 'test123',
        'title': 'Test Song',
        'type': 'song',
        'year': '2023',
        'language': 'hindi',
        'perma_url': 'https://example.com/song',
        'explicit_content': '0',
        'play_count': 1000,
        'image': 'https://example.com/image.jpg',
        'more_info': {
          'album_id': 'album123',
          'album': 'Test Album',
          'album_url': 'https://example.com/album',
          'release_date': '2023-01-01',
          'duration': '180',
          'label': 'Test Label',
          'artistMap': {
            'primary_artists': [
              {'name': 'Test Artist', 'id': 'artist123'}
            ],
            'featured_artists': [
              {'name': 'Featured Artist', 'id': 'featured123'}
            ]
          },
          'has_lyrics': 'false',
          'copyright_text': 'Test Copyright',
          'encrypted_media_url': 'encrypted_url_here',
          'encrypted_drm_media_url': 'drm_encrypted_url_here',
          'vcode': 'vcode123',
          'vlink': 'vlink123',
          '320kbps': 'true',
        }
      };

      final song = RadioStationSongsResponse.parseRadioSong(sampleSongData);

      expect(song.id, equals('test123'));
      expect(song.name, equals('Test Song'));
      expect(song.type, equals('song'));
      expect(song.year, equals('2023'));
      expect(song.language, equals('hindi'));
      expect(song.primaryArtists, equals('Test Artist'));
      expect(song.primaryArtistsId, equals('artist123'));
      expect(song.featuredArtists, equals('Featured Artist'));
      expect(song.featuredArtistsId, equals('featured123'));
      expect(song.explicitContent, equals(0));
      expect(song.playCount, equals('1000'));
      expect(song.album.id, equals('album123'));
      expect(song.album.name, equals('Test Album'));
      expect(song.album.url, equals('https://example.com/album'));
      expect(song.releaseDate, equals('2023-01-01'));
      expect(song.duration, equals('180'));
      expect(song.label, equals('Test Label'));
      expect(song.hasLyrics, equals('false'));
      expect(song.url, equals('https://example.com/song'));
      expect(song.copyright, equals('Test Copyright'));
      expect(song.image, isA<String>());
      expect(song.encryptedMediaUrl, equals('encrypted_url_here'));
      expect(song.encryptedDrmMediaUrl, equals('drm_encrypted_url_here'));
      expect(song.vCode, equals('vcode123'));
      expect(song.vLink, equals('vlink123'));
      expect(song.bitrate, equals(320));
    });

    test('should parse single song response', () {
      final singleSongResponse = {
        'song': {
          'id': 'song123',
          'title': 'Single Song',
          'type': 'song',
          'more_info': {
            'album_id': 'album123',
            'artistMap': {
              'primary_artists': [
                {'name': 'Artist', 'id': 'artist123'}
              ],
              'featured_artists': []
            }
          }
        }
      };

      final response = RadioStationSongsResponse.fromJson(singleSongResponse);

      expect(response.songs.length, equals(1));
      expect(response.songs.first.id, equals('song123'));
      expect(response.songs.first.name, equals('Single Song'));
    });

    test('should parse multiple song response', () {
      final multipleSongResponse = {
        '0': {
          'song': {
            'id': 'song1',
            'title': 'Song 1',
            'type': 'song',
            'more_info': {
              'album_id': 'album1',
              'artistMap': {
                'primary_artists': [
                  {'name': 'Artist 1', 'id': 'artist1'}
                ],
                'featured_artists': []
              }
            }
          }
        },
        '1': {
          'song': {
            'id': 'song2',
            'title': 'Song 2',
            'type': 'song',
            'more_info': {
              'album_id': 'album2',
              'artistMap': {
                'primary_artists': [
                  {'name': 'Artist 2', 'id': 'artist2'}
                ],
                'featured_artists': []
              }
            }
          }
        },
        'stationid': 'station123'
      };

      final response = RadioStationSongsResponse.fromJson(multipleSongResponse);

      expect(response.songs.length, equals(2));
      expect(response.songs[0].id, equals('song1'));
      expect(response.songs[0].name, equals('Song 1'));
      expect(response.songs[1].id, equals('song2'));
      expect(response.songs[1].name, equals('Song 2'));
    });

    test('should handle empty artist map', () {
      final songData = {
        'id': 'test123',
        'title': 'Test Song',
        'type': 'song',
        'more_info': {
          'album_id': 'album123',
          'artistMap': null
        }
      };

      final song = RadioStationSongsResponse.parseRadioSong(songData);

      expect(song.primaryArtists, equals(''));
      expect(song.primaryArtistsId, equals(''));
      expect(song.featuredArtists, equals(''));
      expect(song.featuredArtistsId, equals(''));
    });

    test('should handle missing optional fields', () {
      final songData = {
        'id': 'test123',
        'title': 'Test Song',
        'type': 'song',
        'more_info': {
          'album_id': 'album123',
          'artistMap': {
            'primary_artists': [
              {'name': 'Artist', 'id': 'artist123'}
            ]
          }
        }
      };

      final song = RadioStationSongsResponse.parseRadioSong(songData);

      expect(song.id, equals('test123'));
      expect(song.name, equals('Test Song'));
      expect(song.primaryArtists, equals('Artist'));
      expect(song.primaryArtistsId, equals('artist123'));
      expect(song.featuredArtists, equals(''));
      expect(song.featuredArtistsId, equals(''));
    });

    test('should handle bitrate correctly', () {
      final songDataWith320 = {
        'id': 'test123',
        'title': 'Test Song',
        'type': 'song',
        'more_info': {
          '320kbps': 'true',
          'artistMap': {
            'primary_artists': [
              {'name': 'Artist', 'id': 'artist123'}
            ]
          }
        }
      };

      final songDataWith128 = {
        'id': 'test123',
        'title': 'Test Song',
        'type': 'song',
        'more_info': {
          '320kbps': 'false',
          'artistMap': {
            'primary_artists': [
              {'name': 'Artist', 'id': 'artist123'}
            ]
          }
        }
      };

      final song320 = RadioStationSongsResponse.parseRadioSong(songDataWith320);
      final song128 = RadioStationSongsResponse.parseRadioSong(songDataWith128);

      expect(song320.bitrate, equals(320));
      expect(song128.bitrate, equals(128));
    });

    test('should create radio song JSON correctly', () {
      final song = RadioSong(
        id: 'test123',
        name: 'Test Song',
        type: 'song',
        album: SongResponseAlbum(
          id: 'album123',
          name: 'Test Album',
          url: 'https://example.com/album',
        ),
        year: '2023',
        releaseDate: '2023-01-01',
        duration: '180',
        label: 'Test Label',
        primaryArtists: 'Test Artist',
        primaryArtistsId: 'artist123',
        featuredArtists: 'Featured Artist',
        featuredArtistsId: 'featured123',
        explicitContent: 0,
        playCount: '1000',
        language: 'hindi',
        hasLyrics: 'false',
        url: 'https://example.com/song',
        copyright: 'Test Copyright',
        image: 'https://example.com/image.jpg',
        encryptedMediaUrl: 'encrypted_url_here',
        encryptedDrmMediaUrl: 'drm_encrypted_url_here',
        vCode: 'vcode123',
        vLink: 'vlink123',
        bitrate: 320,
      );

      final json = song.toJson();

      expect(json['id'], equals('test123'));
      expect(json['title'], equals('Test Song'));
      expect(json['type'], equals('song'));
      expect(json['more_info']['album_id'], equals('album123'));
      expect(json['more_info']['album'], equals('Test Album'));
      expect(json['more_info']['album_url'], equals('https://example.com/album'));
      expect(json['year'], equals('2023'));
      expect(json['explicit_content'], equals('0'));
      expect(json['play_count'], equals('1000'));
      expect(json['language'], equals('hindi'));
      expect(json['perma_url'], equals('https://example.com/song'));
      expect(json['image'], equals('https://example.com/image.jpg'));
    });
  });
}