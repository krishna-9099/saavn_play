import 'package:saavn_play/src/models/playlist_item.dart';
import 'package:test/test.dart';

/// Comprehensive unit test suite for PlaylistItem model validation.
/// Tests validate data structure, property constraints, and content accuracy.
void main() {
  group('PlaylistItem Model Tests', () {
    // Test playlist data based on actual API response structure
    final playlistJson = {
      'id': '802336660',
      'title': 'Arijit Singh - Sad Songs - Hindi',
      'subtitle': '25 Songs',
      'type': 'playlist',
      'image': 'https://c.saavncdn.com/editorial/ArijitSinghSadSongsHindi_20240226083401_150x150.jpg',
      'perma_url': 'https://www.jiosaavn.com/featured/arijit-singh-sad-songs-hindi/8RkefqkCO1huOxiEGmm6lQ__',
      'explicit_content': '0',
      'mini_obj': true,
      'numsongs': null,
      'more_info': {
        'uid': 'phulki_user',
        'firstname': 'Saavn',
        'artist_name': ['Arijit Singh'],
        'entity_type': 'playlist',
        'entity_sub_type': '',
        'video_available': false,
        'is_dolby_content': null,
        'sub_types': null,
        'images': null,
        'lastname': 'Editor',
        'song_count': '25',
        'language': 'hindi'
      }
    };

    group('Data Structure Validation', () {
      test('should have all required properties', () {
        expect(playlistJson, containsPair('id', isA<String>()));
        expect(playlistJson, containsPair('title', isA<String>()));
        expect(playlistJson, containsPair('subtitle', isA<String>()));
        expect(playlistJson, containsPair('type', isA<String>()));
        expect(playlistJson, containsPair('image', isA<String>()));
        expect(playlistJson, containsPair('perma_url', isA<String>()));
        expect(playlistJson, containsPair('explicit_content', isA<String>()));
        expect(playlistJson, containsPair('mini_obj', isA<bool>()));
      });

      test('should contain expected keys', () {
        final expectedKeys = ['id', 'title', 'subtitle', 'type', 'image', 'perma_url', 'explicit_content', 'mini_obj', 'numsongs', 'more_info'];
        expect(playlistJson.keys, containsAll(expectedKeys));
      });

      test('should not contain null values for required fields', () {
        expect(playlistJson['id'], isNotNull);
        expect(playlistJson['title'], isNotNull);
        expect(playlistJson['subtitle'], isNotNull);
        expect(playlistJson['type'], isNotNull);
        expect(playlistJson['image'], isNotNull);
        expect(playlistJson['perma_url'], isNotNull);
        expect(playlistJson['explicit_content'], isNotNull);
        expect(playlistJson['mini_obj'], isNotNull);
      });
    });

    group('ID Validation', () {
      test('should be a non-empty string', () {
        final id = playlistJson['id'] as String;
        expect(id, isNotEmpty);
      });

      test('should match expected value', () {
        expect(playlistJson['id'], equals('802336660'));
      });

      test('should contain only numeric characters', () {
        final id = playlistJson['id'] as String;
        expect(
          RegExp(r'^\d+$').hasMatch(id),
          isTrue,
          reason: 'ID should contain only digits',
        );
      });

      test('should have valid length (greater than 0)', () {
        final id = playlistJson['id'] as String;
        expect(id.length, greaterThan(0));
      });
    });

    group('Title Validation', () {
      test('should be a non-empty string', () {
        final title = playlistJson['title'] as String;
        expect(title, isNotEmpty);
      });

      test('should match expected value', () {
        expect(playlistJson['title'], equals('Arijit Singh - Sad Songs - Hindi'));
      });

      test('should have valid length (between 1 and 200 characters)', () {
        final title = playlistJson['title'] as String;
        expect(title.length, greaterThanOrEqualTo(1));
        expect(title.length, lessThanOrEqualTo(200));
      });

      test('should not start or end with whitespace', () {
        final title = playlistJson['title'] as String;
        expect(title, equals(title.trim()));
      });
    });

    group('Type Property Validation', () {
      test('should be correct type value', () {
        expect(playlistJson['type'], equals('playlist'));
      });

      test('should be a string', () {
        expect(playlistJson['type'], isA<String>());
      });

      test('should be non-empty', () {
        final type = playlistJson['type'] as String;
        expect(type, isNotEmpty);
      });

      test('should be lowercase', () {
        final type = playlistJson['type'] as String;
        expect(type, equals(type.toLowerCase()));
      });
    });

    group('Subtitle Content Validation', () {
      test('should accurately reflect content description', () {
        final subtitle = playlistJson['subtitle'] as String;
        // Subtitle should contain song count information
        expect(subtitle, contains('Songs'));
      });

      test('should match expected value', () {
        expect(playlistJson['subtitle'], equals('25 Songs'));
      });

      test('should contain numeric song count', () {
        final subtitle = playlistJson['subtitle'] as String;
        // Extract number from subtitle
        final numberMatch = RegExp(r'(\d+)').firstMatch(subtitle);
        expect(
          numberMatch,
          isNotNull,
          reason: 'Subtitle should contain a number',
        );

        final songCount = int.parse(numberMatch!.group(1)!);
        expect(songCount, greaterThan(0));
        expect(songCount, equals(25));
      });

      test('should follow format "X Songs"', () {
        final subtitle = playlistJson['subtitle'] as String;
        expect(
          RegExp(r'^\d+\s+Songs$').hasMatch(subtitle),
          isTrue,
          reason: 'Subtitle should follow format "X Songs"',
        );
      });

      test('should be non-empty', () {
        final subtitle = playlistJson['subtitle'] as String;
        expect(subtitle, isNotEmpty);
      });
    });

    group('Image and URL Validation', () {
      test('should have valid image URL', () {
        final image = playlistJson['image'] as String;
        expect(image, contains('https://'));
        expect(image, contains('.jpg'));
      });

      test('should have valid permanent URL', () {
        final permaUrl = playlistJson['perma_url'] as String;
        expect(permaUrl, contains('https://'));
        expect(permaUrl, contains('jiosaavn.com'));
      });

      test('should have non-empty image and URL', () {
        final image = playlistJson['image'] as String;
        final permaUrl = playlistJson['perma_url'] as String;
        expect(image, isNotEmpty);
        expect(permaUrl, isNotEmpty);
      });
    });

    group('Explicit Content and Mini Object Validation', () {
      test('should have valid explicit content value', () {
        final explicitContent = playlistJson['explicit_content'] as String;
        expect(explicitContent, isNotEmpty);
        expect(['0', '1', '2'], contains(explicitContent));
      });

      test('should have valid mini_obj boolean value', () {
        final miniObj = playlistJson['mini_obj'] as bool;
        expect(miniObj, isA<bool>());
      });

      test('should have numsongs as nullable', () {
        final numsongs = playlistJson['numsongs'];
        expect(numsongs, isNull);
      });
    });

    group('More Info Validation', () {
      test('should have more_info as map', () {
        final moreInfo = playlistJson['more_info'];
        expect(moreInfo, isA<Map>());
        expect((moreInfo as Map).keys, contains('uid'));
        expect((moreInfo).keys, contains('firstname'));
        expect((moreInfo).keys, contains('artist_name'));
      });

      test('should have valid artist_name array', () {
        final moreInfo = playlistJson['more_info'] as Map;
        final artistName = moreInfo['artist_name'];
        expect(artistName, isA<List>());
        expect((artistName as List).length, greaterThan(0));
        expect(artistName.first, equals('Arijit Singh'));
      });

      test('should have valid song_count', () {
        final moreInfo = playlistJson['more_info'] as Map;
        final songCount = moreInfo['song_count'];
        expect(songCount, equals('25'));
      });
    });

    group('PlaylistItem Model Integration', () {
      test('should create PlaylistItem from JSON', () {
        final playlist = PlaylistItem.fromJson(playlistJson);

        expect(playlist.id, equals('802336660'));
        expect(playlist.title, equals('Arijit Singh - Sad Songs - Hindi'));
        expect(playlist.subtitle, equals('25 Songs'));
        expect(playlist.type, equals('playlist'));
        expect(playlist.image, equals('https://c.saavncdn.com/editorial/ArijitSinghSadSongsHindi_20240226083401_150x150.jpg'));
        expect(playlist.permaUrl, equals('https://www.jiosaavn.com/featured/arijit-singh-sad-songs-hindi/8RkefqkCO1huOxiEGmm6lQ__'));
        expect(playlist.explicitContent, equals('0'));
        expect(playlist.miniObj, isTrue);
        expect(playlist.numsongs, isNull);
        expect(playlist.moreInfo, isA<Map>());
      });

      test('should serialize PlaylistItem to JSON', () {
        final playlist = PlaylistItem.fromJson(playlistJson);
        final json = playlist.toJson();

        expect(json['id'], equals('802336660'));
        expect(json['title'], equals('Arijit Singh - Sad Songs - Hindi'));
        expect(json['subtitle'], equals('25 Songs'));
        expect(json['type'], equals('playlist'));
        expect(json['image'], equals('https://c.saavncdn.com/editorial/ArijitSinghSadSongsHindi_20240226083401_150x150.jpg'));
        expect(json['perma_url'], equals('https://www.jiosaavn.com/featured/arijit-singh-sad-songs-hindi/8RkefqkCO1huOxiEGmm6lQ__'));
        expect(json['explicit_content'], equals('0'));
        expect(json['mini_obj'], isTrue);
      });
    });

    group('Edge Cases and Error Handling', () {
      test('should handle empty id gracefully', () {
        final emptyIdJson = {
          'id': '',
          'title': 'Test Playlist',
          'subtitle': '10 Songs',
          'type': 'playlist',
          'image': 'https://example.com/image.jpg',
          'perma_url': 'https://example.com/playlist',
          'explicit_content': '0',
          'mini_obj': true,
          'numsongs': null,
          'more_info': <String, dynamic>{}
        };

        final playlist = PlaylistItem.fromJson(emptyIdJson);
        expect(playlist.id, isEmpty);
      });

      test('should handle null optional fields', () {
        final minimalJson = {
          'id': '123',
          'title': 'Test',
          'subtitle': '5 Songs',
          'type': 'playlist',
          'image': 'https://example.com/image.jpg',
          'perma_url': 'https://example.com/playlist',
          'explicit_content': '0',
          'mini_obj': true,
          'numsongs': null,
          'more_info': null
        };

        final playlist = PlaylistItem.fromJson(minimalJson);
        expect(playlist.id, isNotNull);
        expect(playlist.title, isNotNull);
        expect(playlist.type, isNotNull);
        expect(playlist.moreInfo, isNull);
      });
    });

    group('Data Integrity Tests', () {
      test('should maintain data consistency after serialization cycle', () {
        final original = PlaylistItem.fromJson(playlistJson);
        final serialized = original.toJson();
        final deserialized = PlaylistItem.fromJson(serialized);

        expect(deserialized.id, equals(original.id));
        expect(deserialized.title, equals(original.title));
        expect(deserialized.type, equals(original.type));
        expect(deserialized.subtitle, equals(original.subtitle));
      });

      test('should validate immutable data constraints', () {
        // Verify that the test data meets all constraints
        final id = playlistJson['id'] as String;
        final title = playlistJson['title'] as String;
        final type = playlistJson['type'] as String;
        final subtitle = playlistJson['subtitle'] as String;
        final image = playlistJson['image'] as String;
        final permaUrl = playlistJson['perma_url'] as String;

        // All required fields should be non-empty
        expect(id.isNotEmpty && title.isNotEmpty && type.isNotEmpty && subtitle.isNotEmpty && image.isNotEmpty && permaUrl.isNotEmpty, isTrue);

        // Subtitle should describe content
        expect(subtitle.contains('Songs'), isTrue);

        // URLs should be valid
        expect(image.contains('https://'), isTrue);
        expect(permaUrl.contains('jiosaavn.com'), isTrue);
      });
    });
  });
}
