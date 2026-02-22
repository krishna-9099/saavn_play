import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';

/// Model class representing a featured playlist item
class FeaturedPlaylistItem {
  FeaturedPlaylistItem({
    required this.listid,
    required this.listname,
    this.secondarySubtitle,
    this.firstname,
    this.dataType,
    this.count,
    this.image,
    this.sponsored,
    this.permaUrl,
    this.followerCount,
    this.uid,
    this.lastUpdated,
  });

  final String listid;
  final String listname;
  final String? secondarySubtitle;
  final String? firstname;
  final String? dataType;
  final int? count;
  final String? image;
  final bool? sponsored;
  final String? permaUrl;
  final String? followerCount;
  final String? uid;
  final int? lastUpdated;

  factory FeaturedPlaylistItem.fromJson(Map<String, dynamic> json) {
    return FeaturedPlaylistItem(
      listid: json['listid'] as String? ?? '',
      listname: json['listname'] as String? ?? '',
      secondarySubtitle: json['secondary_subtitle'] as String?,
      firstname: json['firstname'] as String?,
      dataType: json['data_type'] as String?,
      count: json['count'] as int?,
      image: json['image'] as String?,
      sponsored: json['sponsored'] as bool?,
      permaUrl: json['perma_url'] as String?,
      followerCount: json['follower_count'] as String?,
      uid: json['uid'] as String?,
      lastUpdated: json['last_updated'] as int?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'listid': listid,
      'listname': listname,
      'secondary_subtitle': secondarySubtitle,
      'firstname': firstname,
      'data_type': dataType,
      'count': count,
      'image': image,
      'sponsored': sponsored,
      'perma_url': permaUrl,
      'follower_count': followerCount,
      'uid': uid,
      'last_updated': lastUpdated,
    };
  }
}

/// Model class representing featured playlists response
class FeaturedPlaylistsResponse {
  FeaturedPlaylistsResponse({
    required this.data,
    required this.count,
    required this.lastPage,
  });

  final List<FeaturedPlaylistItem> data;
  final int count;
  final bool lastPage;

  factory FeaturedPlaylistsResponse.fromJson(Map<String, dynamic> json) {
    return FeaturedPlaylistsResponse(
      data: (json['data'] as List<dynamic>?)
              ?.map(
                (e) => FeaturedPlaylistItem.fromJson(e as Map<String, dynamic>),
              )
              .toList() ??
          [],
      count: json['count'] as int? ?? 0,
      lastPage: json['last_page'] as bool? ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'data': data.map((e) => e.toJson()).toList(),
      'count': count,
      'last_page': lastPage,
    };
  }
}

/// Endpoint class for saavn_play featured playlists
class FeaturedPlaylistEndpoint extends BaseClient {
  FeaturedPlaylistEndpoint([super.options]);

  /// Get featured playlists with optional filters
  ///
  /// [n] - Number of results per page (default: 30)
  /// [p] - Page number (default: 1)
  /// [language] - Filter by language (e.g., 'english', 'hindi', 'punjabi', 'tamil', 'telugu')
  /// [type] - Filter by playlist type (e.g., 'featured', 'weekly', 'daily', 'random')
  /// [category] - Filter by category (e.g., 'pop', 'rock', 'romantic', 'party', 'workout', 'chill')
  Future<FeaturedPlaylistsResponse> getFeaturedPlaylists({
    int? n,
    int? p,
    String? language,
    String? type,
    String? category,
  }) async {
    final response = await request(
      call: endpoints.featuredPlaylists,
      queryParameters: {
        if (n != null) 'n': n.toString(),
        if (p != null) 'p': p.toString(),
        if (language != null) 'language': language,
        if (type != null) 'type': type,
        if (category != null) 'category': category,
      },
    );

    return FeaturedPlaylistsResponse.fromJson(response);
  }
}
