
import 'package:json_annotation/json_annotation.dart';
import 'package:saavn_play/src/models/song_item.dart';

part 'song_search_response.g.dart';

/// Response model for song search requests.
///
/// Contains pagination information and a list of song results.
/// Follows Single Responsibility Principle - handles only song search responses.
@JsonSerializable()
class SongSearchResponse {
  /// Total number of results available.
  final int total;

  /// Starting index for pagination.
  final int start;

  /// List of song results.
  final List<SongItem> results;

  SongSearchResponse({
    required this.total,
    required this.start,
    required this.results,
  });

  /// Creates a SongSearchResponse from a JSON map.
  factory SongSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$SongSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SongSearchResponseToJson(this);
}