import 'package:json_annotation/json_annotation.dart';

part 'album_item.g.dart';

/// Individual album item from search results.
///
/// Contains basic album information including title, subtitle, type, image,
/// and permanent URL. Follows Single Responsibility Principle - handles only
/// individual album item data.
@JsonSerializable()
class AlbumItem {
  /// Unique identifier for the album.
  final String id;

  /// Title of the album.
  final String title;

  /// Subtitle containing additional information (e.g., artist name).
  final String subtitle;

  /// Header description (often empty).
  @JsonKey(name: 'header_desc')
  final String headerDesc;

  /// Type of content (always "album" for album items).
  final String type;

  /// Permanent URL to the album page.
  @JsonKey(name: 'perma_url')
  final String permaUrl;

  /// URL to the album cover image.
  final String image;

  /// Language of the album content.
  final String language;

  /// Release year.
  final String year;

  /// Number of times played.
  @JsonKey(name: 'play_count')
  final String playCount;

  /// Explicit content rating (0, 1, or 2).
  @JsonKey(name: 'explicit_content')
  final String explicitContent;

  /// Number of songs in the list.
  @JsonKey(name: 'list_count')
  final String listCount;

  /// Type of the list.
  @JsonKey(name: 'list_type')
  final String listType;

  /// List data (usually empty).
  final String list;

  /// Additional metadata about the album.
  @JsonKey(name: 'more_info')
  final AlbumMoreInfo? moreInfo;

  /// Button tooltip information (usually empty array).
  @JsonKey(name: 'button_tooltip_info')
  final List<dynamic> buttonTooltipInfo;

  /// Pro HVA campaigns (usually empty array).
  @JsonKey(name: 'pro_hva_campaigns')
  final List<dynamic> proHvaCampaigns;

  AlbumItem({
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

  /// Creates an AlbumItem from a JSON map.
  factory AlbumItem.fromJson(Map<String, dynamic> json) =>
      _$AlbumItemFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$AlbumItemToJson(this);
}

/// Additional metadata for album items.
///
/// Contains query information, text descriptions, music details,
/// song count, and artist mappings.
@JsonSerializable()
class AlbumMoreInfo {
  /// Search query associated with this content.
  final String query;

  /// Text description.
  final String text;

  /// Music information (composer/producer).
  final String? music;

  /// Number of songs.
  @JsonKey(name: 'song_count')
  final String songCount;

  /// Mapping of artists associated with the album.
  @JsonKey(name: 'artist_map')
  final ArtistMap? artistMap;

  AlbumMoreInfo({
    required this.query,
    required this.text,
    this.music,
    required this.songCount,
    this.artistMap,
  });

  /// Creates an AlbumMoreInfo from a JSON map.
  factory AlbumMoreInfo.fromJson(Map<String, dynamic> json) =>
      _$AlbumMoreInfoFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$AlbumMoreInfoToJson(this);
}

/// Mapping of artists associated with an album.
///
/// Contains separate lists for primary artists, featured artists,
/// and all artists involved.
@JsonSerializable()
class ArtistMap {
  /// List of primary artists.
  @JsonKey(name: 'primary_artists')
  final List<ArtistInfo>? primaryArtists;

  /// List of featured artists.
  @JsonKey(name: 'featured_artists')
  final List<ArtistInfo>? featuredArtists;

  /// List of all artists.
  final List<ArtistInfo>? artists;

  ArtistMap({
    this.primaryArtists,
    this.featuredArtists,
    this.artists,
  });

  /// Creates an ArtistMap from a JSON map.
  factory ArtistMap.fromJson(Map<String, dynamic> json) =>
      _$ArtistMapFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistMapToJson(this);
}

/// Individual artist information in album responses.
///
/// Contains artist details including ID, name, role, and images.
@JsonSerializable()
class ArtistInfo {
  /// Unique identifier for the artist.
  final String id;

  /// Name of the artist.
  final String name;

  /// Role of the artist (singer, composer, etc.).
  final String? role;

  /// URL to the artist image.
  final String? image;

  /// Type of the artist entity.
  final String type;

  /// Permanent URL to the artist page.
  @JsonKey(name: 'perma_url')
  final String? permaUrl;

  ArtistInfo({
    required this.id,
    required this.name,
    this.role,
    this.image,
    required this.type,
    this.permaUrl,
  });

  /// Creates an ArtistInfo from a JSON map.
  factory ArtistInfo.fromJson(Map<String, dynamic> json) =>
      _$ArtistInfoFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistInfoToJson(this);
}