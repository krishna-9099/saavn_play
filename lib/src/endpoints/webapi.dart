import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';

/// Model class representing a footer playlist item
class FooterPlaylistItem {
  FooterPlaylistItem({
    required this.id,
    required this.title,
    required this.action,
  });

  final String id;
  final String title;
  final String action;

  factory FooterPlaylistItem.fromJson(Map<String, dynamic> json) {
    return FooterPlaylistItem(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      action: json['action'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'title': title, 'action': action};
  }
}

/// Model class representing a footer artist item
class FooterArtistItem {
  FooterArtistItem({
    required this.id,
    required this.title,
    required this.action,
  });

  final String id;
  final String title;
  final String action;

  factory FooterArtistItem.fromJson(Map<String, dynamic> json) {
    return FooterArtistItem(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      action: json['action'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'title': title, 'action': action};
  }
}

/// Model class representing footer details
class FooterDetails {
  FooterDetails({
    required this.playlists,
    required this.artists,
    required this.albums,
    required this.actors,
  });

  final List<FooterPlaylistItem> playlists;
  final List<FooterArtistItem> artists;
  final List<FooterPlaylistItem> albums;
  final List<FooterArtistItem> actors;

  factory FooterDetails.fromJson(Map<String, dynamic> json) {
    return FooterDetails(
      playlists:
          (json['playlist'] as List<dynamic>?)
              ?.map(
                (e) => FooterPlaylistItem.fromJson(e as Map<String, dynamic>),
              )
              .toList() ??
          [],
      artists:
          (json['artist'] as List<dynamic>?)
              ?.map((e) => FooterArtistItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      albums:
          (json['album'] as List<dynamic>?)
              ?.map(
                (e) => FooterPlaylistItem.fromJson(e as Map<String, dynamic>),
              )
              .toList() ??
          [],
      actors:
          (json['actor'] as List<dynamic>?)
              ?.map((e) => FooterArtistItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'playlist': playlists.map((e) => e.toJson()).toList(),
      'artist': artists.map((e) => e.toJson()).toList(),
      'album': albums.map((e) => e.toJson()).toList(),
      'actor': actors.map((e) => e.toJson()).toList(),
    };
  }
}

/// Model class representing a mega menu item
class MegaMenuItem {
  MegaMenuItem({required this.title, required this.permaUrl});

  final String title;
  final String permaUrl;

  factory MegaMenuItem.fromJson(Map<String, dynamic> json) {
    return MegaMenuItem(
      title: json['title'] as String? ?? '',
      permaUrl: json['perma_url'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {'title': title, 'perma_url': permaUrl};
  }
}

/// Model class representing browse hover details (mega menu)
class BrowseHoverDetails {
  BrowseHoverDetails({
    required this.topArtists,
    required this.topPlaylists,
    required this.newReleases,
  });

  final List<MegaMenuItem> topArtists;
  final List<MegaMenuItem> topPlaylists;
  final List<MegaMenuItem> newReleases;

  factory BrowseHoverDetails.fromJson(Map<String, dynamic> json) {
    final megaMenu = json['mega_menu'] as Map<String, dynamic>? ?? {};
    return BrowseHoverDetails(
      topArtists:
          (megaMenu['top_artists'] as List<dynamic>?)
              ?.map((e) => MegaMenuItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      topPlaylists:
          (megaMenu['top_playlists'] as List<dynamic>?)
              ?.map((e) => MegaMenuItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      newReleases:
          (megaMenu['new_releases'] as List<dynamic>?)
              ?.map((e) => MegaMenuItem.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'mega_menu': {
        'top_artists': topArtists.map((e) => e.toJson()).toList(),
        'top_playlists': topPlaylists.map((e) => e.toJson()).toList(),
        'new_releases': newReleases.map((e) => e.toJson()).toList(),
      },
    };
  }
}

/// Model class representing show details
class ShowDetails {
  ShowDetails({
    required this.id,
    required this.title,
    this.subtitle,
    this.headerDesc,
    required this.type,
    this.permaUrl,
    this.image,
    this.language,
    this.year,
    this.playCount,
    this.explicitContent,
    this.moreInfo,
  });

  final String id;
  final String title;
  final String? subtitle;
  final String? headerDesc;
  final String type;
  final String? permaUrl;
  final String? image;
  final String? language;
  final String? year;
  final String? playCount;
  final String? explicitContent;
  final Map<String, dynamic>? moreInfo;

  factory ShowDetails.fromJson(Map<String, dynamic> json) {
    return ShowDetails(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      subtitle: json['subtitle'] as String?,
      headerDesc: json['header_desc'] as String?,
      type: json['type'] as String? ?? '',
      permaUrl: json['perma_url'] as String?,
      image: json['image'] as String?,
      language: json['language'] as String?,
      year: json['year'] as String?,
      playCount: json['play_count'] as String?,
      explicitContent: json['explicit_content'] as String?,
      moreInfo: json['more_info'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'subtitle': subtitle,
      'header_desc': headerDesc,
      'type': type,
      'perma_url': permaUrl,
      'image': image,
      'language': language,
      'year': year,
      'play_count': playCount,
      'explicit_content': explicitContent,
      'more_info': moreInfo,
    };
  }
}

/// Model class representing a season
class Season {
  Season({
    required this.id,
    required this.title,
    this.subtitle,
    required this.type,
    this.image,
    this.permaUrl,
    this.moreInfo,
  });

  final String id;
  final String title;
  final String? subtitle;
  final String type;
  final String? image;
  final String? permaUrl;
  final Map<String, dynamic>? moreInfo;

  factory Season.fromJson(Map<String, dynamic> json) {
    return Season(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      subtitle: json['subtitle'] as String?,
      type: json['type'] as String? ?? '',
      image: json['image'] as String?,
      permaUrl: json['perma_url'] as String?,
      moreInfo: json['more_info'] as Map<String, dynamic>?,
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
      'more_info': moreInfo,
    };
  }
}

/// Model class representing an episode
class Episode {
  Episode({
    required this.id,
    required this.title,
    this.subtitle,
    this.headerDesc,
    required this.type,
    this.permaUrl,
    this.image,
    this.language,
    this.year,
    this.playCount,
    this.explicitContent,
    this.moreInfo,
  });

  final String id;
  final String title;
  final String? subtitle;
  final String? headerDesc;
  final String type;
  final String? permaUrl;
  final String? image;
  final String? language;
  final String? year;
  final String? playCount;
  final String? explicitContent;
  final Map<String, dynamic>? moreInfo;

  factory Episode.fromJson(Map<String, dynamic> json) {
    return Episode(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      subtitle: json['subtitle'] as String?,
      headerDesc: json['header_desc'] as String?,
      type: json['type'] as String? ?? '',
      permaUrl: json['perma_url'] as String?,
      image: json['image'] as String?,
      language: json['language'] as String?,
      year: json['year'] as String?,
      playCount: json['play_count'] as String?,
      explicitContent: json['explicit_content'] as String?,
      moreInfo: json['more_info'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'subtitle': subtitle,
      'header_desc': headerDesc,
      'type': type,
      'perma_url': permaUrl,
      'image': image,
      'language': language,
      'year': year,
      'play_count': playCount,
      'explicit_content': explicitContent,
      'more_info': moreInfo,
    };
  }
}

/// Model class representing show response
class ShowResponse {
  ShowResponse({this.showDetails, this.seasons, this.episodes, this.modules});

  final ShowDetails? showDetails;
  final List<Season>? seasons;
  final List<Episode>? episodes;
  final Map<String, dynamic>? modules;

  factory ShowResponse.fromJson(Map<String, dynamic> json) {
    return ShowResponse(
      showDetails: json['show_details'] != null
          ? ShowDetails.fromJson(json['show_details'] as Map<String, dynamic>)
          : null,
      seasons:
          (json['seasons'] as List<dynamic>?)
              ?.map((e) => Season.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      episodes:
          (json['episodes'] as List<dynamic>?)
              ?.map((e) => Episode.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      modules: json['modules'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'show_details': showDetails?.toJson(),
      'seasons': seasons?.map((e) => e.toJson()).toList(),
      'episodes': episodes?.map((e) => e.toJson()).toList(),
      'modules': modules,
    };
  }
}

/// Endpoint class for saavn_play webapi feature
class WebapiEndpoint extends BaseClient {
  WebapiEndpoint([super.options]);

  /// Get entity details by token and type
  ///
  /// [token] - The entity token/ID
  /// [type] - The entity type: 'show', 'album', 'playlist', 'artist', 'song', 'radio'
  /// [seasonNumber] - Season number for shows (optional)
  /// [sortOrder] - Sort order (optional)
  /// [includeMetaTags] - Include meta tags (optional)
  Future<Map<String, dynamic>> get({
    required String token,
    required String type,
    String? seasonNumber,
    String? sortOrder,
    bool includeMetaTags = false,
  }) async {
    final response = await request(
      call: endpoints.webapi.get,
      isAPIv4: true,
      queryParameters: {
        'token': token,
        'type': type,
        if (seasonNumber != null) 'season_number': seasonNumber,
        if (sortOrder != null) 'sort_order': sortOrder,
        'includeMetaTags': includeMetaTags ? '1' : '0',
        'ctx': 'web6dot0',
      },
    );

    return response;
  }

  /// Get show details by token
  ///
  /// [token] - The show token/ID
  /// [seasonNumber] - Season number (optional)
  Future<ShowResponse> getShow({
    required String token,
    String? seasonNumber,
  }) async {
    final response = await get(
      token: token,
      type: 'show',
      seasonNumber: seasonNumber,
    );

    return ShowResponse.fromJson(response);
  }

  /// Get footer details for a language
  ///
  /// [language] - Language code (e.g., 'hindi', 'english')
  Future<FooterDetails> getFooterDetails({String language = 'english'}) async {
    final response = await request(
      call: endpoints.webapi.footerDetails,
      isAPIv4: true,
      queryParameters: {'language': language},
    );

    return FooterDetails.fromJson(response);
  }

  /// Get browse hover details (mega menu)
  ///
  /// [language] - Language code (e.g., 'hindi', 'english')
  /// [isEntityPage] - Whether it's an entity page
  Future<BrowseHoverDetails> getBrowseHoverDetails({
    String language = 'english',
    bool isEntityPage = true,
  }) async {
    final response = await request(
      call: endpoints.webapi.browseHoverDetails,
      isAPIv4: true,
      queryParameters: {
        'language': language,
        'is_entity_page': isEntityPage ? 'true' : 'false',
      },
    );

    return BrowseHoverDetails.fromJson(response);
  }
}
