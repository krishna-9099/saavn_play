import 'package:saavn_play/src/models/image.dart';
import 'package:saavn_play/src/models/song.dart';
import 'package:saavn_play/src/utils/link.dart';
import 'package:json_annotation/json_annotation.dart';
part 'playlist.g.dart';

/// Response model for playlist search requests.
///
/// Contains pagination information and a list of playlist results.
@JsonSerializable()
class PlaylistSearchRequest {
  PlaylistSearchRequest({
    required this.total,
    required this.start,
    required this.results,
  });

  /// Total number of results available.
  final int total;

  /// Starting index for pagination.
  final int start;

  /// List of playlist results.
  final List<PlaylistRequest> results;

  /// Creates a PlaylistSearchRequest from a JSON map.
  factory PlaylistSearchRequest.fromJson(Map<String, dynamic> json) =>
      _$PlaylistSearchRequestFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$PlaylistSearchRequestToJson(this);
}

/// Extended playlist model for search results.
///
/// Contains additional metadata from search results.
@JsonSerializable()
class PlaylistRequest extends Playlist {
  PlaylistRequest({
    required this.artistName,
    required this.count,
    required this.language,
    required this.entityType,
    required this.entitySubType,
    required this.numsongs,
    required super.artists,
    required super.listid,
    required super.listname,
    required super.permaUrl,
    required super.followerCount,
    required super.uid,
    required super.lastUpdated,
    required super.username,
    required super.firstname,
    required super.lastname,
    required super.isFollowed,
    required super.isFY,
    required super.image,
    required super.share,
    required super.songs,
    required super.type,
    required super.listCount,
    required super.fanCount,
    required super.h2,
    required super.isDolbyPlaylist,
    required super.subheading,
    required super.subTypes,
    required super.images,
    required super.videoAvailable,
    required super.videoCount,
  });

  /// Names of artists featured in the playlist.
  @JsonKey(name: 'artist_name')
  final List<String>? artistName;

  /// Count of items.
  @JsonKey(name: 'count')
  final String? count;

  /// Language of the playlist content.
  @JsonKey(name: 'language')
  final String? language;

  /// Type of entity.
  @JsonKey(name: 'entity_type')
  final String? entityType;

  /// Sub-type of entity.
  @JsonKey(name: 'entity_sub_type')
  final String? entitySubType;

  /// Number of songs in the playlist.
  @JsonKey(name: 'numsongs')
  final dynamic numsongs;

  /// Creates a PlaylistRequest from a JSON map.
  factory PlaylistRequest.fromJson(Map<String, dynamic> json) =>
      _$PlaylistRequestFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$PlaylistRequestToJson(this);
}

/// Response model for playlist search results.
///
/// Contains pagination information and formatted playlist responses.
@JsonSerializable()
class PlaylistSearchResponse {
  PlaylistSearchResponse({
    required this.total,
    required this.start,
    required this.results,
  });

  /// Total number of results available.
  final int total;

  /// Starting index for pagination.
  final int start;

  /// List of playlist responses.
  final List<PlaylistResponse> results;

  /// Creates a PlaylistSearchResponse from a JSON map.
  factory PlaylistSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$PlaylistSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$PlaylistSearchResponseToJson(this);
}

/// Detailed playlist response with formatted data.
///
/// Contains comprehensive playlist information including images
/// in multiple sizes, songs, and metadata.
@JsonSerializable()
class PlaylistResponse {
  PlaylistResponse({
    required this.id,
    required this.userId,
    required this.name,
    required this.songCount,
    required this.fanCount,
    required this.followerCount,
    required this.username,
    required this.firstname,
    required this.language,
    required this.lastname,
    required this.shares,
    required this.image,
    required this.url,
    required this.songs,
  });

  /// Creates a PlaylistResponse from a PlaylistRequest.
  factory PlaylistResponse.fromPlaylistRequest(PlaylistRequest playlist) {
    return PlaylistResponse(
      id: playlist.listid ?? '',
      userId: playlist.uid ?? '',
      name: playlist.listname ?? '',
      songCount: (playlist.numsongs ?? playlist.listCount ?? '').toString(),
      fanCount: (playlist.fanCount ?? 0).toString(),
      followerCount: playlist.followerCount ?? '',
      username: playlist.username ?? '',
      firstname: playlist.firstname ?? '',
      language: playlist.language ?? '',
      lastname: playlist.lastname ?? '',
      shares: playlist.share ?? '',
      image: createImageLinks(playlist.image) ?? [],
      url: playlist.permaUrl ?? '',
      songs: playlist.songs
              ?.map((song) => SongResponse.fromSongRequest(song))
              .toList() ??
          [],
    );
  }

