import 'dart:io';

import 'package:saavn_play/saavn_play.dart';

/// Example demonstrating how to use the radio station functionality
/// in the saavn_play library.
///
/// This example shows:
/// 1. Creating a radio station
/// 2. Getting songs from the station
/// 3. Generating authentication URLs for streaming
/// 4. Complete workflow for playing radio stations
void main() async {
  // Initialize the radio endpoint
  final radio = RadioEndpoint();

  try {
    // Example 1: Get featured radio stations
    print('=== Featured Radio Stations ===');
    final featuredStations = await radio.getFeaturedStations();
    print('Found ${featuredStations.featuredStations.length} featured stations:');

    for (final station in featuredStations.featuredStations) {
      print('- ${station.name} (${station.stationType})');
    }

    // Example 2: Create a specific radio station
    print('\n=== Creating Radio Station ===');
    const stationName = 'Jai Hanuman'; // From your example
    const language = 'hindi';

    final createdStation = await radio.createFeaturedStation(
      name: stationName,
      language: language,
    );

    print('Created station: ${createdStation.stationId}');

    // Example 3: Get songs from the created station
    print('\n=== Getting Songs from Station ===');
    final songsResponse = await radio.getStationSongs(
      stationId: createdStation.stationId,
      count: 3, // Get 3 songs
      next: true,
    );

    print('Retrieved ${songsResponse.songs.length} songs:');

    for (final song in songsResponse.songs) {
      print('\nSong: ${song.name ?? song.id}');
      print('  Artist: ${song.primaryArtists}');
      print('  Album: ${song.album.name}');
      print('  Duration: ${song.duration}');
      print('  Language: ${song.language}');
      print('  Encrypted Media URL: ${song.encryptedMediaUrl.isNotEmpty ? 'Available' : 'Not available'}');
      print('  Encrypted DRM URL: ${song.encryptedDrmMediaUrl.isNotEmpty ? 'Available' : 'Not available'}');
    }

    // Example 4: Generate authentication URLs for streaming
    print('\n=== Generating Authentication URLs ===');
    for (final song in songsResponse.songs) {
      if (song.encryptedMediaUrl.isNotEmpty) {
        try {
          final authUrl = await radio.generateAuthUrl(
            encryptedUrl: song.encryptedMediaUrl,
            bitrate: 128, // 128 kbps
          );

          print('\nSong: ${song.name ?? song.id}');
          print('  Auth URL: $authUrl');
          print('  URL Type: ${authUrl.contains('.mp4') ? 'MP4' : 'Other'}');
          print('  Status: ${authUrl.isNotEmpty ? 'Success' : 'Failed'}');
        } catch (e) {
          print('\nSong: ${song.name ?? song.id}');
          print('  Auth URL Generation: Failed - $e');
        }
      }
    }

    // Example 5: Complete workflow - create station and get authenticated songs
    print('\n=== Complete Workflow Example ===');
    final (station, songs) = await radio.createAndPlayStation(
      name: 'Jai Hanuman',
      language: 'hindi',
      count: 2,
      bitrate: 128,
    );

    print('Created station: ${station.stationId}');
    print('Retrieved ${songs.songs.length} songs with authentication URLs:');

    for (final song in songs.songs) {
      print('\nSong: ${song.name ?? song.id}');
      print('  Auth URL: ${song.authUrl.isNotEmpty ? song.authUrl : 'Not available'}');
      print('  DRM Auth URL: ${song.drmAuthUrl.isNotEmpty ? song.drmAuthUrl : 'Not available'}');
    }

    // Example 6: Using DRM authentication URLs (if available)
    print('\n=== DRM Authentication URLs ===');
    for (final song in songs.songs) {
      if (song.encryptedDrmMediaUrl.isNotEmpty) {
        try {
          final drmAuthUrl = await radio.generateDrmAuthUrl(
            encryptedDrmUrl: song.encryptedDrmMediaUrl,
            bitrate: 128,
          );

          print('\nSong: ${song.name ?? song.id}');
          print('  DRM Auth URL: $drmAuthUrl');
          print('  Status: ${drmAuthUrl.isNotEmpty ? 'Success' : 'Failed'}');
        } catch (e) {
          print('\nSong: ${song.name ?? song.id}');
          print('  DRM Auth URL Generation: Failed - $e');
        }
      }
    }

    // Example 7: Save authentication URLs to files for testing
    print('\n=== Saving URLs to Files ===');
    final authUrlsFile = File('auth_urls.txt');
    final drmUrlsFile = File('drm_urls.txt');

    final authUrls = <String>[];
    final drmUrls = <String>[];

    for (final song in songs.songs) {
      if (song.authUrl.isNotEmpty) {
        authUrls.add('${song.name ?? song.id}: ${song.authUrl}');
      }
      if (song.drmAuthUrl.isNotEmpty) {
        drmUrls.add('${song.name ?? song.id}: ${song.drmAuthUrl}');
      }
    }

    if (authUrls.isNotEmpty) {
      await authUrlsFile.writeAsString(authUrls.join('\n'));
      print('Saved ${authUrls.length} authentication URLs to auth_urls.txt');
    }

    if (drmUrls.isNotEmpty) {
      await drmUrlsFile.writeAsString(drmUrls.join('\n'));
      print('Saved ${drmUrls.length} DRM authentication URLs to drm_urls.txt');
    }

    print('\n=== Radio Station Example Complete ===');

  } catch (e) {
    print('Error: $e');
    print('Stack trace: ${e.runtimeType}');
  }
}

