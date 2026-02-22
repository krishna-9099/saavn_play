import 'package:json_annotation/json_annotation.dart';

part 'image.g.dart';

/// Represents a download link with quality information.
///
/// Used for both image URLs and media download URLs,
/// providing different quality options.
@JsonSerializable()
class DownloadLink {
  /// Quality identifier (e.g., "12kbps", "48kbps", "96kbps", "320kbps" for audio;
  /// "50x50", "150x150", "500x500" for images).
  String quality;

  /// The URL to download the resource.
  String link;

  DownloadLink({required this.quality, required this.link});

  /// Creates a DownloadLink from a JSON map.
  factory DownloadLink.fromJson(Map<String, dynamic> json) =>
      _$DownloadLinkFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$DownloadLinkToJson(this);
}
