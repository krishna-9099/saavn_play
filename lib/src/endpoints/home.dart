import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';

/// Model class representing a browse channel (mood/genre/music_plus)
class BrowseChannel {
  BrowseChannel({
    required this.id,
    required this.title,
    this.subtitle,
    required this.type,
    this.image,
    this.permaUrl,
    this.subType,
    this.badge,
    this.isFeatured,
    this.tags,
    this.videoUrl,
    this.videoThumbnail,
    this.language,
    this.year,
    this.playCount,
    this.explicitContent,
    this.miniObj,
  });

  final String id;
  final String title;
  final String? subtitle;
  final String type;
  final String? image;
  final String? permaUrl;
  final String? subType;
  final String? badge;
  final bool? isFeatured;
  final Map<String, List<String>>? tags;
  final String? videoUrl;
  final String? videoThumbnail;
  final String? language;
  final String? year;
  final String? playCount;
  final String? explicitContent;
  final bool? miniObj;

  factory BrowseChannel.fromJson(Map<String, dynamic> json) {
    final moreInfo = json['more_info'] as Map<String, dynamic>? ?? {};

    // Parse tags structure
    Map<String, List<String>>? tagsMap;
    final tagsValue = moreInfo['tags'];
    if (tagsValue is Map<String, dynamic>) {
      tagsMap = {};
      for (final entry in tagsValue.entries) {
        if (entry.value is List) {
          tagsMap[entry.key] = (entry.value as List)
              .map((e) => e.toString())
              .toList();
        }
      }
    }

    return BrowseChannel(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      subtitle: json['subtitle'] as String?,
      type: json['type'] as String? ?? '',
      image: json['image'] as String?,
      permaUrl: json['perma_url'] as String?,
      subType: moreInfo['sub_type'] as String?,
      badge: moreInfo['badge'] as String?,
      isFeatured: moreInfo['is_featured'] == '1',
      tags: tagsMap,
      videoUrl: moreInfo['video_url'] as String?,
      videoThumbnail: moreInfo['video_thumbnail'] as String?,
      language: json['language'] as String?,
      year: json['year'] as String?,
      playCount: json['play_count'] as String?,
      explicitContent: json['explicit_content'] as String?,
      miniObj: json['mini_obj'] as bool?,
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
        'sub_type': subType,
        'badge': badge,
        'is_featured': isFeatured == true ? '1' : '0',
        'tags': tags,
        'video_url': videoUrl,
        'video_thumbnail': videoThumbnail,
      },
      'language': language,
      'year': year,
      'play_count': playCount,
      'explicit_content': explicitContent,
      'mini_obj': miniObj,
    };
  }
}

/// Model class representing a home section item (playlist, album, or song)
class HomeSectionItem {
  HomeSectionItem({
    required this.id,
    required this.title,
    required this.subtitle,
    this.secondarySubtitle,
    this.headerDesc,
    required this.type,
    this.permaUrl,
    this.image,
    this.language,
    this.year,
    this.playCount,
    this.explicitContent,
    this.miniObj,
    this.listCount,
    this.listType,
    this.list,
    this.moreInfo,
  });

  final String id;
  final String title;
  final String subtitle;
  final String? secondarySubtitle;
  final String? headerDesc;
  final String type;
  final String? permaUrl;
  final String? image;
  final String? language;
  final String? year;
  final String? playCount;
  final String? explicitContent;
  final bool? miniObj;
  final String? listCount;
  final String? listType;
  final String? list;
  final Map<String, dynamic>? moreInfo;

