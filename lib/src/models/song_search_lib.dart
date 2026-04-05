
import 'package:json_annotation/json_annotation.dart';

part 'song_search_lib.g.dart';

/// Complete search response containing all song results with pagination.
///
/// Based on the existing lib_song_search.dart model.
/// Follows Single Responsibility Principle - handles only lib song search responses.
@JsonSerializable()
class LibSongSearchResponse {
  /// Total number of results available.
  final int total;

  /// Starting index for pagination.
  final int start;

  /// List of song results.
  final List<LibSongResult> results;

  LibSongSearchResponse({
    required this.total,
    required this.start,
    required this.results,
  });

  /// Creates a LibSongSearchResponse from a JSON map.
  factory LibSongSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$LibSongSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$LibSongSearchResponseToJson(this);
}

/// Individual song result from search with all available metadata.
///
/// Based on the existing lib_song_search.dart model.
/// Follows Single Responsibility Principle - handles only individual lib song results.
@JsonSerializable()
class LibSongResult {
  /// Unique identifier for the song.
  final String id;

  /// Title of the song.
  final String title;

  /// Subtitle containing artist information.
  final String subtitle;

  /// Header description (often empty).
  @JsonKey(name: 'header_desc')
  final String headerDesc;

  /// Type of content (always "song" for song results).
  final String type;

  /// Permanent URL to the song page.
  @JsonKey(name: 'perma_url')
  final String permaUrl;

  /// URL to the song cover image.
  final String image;

  /// Language of the song.
  final String language;

  /// Release year.
  final String year;

  /// Number of times played.
  @JsonKey(name: 'play_count')
  final String playCount;

  /// Explicit content rating (0, 1, or 2).
  @JsonKey(name: 'explicit_content')
  final String explicitContent;

  /// List count (usually 0).
  @JsonKey(name: 'list_count')
  final String listCount;

  /// List type (usually empty).
  @JsonKey(name: 'list_type')
  final String listType;

  /// List data (usually empty).
  final String list;

  /// Detailed metadata about the song.
  @JsonKey(name: 'more_info')
  final LibSongMoreInfo moreInfo;

  /// Button tooltip information (usually empty array).
  @JsonKey(name: 'button_tooltip_info')
  final List<dynamic> buttonTooltipInfo;

  /// Pro HVA campaigns (usually empty array).
  @JsonKey(name: 'pro_hva_campaigns')
  final List<dynamic> proHvaCampaigns;

  LibSongResult({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.headerDesc,
    required this.type,
    required this.permaUrl,
    required this.image,
    required this.language,
    required this.year,
    required this.playCount,
    required this.explicitContent,
    required this.listCount,
    required this.listType,
    required this.list,
    required this.moreInfo,
    required this.buttonTooltipInfo,
    required this.proHvaCampaigns,
  });

  /// Creates a LibSongResult from a JSON map.
  factory LibSongResult.fromJson(Map<String, dynamic> json) =>
      _$LibSongResultFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$LibSongResultToJson(this);
}

/// Detailed metadata information for a song.
///
/// Based on the existing lib_song_search.dart model.
/// Follows Single Responsibility Principle - handles only lib song metadata.
@JsonSerializable()
class LibSongMoreInfo {
  /// Music composer/producer.
  final String music;

  /// Album ID.
  @JsonKey(name: 'album_id')
  final String albumId;

  /// Album name.
  final String album;

  /// Record label.
  final String label;

  /// Label ID (can be null).
  final String? labelId;

  /// Origin/source of the song.
  final String origin;

  /// Whether the content is Dolby formatted.
  @JsonKey(name: 'is_dolby_content')
  final bool isDolbyContent;

  /// Whether 320kbps quality is available.
  @JsonKey(name: '320kbps')
  final String kbps320;

  /// Encrypted media URL for streaming.
  @JsonKey(name: 'encrypted_media_url')
  final String encryptedMediaUrl;

  /// Encrypted cache URL (usually empty).
  @JsonKey(name: 'encrypted_cache_url')
  final String encryptedCacheUrl;

  /// Encrypted DRM cache URL (usually empty).
  @JsonKey(name: 'encrypted_drm_cache_url')
  final String encryptedDrmCacheUrl;

  /// Encrypted DRM media URL.
  @JsonKey(name: 'encrypted_drm_media_url')
  final String encryptedDrmMediaUrl;

  /// URL to the album page.
  @JsonKey(name: 'album_url')
  final String albumUrl;

  /// Duration of the song in seconds.
  final String duration;

  /// Content rights information.
  final LibSongRights rights;

  /// Cache state (usually "false").
  @JsonKey(name: 'cache_state')
  final String cacheState;

  /// Whether lyrics are available.
  @JsonKey(name: 'has_lyrics')
  final String hasLyrics;

