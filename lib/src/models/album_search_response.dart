
import 'package:saavn_play/src/models/album_item.dart';

import 'package:json_annotation/json_annotation.dart';

part 'album_search_response.g.dart';

/// Response model for album search requests.
///
/// Contains pagination information and a list of album results.
/// Follows Single Responsibility Principle - handles only album search responses.
@JsonSerializable()
class AlbumSearchResponse {
  /// Total number of results available.
  final int total;

  /// Starting index for pagination.
  final int start;

  /// List of album results.
  final List<AlbumItem> results;

  AlbumSearchResponse({
    required this.total,
    required this.start,
    required this.results,
  });

  /// Creates an AlbumSearchResponse from a JSON map.
  factory AlbumSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$AlbumSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$AlbumSearchResponseToJson(this);
}