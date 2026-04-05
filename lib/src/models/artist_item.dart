import 'package:json_annotation/json_annotation.dart';

part 'artist_item.g.dart';

/// Individual artist item from search results.
///
/// Contains basic artist information including name, ID, role, image,
/// and permanent URL. Follows Single Responsibility Principle - handles only
/// individual artist item data.
@JsonSerializable()
class ArtistItem {
  /// Name of the artist.
  final String name;

  /// Unique identifier for the artist.
  final String id;

  /// Click-through rate (internal metric).
  final double? ctr;

  /// Entity type identifier.
  final int? entity;

  /// URL to the artist's image.
  final String? image;

  /// Role of the artist (singer, composer, etc.).
  final String? role;

  /// Permanent URL to the artist page.
  @JsonKey(name: 'perma_url')
  final String? permaUrl;

  /// Type of the artist entity.
  final String type;

  /// Whether this is a mini object.
  @JsonKey(name: 'mini_obj')
  final bool? miniObj;

  /// Whether radio is available for this artist.
  @JsonKey(name: 'is_radio_present')
  final bool? isRadioPresent;

  /// Whether the user follows this artist.
  @JsonKey(name: 'is_followed')
  final bool? isFollowed;

  ArtistItem({
    required this.name,
    required this.id,
    this.ctr,
    this.entity,
    this.image,
    this.role,
    this.permaUrl,
    required this.type,
    this.miniObj,
    this.isRadioPresent,
    this.isFollowed,
  });

  /// Creates an ArtistItem from a JSON map.
  factory ArtistItem.fromJson(Map<String, dynamic> json) =>
      _$ArtistItemFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistItemToJson(this);
}