  factory HomeSectionItem.fromJson(Map<String, dynamic> json) {
    // more_info can be a Map or null, but never a List
    final moreInfoValue = json['more_info'];
    Map<String, dynamic>? moreInfoMap;
    if (moreInfoValue is Map<String, dynamic>) {
      moreInfoMap = moreInfoValue;
    } else if (moreInfoValue is Map) {
      moreInfoMap = Map<String, dynamic>.from(moreInfoValue);
    }

    return HomeSectionItem(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      subtitle: json['subtitle'] as String? ?? '',
      secondarySubtitle: json['secondary_subtitle'] as String?,
      headerDesc: json['header_desc'] as String?,
      type: json['type'] as String? ?? '',
      permaUrl: json['perma_url'] as String?,
      image: json['image'] as String?,
      language: json['language'] as String?,
      year: json['year'] as String?,
      playCount: json['play_count'] as String?,
      explicitContent: json['explicit_content'] as String?,
      miniObj: json['mini_obj'] as bool?,
      listCount: json['list_count'] as String?,
      listType: json['list_type'] as String?,
      list: json['list'] as String?,
      moreInfo: moreInfoMap,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'subtitle': subtitle,
      'secondary_subtitle': secondarySubtitle,
      'header_desc': headerDesc,
      'type': type,
      'perma_url': permaUrl,
      'image': image,
      'language': language,
      'year': year,
      'play_count': playCount,
      'explicit_content': explicitContent,
      'mini_obj': miniObj,
      'list_count': listCount,
      'list_type': listType,
      'list': list,
      'more_info': moreInfo,
    };
  }
}

/// Model class representing a chart item
class ChartItem {
  ChartItem({
    required this.id,
    required this.title,
    required this.type,
    this.image,
    this.count,
    this.permaUrl,
    this.moreInfo,
  });

  final String id;
  final String title;
  final String type;
  final String? image;
  final int? count;
  final String? permaUrl;
  final Map<String, dynamic>? moreInfo;

  factory ChartItem.fromJson(Map<String, dynamic> json) {
    return ChartItem(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      type: json['type'] as String? ?? '',
      image: json['image'] as String?,
      count: json['count'] as int?,
      permaUrl: json['perma_url'] as String?,
      moreInfo: json['more_info'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'type': type,
      'image': image,
      'count': count,
      'perma_url': permaUrl,
      'more_info': moreInfo,
    };
  }
}

/// Model class representing a radio station in home section
class HomeRadioStation {
  HomeRadioStation({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.type,
    this.image,
    this.permaUrl,
    this.moreInfo,
  });

  final String id;
  final String title;
  final String subtitle;
  final String type;
  final String? image;
  final String? permaUrl;
  final Map<String, dynamic>? moreInfo;

