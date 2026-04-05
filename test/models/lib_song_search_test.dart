import 'dart:convert';
import 'package:flutter_test/flutter_test.dart';
import 'package:saavn_play/src/models/song_search_lib.dart';

void main() {
  group('SongSearchLibResponse', () {
    test('should deserialize from JSON correctly', () {
      // Sample JSON from search.json
      const jsonString = '''
      {
        "total": 9820,
        "start": 1,
        "results": [
          {
            "id": "CqFTFJq4",
            "title": "Kallo (Feat.Ajay Hooda,Pardeep Boora)",
            "subtitle": "Komal Chaudhary, Harjeet Deewana - Kallo (Feat.Ajay Hooda,Pardeep Boora)",
            "header_desc": "",
            "type": "song",
            "perma_url": "https://www.jiosaavn.com/song/kallo-feat.ajay-hoodapardeep-boora/MxktZTJ6Rgc",
            "image": "https://c.saavncdn.com/129/Kallo-Feat-Ajay-Hooda-Pardeep-Boora-Haryanvi-2023-20231025091456-150x150.jpg",
            "language": "haryanvi",
            "year": "2023",
            "play_count": "15008111",
            "explicit_content": "0",
            "list_count": "0",
            "list_type": "",
            "list": "",
            "more_info": {
              "music": "Gulshan Music",
              "album_id": "49241242",
              "album": "Kallo (Feat.Ajay Hooda,Pardeep Boora)",
              "label": "Vats Records",
              "label_id": null,
              "origin": "search",
              "is_dolby_content": false,
              "320kbps": "true",
              "encrypted_media_url": "ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyUttaJIV6neU4tPBf+sOp69fr20MwuBAZSHc60JfCLUhkwc6kqYrFKhw7tS9a8Gtq",
              "encrypted_cache_url": "",
              "encrypted_drm_cache_url": "",
              "encrypted_drm_media_url": "ID2ieOjCrwdjlkMElYlzWCptgNdUpWD8t1o84a7iVptukztxnvW2MZO7IwC61fFp23PRWf5SVby5LIUeoVx9bI92mytrdt3FDnQW0nglPS4=",
              "album_url": "https://www.jiosaavn.com/album/kallo-feat.ajay-hoodapardeep-boora/iTSfJAj1X6k_",
              "duration": "174",
              "rights": {
                "code": "0",
                "cacheable": "true",
                "delete_cached_object": "false",
                "reason": ""
              },
              "cache_state": "false",
              "has_lyrics": "false",
              "lyrics_snippet": "",
              "starred": "false",
              "copyright_text": "© 2023 Vats Records",
              "artistMap": {
                "primary_artists": [
                  {
                    "id": "7273437",
                    "name": "Komal Chaudhary",
                    "role": "primary_artists",
                    "image": "https://c.saavncdn.com/artists/Komal_Chaudhary_000_20241212104439_150x150.jpg",
                    "type": "artist",
                    "perma_url": "https://www.jiosaavn.com/artist/komal-chaudhary-songs/alGNFihrqJI_"
                  }
                ],
                "featured_artists": [],
                "artists": [
                  {
                    "id": "5692397",
                    "name": "Gulshan Music",
                    "role": "music",
                    "image": "https://c.saavncdn.com/artists/Gulshan_Music_000_20251020081323_150x150.jpg",
                    "type": "artist",
                    "perma_url": "https://www.jiosaavn.com/artist/gulshan-music-songs/8nIcW6tVeYs_"
                  }
                ]
              },
              "release_date": null,
              "label_url": "/label/vats-records-albums/",
              "vcode": "010912172125927",
              "vlink": "https://jiotunepreview.jio.com/content/Converted/010912172082099.mp3",
              "triller_available": false,
              "request_jiotune_flag": false,
              "webp": "true"
            },
            "button_tooltip_info": [],
            "pro_hva_campaigns": []
          }
        ]
      }
      ''';

      final json = jsonDecode(jsonString);
      final response = LibSongSearchResponse.fromJson(json);

      // Test basic properties
      expect(response.total, 9820);
      expect(response.start, 1);
      expect(response.results.length, 1);

      // Test first result
      final song = response.results.first;
      expect(song.id, 'CqFTFJq4');
      expect(song.title, 'Kallo (Feat.Ajay Hooda,Pardeep Boora)');
      expect(song.language, 'haryanvi');
      expect(song.year, '2023');
      expect(song.playCount, '15008111');

      // Test more_info
      expect(song.moreInfo.music, 'Gulshan Music');
      expect(song.moreInfo.album, 'Kallo (Feat.Ajay Hooda,Pardeep Boora)');
      expect(song.moreInfo.label, 'Vats Records');
      expect(song.moreInfo.isDolbyContent, false);
      expect(song.moreInfo.kbps320, 'true');
      expect(song.moreInfo.duration, '174');

      // Test rights
      expect(song.moreInfo.rights.code, 0);
      expect(song.moreInfo.rights.cacheable, true);

      // Test artist mapping
      expect(song.moreInfo.artistMap.primaryArtists.length, 1);
      expect(song.moreInfo.artistMap.primaryArtists.first.name, 'Komal Chaudhary');
      expect(song.moreInfo.artistMap.primaryArtists.first.role, 'primary_artists');
      expect(song.moreInfo.artistMap.artists.length, 1);
      expect(song.moreInfo.artistMap.artists.first.role, 'music');
    });

    test('should handle null values correctly', () {
      const jsonString = '''
      {
        "total": 1,
        "start": 1,
        "results": [
          {
            "id": "test",
            "title": "Test Song",
            "subtitle": "Test Artist",
            "header_desc": "",
            "type": "song",
            "perma_url": "https://example.com",
            "image": "https://example.com/image.jpg",
            "language": "english",
            "year": "2023",
            "play_count": "0",
            "explicit_content": "0",
            "list_count": "0",
            "list_type": "",
            "list": "",
            "more_info": {
              "music": "Test Music",
              "album_id": "123",
              "album": "Test Album",
              "label": "Test Label",
              "label_id": null,
              "origin": "search",
              "is_dolby_content": false,
              "320kbps": "true",
              "encrypted_media_url": "",
              "encrypted_cache_url": "",
              "encrypted_drm_cache_url": "",
              "encrypted_drm_media_url": "",
              "album_url": "https://example.com/album",
              "duration": "180",
              "rights": {
                "code": 0,
                "cacheable": true,
                "delete_cached_object": false,
                "reason": ""
              },
              "cache_state": "false",
              "has_lyrics": "false",
              "lyrics_snippet": "",
              "starred": "false",
              "copyright_text": "© Test",
              "artistMap": {
                "primary_artists": [],
                "featured_artists": [],
                "artists": []
              },
              "release_date": null,
              "label_url": "/label/test-albums/",
              "vcode": null,
              "vlink": null,
              "triller_available": false,
              "request_jiotune_flag": false,
              "webp": "false"
            },
            "button_tooltip_info": [],
            "pro_hva_campaigns": []
          }
        ]
      }
      ''';

      final json = jsonDecode(jsonString);
      final response = LibSongSearchResponse.fromJson(json);

      expect(response.results.first.moreInfo.labelId, null);
      expect(response.results.first.moreInfo.vcode, null);
      expect(response.results.first.moreInfo.vlink, null);
      expect(response.results.first.moreInfo.lyricsId, null);
      expect(response.results.first.moreInfo.releaseDate, null);
    });

    test('should serialize back to JSON correctly', () {
      final originalJson = {
        'total': 1,
        'start': 1,
        'results': [
          {
            'id': 'test',
            'title': 'Test Song',
            'subtitle': 'Test Artist',
            'header_desc': '',
            'type': 'song',
            'perma_url': 'https://example.com',
            'image': 'https://example.com/image.jpg',
            'language': 'english',
            'year': '2023',
            'play_count': '0',
            'explicit_content': '0',
            'list_count': '0',
            'list_type': '',
            'list': '',
            'more_info': {
              'music': 'Test Music',
              'album_id': '123',
              'album': 'Test Album',
              'label': 'Test Label',
              'label_id': null,
              'origin': 'search',
              'is_dolby_content': false,
              '320kbps': 'true',
              'encrypted_media_url': '',
              'encrypted_cache_url': '',
              'encrypted_drm_cache_url': '',
              'encrypted_drm_media_url': '',
              'album_url': 'https://example.com/album',
              'duration': '180',
              'rights': {
                'code': 0,
                'cacheable': true,
                'delete_cached_object': false,
                'reason': ''
              },
              'cache_state': 'false',
              'has_lyrics': 'false',
              'lyrics_snippet': '',
              'starred': 'false',
              'copyright_text': '© Test',
              'artistMap': {
                'primary_artists': [],
                'featured_artists': [],
                'artists': []
              },
              'release_date': null,
              'label_url': '/label/test-albums/',
              'vcode': null,
              'vlink': null,
              'triller_available': false,
              'request_jiotune_flag': false,
              'webp': 'false'
            },
            'button_tooltip_info': [],
            'pro_hva_campaigns': []
          }
        ]
      };

      final response = LibSongSearchResponse.fromJson(originalJson);
      final serializedJson = response.toJson();

      // Basic structure should be preserved
      expect(serializedJson['total'], 1);
      expect(serializedJson['start'], 1);
      expect(serializedJson['results'].length, 1);
      expect(serializedJson['results'][0]['id'], 'test');
      expect(serializedJson['results'][0]['title'], 'Test Song');
    });
  });
}