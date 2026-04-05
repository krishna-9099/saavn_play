import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';

/// Simple album class for radio functionality
class SongResponseAlbum {
  SongResponseAlbum({
    required this.id,
    required this.name,
    required this.url,
  });

  final String id;
  final String name;
  final String url;

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'url': url,
    };
  }
}

/// Model class representing a radio station
class RadioStation {
  RadioStation({
    required this.name,
    required this.description,
    required this.image,
    required this.stationType,
    required this.query,
    this.color,
    required this.language,
    required this.stationDisplayText,
  });

  final String name;
  final String description;
  final String image;
  final String stationType;
  final String query;
  final String? color;
  final String language;
  final String stationDisplayText;

  factory RadioStation.fromJson(Map<String, dynamic> json) {
    return RadioStation(
      name: json['name'] as String? ?? '',
      description: json['description'] as String? ?? '',
      image: json['image'] as String? ?? '',
      stationType: json['featured_station_type'] as String? ?? '',
      query: json['query'] as String? ?? '',
      color: json['color'] as String?,
      language: json['language'] as String? ?? '',
      stationDisplayText: json['station_display_text'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'description': description,
      'image': image,
      'featured_station_type': stationType,
      'query': query,
      'color': color,
      'language': language,
      'station_display_text': stationDisplayText,
    };
  }
}

/// Model class representing the radio response
class RadioResponse {
  RadioResponse({required this.featuredStations});

  final List<RadioStation> featuredStations;