  /// Unique identifier for the playlist.
  final String id;

  /// User ID of the playlist creator.
  final String userId;

  /// Name of the playlist.
  final String name;

  /// Number of songs in the playlist.
  @JsonKey(name: 'song_count')
  final String songCount;

  /// Number of fans/followers.
  @JsonKey(name: 'fan_count')
  final String fanCount;

  /// Number of followers.
  @JsonKey(name: 'follower_count')
  final String followerCount;

  /// Username of the playlist creator.
  final String username;

  /// First name of the playlist creator.
  final String firstname;

  /// Language of the playlist content.
  final String language;

  /// Last name of the playlist creator.
  final String lastname;

  /// Number of shares.
  final String shares;

  /// Playlist cover images in multiple sizes.
  final List<DownloadLink> image;

  /// URL to the playlist page.
  final String url;

  /// List of songs in the playlist.
  final List<SongResponse> songs;

  /// Creates a PlaylistResponse from a JSON map.
  factory PlaylistResponse.fromJson(Map<String, dynamic> json) =>
      _$PlaylistResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$PlaylistResponseToJson(this);
}

/// Represents a music playlist from JioSaavn.
///
/// Contains playlist information including name, songs,
/// follower count, and metadata.
@JsonSerializable()
class Playlist {
  Playlist({
    required this.artists,
    required this.listid,
    required this.listname,
    required this.permaUrl,
    required this.followerCount,
    required this.uid,
    required this.lastUpdated,
    required this.username,
    required this.firstname,
    required this.lastname,
    required this.isFollowed,
    required this.isFY,
    required this.image,
    required this.share,
    required this.songs,
    required this.type,
    required this.listCount,
    required this.fanCount,
    required this.h2,
    required this.isDolbyPlaylist,
    required this.subheading,
    required this.subTypes,
    required this.images,
    required this.videoAvailable,
    required this.videoCount,
  });

  /// List of artists associated with the playlist.
  @JsonKey(defaultValue: <dynamic>[])
  final List<dynamic> artists;

  /// Unique identifier for the playlist.
  final String? listid;

  /// Name of the playlist.
  @JsonKey(name: 'listname')
  final String? listname;

  /// Permanent URL to the playlist.
  @JsonKey(name: 'perma_url')
  final String? permaUrl;

  /// Number of followers.
  @JsonKey(name: 'follower_count')
  final String? followerCount;

  /// User ID of the playlist creator.
  final String? uid;

  /// Last updated timestamp.
  @JsonKey(name: 'last_updated')
  final String? lastUpdated;

  /// Username of the playlist creator.
  final String? username;

  /// First name of the playlist creator.
  final String? firstname;

  /// Last name of the playlist creator.
  final String? lastname;

  /// Whether the user follows this playlist.
  @JsonKey(name: 'is_followed')
  final String? isFollowed;

  /// Whether this is a "For You" playlist.
  @JsonKey(name: 'isFY')
  final bool? isFY;

  /// URL to the playlist cover image.
  final String? image;

  /// Share count or token.
  final String? share;

  /// List of songs in the playlist.
  final List<SongRequest>? songs;

  /// Type of the playlist.
  final String? type;

  /// Number of items in the list.
  @JsonKey(name: 'list_count')
  final String? listCount;

  /// Number of fans.
  @JsonKey(name: 'fan_count')
  final int? fanCount;

  /// H2 heading data.
  @JsonKey(name: 'H2')
  final dynamic h2;

  /// Whether this is a Dolby playlist.
  @JsonKey(name: 'is_dolby_playlist')
  final bool? isDolbyPlaylist;

  /// Subheading text.
  final dynamic subheading;

  /// Sub-types of the playlist.
  @JsonKey(name: 'sub_types', defaultValue: <dynamic>[])
  final List<dynamic> subTypes;

  /// Additional images.
  @JsonKey(defaultValue: <dynamic>[])
  final List<dynamic> images;

  /// Whether video content is available.
  @JsonKey(name: 'video_available')
  final bool? videoAvailable;

  /// Number of videos.
  @JsonKey(name: 'video_count')
  final int? videoCount;

  /// Creates a Playlist from a JSON map.
  factory Playlist.fromJson(Map<String, dynamic> json) =>
      _$PlaylistFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$PlaylistToJson(this);
}
