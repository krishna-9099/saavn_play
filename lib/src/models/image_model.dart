import 'package:json_annotation/json_annotation.dart';

part 'image_model.g.dart';

/// Represents an image with quality information and dimensions.
///
/// Used specifically for image URLs, providing different quality options
/// and dimension information for visual content.
@JsonSerializable()
class ImageModel {
  /// Quality identifier for the image (e.g., "50x50", "150x150", "500x500").
  final String quality;

  /// The URL to the image file.
  final String link;

  /// Width of the image in pixels (can be null if not available).
  final int? width;

  /// Height of the image in pixels (can be null if not available).
  final int? height;

  /// Whether this is the default image quality.
  @JsonKey(name: 'isDefault')
  final bool isDefault;

  ImageModel({
    required this.quality,
    required this.link,
    this.width,
    this.height,
    this.isDefault = false,
  });

  /// Creates an ImageModel from a JSON map.
  factory ImageModel.fromJson(Map<String, dynamic> json) =>
      _$ImageModelFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$ImageModelToJson(this);

  /// Returns the width and height as a Size object if both are available.
  Size? getSize() {
    if (width != null && height != null) {
      return Size(width!, height!);
    }
    return null;
  }

  /// Returns true if this is a high-resolution image (width >= 500 or height >= 500).
  bool isHighResolution() {
    return (width != null && width! >= 500) || (height != null && height! >= 500);
  }

  /// Returns true if this is a low-resolution image (width <= 100 and height <= 100).
  bool isLowResolution() {
    return (width != null && width! <= 100) && (height != null && height! <= 100);
  }

  /// Returns the aspect ratio (width/height) if both dimensions are available.
  double? getAspectRatio() {
    if (width != null && height != null && height! > 0) {
      return width! / height!;
    }
    return null;
  }
}

/// Simple size class to represent width and height.
class Size {
  final int width;
  final int height;

  Size(this.width, this.height);

  @override
  String toString() => 'Size(${width}x$height)';
}