  factory RadioResponse.fromJson(Map<String, dynamic> json) {
    final radioData = json['radio'] as Map<String, dynamic>?;
    final stations = radioData?['featured_stations'] as List<dynamic>? ?? [];

    return RadioResponse(
      featuredStations: stations
          .map((e) => RadioStation.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }
}

/// Model class representing a created radio station
class CreatedRadioStation {
  CreatedRadioStation({required this.stationId});

  final String stationId;

  factory CreatedRadioStation.fromJson(Map<String, dynamic> json) {
    return CreatedRadioStation(stationId: json['stationid'] as String? ?? '');
  }

  Map<String, dynamic> toJson() {
    return {'stationid': stationId};
  }
}

/// Model class representing radio station songs response
class RadioStationSongsResponse {
  RadioStationSongsResponse({required this.songs});

  final List<RadioSong> songs;

  factory RadioStationSongsResponse.fromJson(Map<String, dynamic> json) {
    final songsList = <RadioSong>[];

    // The response can have either:
    // 1. A single "song" key with one song
    // 2. Multiple songs keyed by index ("0", "1", "2", etc.)
    if (json.containsKey('song')) {
      // Single song format
      final songData = json['song'] as Map<String, dynamic>?;
      if (songData != null) {
        songsList.add(parseRadioSong(songData));
      }
    } else {
      // Multiple songs format - keyed by index
      final keys = json.keys.where((k) => k != 'stationid').toList();
      for (final key in keys) {
        final songData = json[key] as Map<String, dynamic>?;
        if (songData != null && songData['song'] != null) {
          songsList.add(
            parseRadioSong(songData['song'] as Map<String, dynamic>),
          );
        }
      }
    }

    return RadioStationSongsResponse(songs: songsList);
  }

  /// Parse a radio song response into a RadioSong
  static RadioSong parseRadioSong(Map<String, dynamic> json) {
    final moreInfo = json['more_info'] as Map<String, dynamic>? ?? {};
    final artistMap = moreInfo['artistMap'] as Map<String, dynamic>? ?? {};

    // Extract primary artists
    final primaryArtistsList = artistMap['primary_artists'] as List<dynamic>? ?? [];
    final primaryArtists = primaryArtistsList
            .map((a) => (a is Map && a['name'] != null) ? a['name'].toString() : '')
            .where((name) => name.isNotEmpty)
            .join(', ');
    final primaryArtistsId = primaryArtistsList
            .map((a) => (a is Map && a['id'] != null) ? a['id'].toString() : '')
            .where((id) => id.isNotEmpty)
            .join(', ');

    // Extract featured artists
    final featuredArtistsList = artistMap['featured_artists'] as List<dynamic>? ?? [];
    final featuredArtists = featuredArtistsList
            .map((a) => (a is Map && a['name'] != null) ? a['name'].toString() : '')
            .where((name) => name.isNotEmpty)
            .join(', ');
    final featuredArtistsId = featuredArtistsList
            .map((a) => (a is Map && a['id'] != null) ? a['id'].toString() : '')
            .where((id) => id.isNotEmpty)
            .join(', ');

    return RadioSong(
      id: (json['id'] is String) ? json['id'] : '',
      name: (json['title'] is String) ? json['title'] : null,
      type: (json['type'] is String) ? json['type'] : 'song',
      album: SongResponseAlbum(
        id: (moreInfo['album_id'] is String) ? moreInfo['album_id'] : '',
        name: (moreInfo['album'] is String) ? moreInfo['album'] : '',
        url: (moreInfo['album_url'] is String) ? moreInfo['album_url'] : '',
      ),
      year: (json['year'] is String) ? json['year'] : '',
      releaseDate: (moreInfo['release_date'] is String) ? moreInfo['release_date'] : '',
      duration: (moreInfo['duration'] is String) ? moreInfo['duration'] : '',
      label: (moreInfo['label'] is String) ? moreInfo['label'] : '',
      primaryArtists: primaryArtists,
      primaryArtistsId: primaryArtistsId,
      featuredArtists: featuredArtists,
      featuredArtistsId: featuredArtistsId,
      explicitContent: int.tryParse(
            (json['explicit_content'] is String) ? json['explicit_content'] : '0',
          ) ??
          0,
      playCount: json['play_count']?.toString(),
      language: (json['language'] is String) ? json['language'] : '',
      hasLyrics: (moreInfo['has_lyrics'] is String) ? moreInfo['has_lyrics'] : 'false',
      url: (json['perma_url'] is String) ? json['perma_url'] : '',
      copyright: (moreInfo['copyright_text'] is String) ? moreInfo['copyright_text'] : '',
      image: (json['image'] is String) ? json['image'] : '',
      encryptedMediaUrl: (moreInfo['encrypted_media_url'] is String)
          ? moreInfo['encrypted_media_url']
          : '',
      encryptedDrmMediaUrl: (moreInfo['encrypted_drm_media_url'] is String)
          ? moreInfo['encrypted_drm_media_url']
          : '',
      vCode: (moreInfo['vcode'] is String) ? moreInfo['vcode'] : '',
      vLink: (moreInfo['vlink'] is String) ? moreInfo['vlink'] : '',
      bitrate: ((moreInfo['320kbps'] is String) ? moreInfo['320kbps'] : 'false') == 'true'
          ? 320
          : 128,
    );
  }

  Map<String, dynamic> toJson() {
    final result = <String, dynamic>{};
    if (songs.length == 1) {
      result['song'] = songs.first.toJson();
    } else {
      for (var i = 0; i < songs.length; i++) {
        result[i.toString()] = {'song': songs[i].toJson()};
      }
    }
    return result;
  }
}

/// Model class representing a radio song with additional DRM and media URL fields
class RadioSong {
  RadioSong({
    required this.id,
    required this.name,
    required this.type,
    required this.album,
    required this.year,
    required this.releaseDate,
    required this.duration,
    required this.label,
    required this.primaryArtists,
    required this.primaryArtistsId,
    required this.featuredArtists,
    required this.featuredArtistsId,
    required this.explicitContent,
    required this.playCount,
    required this.language,
    required this.hasLyrics,
    required this.url,
    required this.copyright,
    required this.image,
    required this.encryptedMediaUrl,
    required this.encryptedDrmMediaUrl,
    required this.vCode,
    required this.vLink,
    required this.bitrate,
    this.authUrl = '',
    this.drmAuthUrl = '',
  });

  final String id;
  final String? name;
  final String type;
  final SongResponseAlbum album;
  final String year;
  final String releaseDate;
  final String duration;
  final String label;
  final String primaryArtists;
  final String primaryArtistsId;
  final String featuredArtists;
  final String featuredArtistsId;
  final int explicitContent;
  final String? playCount;
  final String language;
  final String hasLyrics;
  final String url;
  final String copyright;
  final String image;
  final String encryptedMediaUrl;
  final String encryptedDrmMediaUrl;
  final String vCode;
  final String vLink;
  final int bitrate;
  String authUrl;
  String drmAuthUrl;

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': name,
      'type': type,
      'more_info': {
        'album_id': album.id,
        'album': album.name,
        'album_url': album.url,
        'release_date': releaseDate,
        'duration': duration,
        'label': label,
        'artistMap': {
          'primary_artists': [
            {'name': primaryArtists, 'id': primaryArtistsId}
          ],
          'featured_artists': [
            {'name': featuredArtists, 'id': featuredArtistsId}
          ]
        },
        'has_lyrics': hasLyrics,
        'copyright_text': copyright,
        'encrypted_media_url': encryptedMediaUrl,
        'encrypted_drm_media_url': encryptedDrmMediaUrl,
        'vcode': vCode,
        'vlink': vLink,
      },
      'year': year,
      'explicit_content': explicitContent.toString(),
      'play_count': playCount,
      'language': language,
      'perma_url': url,
      'image': image,
    };
  }
}

/// Endpoint class for saavn_play radio feature
class RadioEndpoint extends BaseClient {
  RadioEndpoint([super.options]);

