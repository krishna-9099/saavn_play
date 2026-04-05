import 'package:json_annotation/json_annotation.dart';

part 'playlist_item.g.dart';

/// Individual playlist item from search results.
///
/// Contains basic playlist information including title, subtitle, type, image,
/// and permanent URL. Follows Single Responsibility Principle - handles only
/// individual playlist item data.
@JsonSerializable()
class PlaylistItem {
  /// Unique identifier for the playlist.
  final String id;

  /// Title of the playlist.
  final String title;

  /// Subtitle containing additional information (e.g., song count).
  final String subtitle;

  /// Type of content (always "playlist" for playlist items).
  final String type;

  /// URL to the playlist cover image.
  final String image;

  /// Permanent URL to the playlist page.
  @JsonKey(name: 'perma_url')
  final String permaUrl;

  /// Explicit content rating (0, 1, or 2).
  @JsonKey(name: 'explicit_content')
  final String explicitContent;

  /// Whether this is a mini object.
  @JsonKey(name: 'mini_obj')
  final bool miniObj;

  /// Number of songs (can be null).
  @JsonKey(name: 'numsongs')
  final dynamic numsongs;

  /// Additional metadata about the playlist.
  @JsonKey(name: 'more_info')
  final Map<String, dynamic>? moreInfo;

  PlaylistItem({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.type,
    required this.image,
    required this.permaUrl,
    required this.explicitContent,
    required this.miniObj,
    this.numsongs,
    this.moreInfo,
  });

  /// Creates a PlaylistItem from a JSON map.
  factory PlaylistItem.fromJson(Map<String, dynamic> json) =>
      _$PlaylistItemFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$PlaylistItemToJson(this);
}
