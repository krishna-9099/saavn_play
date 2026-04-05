
import 'package:json_annotation/json_annotation.dart';

part 'song_item.g.dart';

/// Custom converter for boolean values to handle string-to-bool conversion.
bool _parseBool(dynamic json) {
  if (json == null) return false;
  return json is String ? json.toLowerCase() == 'true' : json as bool;
}

/// Custom converter for SongRights to handle type conversions.
SongRights? _parseSongRights(dynamic json) {
  if (json == null) return null;
  
  // Handle the case where code might be a String (e.g., "0") instead of a number
  final codeValue = json['code'];
  final code = codeValue is String ? int.tryParse(codeValue) ?? 0 : (codeValue as num).toInt();
  
  // Handle boolean fields that might be stored as strings
  final cacheableValue = json['cacheable'];
  final cacheable = cacheableValue is String 
      ? cacheableValue.toLowerCase() == 'true' 
      : cacheableValue as bool;
  
  final deleteCachedObjectValue = json['delete_cached_object'];
  final deleteCachedObject = deleteCachedObjectValue is String 
      ? deleteCachedObjectValue.toLowerCase() == 'true' 
      : deleteCachedObjectValue as bool;
  
  final reasonValue = json['reason'];
  
  return SongRights(
    code: code,
    cacheable: cacheable,
    deleteCachedObject: deleteCachedObject,
    reason: reasonValue as String,
  );
}

/// Individual song item from search results.
///
/// Contains basic song information including title, subtitle, type, image,
/// and permanent URL. Follows Single Responsibility Principle - handles only
/// individual song item data.
@JsonSerializable()
class SongItem {
  /// Unique identifier for the song.
  final String id;

  /// Title of the song.
  final String title;

  /// Subtitle containing artist information.
  final String subtitle;

  /// Header description (often empty).
  @JsonKey(name: 'header_desc')
  final String headerDesc;

  /// Type of content (always "song" for song items).
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
  final SongMoreInfo? moreInfo;

  /// Button tooltip information (usually empty array).
  @JsonKey(name: 'button_tooltip_info')
  final List<dynamic> buttonTooltipInfo;

  /// Pro HVA campaigns (usually empty array).
  @JsonKey(name: 'pro_hva_campaigns')
  final List<dynamic> proHvaCampaigns;

  SongItem({
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
    this.moreInfo,
    required this.buttonTooltipInfo,
    required this.proHvaCampaigns,
  });

  /// Creates a SongItem from a JSON map.
  factory SongItem.fromJson(Map<String, dynamic> json) =>
      _$SongItemFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongItemToJson(this);
}

/// Detailed metadata information for a song item.
///
/// Contains music composer, album information, rights, artist mapping,
/// and other detailed song metadata.
@JsonSerializable()
class SongMoreInfo {
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
  @JsonKey(name: 'rights', fromJson: _parseSongRights)
  final SongRights? rights;

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
  final SongArtistMap? artistMap;

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
  @JsonKey(name: 'webp', fromJson: _parseBool)
  final bool webp;

  /// Lyrics ID (can be null).
  final String? lyricsId;

  SongMoreInfo({
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

  /// Creates a SongMoreInfo from a JSON map.
  factory SongMoreInfo.fromJson(Map<String, dynamic> json) =>
      _$SongMoreInfoFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongMoreInfoToJson(this);
}

/// Content rights information for a song.
///
/// Contains rights code, cacheability, and restriction reasons.
@JsonSerializable(createFactory: false)
class SongRights {
  /// Rights code.
  final int code;

  /// Whether the content can be cached.
  final bool cacheable;

  /// Whether cached objects should be deleted.
  @JsonKey(name: 'delete_cached_object')
  final bool deleteCachedObject;

  /// Reason for rights restrictions.
  final String reason;

  SongRights({
    required this.code,
    required this.cacheable,
    required this.deleteCachedObject,
    required this.reason,
  });

  /// Creates a SongRights from a JSON map.
  factory SongRights.fromJson(Map<String, dynamic> json) {
    // Handle the case where code might be a String (e.g., "0") instead of a number
    final codeValue = json['code'];
    final code = codeValue is String ? int.tryParse(codeValue) ?? 0 : (codeValue as num).toInt();
    
    // Handle boolean fields that might be stored as strings
    final cacheableValue = json['cacheable'];
    final cacheable = cacheableValue is String 
        ? cacheableValue.toLowerCase() == 'true' 
        : cacheableValue as bool;
    
    final deleteCachedObjectValue = json['delete_cached_object'];
    final deleteCachedObject = deleteCachedObjectValue is String 
        ? deleteCachedObjectValue.toLowerCase() == 'true' 
        : deleteCachedObjectValue as bool;
    
    return SongRights(
      code: code,
      cacheable: cacheable,
      deleteCachedObject: deleteCachedObject,
      reason: json['reason'] as String,
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongRightsToJson(this);
}

/// Artist mapping containing detailed artist information for a song.
///
/// Contains primary artists, featured artists, and all artists.
@JsonSerializable()
class SongArtistMap {
  /// Primary artists.
  @JsonKey(name: 'primary_artists')
  final List<SongArtist> primaryArtists;

  /// Featured artists.
  @JsonKey(name: 'featured_artists')
  final List<SongArtist> featuredArtists;

  /// All artists (including singers, lyricists, etc.).
  final List<SongArtist> artists;

  SongArtistMap({
    required this.primaryArtists,
    required this.featuredArtists,
    required this.artists,
  });

  /// Creates a SongArtistMap from a JSON map.
  factory SongArtistMap.fromJson(Map<String, dynamic> json) =>
      _$SongArtistMapFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongArtistMapToJson(this);
}

/// Individual artist information for a song.
///
/// Contains artist ID, name, role, image, type, and permanent URL.
@JsonSerializable()
class SongArtist {
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

  SongArtist({
    required this.id,
    required this.name,
    required this.role,
    required this.image,
    required this.type,
    required this.permaUrl,
  });

  /// Creates a SongArtist from a JSON map.
  factory SongArtist.fromJson(Map<String, dynamic> json) =>
      _$SongArtistFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongArtistToJson(this);
}