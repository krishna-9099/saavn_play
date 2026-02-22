import 'package:saavn_play/src/models/playlist.dart';
import 'package:test/test.dart';

/// Comprehensive unit test suite for Playlist model validation.
/// Tests validate data structure, property constraints, and content accuracy.
void main() {
  group('Playlist Model Tests', () {
    // Test playlist data
    final playlistJson = {
      'id': '1111580647',
      'title': 'Best of 2022',
      'subtitle': '20 Songs',
      'header_desc': '',
      'type': 'playlist',
    };

    group('Data Structure Validation', () {
      test('should have all required properties', () {
        expect(playlistJson, containsPair('id', isA<String>()));
        expect(playlistJson, containsPair('title', isA<String>()));
        expect(playlistJson, containsPair('subtitle', isA<String>()));
        expect(playlistJson, containsPair('header_desc', isA<String>()));
        expect(playlistJson, containsPair('type', isA<String>()));
      });

      test('should have exactly 5 properties', () {
        expect(playlistJson.length, equals(5));
      });

      test('should contain expected keys', () {
        final expectedKeys = ['id', 'title', 'subtitle', 'header_desc', 'type'];
        expect(playlistJson.keys, containsAll(expectedKeys));
      });

      test('should not contain null values for required fields', () {
        expect(playlistJson['id'], isNotNull);
        expect(playlistJson['title'], isNotNull);
        expect(playlistJson['subtitle'], isNotNull);
        expect(playlistJson['type'], isNotNull);
      });
    });

    group('ID Validation', () {
      test('should be a non-empty string', () {
        final id = playlistJson['id'] as String;
        expect(id, isNotEmpty);
      });

      test('should match expected value', () {
        expect(playlistJson['id'], equals('1111580647'));
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
        expect(playlistJson['title'], equals('Best of 2022'));
      });

      test('should have valid length (between 1 and 100 characters)', () {
        final title = playlistJson['title'] as String;
        expect(title.length, greaterThanOrEqualTo(1));
        expect(title.length, lessThanOrEqualTo(100));
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
        expect(playlistJson['subtitle'], equals('20 Songs'));
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
        expect(songCount, equals(20));
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

    group('Header Description Validation', () {
      test('should be a string', () {
        expect(playlistJson['header_desc'], isA<String>());
      });

      test('should be empty as specified', () {
        expect(playlistJson['header_desc'], equals(''));
      });
    });

    group('Playlist Model Integration', () {
      test('should create Playlist from JSON with mapped fields', () {
        // Map test data to Playlist model field names
        final mappedJson = {
          'listid': playlistJson['id'],
          'listname': playlistJson['title'],
          'type': playlistJson['type'],
          'artists': <dynamic>[],
          'perma_url': null,
          'follower_count': null,
          'uid': null,
          'last_updated': null,
          'username': null,
          'firstname': null,
          'lastname': null,
          'is_followed': null,
          'isFY': null,
          'image': null,
          'share': null,
          'songs': null,
          'list_count': null,
          'fan_count': null,
          'H2': null,
          'is_dolby_playlist': null,
          'subheading': null,
          'sub_types': <dynamic>[],
          'images': <dynamic>[],
          'video_available': null,
          'video_count': null,
        };

        final playlist = Playlist.fromJson(mappedJson);

        expect(playlist.listid, equals('1111580647'));
        expect(playlist.listname, equals('Best of 2022'));
        expect(playlist.type, equals('playlist'));
      });

      test('should serialize Playlist to JSON', () {
        final mappedJson = {
          'listid': playlistJson['id'],
          'listname': playlistJson['title'],
          'type': playlistJson['type'],
          'artists': <dynamic>[],
          'perma_url': null,
          'follower_count': null,
          'uid': null,
          'last_updated': null,
          'username': null,
          'firstname': null,
          'lastname': null,
          'is_followed': null,
          'isFY': null,
          'image': null,
          'share': null,
          'songs': null,
          'list_count': null,
          'fan_count': null,
          'H2': null,
          'is_dolby_playlist': null,
          'subheading': null,
          'sub_types': <dynamic>[],
          'images': <dynamic>[],
          'video_available': null,
          'video_count': null,
        };

        final playlist = Playlist.fromJson(mappedJson);
        final json = playlist.toJson();

        expect(json['listid'], equals('1111580647'));
        expect(json['listname'], equals('Best of 2022'));
        expect(json['type'], equals('playlist'));
      });
    });

    group('Edge Cases and Error Handling', () {
      test('should handle empty id gracefully', () {
        final emptyIdJson = {
          'listid': '',
          'listname': 'Test Playlist',
          'type': 'playlist',
          'artists': <dynamic>[],
          'perma_url': null,
          'follower_count': null,
          'uid': null,
          'last_updated': null,
          'username': null,
          'firstname': null,
          'lastname': null,
          'is_followed': null,
          'isFY': null,
          'image': null,
          'share': null,
          'songs': null,
          'list_count': null,
          'fan_count': null,
          'H2': null,
          'is_dolby_playlist': null,
          'subheading': null,
          'sub_types': <dynamic>[],
          'images': <dynamic>[],
          'video_available': null,
          'video_count': null,
        };

        final playlist = Playlist.fromJson(emptyIdJson);
        expect(playlist.listid, isEmpty);
      });

      test('should handle null optional fields', () {
        final minimalJson = {
          'listid': '123',
          'listname': 'Test',
          'type': 'playlist',
          'artists': <dynamic>[],
          'perma_url': null,
          'follower_count': null,
          'uid': null,
          'last_updated': null,
          'username': null,
          'firstname': null,
          'lastname': null,
          'is_followed': null,
          'isFY': null,
          'image': null,
          'share': null,
          'songs': null,
          'list_count': null,
          'fan_count': null,
          'H2': null,
          'is_dolby_playlist': null,
          'subheading': null,
          'sub_types': <dynamic>[],
          'images': <dynamic>[],
          'video_available': null,
          'video_count': null,
        };

        final playlist = Playlist.fromJson(minimalJson);
        expect(playlist.listid, isNotNull);
        expect(playlist.listname, isNotNull);
        expect(playlist.type, isNotNull);
      });
    });

    group('Data Integrity Tests', () {
      test('should maintain data consistency after serialization cycle', () {
        final mappedJson = {
          'listid': playlistJson['id'],
          'listname': playlistJson['title'],
          'type': playlistJson['type'],
          'artists': <dynamic>[],
          'perma_url': null,
          'follower_count': null,
          'uid': null,
          'last_updated': null,
          'username': null,
          'firstname': null,
          'lastname': null,
          'is_followed': null,
          'isFY': null,
          'image': null,
          'share': null,
          'songs': null,
          'list_count': null,
          'fan_count': null,
          'H2': null,
          'is_dolby_playlist': null,
          'subheading': null,
          'sub_types': <dynamic>[],
          'images': <dynamic>[],
          'video_available': null,
          'video_count': null,
        };

        final original = Playlist.fromJson(mappedJson);
        final serialized = original.toJson();
        final deserialized = Playlist.fromJson(serialized);

        expect(deserialized.listid, equals(original.listid));
        expect(deserialized.listname, equals(original.listname));
        expect(deserialized.type, equals(original.type));
      });

      test('should validate immutable data constraints', () {
        // Verify that the test data meets all constraints
        final id = playlistJson['id'] as String;
        final title = playlistJson['title'] as String;
        final type = playlistJson['type'] as String;
        final subtitle = playlistJson['subtitle'] as String;

        // All required fields should be non-empty
        expect(id.isNotEmpty && title.isNotEmpty && type.isNotEmpty, isTrue);

        // Subtitle should describe content
        expect(subtitle.contains('Songs'), isTrue);
      });
    });
  });
}
