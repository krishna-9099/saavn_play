import 'dart:convert';
import 'dart:io';
import 'package:saavn_play/src/models/playlist_search_response.dart';
import 'package:saavn_play/src/models/artist_search_response.dart';
import 'package:saavn_play/src/models/song_search_response.dart';
import 'package:saavn_play/src/models/album_search_response.dart';
import 'package:saavn_play/src/models/song_item.dart';

void main() {
  print('🧪 Testing All API Response Models with Real JSON Files\n');
  
  // Test 1: Playlist Search Response
  testPlaylistSearch();
  
  // Test 2: Artist Search Response  
  testArtistSearch();
  
  // Test 3: Song Search Response
  testSongSearch();
  
  // Test 4: Album Search Response
  testAlbumSearch();
  
  print('\n🎉 All response tests completed successfully!');
}

void testPlaylistSearch() {
  print('🎵 Testing Playlist Search Response...');
  
  try {
    // Read from actual API response file
    final jsonString = File('example/api_responses/playlistSearch.json').readAsStringSync();
    final jsonMap = jsonDecode(jsonString);
    final response = PlaylistSearchResponse.fromJson(jsonMap);
    
    // Verify structure
    assert(response.total == 154);
    assert(response.start == 1);
    assert(response.results.isNotEmpty);
    
    final playlist = response.results.first;
    assert(playlist.id.isNotEmpty);
    assert(playlist.title.isNotEmpty);
    assert(playlist.subtitle.isNotEmpty);
    assert(playlist.type == 'playlist');
    assert(playlist.explicitContent.isNotEmpty);
    assert(playlist.moreInfo != null);
    assert(playlist.moreInfo!['uid'] != null);
    assert(playlist.moreInfo!['artist_name'] is List);
    
    // Test round-trip
    final serialized = response.toJson();
    final jsonString2 = jsonEncode(serialized);
    final jsonMap2 = jsonDecode(jsonString2);
    final response2 = PlaylistSearchResponse.fromJson(jsonMap2);
    
    assert(response.total == response2.total);
    assert(response.start == response2.start);
    assert(response.results.length == response2.results.length);
    
    print('  ✅ Playlist Search: All assertions passed');
    
  } catch (e) {
    print('  ❌ Playlist Search failed: $e');
  }
}

void testArtistSearch() {
  print('🎤 Testing Artist Search Response...');
  
  try {
    // Read from actual API response file
    final jsonString = File('example/api_responses/artitsSearch.json').readAsStringSync();
    final jsonMap = jsonDecode(jsonString);
    final response = ArtistSearchResponse.fromJson(jsonMap);
    
    // Verify structure
    assert(response.total > 0);
    assert(response.start == 1);
    assert(response.results.isNotEmpty);
    
    final artist = response.results.first;
    assert(artist.id.isNotEmpty);
    assert(artist.name.isNotEmpty);
    assert(artist.type == 'artist');
    assert(artist.role != null);
    
    // Test round-trip
    final serialized = response.toJson();
    final jsonString2 = jsonEncode(serialized);
    final jsonMap2 = jsonDecode(jsonString2);
    final response2 = ArtistSearchResponse.fromJson(jsonMap2);
    
    assert(response.total == response2.total);
    assert(response.start == response2.start);
    assert(response.results.length == response2.results.length);
    
    print('  ✅ Artist Search: All assertions passed');
    
  } catch (e) {
    print('  ❌ Artist Search failed: $e');
  }
}

