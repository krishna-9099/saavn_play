import 'package:saavn_play/src/models/album.dart';
import 'package:saavn_play/src/models/image.dart';
import 'package:saavn_play/src/utils/link.dart';
import 'package:json_annotation/json_annotation.dart';

part 'song.g.dart'; // Make sure to replace 'song_interface' with your actual file name.

/// Response model for song search requests.
///
/// Contains pagination information and a list of song results.
@JsonSerializable()
class SongSearchRequest {
  /// Total number of results available.
  int total;

  /// Starting index for pagination.
  int start;

  /// List of song results.
  List<SongRequest> results;

  SongSearchRequest(
      {required this.total, required this.start, required this.results});

  /// Creates a SongSearchRequest from a JSON map.
  factory SongSearchRequest.fromJson(Map<String, dynamic> json) =>
      _$SongSearchRequestFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongSearchRequestToJson(this);
}

/// Represents a song from JioSaavn.
///
/// Contains detailed song information including metadata,
/// artists, album information, and media URLs.
@JsonSerializable()
class SongRequest {
  /// Unique identifier for the song.
  String id;

  /// Type of content (song, etc.).
  String type;

  /// Title of the song.
  String song;

  /// Name of the album.
  String album;

  /// Release year.
  String year;

  /// Music composer/producer.
  String music;

  /// Music identifier.
  @JsonKey(name: 'music_id')
  String? musicId;

  /// Primary artists string.
  @JsonKey(name: 'primary_artists')
  String primaryArtists;

  /// Primary artists IDs.
  @JsonKey(name: 'primary_artists_id')
  String primaryArtistsId;

  /// Featured artists string.
  @JsonKey(name: 'featured_artists')
  String featuredArtists;

  /// Featured artists IDs.
  @JsonKey(name: 'featured_artists_id')
  String featuredArtistsId;

  /// Singers/performers.
  String singers;

  /// Starring actors (for film songs).
  String? starring;

  /// URL to the song cover image.
  String image;

  /// Record label.
  String label;

  /// Album identifier.
  @JsonKey(name: 'albumid')
  String albumId;

  /// Language of the song.
  String language;

  /// Origin/source of the song.
  String origin;

  /// Number of times played.
  @JsonKey(name: 'play_count', fromJson: SongRequest._toString)
  String? playCount;

  /// Copyright notice text.
  @JsonKey(name: 'copyright_text')
  String copyrightText;

  /// Whether 320kbps quality is available.
  @JsonKey(name: '320kbps')
  String kbps320;

  /// Whether the content is Dolby formatted.
  @JsonKey(name: 'is_dolby_content')
  bool isDolbyContent;

  /// Explicit content rating (0, 1, or 2).
  @JsonKey(name: 'explicit_content')
  int explicitContent;

  /// Whether lyrics are available.
  @JsonKey(name: 'has_lyrics')
  String hasLyrics;

  /// Preview of the lyrics.
  @JsonKey(name: 'lyrics_snippet')
  String lyricsSnippet;

  /// Encrypted media URL for streaming.
  @JsonKey(name: 'encrypted_media_url')
  String encryptedMediaUrl;

  static bool _fromBoolOrString(Object? value) {
    if (value is bool) {
      return value;
    }
    return bool.parse(value as String);
  }

  static String? _toString(Object? obj) => obj?.toString();

  /// Encrypted path to media file.
  @JsonKey(
    name: 'encrypted_media_path',
    fromJson: SongRequest._toString,
  )
  String? encryptedMediaPath;

  /// Preview URL for the media.
  @JsonKey(name: 'media_preview_url')
  String? mediaPreviewUrl;

  /// Permanent URL to the song.
  @JsonKey(name: 'perma_url')
  String permaUrl;

  /// URL to the album page.
  @JsonKey(name: 'album_url')
  String albumUrl;

  /// Duration of the song in seconds.
  String duration;

  /// Mapping of artists associated with this song.
  ArtistMap artistMap; // exclusion for snake_case

  /// Content rights information.
  Rights rights;

  /// Whether WebP image format is available.
  bool? webp;

  /// Cache state of the song.
  @JsonKey(name: 'cache_state')
  String? cacheState;

  /// Whether the song is starred by the user.
  String starred;

  /// Release date of the song.
  @JsonKey(name: 'release_date')
  // don't know about the actual type it is almost always null
  dynamic releaseDate;

  /// Video code (if available).
  String? vcode;

