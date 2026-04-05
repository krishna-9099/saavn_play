import 'package:saavn_play/src/endpoints/radio.dart';

void main() async {
  print('Testing Radio Implementation with Example API Responses');
  
  // Test the parseRadioSong method with sample data
  final sampleSongData = {
    'id': '12345',
    'title': 'Test Song',
    'type': 'song',
    'year': '2023',
    'more_info': {
      'album_id': '67890',
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
          {'name': 'Featured Artist', 'id': 'artist456'}
        ]
      },
      'has_lyrics': 'true',
      'copyright_text': 'Test Copyright',
      'encrypted_media_url': 'https://example.com/encrypted',
      'encrypted_drm_media_url': 'https://example.com/drm',
      'vcode': 'test_vcode',
      'vlink': 'https://example.com/vlink',
      '320kbps': 'true'
    },
    'explicit_content': '0',
    'play_count': '1000',
    'language': 'hindi',
    'perma_url': 'https://example.com/song',
    'image': 'https://example.com/image.jpg'
  };

  try {
    final parsedSong = RadioStationSongsResponse.parseRadioSong(sampleSongData);
    print('✓ Successfully parsed radio song');
    print('  - ID: ${parsedSong.id}');
    print('  - Name: ${parsedSong.name}');
    print('  - Primary Artists: ${parsedSong.primaryArtists}');
    print('  - Bitrate: ${parsedSong.bitrate}');
    print('  - Encrypted Media URL: ${parsedSong.encryptedMediaUrl}');
    print('  - Encrypted DRM Media URL: ${parsedSong.encryptedDrmMediaUrl}');
    
    // Test the toJson method
    final jsonOutput = parsedSong.toJson();
    print('✓ Successfully converted to JSON');
    print('  - JSON contains ${jsonOutput.keys.length} keys');
    
  } catch (e) {
    print('✗ Failed to parse radio song: $e');
  }

  // Test RadioSongWithAuth
  try {
    final song = RadioSong(
      id: 'test123',
      name: 'Test Song',
      type: 'song',
      album: SongResponseAlbum(id: 'album123', name: 'Test Album', url: 'https://example.com'),
      year: '2023',
      releaseDate: '2023-01-01',
      duration: '180',
      label: 'Test Label',
      primaryArtists: 'Test Artist',
      primaryArtistsId: 'artist123',
      featuredArtists: 'Featured Artist',
      featuredArtistsId: 'artist456',
      explicitContent: 0,
      playCount: '1000',
      language: 'hindi',
      hasLyrics: 'true',
      url: 'https://example.com/song',
      copyright: 'Test Copyright',
      image: 'https://example.com/image.jpg',
      encryptedMediaUrl: 'https://example.com/encrypted',
      encryptedDrmMediaUrl: 'https://example.com/drm',
      vCode: 'test_vcode',
      vLink: 'https://example.com/vlink',
      bitrate: 320,
    );

    final songWithAuth = RadioSongWithAuth(
      song: song,
      authUrl: 'https://example.com/auth',
      drmAuthUrl: 'https://example.com/drm_auth',
    );

    print('✓ Successfully created RadioSongWithAuth');
    print('  - Best Auth URL: ${songWithAuth.bestAuthUrl}');
    print('  - Song ID: ${songWithAuth.song.id}');
    
  } catch (e) {
    print('✗ Failed to create RadioSongWithAuth: $e');
  }

  print('\nRadio Implementation Test Complete!');
}