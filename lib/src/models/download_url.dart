import 'package:json_annotation/json_annotation.dart';

part 'download_url.g.dart';

/// Represents a download URL with quality information for media files.
///
/// Used specifically for audio/video download URLs, providing different
/// quality options for media content.
@JsonSerializable()
class DownloadUrl {
  /// Quality identifier for the media file (e.g., "12kbps", "48kbps", "96kbps", "320kbps").
  final String quality;

  /// The URL to download the media file.
  final String link;

  /// Whether this is the default quality option.
  @JsonKey(name: 'isDefault')
  final bool isDefault;

  DownloadUrl({
    required this.quality,
    required this.link,
    this.isDefault = false,
  });

  /// Creates a DownloadUrl from a JSON map.
  factory DownloadUrl.fromJson(Map<String, dynamic> json) =>
      _$DownloadUrlFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$DownloadUrlToJson(this);

  /// Returns the bitrate as an integer if the quality string contains a number.
  /// For example, "320kbps" returns 320, "96kbps" returns 96.
  int? getBitrate() {
    final qualityLower = quality.toLowerCase();
    final kbpsMatch = RegExp(r'(\d+)kbps').firstMatch(qualityLower);
    if (kbpsMatch != null) {
      return int.tryParse(kbpsMatch.group(1) ?? '0');
    }
    return null;
  }

  /// Returns true if this is a high-quality audio file (320kbps or higher).
  bool isHighQuality() {
    final bitrate = getBitrate();
    return bitrate != null && bitrate >= 320;
  }

  /// Returns true if this is a low-quality audio file (128kbps or lower).
  bool isLowQuality() {
    final bitrate = getBitrate();
    return bitrate != null && bitrate <= 128;
  }
}