/// Example showing how to use radio stations in a real application
class RadioPlayer {
  final RadioEndpoint _radio = RadioEndpoint();

  /// Create and play a radio station
  Future<void> playRadioStation({
    required String stationName,
    required String language,
    int songCount = 5,
    int bitrate = 128,
  }) async {
    try {
      print('Creating radio station: $stationName ($language)');

      // Create the station and get songs with auth URLs
      final (station, songs) = await _radio.createAndPlayStation(
        name: stationName,
        language: language,
        count: songCount,
        bitrate: bitrate,
      );

      print('Station created: ${station.stationId}');
      print('Found ${songs.songs.length} songs');

      // Play each song
      for (int i = 0; i < songs.songs.length; i++) {
        final song = songs.songs[i];
        print('\nPlaying song ${i + 1}: ${song.name ?? song.id}');

        // Use the authentication URL for streaming
        if (song.authUrl.isNotEmpty) {
          print('Streaming URL: ${song.authUrl}');
          // In a real app, you would pass this URL to your audio player
          // await audioPlayer.play(song.authUrl);
        } else if (song.drmAuthUrl.isNotEmpty) {
          print('Streaming URL (DRM): ${song.drmAuthUrl}');
          // Use DRM URL as fallback
          // await audioPlayer.play(song.drmAuthUrl);
        } else {
          print('No authentication URL available for this song');
        }

        // Simulate playing the song
        await Future.delayed(const Duration(seconds: 2));
      }

      print('\nRadio station playback complete');

    } catch (e) {
      print('Error playing radio station: $e');
    }
  }

  /// Get more songs from an existing station
  Future<void> getMoreSongs(String stationId) async {
    try {
      final songs = await _radio.getStationSongs(
        stationId: stationId,
        count: 5,
        next: true, // Get next batch
      );

      print('Retrieved ${songs.songs.length} more songs from station $stationId');

      for (final song in songs.songs) {
        print('- ${song.name ?? song.id} by ${song.primaryArtists}');
      }

    } catch (e) {
      print('Error getting more songs: $e');
    }
  }
}

/// Example usage of the RadioPlayer class
Future<void> radioPlayerExample() async {
  final player = RadioPlayer();

  // Play a Hanuman radio station
  await player.playRadioStation(
    stationName: 'Jai Hanuman',
    language: 'hindi',
    songCount: 3,
    bitrate: 128,
  );

  // Play a different station
  await player.playRadioStation(
    stationName: 'Hit Factory',
    language: 'english',
    songCount: 2,
    bitrate: 320, // Higher quality
  );
}