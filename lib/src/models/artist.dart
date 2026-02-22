import 'package:saavn_play/src/models/album.dart';
import 'package:saavn_play/src/models/image.dart';
import 'package:saavn_play/src/models/song.dart';
import 'package:saavn_play/src/utils/link.dart';
import 'package:json_annotation/json_annotation.dart';

part 'artist.g.dart';

/// Response model for artist search requests.
///
/// Contains pagination information and a list of artist results.
@JsonSerializable()
class ArtistSearchRequest {
  /// Total number of results available.
  int total;

  /// Starting index for pagination.
  int start;

  /// List of artist results.
  List<ArtistRequest> results;

  ArtistSearchRequest(
      {required this.total, required this.start, required this.results});

  /// Creates an ArtistSearchRequest from a JSON map.
  factory ArtistSearchRequest.fromJson(Map<String, dynamic> json) =>
      _$ArtistSearchRequestFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistSearchRequestToJson(this);
}

/// Response model for artist search results.
///
/// Contains pagination information and formatted artist responses.
@JsonSerializable()
class ArtistSearchResponse {
  /// Total number of results available.
  int total;

  /// Starting index for pagination.
  int start;

  /// List of artist responses.
  List<ArtistResponse> results;

  ArtistSearchResponse(
      {required this.total, required this.start, required this.results});

  /// Creates an ArtistSearchResponse from a JSON map.
  factory ArtistSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$ArtistSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistSearchResponseToJson(this);
}

/// Response model for artist songs.
///
/// Contains pagination information and a list of songs by an artist.
@JsonSerializable()
class ArtistSongResponse {
  /// Total number of songs available.
  int total;

  /// Whether this is the last page of results.
  @JsonKey(name: 'last_page')
  bool lastPage;

  /// List of song responses.
  List<SongResponse> results;

  ArtistSongResponse(
      {required this.total, required this.lastPage, required this.results});

  /// Creates an ArtistSongResponse from a JSON map.
  factory ArtistSongResponse.fromJson(Map<String, dynamic> json) =>
      _$ArtistSongResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistSongResponseToJson(this);
}

/// Response model for artist albums.
///
/// Contains pagination information and a list of albums by an artist.
@JsonSerializable()
class ArtistAlbumResponse {
  /// Total number of albums available.
  int total;

  /// Whether this is the last page of results.
  @JsonKey(name: 'last_page')
  bool lastPage;

  /// List of album responses.
  List<AlbumResponse> results;

  ArtistAlbumResponse(
      {required this.total, required this.lastPage, required this.results});

  /// Creates an ArtistAlbumResponse from a JSON map.
  factory ArtistAlbumResponse.fromJson(Map<String, dynamic> json) =>
      _$ArtistAlbumResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistAlbumResponseToJson(this);
}

/// Represents a music artist from JioSaavn.
///
/// Contains basic artist information including name, image, and type.
@JsonSerializable()
class Artist {
  /// Unique identifier for the artist.
  String? id;

  /// Name of the artist.
  String name;

  /// Click-through rate (internal metric).
  double? ctr;

  /// Entity type identifier.
  int? entity;

  /// URL to the artist's image.
  String? image;

  /// Role of the artist (singer, composer, etc.).
  String? role;

  /// Permanent URL to the artist page.
  @JsonKey(name: 'perma_url')
  String? permaUrl;

  /// Type of the artist entity.
  String type;

  /// Whether this is a mini object.
  @JsonKey(name: 'mini_obj')
  bool? miniObj;

  /// Whether radio is available for this artist.
  @JsonKey(name: 'is_radio_present')
  bool? isRadioPresent;

  /// Whether the user follows this artist.
  @JsonKey(name: 'is_followed')
  bool? isFollowed;

  Artist({
    this.id,
    required this.name,
    this.image,
    this.role,
    this.permaUrl,
    required this.type,
    this.miniObj,
    this.ctr,
    this.entity,
    this.isRadioPresent,
    this.isFollowed,
  });

  /// Creates an Artist from a JSON map.
  factory Artist.fromJson(Map<String, dynamic> json) => _$ArtistFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistToJson(this);
}

/// Request model for artist songs.
///
/// Contains a list of songs with pagination information.
@JsonSerializable()
class ArtistSongRequest {
  /// List of songs by the artist.
  List<SongRequest> songs;

  /// Total number of songs.
  int total;

  /// Whether this is the last page.
  @JsonKey(name: 'last_page')
  bool lastPage;

  ArtistSongRequest(
      {required this.songs, required this.total, required this.lastPage});

  /// Creates an ArtistSongRequest from a JSON map.
  factory ArtistSongRequest.fromJson(Map<String, dynamic> json) =>
      _$ArtistSongRequestFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistSongRequestToJson(this);
}

/// Request model for artist albums.
///
/// Contains a list of albums with pagination information.
@JsonSerializable()
class ArtistAlbumRequest {
  /// List of albums by the artist.
  List<AlbumRequest> albums;

  /// Total number of albums.
  int total;

  /// Whether this is the last page.
  @JsonKey(name: 'last_page')
  bool lastPage;

  ArtistAlbumRequest(
      {required this.albums, required this.total, required this.lastPage});

  /// Creates an ArtistAlbumRequest from a JSON map.
  factory ArtistAlbumRequest.fromJson(Map<String, dynamic> json) =>
      _$ArtistAlbumRequestFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistAlbumRequestToJson(this);
}

/// URLs for various artist-related pages.
///
/// Contains links to albums, bio, comments, songs, and overview pages.
@JsonSerializable()
class ArtistUrls {
  /// URL to the artist's albums page.
  String albums;

  /// URL to the artist's biography.
  String bio;

