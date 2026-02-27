import 'package:saavn_play/src/models/artist.dart';
import 'package:saavn_play/src/models/image.dart';
import 'package:saavn_play/src/models/song.dart';
import 'package:saavn_play/src/utils/link.dart';
import 'package:json_annotation/json_annotation.dart';

part 'album.g.dart';

String _stringOrEmpty(Object? value) => value?.toString() ?? '';
String? _stringOrNull(Object? value) => value?.toString();

List<SongRequest>? _songsFromJson(Object? value) {
  if (value is List) {
    return value
        .whereType<Map<String, dynamic>>()
        .map(SongRequest.fromJson)
        .toList();
  }
  return null;
}

/// Response model for album search requests.
///
/// Contains pagination information and a list of album results.
@JsonSerializable()
class AlbumSearchRequest {
  /// Total number of results available.
  int total;

  /// Starting index for pagination.
  int start;

  /// List of album results.
  List<AlbumRequest> results;

  AlbumSearchRequest(
      {required this.total, required this.start, required this.results});

  /// Creates an AlbumSearchRequest from a JSON map.
  factory AlbumSearchRequest.fromJson(Map<String, dynamic> json) =>
      _$AlbumSearchRequestFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$AlbumSearchRequestToJson(this);
}

/// Represents a music album from JioSaavn.
///
/// Contains basic album information including name, year, artists, and songs.
@JsonSerializable()
class Album {
  /// The name/title of the album.
  String? name;

  /// The release year of the album.
  String year;

  /// The release date of the album (if available).
  @JsonKey(name: 'release_date')
  String? releaseDate;

  /// Primary artists associated with the album.
  @JsonKey(name: 'primary_artists')
  String? primaryArtists;

  /// IDs of primary artists.
  @JsonKey(name: 'primary_artists_id')
  String? primaryArtistsId;

  /// The unique identifier for this album.
  @JsonKey(name: 'albumid')
  String? albumId;

  /// Permanent URL for the album.
  @JsonKey(name: 'perma_url')
  String permaUrl;

  /// URL to the album cover image.
  String image;

  /// List of songs in this album.
  List<SongRequest>? songs;

  Album({
    this.name,
    required this.year,
    this.releaseDate,
    this.primaryArtists,
    this.primaryArtistsId,
    this.albumId,
    required this.permaUrl,
    required this.image,
    this.songs,
  });