  /// Video link (if available).
  String? vlink;

  /// Whether Triller integration is available.
  @JsonKey(name: 'triller_available')
  bool trillerAvailable;

  /// URL to the record label page.
  @JsonKey(name: 'label_url')
  String labelUrl;

  SongRequest({
    required this.id,
    required this.type,
    required this.song,
    required this.album,
    required this.year,
    required this.music,
    required this.musicId,
    required this.primaryArtists,
    required this.primaryArtistsId,
    required this.featuredArtists,
    required this.featuredArtistsId,
    required this.singers,
    this.starring,
    required this.image,
    required this.label,
    required this.albumId,
    required this.language,
    required this.origin,
    this.playCount,
    required this.copyrightText,
    required this.kbps320,
    required this.isDolbyContent,
    required this.explicitContent,
    required this.hasLyrics,
    required this.lyricsSnippet,
    required this.encryptedMediaUrl,
    required this.encryptedMediaPath,
    this.mediaPreviewUrl,
    required this.permaUrl,
    required this.albumUrl,
    required this.duration,
    required this.artistMap,
    required this.rights,
    this.webp,
    this.cacheState,
    required this.starred,
    required this.releaseDate,
    this.vcode,
    this.vlink,
    required this.trillerAvailable,
    required this.labelUrl,
  });

  /// Creates a SongRequest from an artist's top song JSON.
  factory SongRequest.fromArtistTopSong(Map<String, dynamic> json) {
    final moreInfo = json['more_info'];

    final artistMap = ArtistMap.fromJson(moreInfo['artistMap']);
    return SongRequest(
      id: json['id'],
      album: moreInfo['album'],
      albumId: moreInfo['album_id'],
      albumUrl: moreInfo['album_url'],
      artistMap: artistMap,
      copyrightText: moreInfo['copyright_text'],
      duration: moreInfo['duration'],
      encryptedMediaPath: json['encrypted_media_path']?.toString(),
      encryptedMediaUrl: moreInfo['encrypted_media_url'],
      explicitContent: int.parse(json['explicit_content']),
      featuredArtists:
          artistMap.featuredArtists!.map((artist) => artist.name).join(', '),
      featuredArtistsId:
          artistMap.featuredArtists!.map((artist) => artist.id).join(', '),
      hasLyrics: moreInfo['has_lyrics'],
      image: json['image'],
      isDolbyContent: moreInfo['is_dolby_content'],
      kbps320: moreInfo['320kbps'],
      label: moreInfo['label'],
      labelUrl: moreInfo['label_url'],
      language: json['language'],
      lyricsSnippet: moreInfo['lyrics_snippet'],
      music: moreInfo['music'],
      musicId: json['id'],
      origin: moreInfo['origin'],
      permaUrl: json['perma_url'],
      playCount: json['play_count'],
      primaryArtists:
          artistMap.primaryArtists!.map((artist) => artist.name).join(', '),
      primaryArtistsId:
          artistMap.primaryArtists!.map((artist) => artist.id).join(', '),
      releaseDate: moreInfo['release_date'],
      rights: Rights.fromJson(moreInfo['rights']),
      singers: artistMap.artists!.map((artist) => artist.name).join(', '),
      song: json['title'],
      starred: moreInfo['starred'],
      starring: moreInfo['starring'],
      trillerAvailable: moreInfo['triller_available'],
      type: json['type'] as String,
      year: json['year'] as String,
      cacheState: moreInfo['cache_state'] as String?,
      mediaPreviewUrl: '',
      vcode: moreInfo['vcode'] as String?,
      vlink: moreInfo['vlink'] as String?,
      webp: bool.parse(moreInfo['webp'] as String),
    );
  }

  /// Creates a SongRequest from a JSON map.
  factory SongRequest.fromJson(Map<String, dynamic> json) =>
      _$SongRequestFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongRequestToJson(this);
}

/// Content rights information for a song.
///
/// Specifies what actions are allowed with the content.
@JsonSerializable()
class Rights {
  static int _fromIntOrString(Object? value) {
    if (value is int) {
      return value;
    }
    return int.parse(value as String);
  }

  /// Rights code.
  @JsonKey(fromJson: Rights._fromIntOrString)
  int code;

  /// Reason for rights restrictions.
  String reason;

  /// Whether the content can be cached.
  @JsonKey(fromJson: SongRequest._fromBoolOrString)
  bool cacheable;