  /// Preview of the lyrics (usually empty).
  @JsonKey(name: 'lyrics_snippet')
  final String lyricsSnippet;

  /// Whether the song is starred by the user.
  final String starred;

  /// Copyright notice text.
  @JsonKey(name: 'copyright_text')
  final String copyrightText;

  /// Artist mapping with detailed artist information.
  @JsonKey(name: 'artist_map')
  final LibSongArtistMap artistMap;

  /// Release date (can be null).
  final dynamic releaseDate;

  /// Label URL.
  @JsonKey(name: 'label_url')
  final String labelUrl;

  /// Video code (can be null).
  final String? vcode;

  /// Video link (can be null).
  final String? vlink;

  /// Whether Triller integration is available.
  @JsonKey(name: 'triller_available')
  final bool trillerAvailable;

  /// Whether request jiotune flag is set.
  @JsonKey(name: 'request_jiotune_flag')
  final bool requestJiotuneFlag;

  /// Whether WebP image format is available.
  final bool webp;

  /// Lyrics ID (can be null).
  final String? lyricsId;

  LibSongMoreInfo({
    required this.music,
    required this.albumId,
    required this.album,
    required this.label,
    this.labelId,
    required this.origin,
    required this.isDolbyContent,
    required this.kbps320,
    required this.encryptedMediaUrl,
    required this.encryptedCacheUrl,
    required this.encryptedDrmCacheUrl,
    required this.encryptedDrmMediaUrl,
    required this.albumUrl,
    required this.duration,
    required this.rights,
    required this.cacheState,
    required this.hasLyrics,
    required this.lyricsSnippet,
    required this.starred,
    required this.copyrightText,
    required this.artistMap,
    this.releaseDate,
    required this.labelUrl,
    this.vcode,
    this.vlink,
    required this.trillerAvailable,
    required this.requestJiotuneFlag,
    required this.webp,
    this.lyricsId,
  });

  /// Creates a LibSongMoreInfo from a JSON map.
  factory LibSongMoreInfo.fromJson(Map<String, dynamic> json) =>
      _$LibSongMoreInfoFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$LibSongMoreInfoToJson(this);
}

/// Content rights information for a song.
///
/// Based on the existing lib_song_search.dart model.
/// Follows Single Responsibility Principle - handles only lib song rights.
@JsonSerializable()
class LibSongRights {
  /// Rights code.
  final int code;

  /// Whether the content can be cached.
  final bool cacheable;

  /// Whether cached objects should be deleted.
  @JsonKey(name: 'delete_cached_object')
  final bool deleteCachedObject;

  /// Reason for rights restrictions.
  final String reason;

  LibSongRights({
    required this.code,
    required this.cacheable,
    required this.deleteCachedObject,
    required this.reason,
  });

  /// Creates a LibSongRights from a JSON map.
  factory LibSongRights.fromJson(Map<String, dynamic> json) =>
      _$LibSongRightsFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$LibSongRightsToJson(this);
}

/// Artist mapping containing detailed artist information.
///
/// Based on the existing lib_song_search.dart model.
/// Follows Single Responsibility Principle - handles only lib song artist mapping.
@JsonSerializable()
class LibSongArtistMap {
  /// Primary artists.
  @JsonKey(name: 'primary_artists')
  final List<LibSongArtist> primaryArtists;

  /// Featured artists.
  @JsonKey(name: 'featured_artists')
  final List<LibSongArtist> featuredArtists;

  /// All artists (including singers, lyricists, etc.).
  final List<LibSongArtist> artists;

  LibSongArtistMap({
    required this.primaryArtists,
    required this.featuredArtists,
    required this.artists,
  });

  /// Creates a LibSongArtistMap from a JSON map.
  factory LibSongArtistMap.fromJson(Map<String, dynamic> json) =>
      _$LibSongArtistMapFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$LibSongArtistMapToJson(this);
}

/// Individual artist information.
///
/// Based on the existing lib_song_search.dart model.
/// Follows Single Responsibility Principle - handles only lib song artist information.
@JsonSerializable()
class LibSongArtist {
  /// Unique identifier for the artist.
  final String id;

  /// Name of the artist.
  final String name;

  /// Role of the artist (primary_artists, singer, lyricist, etc.).
  final String role;

  /// URL to the artist image.
  final String image;

  /// Type of artist (usually "artist").
  final String type;

  /// Permanent URL to the artist page.
  @JsonKey(name: 'perma_url')
  final String permaUrl;

  LibSongArtist({
    required this.id,
    required this.name,
    required this.role,
    required this.image,
    required this.type,
    required this.permaUrl,
  });

  /// Creates a LibSongArtist from a JSON map.
  factory LibSongArtist.fromJson(Map<String, dynamic> json) =>
      _$LibSongArtistFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$LibSongArtistToJson(this);
}