  /// Get featured radio stations
  Future<RadioResponse> getFeaturedStations() async {
    final response = await request(call: endpoints.radio.browse);

    return RadioResponse.fromJson(response);
  }

  /// Create a featured radio station by name
  ///
  /// [name] - The name of the featured station (e.g., "Hit Factory", "Chill", "Romance")
  /// [language] - The language for the station (e.g., "english", "hindi")
  Future<CreatedRadioStation> createFeaturedStation({
    required String name,
    required String language,
  }) async {
    final response = await request(
      call: endpoints.radio.createStation,
      isAPIv4: true,
      queryParameters: {'name': name, 'language': language, 'ctx': 'web6dot0'},
    );

    return CreatedRadioStation.fromJson(response);
  }

  /// Get songs from a radio station
  ///
  /// [stationId] - The station ID returned from createFeaturedStation
  /// [count] - Number of songs to retrieve (default: 5)
  /// [next] - Whether to get the next batch of songs (default: true)
  Future<RadioStationSongsResponse> getStationSongs({
    required String stationId,
    int count = 5,
    bool next = true,
  }) async {
    final response = await request(
      call: endpoints.radio.getSong,
      isAPIv4: true,
      queryParameters: {
        'stationid': stationId,
        'k': count.toString(),
        'next': next ? '1' : '0',
        'ctx': 'web6dot0',
      },
    );

    return RadioStationSongsResponse.fromJson(response);
  }

  /// Get raw response from radio station for debugging
  Future<Map<String, dynamic>> getRawStationSongs({
    required String stationId,
    int count = 5,
    bool next = true,
  }) async {
    return await request(
      call: endpoints.radio.getSong,
      isAPIv4: true,
      queryParameters: {
        'stationid': stationId,
        'k': count.toString(),
        'next': next ? '1' : '0',
        'ctx': 'web6dot0',
      },
    );
  }

  /// Convenience method to get songs from a featured station by name
  ///
  /// [name] - The name of the featured station (e.g., "Hit Factory")
  /// [language] - The language for the station (e.g., "english")
  /// [count] - Number of songs to retrieve (default: 5)
  Future<RadioStationSongsResponse> getFeaturedStationSongs({
    required String name,
    required String language,
    int count = 5,
  }) async {
    // Create the station first
    final station = await createFeaturedStation(name: name, language: language);

    // Get songs from the created station
    return getStationSongs(stationId: station.stationId, count: count);
  }

