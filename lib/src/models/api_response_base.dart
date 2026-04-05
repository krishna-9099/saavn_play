
/// Base class for all API response models.
///
/// Provides common functionality and structure for API responses.
/// Follows Single Responsibility Principle - handles only common API response patterns.
abstract class ApiResponseBase {
  /// Total number of results available.
  final int total;

  /// Starting index for pagination.
  final int start;

  ApiResponseBase({
    required this.total,
    required this.start,
  });

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson();
}

/// Base class for individual API response items.
///
/// Provides common functionality and structure for API response items.
/// Follows Single Responsibility Principle - handles only common API item patterns.
abstract class ApiItemBase {
  /// Unique identifier for the item.
  final String id;

  /// Type of content (song, artist, album, playlist).
  final String type;

  ApiItemBase({
    required this.id,
    required this.type,
  });

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson();
}

/// Common metadata for API response items.
///
/// Contains shared fields like image URLs, permanent URLs, and additional info.
/// Follows Single Responsibility Principle - handles only common metadata patterns.
class CommonMetadata {
  /// URL to the item cover image.
  final String image;

  /// Permanent URL to the item page.

  final String permaUrl;

  /// Additional metadata (can be null).

  final dynamic moreInfo;

  /// Button tooltip information (usually empty array).

  final List<dynamic> buttonTooltipInfo;

  /// Pro HVA campaigns (usually empty array).

  final List<dynamic> proHvaCampaigns;

  CommonMetadata({
    required this.image,
    required this.permaUrl,
    this.moreInfo,
    required this.buttonTooltipInfo,
    required this.proHvaCampaigns,
  });

  /// Creates a CommonMetadata from a JSON map.
  factory CommonMetadata.fromJson(Map<String, dynamic> json) {
    return CommonMetadata(
      image: json['image'] as String? ?? '',
      permaUrl: json['perma_url'] as String? ?? '',
      moreInfo: json['more_info'],
      buttonTooltipInfo: json['button_tooltip_info'] as List<dynamic>? ?? [],
      proHvaCampaigns: json['pro_hva_campaigns'] as List<dynamic>? ?? [],
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() {
    return {
      'image': image,
      'perma_url': permaUrl,
      'more_info': moreInfo,
      'button_tooltip_info': buttonTooltipInfo,
      'pro_hva_campaigns': proHvaCampaigns,
    };
  }
}