  /// Whether cached objects should be deleted.
  @JsonKey(
    name: 'delete_cached_object',
    fromJson: SongRequest._fromBoolOrString,
  )
  bool deleteCachedObject;

  Rights({
    required this.code,
    required this.reason,
    required this.cacheable,
    required this.deleteCachedObject,
  });

  /// Creates a Rights from a JSON map.
  factory Rights.fromJson(Map<String, dynamic> json) => _$RightsFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$RightsToJson(this);
}

/// Response model for song search results.
///
/// Contains pagination information and formatted song responses.
@JsonSerializable()
class SongSearchResponse {
  /// Total number of results available.
  int total;

  /// Starting index for pagination.
  int start;

  /// List of song responses.
  List<SongResponse> results;

  SongSearchResponse(
      {required this.total, required this.start, required this.results});

  /// Creates a SongSearchResponse from a JSON map.
  factory SongSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$SongSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongSearchResponseToJson(this);
}

/// Detailed song response with formatted data.
///
/// Contains comprehensive song information including images
/// in multiple sizes, download links, and metadata.
@JsonSerializable()
class SongResponse {
  /// Unique identifier for the song.
  String id;

  /// Title of the song.
  String? name;

  /// Type of content.
  String type;

  /// Album information.
  SongResponseAlbum album;

  /// Release year.
  String year;

  /// Release date.
  @JsonKey(name: 'release_date')
  String releaseDate;

  /// Duration in seconds.
  String duration;

  /// Record label.
  String label;

  /// Primary artists string.
  @JsonKey(name: 'primary_artists')
  String primaryArtists;

  /// Primary artists IDs.
  @JsonKey(name: 'primary_artists_id')
  String primaryArtistsId;

  /// Featured artists string.
  @JsonKey(name: 'featured_artists')
  String featuredArtists;

  /// Featured artists IDs.
  @JsonKey(name: 'featured_artists_id')
  String featuredArtistsId;

  /// Explicit content rating.
  @JsonKey(name: 'explicit_content')
  int explicitContent;

  /// Number of times played.
  @JsonKey(name: 'play_count')
  String? playCount;

  /// Language of the song.
  String language;

  /// Whether lyrics are available.
  @JsonKey(name: 'has_lyrics')
  String hasLyrics;

  /// URL to the song page.
  String url;

  /// Copyright notice.
  String copyright;

  /// Song cover images in multiple sizes.
  List<DownloadLink>? image;

  /// Download links for various quality levels.
  @JsonKey(name: 'download_links')
  List<DownloadLink>? downloadUrl;

  SongResponse({
    required this.id,
    this.name,
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
    this.playCount,
    required this.language,
    required this.hasLyrics,
    required this.url,
    required this.copyright,
    this.image,
    this.downloadUrl,
  });

  /// Creates a SongResponse from a SongRequest.
  factory SongResponse.fromSongRequest(SongRequest song) {
    return SongResponse(
      id: song.id,
      name: song.song,
      type: song.type,
      album: SongResponseAlbum(
        id: song.albumId,
        name: song.album,
        url: song.albumUrl,
      ),
      year: song.year,
      releaseDate: song.releaseDate ?? '',
      duration: song.duration,
      label: song.label,
      primaryArtists: song.primaryArtists,
      primaryArtistsId: song.primaryArtistsId,
      featuredArtists: song.featuredArtists,
      featuredArtistsId: song.featuredArtistsId,
      explicitContent: song.explicitContent,
      playCount: song.playCount,
      language: song.language,
      hasLyrics: song.hasLyrics,
      url: song.permaUrl,
      copyright: song.copyrightText,
      image: createImageLinks(song.image),
      downloadUrl: createDownloadLinks(song.encryptedMediaUrl),
    );
  }

  /// Creates a SongResponse from a JSON map.
  factory SongResponse.fromJson(Map<String, dynamic> json) =>
      _$SongResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongResponseToJson(this);
}

/// Album information in song responses.
///
/// Contains basic album details including ID, name, and URL.
@JsonSerializable()
class SongResponseAlbum {
  /// Unique identifier for the album.
  String id;

  /// Name of the album.
  String name;

  /// URL to the album page.
  String url;

  SongResponseAlbum({
    required this.id,
    required this.name,
    required this.url,
  });

  /// Creates a SongResponseAlbum from a JSON map.
  factory SongResponseAlbum.fromJson(Map<String, dynamic> json) =>
      _$SongResponseAlbumFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongResponseAlbumToJson(this);
}