  /// Generate authentication URL for a radio song's encrypted media URL
  ///
  /// [encryptedUrl] - The encrypted media URL from the song's more_info
  /// [bitrate] - The desired bitrate (128 or 320, default: 128)
  ///
  /// Returns the authenticated URL that can be used to stream the song
  Future<String> generateAuthUrl({
    required String encryptedUrl,
    int bitrate = 128,
  }) async {
    try {
      final response = await request(
        call: 'song.generateAuthToken',
        isAPIv4: true,
        queryParameters: {
          'url': Uri.encodeComponent(encryptedUrl),
          'bitrate': bitrate.toString(),
          'ctx': 'web6dot0',
        },
      );

      // The response should be a Map<String, dynamic> with 'auth_url' key
      return response['auth_url'] as String? ?? '';
          
    } catch (e) {
      throw Exception('Failed to generate auth URL: $e');
    }
  }

  /// Generate authentication URL for a radio song's encrypted DRM media URL
  ///
  /// [encryptedDrmUrl] - The encrypted DRM media URL from the song's more_info
  /// [bitrate] - The desired bitrate (128 or 320, default: 128)
  ///
  /// Returns the authenticated URL that can be used to stream the song
  Future<String> generateDrmAuthUrl({
    required String encryptedDrmUrl,
    int bitrate = 128,
  }) async {
    final response = await request(
      call: 'song.generateAuthToken',
      isAPIv4: true,
      queryParameters: {
        'url': Uri.encodeComponent(encryptedDrmUrl),
        'bitrate': bitrate.toString(),
        'ctx': 'web6dot0',
      },
    );

    // The response should be a Map<String, dynamic> with 'auth_url' key
    return response['auth_url'] as String? ?? '';
      
  }

  /// Get a complete radio song with authentication URLs
  ///
  /// [stationId] - The radio station ID
  /// [count] - Number of songs to retrieve (default: 1)
  /// [bitrate] - The desired bitrate (128 or 320, default: 128)
  ///
  /// Returns songs with both regular and DRM authentication URLs
  Future<RadioStationSongsResponse> getStationSongsWithAuth({
    required String stationId,
    int count = 1,
    int bitrate = 128,
  }) async {
    final response = await getStationSongs(
      stationId: stationId,
      count: count,
      next: true,
    );

    // Generate auth URLs for each song
    for (final song in response.songs) {
      if (song.encryptedMediaUrl.isNotEmpty) {
        try {
          song.authUrl = await generateAuthUrl(
            encryptedUrl: song.encryptedMediaUrl,
            bitrate: bitrate,
          );
        } catch (e) {
          // If auth URL generation fails, leave it empty
          song.authUrl = '';
        }
      }

      if (song.encryptedDrmMediaUrl.isNotEmpty) {
        try {
          song.drmAuthUrl = await generateDrmAuthUrl(
            encryptedDrmUrl: song.encryptedDrmMediaUrl,
            bitrate: bitrate,
          );
        } catch (e) {
          // If DRM auth URL generation fails, leave it empty
          song.drmAuthUrl = '';
        }
      }
    }

    return response;
  }

  /// Complete radio station workflow: create station and get authenticated songs
  ///
  /// [name] - The name of the featured station (e.g., "Jai Hanuman")
  /// [language] - The language for the station (e.g., "hindi")
  /// [count] - Number of songs to retrieve (default: 5)
  /// [bitrate] - The desired bitrate (128 or 320, default: 128)
  ///
  /// Returns the created station and songs with authentication URLs
  Future<(CreatedRadioStation station, RadioStationSongsResponse songs)> createAndPlayStation({
    required String name,
    required String language,
    int count = 5,
    int bitrate = 128,
  }) async {
    // Create the station
    final station = await createFeaturedStation(name: name, language: language);

    // Get songs with authentication URLs
    final songs = await getStationSongsWithAuth(
      stationId: station.stationId,
      count: count,
      bitrate: bitrate,
    );

    return (station, songs);
  }

  /// Get the next song from a radio station
  ///
  /// [stationId] - The radio station ID
  /// [bitrate] - The desired bitrate (128 or 320, default: 128)
  ///
  /// Returns a single song with authentication URLs
  Future<RadioSongWithAuth> getNextSong({
    required String stationId,
    int bitrate = 128,
  }) async {
    final response = await getStationSongs(
      stationId: stationId,
      count: 1,
      next: true,
    );

    if (response.songs.isEmpty) {
      throw Exception('No songs available in the station');
    }

    final song = response.songs.first;
    final authUrl = await generateAuthUrl(
      encryptedUrl: song.encryptedMediaUrl,
      bitrate: bitrate,
    );
    final drmAuthUrl = await generateDrmAuthUrl(
      encryptedDrmUrl: song.encryptedDrmMediaUrl,
      bitrate: bitrate,
    );

    return RadioSongWithAuth(
      song: song,
      authUrl: authUrl,
      drmAuthUrl: drmAuthUrl,
    );
  }