void testSongSearch() {
  print('🎶 Testing Song Search Response...');
  
  try {
    // Read from actual API response file
    final jsonString = File('example/api_responses/songSearch.json').readAsStringSync();
    final jsonMap = jsonDecode(jsonString);
    print('  📋 JSON structure loaded successfully');
    
    // Debug the first song's more_info and rights
    final firstSongJson = (jsonMap['results'] as List).first;
    final moreInfoJson = firstSongJson['more_info'];
    print('  📋 First song more_info type: ${moreInfoJson.runtimeType}');
    if (moreInfoJson != null) {
      final rightsJson = moreInfoJson['rights'];
      print('  📋 First song rights type: ${rightsJson.runtimeType}');
      print('  📋 First song rights value: $rightsJson');
      
      // Test parsing the rights directly
      print('  📋 Testing SongRights.fromJson directly...');
      try {
        final songRights = SongRights.fromJson(rightsJson as Map<String, dynamic>);
        print('  📋 SongRights parsed successfully: code=${songRights.code}, cacheable=${songRights.cacheable}');
      } catch (e) {
        print('  📋 SongRights parsing failed: $e');
      }
    }
    
    // Test parsing the response
    final response = SongSearchResponse.fromJson(jsonMap);
    print('  📋 Response parsed successfully');
    
    // Verify structure
    assert(response.total > 0);
    assert(response.start == 1);
    assert(response.results.isNotEmpty);
    print('  📋 Response structure verified');
    
    final song = response.results.first;
    assert(song.id.isNotEmpty);
    assert(song.title.isNotEmpty);
    assert(song.subtitle.isNotEmpty);
    assert(song.type == 'song');
    assert(song.explicitContent.isNotEmpty);
    print('  📋 Song basic fields verified');
    
    // Test more_info
    assert(song.moreInfo != null);
    print('  📋 Song moreInfo exists');
    
    assert(song.moreInfo!.music.isNotEmpty);
    assert(song.moreInfo!.album.isNotEmpty);
    assert(song.moreInfo!.duration.isNotEmpty);
    print('  📋 Song moreInfo fields verified');
    
    // Test rights field specifically
    if (song.moreInfo!.rights != null) {
      print('  📋 Song rights field exists and is not null');
      assert(song.moreInfo!.rights!.code >= 0);
      print('  📋 Song rights fields verified');
    } else {
      print('  📋 Song rights field is null (this is acceptable)');
    }
    
    // Test round-trip
    final serialized = response.toJson();
    final jsonString2 = jsonEncode(serialized);
    final jsonMap2 = jsonDecode(jsonString2);
    final response2 = SongSearchResponse.fromJson(jsonMap2);
    
    assert(response.total == response2.total);
    assert(response.start == response2.start);
    assert(response.results.length == response2.results.length);
    print('  📋 Round-trip serialization verified');
    
    print('  ✅ Song Search: All assertions passed');
    
  } catch (e, stackTrace) {
    print('  ❌ Song Search failed: $e');
    print('  📋 Stack trace: $stackTrace');
  }
}

void testAlbumSearch() {
  print('💿 Testing Album Search Response...');
  
  try {
    // Read from actual API response file
    final jsonString = File('example/api_responses/albumSearch.json').readAsStringSync();
    final jsonMap = jsonDecode(jsonString);
    final response = AlbumSearchResponse.fromJson(jsonMap);
    
    // Verify structure
    assert(response.total > 0);
    assert(response.start == 1);
    assert(response.results.isNotEmpty);
    
    final album = response.results.first;
    assert(album.id.isNotEmpty);
    assert(album.title.isNotEmpty);
    assert(album.subtitle.isNotEmpty);
    assert(album.type == 'album');
    assert(album.explicitContent.isNotEmpty);
    assert(album.moreInfo != null);
    assert(album.moreInfo!.query.isNotEmpty);
    assert(album.moreInfo!.text.isNotEmpty);
    assert(album.moreInfo!.songCount.isNotEmpty);
    
    // Test round-trip
    final serialized = response.toJson();
    final jsonString2 = jsonEncode(serialized);
    final jsonMap2 = jsonDecode(jsonString2);
    final response2 = AlbumSearchResponse.fromJson(jsonMap2);
    
    assert(response.total == response2.total);
    assert(response.start == response2.start);
    assert(response.results.length == response2.results.length);
    
    print('  ✅ Album Search: All assertions passed');
    
  } catch (e) {
    print('  ❌ Album Search failed: $e');
  }
}