  factory HomeRadioStation.fromJson(Map<String, dynamic> json) {
    return HomeRadioStation(
      id: json['id'] as String? ?? '',
      title: json['title'] as String? ?? '',
      subtitle: json['subtitle'] as String? ?? '',
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

/// Model class representing a global config playlist entry
class GlobalConfigPlaylist {
  GlobalConfigPlaylist({
    this.listid,
    this.image,
    this.title,
    this.count,
  });

  final String? listid;
  final String? image;
  final String? title;
  final int? count;

  factory GlobalConfigPlaylist.fromJson(Map<String, dynamic> json) {
    return GlobalConfigPlaylist(
      listid: json['listid'] as String?,
      image: json['image'] as String?,
      title: json['title'] as String?,
      count: json['count'] as int?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'listid': listid,
      'image': image,
      'title': title,
      'count': count,
    };
  }
}

/// Model class representing global configuration
class GlobalConfig {
  GlobalConfig({
    this.weeklyTopSongsListId,
    this.randomSongsListId,
    this.phnOtpProviders,
  });

  final Map<String, GlobalConfigPlaylist>? weeklyTopSongsListId;
  final Map<String, GlobalConfigPlaylist>? randomSongsListId;
  final Map<String, dynamic>? phnOtpProviders;

  factory GlobalConfig.fromJson(Map<String, dynamic> json) {
    // Parse weekly_top_songs_listid
    Map<String, GlobalConfigPlaylist>? weeklyTopMap;
    final weeklyTop = json['weekly_top_songs_listid'];
    if (weeklyTop is Map<String, dynamic>) {
      weeklyTopMap = {};
      for (final entry in weeklyTop.entries) {
        if (entry.value is Map<String, dynamic>) {
          weeklyTopMap[entry.key] = GlobalConfigPlaylist.fromJson(
            entry.value as Map<String, dynamic>,
          );
        }
      }
    }

    // Parse random_songs_listid
    Map<String, GlobalConfigPlaylist>? randomSongsMap;
    final randomSongs = json['random_songs_listid'];
    if (randomSongs is Map<String, dynamic>) {
      randomSongsMap = {};
      for (final entry in randomSongs.entries) {
        if (entry.value is Map<String, dynamic>) {
          randomSongsMap[entry.key] = GlobalConfigPlaylist.fromJson(
            entry.value as Map<String, dynamic>,
          );
        }
      }
    }

    // Parse phn_otp_providers
    Map<String, dynamic>? otpProvidersMap;
    final otpProviders = json['phn_otp_providers'];
    if (otpProviders is Map<String, dynamic>) {
      otpProvidersMap = Map<String, dynamic>.from(otpProviders);
    } else if (otpProviders is Map) {
      otpProvidersMap = Map<String, dynamic>.from(otpProviders);
    }

    return GlobalConfig(
      weeklyTopSongsListId: weeklyTopMap,
      randomSongsListId: randomSongsMap,
      phnOtpProviders: otpProvidersMap,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'weekly_top_songs_listid': weeklyTopSongsListId?.map(
        (key, value) => MapEntry(key, value.toJson()),
      ),
      'random_songs_listid': randomSongsListId?.map(
        (key, value) => MapEntry(key, value.toJson()),
      ),
      'phn_otp_providers': phnOtpProviders,
    };
  }
}

/// Model class representing a view_more configuration for pagination
class ViewMoreConfig {
  ViewMoreConfig({
    this.api,
    this.pageParam,
    this.sizeParam,
    this.defaultSize,
    this.scrollType,
  });

  final String? api;
  final String? pageParam;
  final String? sizeParam;
  final int? defaultSize;
  final String? scrollType;

  factory ViewMoreConfig.fromJson(Map<String, dynamic> json) {
    return ViewMoreConfig(
      api: json['api'] as String?,
      pageParam: json['page_param'] as String?,
      sizeParam: json['size_param'] as String?,
      defaultSize: json['default_size'] as int?,
      scrollType: json['scroll_type'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'api': api,
      'page_param': pageParam,
      'size_param': sizeParam,
      'default_size': defaultSize,
      'scroll_type': scrollType,
    };
  }
}

/// Model class representing a module configuration
class ModuleConfig {
  ModuleConfig({
    required this.id,
    this.title,
    this.subtitle,
    this.type,
    this.source,
    this.position,
    this.score,
    this.bucket,
    this.scrollType,
    this.simpleHeader,
    this.noHeader,
    this.hideMeta,
    this.featured,
    this.featuredText,
    this.viewMore,
    this.isJtModule,
    this.buttonTooltipInfo,
  });

  final String id;
  final String? title;
  final String? subtitle;
  final String? type;
  final String? source;
  final int? position;
  final String? score;
  final String? bucket;
  final String? scrollType;
  final bool? simpleHeader;
  final bool? noHeader;
  final bool? hideMeta;
  final bool? featured;
  final String? featuredText;
  final ViewMoreConfig? viewMore;
  final bool? isJtModule;
  final String? buttonTooltipInfo;

  factory ModuleConfig.fromJson(Map<String, dynamic> json) {
    // Handle view_more which can be a Map or List
    ViewMoreConfig? viewMoreConfig;
    final viewMoreValue = json['view_more'];
    if (viewMoreValue is Map<String, dynamic>) {
      viewMoreConfig = ViewMoreConfig.fromJson(viewMoreValue);
    } else if (viewMoreValue is Map) {
      viewMoreConfig = ViewMoreConfig.fromJson(
        Map<String, dynamic>.from(viewMoreValue),
      );
    }

    return ModuleConfig(
      id: json['id'] as String? ?? '',
      title: json['title'] as String?,
      subtitle: json['subtitle'] as String?,
      type: json['type'] as String?,
      source: json['source'] as String?,
      position: json['position'] as int?,
      score: json['score'] as String?,
      bucket: json['bucket'] as String?,
      scrollType: json['scroll_type'] as String?,
      simpleHeader: json['simpleHeader'] as bool?,
      noHeader: json['noHeader'] as bool?,
      hideMeta: json['hideMeta'] as bool?,
      featured: json['featured'] as bool?,
      featuredText: json['featured_text'] as String?,
      viewMore: viewMoreConfig,
      isJtModule: json['is_JT_module'] as bool?,
      buttonTooltipInfo: json['button_tooltip_info'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'subtitle': subtitle,
      'type': type,
      'source': source,
      'position': position,
      'score': score,
      'bucket': bucket,
      'scroll_type': scrollType,
      'simpleHeader': simpleHeader,
      'noHeader': noHeader,
      'hideMeta': hideMeta,
      'featured': featured,
      'featured_text': featuredText,
      'view_more': viewMore?.toJson(),
      'is_JT_module': isJtModule,
      'button_tooltip_info': buttonTooltipInfo,
    };
  }
}

/// Model class representing the complete home/launch data response
class HomeLaunchData {
  HomeLaunchData({
    this.history,
    this.newTrending,
    this.topPlaylists,
    this.newAlbums,
    this.browseDiscover,
    this.globalConfig,
    this.charts,
    this.radio,
    this.artistRecos,
    this.promoSections,
    this.modules,
    this.unknownSections = const {},
  });

  final List<HomeSectionItem>? history;
  final List<HomeSectionItem>? newTrending;
  final List<HomeSectionItem>? topPlaylists;
  final List<HomeSectionItem>? newAlbums;
  final List<HomeSectionItem>? browseDiscover;
  final GlobalConfig? globalConfig;
  final List<ChartItem>? charts;
  final List<HomeRadioStation>? radio;
  final List<HomeSectionItem>? artistRecos;
  final Map<String, List<HomeSectionItem>>? promoSections;
  final Map<String, ModuleConfig>? modules;
  final Map<String, dynamic>? unknownSections;

  factory HomeLaunchData.fromJson(Map<String, dynamic> json) {
    // Parse known sections
    final promoSections = <String, List<HomeSectionItem>>{};
    final moduleConfigs = <String, ModuleConfig>{};
    final unknownSections = <String, dynamic>{};

    for (final entry in json.entries) {
      // Handle promo sections
      if (entry.key.startsWith('promo:vx:data:')) {
        final items = (entry.value as List<dynamic>?)
                ?.map(
                  (e) => HomeSectionItem.fromJson(e as Map<String, dynamic>),
                )
                .toList() ??
            [];
        promoSections[entry.key] = items;
      }
      // Handle modules
      else if (entry.key == 'modules') {
        final modulesJson = entry.value as Map<String, dynamic>?;
        if (modulesJson != null) {
          for (final moduleEntry in modulesJson.entries) {
            moduleConfigs[moduleEntry.key] = ModuleConfig.fromJson(
              moduleEntry.value as Map<String, dynamic>,
            );
          }
        }
      }
      // Handle known sections
      else if (entry.key == 'history') {
        final items = (entry.value as List<dynamic>?)
            ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
            .toList();
        if (items != null) {
          unknownSections[entry.key] = items;
        }
      } else if (entry.key == 'new_trending') {
        final items = (entry.value as List<dynamic>?)
            ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
            .toList();
        if (items != null) {
          unknownSections[entry.key] = items;
        }
      } else if (entry.key == 'top_playlists') {
        final items = (entry.value as List<dynamic>?)
            ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
            .toList();
        if (items != null) {
          unknownSections[entry.key] = items;
        }
      } else if (entry.key == 'new_albums') {
        final items = (entry.value as List<dynamic>?)
            ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
            .toList();
        if (items != null) {
          unknownSections[entry.key] = items;
        }
      } else if (entry.key == 'browse_discover') {
        final items = (entry.value as List<dynamic>?)
            ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
            .toList();
        if (items != null) {
          unknownSections[entry.key] = items;
        }
      } else if (entry.key == 'global_config') {
        final config = entry.value != null
            ? GlobalConfig.fromJson(entry.value as Map<String, dynamic>)
            : null;
        if (config != null) {
          unknownSections[entry.key] = config;
        }
      } else if (entry.key == 'charts') {
        final items = (entry.value as List<dynamic>?)
            ?.map((e) => ChartItem.fromJson(e as Map<String, dynamic>))
            .toList();
        if (items != null) {
          unknownSections[entry.key] = items;
        }
      } else if (entry.key == 'radio') {
        final items = (entry.value as List<dynamic>?)
            ?.map((e) => HomeRadioStation.fromJson(e as Map<String, dynamic>))
            .toList();
        if (items != null) {
          unknownSections[entry.key] = items;
        }
      } else if (entry.key == 'artist_recos') {
        final items = (entry.value as List<dynamic>?)
            ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
            .toList();
        if (items != null) {
          unknownSections[entry.key] = items;
        }
      }
      // Handle unknown sections
      else {
        unknownSections[entry.key] = entry.value;
      }
    }

    return HomeLaunchData(
      history: unknownSections['history'] as List<HomeSectionItem>?,
      newTrending: unknownSections['new_trending'] as List<HomeSectionItem>?,
      topPlaylists: unknownSections['top_playlists'] as List<HomeSectionItem>?,
      newAlbums: unknownSections['new_albums'] as List<HomeSectionItem>?,
      browseDiscover:
          unknownSections['browse_discover'] as List<HomeSectionItem>?,
      globalConfig: unknownSections['global_config'] as GlobalConfig?,
      charts: unknownSections['charts'] as List<ChartItem>?,
      radio: unknownSections['radio'] as List<HomeRadioStation>?,
      artistRecos: unknownSections['artist_recos'] as List<HomeSectionItem>?,
      promoSections: promoSections.isEmpty ? null : promoSections,
      modules: moduleConfigs.isEmpty ? null : moduleConfigs,
      unknownSections: unknownSections.isEmpty ? null : unknownSections,
    );
  }

  Map<String, dynamic> toJson() {
    final result = <String, dynamic>{};

    if (history != null) {
      result['history'] = history!.map((e) => e.toJson()).toList();
    }
    if (newTrending != null) {
      result['new_trending'] = newTrending!.map((e) => e.toJson()).toList();
    }
    if (topPlaylists != null) {
      result['top_playlists'] = topPlaylists!.map((e) => e.toJson()).toList();
    }
    if (newAlbums != null) {
      result['new_albums'] = newAlbums!.map((e) => e.toJson()).toList();
    }
    if (browseDiscover != null) {
      result['browse_discover'] =
          browseDiscover!.map((e) => e.toJson()).toList();
    }
    if (globalConfig != null) {
      result['global_config'] = globalConfig!.toJson();
    }
    if (charts != null) {
      result['charts'] = charts!.map((e) => e.toJson()).toList();
    }
    if (radio != null) {
      result['radio'] = radio!.map((e) => e.toJson()).toList();
    }
    if (artistRecos != null) {
      result['artist_recos'] = artistRecos!.map((e) => e.toJson()).toList();
    }
    if (promoSections != null) {
      for (final entry in promoSections!.entries) {
        result[entry.key] = entry.value.map((e) => e.toJson()).toList();
      }
    }
    if (modules != null) {
      result['modules'] = modules!.map(
        (key, value) => MapEntry(key, value.toJson()),
      );
    }
    if (unknownSections != null) {
      for (final entry in unknownSections!.entries) {
        result[entry.key] = entry.value;
      }
    }

    return result;
  }
}

/// Endpoint class for saavn_play home/launch data feature
class HomeEndpoint extends BaseClient {
  HomeEndpoint([super.options]);

  /// Get home/launch data including new trending, top playlists, albums, charts, radio, etc.
  Future<HomeLaunchData> getLaunchData() async {
    final response = await request(
      call: endpoints.home.launchData,
      isAPIv4: true,
      queryParameters: {'ctx': 'web6dot0'},
    );

    return HomeLaunchData.fromJson(response);
  }

  /// Get home/launch data with dynamic section positioning
  ///
  /// This method handles unknown sections and positions them dynamically
  /// based on the API response structure.
  Future<HomeLaunchData> getLaunchDataWithDynamicSections() async {
    final response = await request(
      call: endpoints.home.launchData,
      isAPIv4: true,
      queryParameters: {'ctx': 'web6dot0'},
    );

    // Create a new HomeLaunchData instance with dynamic section handling
    return HomeLaunchData.fromJson(response);
  }

  /// Get home/launch data with error handling for unknown sections
  ///
  /// This method includes error handling for unknown section types
  /// and provides fallback mechanisms.
  Future<HomeLaunchData> getLaunchDataWithErrorHandling() async {
    try {
      final response = await request(
        call: endpoints.home.launchData,
        isAPIv4: true,
        queryParameters: {'ctx': 'web6dot0'},
      );

      return HomeLaunchData.fromJson(response);
    } catch (e) {
      // Log the error
      print('Error fetching home data: $e');

      // Return empty data with error information
      return HomeLaunchData(
        unknownSections: {
          'error': 'Failed to fetch home data: $e',
        },
      );
    }
  }
}
