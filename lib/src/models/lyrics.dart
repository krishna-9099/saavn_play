import 'package:json_annotation/json_annotation.dart';

part 'lyrics.g.dart';

/// Request model for song lyrics.
///
/// Contains the lyrics text, copyright information, and tracking URLs.
@JsonSerializable()
class LyricsRequest {
  /// The full lyrics text.
  String? lyrics;

  /// URL for script tracking.
  @JsonKey(name: 'script_tracking_url')
  String? scriptTrackingUrl;

  /// Copyright notice for the lyrics.
  @JsonKey(name: 'lyrics_copyright')
  String? lyricsCopyRight;

  /// A snippet/preview of the lyrics.
  String? snippet;

  LyricsRequest({
    this.lyrics,
    this.scriptTrackingUrl,
    this.lyricsCopyRight,
    this.snippet,
  });

  /// Creates a LyricsRequest from a JSON map.
  factory LyricsRequest.fromJson(Map<String, dynamic> json) =>
      _$LyricsRequestFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$LyricsRequestToJson(this);
}

/// Response model for song lyrics.
///
/// Contains formatted lyrics data with copyright information.
@JsonSerializable()
class LyricsResponse {
  /// The full lyrics text.
  String? lyrics;

  /// A snippet/preview of the lyrics.
  String? snippet;

  /// Copyright notice for the lyrics.
  String? copyright;

  LyricsResponse({
    required this.lyrics,
    required this.snippet,
    required this.copyright,
  });

  /// Creates a LyricsResponse from a JSON map.
  factory LyricsResponse.fromJson(Map<String, dynamic> json) =>
      _$LyricsResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$LyricsResponseToJson(this);
}