  /// Get multiple songs from a radio station with authentication URLs
  ///
  /// [stationId] - The radio station ID
  /// [count] - Number of songs to retrieve (default: 5)
  /// [bitrate] - The desired bitrate (128 or 320, default: 128)
  ///
  /// Returns a list of songs with authentication URLs
  Future<List<RadioSongWithAuth>> getMultipleSongs({
    required String stationId,
    int count = 5,
    int bitrate = 128,
  }) async {
    final response = await getStationSongs(
      stationId: stationId,
      count: count,
      next: true,
    );

    final songsWithAuth = <RadioSongWithAuth>[];

    for (final song in response.songs) {
      final authUrl = await generateAuthUrl(
        encryptedUrl: song.encryptedMediaUrl,
        bitrate: bitrate,
      );
      final drmAuthUrl = await generateDrmAuthUrl(
        encryptedDrmUrl: song.encryptedDrmMediaUrl,
        bitrate: bitrate,
      );

      songsWithAuth.add(RadioSongWithAuth(
        song: song,
        authUrl: authUrl,
        drmAuthUrl: drmAuthUrl,
      ));
    }

    return songsWithAuth;
  }

  /// Get a radio song with all available media URLs and authentication
  ///
  /// [stationId] - The radio station ID
  /// [bitrate] - The desired bitrate (128 or 320, default: 128)
  ///
  /// Returns a song with all media URLs and their authenticated versions
  Future<RadioSongWithAuth> getSongWithAllUrls({
    required String stationId,
    int bitrate = 128,
  }) async {
    final response = await getStationSongs(
      stationId: stationId,
      count: 1,
      next: true,
    );

    if (response.songs.isEmpty) {
      throw Exception('No songs available in the station');
    }

    final song = response.songs.first;

    // Generate authentication URLs for all available encrypted URLs
    String authUrl = '';
    String drmAuthUrl = '';

    if (song.encryptedMediaUrl.isNotEmpty) {
      authUrl = await generateAuthUrl(
        encryptedUrl: song.encryptedMediaUrl,
        bitrate: bitrate,
      );
    }

    if (song.encryptedDrmMediaUrl.isNotEmpty) {
      drmAuthUrl = await generateDrmAuthUrl(
        encryptedDrmUrl: song.encryptedDrmMediaUrl,
        bitrate: bitrate,
      );
    }

    return RadioSongWithAuth(
      song: song,
      authUrl: authUrl,
      drmAuthUrl: drmAuthUrl,
    );
  }

  /// Get the best available media URL for a radio song
  ///
  /// [stationId] - The radio station ID
  /// [bitrate] - The desired bitrate (128 or 320, default: 128)
  ///
  /// Returns the best available authenticated URL for streaming
  Future<String> getBestMediaUrl({
    required String stationId,
    int bitrate = 128,
  }) async {
    final songWithAuth = await getSongWithAllUrls(
      stationId: stationId,
      bitrate: bitrate,
    );

    // Return the best available URL
    if (songWithAuth.authUrl.isNotEmpty) {
      return songWithAuth.authUrl;
    } else if (songWithAuth.drmAuthUrl.isNotEmpty) {
      return songWithAuth.drmAuthUrl;
    } else {
      throw Exception('No valid media URL available');
    }
  }
}

/// Model class representing a radio song with authentication URLs
class RadioSongWithAuth {
  RadioSongWithAuth({
    required this.song,
    this.authUrl = '',
    this.drmAuthUrl = '',
  });

  final RadioSong song;
  String authUrl;
  String drmAuthUrl;

  /// Get the best available authentication URL
  String get bestAuthUrl => authUrl.isNotEmpty ? authUrl : drmAuthUrl;
}
