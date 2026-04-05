
import 'package:json_annotation/json_annotation.dart';
import 'package:saavn_play/src/models/playlist_item.dart';

part 'playlist_search_response.g.dart';

/// Response model for playlist search requests.
///
/// Contains pagination information and a list of playlist results.
/// Follows Single Responsibility Principle - handles only playlist search responses.
@JsonSerializable()
class PlaylistSearchResponse {
  /// Total number of results available.
  final int total;

  /// Starting index for pagination.
  final int start;

  /// List of playlist results.
  final List<PlaylistItem> results;

  PlaylistSearchResponse({
    required this.total,
    required this.start,
    required this.results,
  });

  /// Creates a PlaylistSearchResponse from a JSON map.
  factory PlaylistSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$PlaylistSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$PlaylistSearchResponseToJson(this);
}