  /// Creates an Album from a JSON map.
  factory Album.fromJson(Map<String, dynamic> json) {
    return Album(
      name: _stringOrNull(json['name']),
      year: _stringOrEmpty(json['year']),
      releaseDate: _stringOrNull(json['release_date']),
      primaryArtists: _stringOrNull(json['primary_artists']),
      primaryArtistsId: _stringOrNull(json['primary_artists_id']),
      albumId: _stringOrNull(json['albumid']),
      permaUrl: _stringOrEmpty(json['perma_url']),
      image: _stringOrEmpty(json['image']),
      songs: _songsFromJson(json['songs']),
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$AlbumToJson(this);
}

/// Extended album model for search results.
///
/// Contains additional metadata from search results including
/// play count, language, and more detailed information.
@JsonSerializable()
class AlbumRequest extends Album {
  /// Unique identifier for the album request.
  String? id;

  /// Title of the album.
  String title;

  /// Subtitle or description.
  String? subtitle;

  /// Header description for display.
  @JsonKey(name: 'header_desc')
  String? headerDesc;

  /// Type of content (album, single, etc.).
  String? type;

  /// Language of the album content.
  String? language;

  /// Number of times the album has been played.
  @JsonKey(name: 'play_count')
  String? playCount;

  /// Explicit content rating.
  @JsonKey(name: 'explicit_content')
  String? explicitContent;

  /// Number of songs in the list.
  @JsonKey(name: 'list_count')
  String? listCount;

  /// Type of the list.
  @JsonKey(name: 'list_type')
  String? listType;

  /// List identifier.
  String? list;

  /// Additional information about the album.
  @JsonKey(name: 'more_info')
  MoreInfo? moreInfo;

  AlbumRequest({
    this.id,
    this.subtitle,
    this.moreInfo,
    required this.title,
    this.headerDesc,
    this.type,
    this.language,
    this.playCount,
    this.explicitContent,
    this.listCount,
    this.listType,
    this.list,
    // Properties from the parent class Album
    required super.name,
    required super.year,
    required super.releaseDate,
    required super.primaryArtists,
    required super.primaryArtistsId,
    required super.albumId,
    required super.permaUrl,
    required super.image,
    required super.songs,
  });

  /// Creates an AlbumRequest from a JSON map.
  factory AlbumRequest.fromJson(Map<String, dynamic> json) {
    final titleValue = json['title'] ?? json['name'];
    return AlbumRequest(
      id: _stringOrNull(json['id']),
      subtitle: _stringOrNull(json['subtitle']),
      moreInfo: json['more_info'] == null
          ? null
          : MoreInfo.fromJson(json['more_info'] as Map<String, dynamic>),
      title: _stringOrEmpty(titleValue),
      headerDesc: _stringOrNull(json['header_desc']),
      type: _stringOrNull(json['type']),
      language: _stringOrNull(json['language']),
      playCount: _stringOrNull(json['play_count']),
      explicitContent: _stringOrNull(json['explicit_content']),
      listCount: _stringOrNull(json['list_count']),
      listType: _stringOrNull(json['list_type']),
      list: _stringOrNull(json['list']),
      name: _stringOrNull(json['name']),
      year: _stringOrEmpty(json['year']),
      releaseDate: _stringOrNull(json['release_date']),
      primaryArtists: _stringOrNull(json['primary_artists']),
      primaryArtistsId: _stringOrNull(json['primary_artists_id']),
      albumId: _stringOrNull(json['albumid']),
      permaUrl: _stringOrEmpty(json['perma_url']),
      image: _stringOrEmpty(json['image']),
      songs: _songsFromJson(json['songs']),
    );
  }

  @override
  Map<String, dynamic> toJson() => _$AlbumRequestToJson(this);
}

/// Response model for album search results.
///
/// Contains pagination information and a list of formatted album responses.
@JsonSerializable()
class AlbumSearchResponse {
  /// Total number of results available.
  int total;

  /// Starting index for pagination.
  int start;

  /// List of album responses.
  List<AlbumResponse> results;

  AlbumSearchResponse(
      {required this.total, required this.start, required this.results});

  /// Creates an AlbumSearchResponse from a JSON map.
  factory AlbumSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$AlbumSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$AlbumSearchResponseToJson(this);
}

/// Detailed album response with formatted data.
///
/// Contains comprehensive album information including artists,
/// songs, images in multiple sizes, and metadata.
@JsonSerializable()
class AlbumResponse {
  /// Unique identifier for the album.
  String id;

  /// Name/title of the album.
  String name;

  /// Subtitle or secondary title for the album.
  String? subtitle;

  /// Header description text for the album.
  @JsonKey(name: 'header_desc')
  String? headerDesc;

  /// Release year of the album.
  String year;

  /// Type of content (album, single, etc.).
  String? type;

  /// Number of times the album has been played.
  @JsonKey(name: 'play_count')
  String? playCount;

  /// Language of the album content.
  String? language;

  /// Explicit content rating.
  @JsonKey(name: 'explicit_content')
  String? explicitContent;

  /// IDs of primary artists.
  @JsonKey(name: 'primary_artists_id')
  String? primaryArtistsId;

  /// List of primary artists with details.
  @JsonKey(name: 'primary_artists')
  List<AlbumArtistResponse> primaryArtists;

  /// List of all artists.
  List<AlbumArtistResponse> artists;

  /// List of featured artists.
  @JsonKey(name: 'featured_artists')
  List<AlbumArtistResponse> featuredArtists;

  /// Number of songs in the album.
  @JsonKey(name: 'song_count')
  String songCount;

  /// Release date of the album.
  @JsonKey(name: 'release_date')
  String? releaseDate;

  /// Album cover images in multiple sizes.
  List<DownloadLink>? image;

  /// URL to the album page.
  String url;

  /// List of songs in the album.
  List<SongResponse> songs;

  AlbumResponse({
    required this.id,
    required this.name,
    this.subtitle,
    this.headerDesc,
    required this.year,
    this.type,
    this.playCount,
    this.language,
    this.explicitContent,
    this.primaryArtistsId,
    required this.primaryArtists,
    required this.artists,
    required this.featuredArtists,
    required this.songCount,
    this.releaseDate,
    this.image,
    required this.url,
    required this.songs,
  });

  /// Creates an AlbumResponse from an AlbumRequest.
  factory AlbumResponse.fromAlbumRequest(AlbumRequest album) {
    return AlbumResponse(
      id: album.albumId ?? album.id ?? '',
      name: album.title,
      subtitle: album.subtitle,
      headerDesc: album.headerDesc,
      year: album.year,
      type: album.type,
      releaseDate: album.releaseDate,
      playCount: album.playCount,
      language: album.language,
      explicitContent: album.explicitContent,
      songCount:
          album.moreInfo?.songCount ?? album.songs?.length.toString() ?? '0',
      url: album.permaUrl,
      primaryArtistsId: album.primaryArtists,
      primaryArtists: album.moreInfo?.artistMap?.primaryArtists
              ?.map(
                (artist) => AlbumArtistResponse.fromArtist(artist),
              )
              .toList() ??
          [],
      featuredArtists: album.moreInfo?.artistMap?.featuredArtists
              ?.map(
                (artist) => AlbumArtistResponse.fromArtist(artist),
              )
              .toList() ??
          [],
      artists: album.moreInfo?.artistMap?.artists
              ?.map(
                (artist) => AlbumArtistResponse.fromArtist(artist),
              )
              .toList() ??
          [],
      image: createImageLinks(album.image),
      songs: [
        if (album.songs != null)
          for (final song in album.songs!) SongResponse.fromSongRequest(song),
      ],
    );
  }

  /// Creates an AlbumResponse from a JSON map.
  factory AlbumResponse.fromJson(Map<String, dynamic> json) =>
      _$AlbumResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$AlbumResponseToJson(this);
}

/// Artist information in album responses.
///
/// Contains artist details including ID, name, role, and images.
@JsonSerializable()
class AlbumArtistResponse {
  /// Unique identifier for the artist.
  String id;

  /// Name of the artist.
  String name;

  /// Role of the artist (singer, composer, etc.).
  String? role;

  /// Artist images in multiple sizes.
  List<DownloadLink>? image;

  /// Type of the artist entity.
  String type;

  /// URL to the artist page.
  String? url;

  AlbumArtistResponse({
    required this.id,
    required this.name,
    this.role,
    this.image,
    required this.type,
    this.url,
  });

  /// Creates an AlbumArtistResponse from an Artist object.
  factory AlbumArtistResponse.fromArtist(Artist artist) {
    return AlbumArtistResponse(
      id: artist.id!,
      name: artist.name,
      url: artist.permaUrl,
      type: artist.type,
      role: artist.role,
      image: createImageLinks(artist.image),
    );
  }

  /// Creates an AlbumArtistResponse from a JSON map.
  factory AlbumArtistResponse.fromJson(Map<String, dynamic> json) =>
      _$AlbumArtistResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$AlbumArtistResponseToJson(this);
}

/// Mapping of artists associated with a song or album.
///
/// Contains separate lists for primary artists, featured artists,
/// and all artists involved.
@JsonSerializable()
class ArtistMap {
  /// List of primary artists.
  @JsonKey(name: 'primary_artists')
  List<Artist>? primaryArtists;

  /// List of featured artists.
  @JsonKey(name: 'featured_artists')
  List<Artist>? featuredArtists;

  /// List of all artists.
  List<Artist>? artists;

  /// Raw map data when standard fields are not available.
  @JsonKey(includeFromJson: false, includeToJson: false)
  Map<String, dynamic>? map;

  ArtistMap({
    this.primaryArtists,
    this.featuredArtists,
    this.artists,
    this.map,
  });

  /// Creates an ArtistMap from a JSON map.
  factory ArtistMap.fromJson(Map<String, dynamic> json) => [
        'primary_artists',
        'featured_artists',
        'artists'
      ].every((key) => json[key] == null)
          ? ArtistMap(map: json)
          : _$ArtistMapFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => map != null ? map! : _$ArtistMapToJson(this);
}

/// Additional metadata for albums and songs.
///
/// Contains query information, text descriptions, and artist mappings.
@JsonSerializable()
class MoreInfo {
  /// Search query associated with this content.
  String query;

  /// Text description.
  String text;

  /// Music information.
  String? music;

  /// Number of songs.
  @JsonKey(name: 'song_count')
  String songCount;

  /// Mapping of artists.
  @JsonKey(name: 'artist_map')
  ArtistMap? artistMap;

  MoreInfo({
    required this.query,
    required this.text,
    this.music,
    required this.songCount,
    this.artistMap,
  });

  /// Creates a MoreInfo from a JSON map.
  factory MoreInfo.fromJson(Map<String, dynamic> json) {
    return MoreInfo(
      query: _stringOrEmpty(json['query']),
      text: _stringOrEmpty(json['text']),
      music: _stringOrNull(json['music']),
      songCount: _stringOrEmpty(json['song_count']),
      artistMap: json['artist_map'] == null
          ? null
          : ArtistMap.fromJson(json['artist_map'] as Map<String, dynamic>),
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$MoreInfoToJson(this);
}
