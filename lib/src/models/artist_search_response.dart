
import 'package:saavn_play/src/models/artist_item.dart';

import 'package:json_annotation/json_annotation.dart';

part 'artist_search_response.g.dart';

/// Response model for artist search requests.
///
/// Contains pagination information and a list of artist results.
/// Follows Single Responsibility Principle - handles only artist search responses.
@JsonSerializable()
class ArtistSearchResponse {
  /// Total number of results available.
  final int total;

  /// Starting index for pagination.
  final int start;

  /// List of artist results.
  final List<ArtistItem> results;

  ArtistSearchResponse({
    required this.total,
    required this.start,
    required this.results,
  });

  /// Creates an ArtistSearchResponse from a JSON map.
  factory ArtistSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$ArtistSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ArtistSearchResponseToJson(this);
}