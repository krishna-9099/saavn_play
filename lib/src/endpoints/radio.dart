import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';
import 'package:saavn_play/src/models/song.dart'
    show SongResponse, SongResponseAlbum;
import 'package:saavn_play/src/utils/link.dart'
    show createImageLinks, createDownloadLinks;

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

  final List<SongResponse> songs;

  factory RadioStationSongsResponse.fromJson(Map<String, dynamic> json) {
    final songsList = <SongResponse>[];

    // The response can have either:
    // 1. A single "song" key with one song
    // 2. Multiple songs keyed by index ("0", "1", "2", etc.)
    if (json.containsKey('song')) {
      // Single song format
      final songData = json['song'] as Map<String, dynamic>?;
      if (songData != null) {
        songsList.add(_parseRadioSong(songData));
      }
    } else {
      // Multiple songs format - keyed by index
      final keys = json.keys.where((k) => k != 'stationid').toList();
      for (final key in keys) {
        final songData = json[key] as Map<String, dynamic>?;
        if (songData != null && songData['song'] != null) {
          songsList.add(
            _parseRadioSong(songData['song'] as Map<String, dynamic>),
          );
        }
      }
    }

    return RadioStationSongsResponse(songs: songsList);
  }

  /// Parse a radio song response into a SongResponse
  static SongResponse _parseRadioSong(Map<String, dynamic> json) {
    final moreInfo = json['more_info'] as Map<String, dynamic>? ?? {};
    final artistMap = moreInfo['artistMap'] as Map<String, dynamic>? ?? {};

    // Extract primary artists
    final primaryArtists = (artistMap['primary_artists'] as List<dynamic>?)
            ?.map((a) => a['name'] as String)
            .join(', ') ??
        '';
    final primaryArtistsId = (artistMap['primary_artists'] as List<dynamic>?)
            ?.map((a) => a['id'] as String)
            .join(', ') ??
        '';

    // Extract featured artists
    final featuredArtists = (artistMap['featured_artists'] as List<dynamic>?)
            ?.map((a) => a['name'] as String)
            .join(', ') ??
        '';
    final featuredArtistsId = (artistMap['featured_artists'] as List<dynamic>?)
            ?.map((a) => a['id'] as String)
            .join(', ') ??
        '';

    return SongResponse(
      id: json['id'] as String? ?? '',
      name: json['title'] as String?,
      type: json['type'] as String? ?? 'song',
      album: SongResponseAlbum(
        id: moreInfo['album_id'] as String? ?? '',
        name: moreInfo['album'] as String? ?? '',
        url: moreInfo['album_url'] as String? ?? '',
      ),
      year: json['year'] as String? ?? '',
      releaseDate: moreInfo['release_date'] as String? ?? '',
      duration: moreInfo['duration'] as String? ?? '',
      label: moreInfo['label'] as String? ?? '',
      primaryArtists: primaryArtists,
      primaryArtistsId: primaryArtistsId,
      featuredArtists: featuredArtists,
      featuredArtistsId: featuredArtistsId,
      explicitContent:
          int.tryParse(json['explicit_content'] as String? ?? '0') ?? 0,
      playCount: json['play_count']?.toString(),
      language: json['language'] as String? ?? '',
      hasLyrics: moreInfo['has_lyrics'] as String? ?? 'false',
      url: json['perma_url'] as String? ?? '',
      copyright: moreInfo['copyright_text'] as String? ?? '',
      image: createImageLinks(json['image'] as String? ?? ''),
      downloadUrl: createDownloadLinks(
        moreInfo['encrypted_media_url'] as String? ?? '',
      ),
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
}