  /// URL to the comments section.
  String comments;

  /// URL to the artist's songs page.
  String songs;

  /// URL to the artist's overview page.
  String overview;

  ArtistUrls({
    required this.albums,
    required this.bio,
    required this.comments,
    required this.songs,
    required this.overview,
  });

  /// Creates an ArtistUrls from a JSON map.
  factory ArtistUrls.fromJson(Map<String, dynamic> json) =>
      _$ArtistUrlsFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistUrlsToJson(this);
}

/// Extended artist model for detailed artist information.
///
/// Contains additional metadata including follower count,
/// verification status, social media links, and top songs/albums.
@JsonSerializable()
class ArtistRequest extends Artist {
  /// Unique artist identifier.
  String? artistId;

  /// Subtitle or description.
  String? subtitle;

  /// Number of followers.
  @JsonKey(name: 'follower_count')
  String? followerCount;

  /// Whether the artist is verified.
  @JsonKey(name: 'is_verified')
  bool? isVerified;

  /// Dominant language of the artist's content.
  String? dominantLanguage;

  /// Dominant type of content.
  String? dominantType;

  static List<SongRequest>? _fromTopSongs(List? topSongs) {
    return topSongs
        ?.map((song) => SongRequest.fromArtistTopSong(song))
        .toList()
        .cast<SongRequest>();
  }

  /// Top songs by this artist.
  @JsonKey(fromJson: ArtistRequest._fromTopSongs)
  List<SongRequest>? topSongs;

  /// Top albums by this artist.
  List<AlbumRequest>? topAlbums;

  /// Artist biography.
  String? bio;

  /// Date of birth.
  String? dob;

  /// Facebook profile URL.
  String? fb;

  /// Twitter profile URL.
  String? twitter;

  /// Wikipedia page URL.
  String? wiki;

  /// Various URLs related to the artist.
  ArtistUrls? urls;

  /// Languages available for the artist's content.
  List<String>? availableLanguages;

  /// Number of fans.
  @JsonKey(name: 'fan_count')
  String? fanCount;

  ArtistRequest({
    this.artistId,
    this.subtitle,
    this.followerCount,
    this.isVerified,
    this.dominantLanguage,
    this.dominantType,
    this.topSongs,
    this.topAlbums,
    this.bio,
    this.dob,
    this.fb,
    this.twitter,
    this.wiki,
    this.urls,
    this.availableLanguages,
    this.fanCount,
    required super.id,
    required super.name,
    required super.ctr,
    required super.entity,
    required super.image,
    required super.role,
    super.permaUrl,
    required super.type,
    required super.miniObj,
    required super.isRadioPresent,
    required super.isFollowed,
  });

  /// Creates an ArtistRequest from a JSON map.
  factory ArtistRequest.fromJson(Map<String, dynamic> json) =>
      _$ArtistRequestFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ArtistRequestToJson(this);
}

/// Detailed artist response with formatted data.
///
/// Contains comprehensive artist information including images
/// in multiple sizes, social media links, and metadata.
@JsonSerializable()
class ArtistResponse {
  /// Unique identifier for the artist.
  String id;

  /// Name of the artist.
  String name;

  /// URL to the artist page.
  String? url;

  /// Role of the artist (singer, composer, etc.).
  String? role;

  /// Artist images in multiple sizes.
  List<DownloadLink>? image;

  /// Number of followers.
  @JsonKey(name: 'follower_count')
  String? followerCount;

  /// Number of fans.
  @JsonKey(name: 'fan_count')
  String? fanCount;

  /// Whether the artist is verified.
  @JsonKey(name: 'is_verified')
  bool? isVerified;

  /// Dominant language of the artist's content.
  String? dominantLanguage;

  /// Dominant type of content.
  String? dominantType;

  /// Artist biography.
  String? bio;

  /// Date of birth.
  String? dob;

  /// Facebook profile URL.
  String? fb;

  /// Twitter profile URL.
  String? twitter;

  /// Wikipedia page URL.
  String? wiki;

  /// Languages available for the artist's content.
  List<String>? availableLanguages;

  /// Whether radio is available for this artist.
  @JsonKey(name: 'is_radio_present')
  bool? isRadioPresent;

  ArtistResponse({
    required this.id,
    required this.name,
    this.url,
    this.role,
    this.image,
    this.followerCount,
    this.fanCount,
    this.isVerified,
    this.dominantLanguage,
    this.dominantType,
    this.bio,
    this.dob,
    this.fb,
    this.twitter,
    this.wiki,
    this.availableLanguages,
    this.isRadioPresent,
  });

  /// Creates an ArtistResponse from an ArtistRequest.
  factory ArtistResponse.fromArtistRequest(ArtistRequest artist) {
    return ArtistResponse(
      id: (artist.artistId ?? artist.id) as String,
      name: artist.name,
      url: artist.urls?.overview.isNotEmpty == true
          ? artist.urls!.overview
          : artist.permaUrl,
      role: artist.role,
      image: createImageLinks(artist.image),
      followerCount: artist.followerCount,
      fanCount: artist.fanCount,
      isVerified: artist.isVerified,
      dominantLanguage: artist.dominantLanguage,
      dominantType: artist.dominantType,
      bio: artist.bio, // this can be JSON
      dob: artist.dob,
      fb: artist.fb,
      twitter: artist.twitter,
      wiki: artist.wiki,
      availableLanguages: artist.availableLanguages,
      isRadioPresent: artist.isRadioPresent,
    );
  }

  /// Creates an ArtistResponse from a JSON map.
  factory ArtistResponse.fromJson(Map<String, dynamic> json) =>
      _$ArtistResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistResponseToJson(this);
}
