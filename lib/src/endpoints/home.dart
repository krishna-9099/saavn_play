import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';

/// Model class representing a home section item (playlist, album, or song)
class HomeSectionItem {
  HomeSectionItem({
    required this.id,
    required this.title,
    required this.subtitle,
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
  final String subtitle;
  final String? headerDesc;
  final String type;
  final String? permaUrl;
  final String? image;
  final String? language;
  final String? year;
  final String? playCount;
  final String? explicitContent;
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
      headerDesc: json['header_desc'] as String?,
      type: json['type'] as String? ?? '',
      permaUrl: json['perma_url'] as String?,
      image: json['image'] as String?,
      language: json['language'] as String?,
      year: json['year'] as String?,
      playCount: json['play_count'] as String?,
      explicitContent: json['explicit_content'] as String?,
      moreInfo: moreInfoMap,
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

/// Model class representing global configuration
class GlobalConfig {
  GlobalConfig({
    this.weeklyTopSongsListId,
    this.randomSongsListId,
    this.phnOtpProviders,
  });

  final Map<String, dynamic>? weeklyTopSongsListId;
  final Map<String, dynamic>? randomSongsListId;
  final Map<String, dynamic>? phnOtpProviders;

  factory GlobalConfig.fromJson(Map<String, dynamic> json) {
    final weeklyTop = json['weekly_top_songs_listid'];
    final randomSongs = json['random_songs_listid'];
    final otpProviders = json['phn_otp_providers'];

    Map<String, dynamic>? weeklyTopMap;
    if (weeklyTop is Map<String, dynamic>) {
      weeklyTopMap = weeklyTop;
    } else if (weeklyTop is Map) {
      weeklyTopMap = Map<String, dynamic>.from(weeklyTop);
    }

    Map<String, dynamic>? randomSongsMap;
    if (randomSongs is Map<String, dynamic>) {
      randomSongsMap = randomSongs;
    } else if (randomSongs is Map) {
      randomSongsMap = Map<String, dynamic>.from(randomSongs);
    }

    Map<String, dynamic>? otpProvidersMap;
    if (otpProviders is Map<String, dynamic>) {
      otpProvidersMap = otpProviders;
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
      'weekly_top_songs_listid': weeklyTopSongsListId,
      'random_songs_listid': randomSongsListId,
      'phn_otp_providers': phnOtpProviders,
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
  });

  final String id;
  final String? title;
  final String? subtitle;
  final String? type;
  final String? source;
  final int? position;

  factory ModuleConfig.fromJson(Map<String, dynamic> json) {
    return ModuleConfig(
      id: json['id'] as String? ?? '',
      title: json['title'] as String?,
      subtitle: json['subtitle'] as String?,
      type: json['type'] as String?,
      source: json['source'] as String?,
      position: json['position'] as int?,
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

  factory HomeLaunchData.fromJson(Map<String, dynamic> json) {
    // Parse promo sections (keys like 'promo:vx:data:31', etc.)
    final promoSections = <String, List<HomeSectionItem>>{};
    final moduleConfigs = <String, ModuleConfig>{};

    for (final entry in json.entries) {
      if (entry.key.startsWith('promo:vx:data:')) {
        final items =
            (entry.value as List<dynamic>?)
                ?.map(
                  (e) => HomeSectionItem.fromJson(e as Map<String, dynamic>),
                )
                .toList() ??
            [];
        promoSections[entry.key] = items;
      }
    }

    // Parse modules
    final modulesJson = json['modules'] as Map<String, dynamic>?;
    if (modulesJson != null) {
      for (final entry in modulesJson.entries) {
        moduleConfigs[entry.key] = ModuleConfig.fromJson(
          entry.value as Map<String, dynamic>,
        );
      }
    }

    return HomeLaunchData(
      history: (json['history'] as List<dynamic>?)
          ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      newTrending: (json['new_trending'] as List<dynamic>?)
          ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      topPlaylists: (json['top_playlists'] as List<dynamic>?)
          ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      newAlbums: (json['new_albums'] as List<dynamic>?)
          ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      browseDiscover: (json['browse_discover'] as List<dynamic>?)
          ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      globalConfig: json['global_config'] != null
          ? GlobalConfig.fromJson(json['global_config'] as Map<String, dynamic>)
          : null,
      charts: (json['charts'] as List<dynamic>?)
          ?.map((e) => ChartItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      radio: (json['radio'] as List<dynamic>?)
          ?.map((e) => HomeRadioStation.fromJson(e as Map<String, dynamic>))
          .toList(),
      artistRecos: (json['artist_recos'] as List<dynamic>?)
          ?.map((e) => HomeSectionItem.fromJson(e as Map<String, dynamic>))
          .toList(),
      promoSections: promoSections.isEmpty ? null : promoSections,
      modules: moduleConfigs.isEmpty ? null : moduleConfigs,
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
      result['browse_discover'] = browseDiscover!
          .map((e) => e.toJson())
          .toList();
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
}
