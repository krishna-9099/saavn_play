import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';

/// Model class representing a podcast show
class PodcastShow {
  PodcastShow({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.type,
    required this.image,
    required this.permaUrl,
    required this.seasonNumber,
    required this.releaseDate,
    this.badge,
    required this.squareImage,
    required this.explicitContent,
    required this.miniObj,
  });

  final String id;
  final String title;
  final String subtitle;
  final String type;
  final String image;
  final String permaUrl;
  final String seasonNumber;
  final String releaseDate;
  final String? badge;
  final String squareImage;
  final String explicitContent;
  final bool miniObj;

  factory PodcastShow.fromJson(Map<String, dynamic> json) {
    final moreInfo = json['more_info'] as Map<String, dynamic>? ?? {};

    return PodcastShow(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      subtitle: json['subtitle'] as String? ?? '',
      type: json['type'] as String? ?? '',
      image: json['image'] as String? ?? '',
      permaUrl: json['perma_url'] as String? ?? '',
      seasonNumber: moreInfo['season_number'] as String? ?? '',
      releaseDate: moreInfo['release_date'] as String? ?? '',
      badge: moreInfo['badge'] as String?,
      squareImage: moreInfo['square_image'] as String? ?? '',
      explicitContent: json['explicit_content'] as String? ?? '0',
      miniObj: json['mini_obj'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'subtitle': subtitle,
      'type': type,
      'image': image,
      'perma_url': permaUrl,
      'more_info': {
        'season_number': seasonNumber,
        'release_date': releaseDate,
        'badge': badge,
        'square_image': squareImage,
      },
      'explicit_content': explicitContent,
      'mini_obj': miniObj,
    };
  }
}

/// Model class representing the podcast shows response
class PodcastShowsResponse {
  PodcastShowsResponse({required this.shows});

  final List<PodcastShow> shows;

  factory PodcastShowsResponse.fromJson(Map<String, dynamic> json) {
    final dataList = json['data'] as List<dynamic>? ?? [];

    return PodcastShowsResponse(
      shows: dataList
          .map((e) => PodcastShow.fromJson(e as Map<String, dynamic>))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {'data': shows.map((e) => e.toJson()).toList()};
  }
}

/// Endpoint class for saavn_play podcasts feature
class PodcastEndpoint extends BaseClient {
  PodcastEndpoint([super.options]);

  /// Get top podcast shows with pagination
  ///
  /// [n] - Number of results per page (default: 20)
  /// [page] - Page number (default: 1)
  Future<PodcastShowsResponse> getTopShows({int n = 20, int page = 1}) async {
    final response = await request(
      call: endpoints.podcasts.topShows,
      isAPIv4: true,
      queryParameters: {
        'n': n.toString(),
        'p': page.toString(),
        'ctx': 'web6dot0',
      },
    );

    return PodcastShowsResponse.fromJson(response);
  }
}
