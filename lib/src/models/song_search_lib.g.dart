// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'song_search_lib.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LibSongSearchResponse _$LibSongSearchResponseFromJson(
  Map<String, dynamic> json,
) => LibSongSearchResponse(
  total: (json['total'] as num).toInt(),
  start: (json['start'] as num).toInt(),
  results: (json['results'] as List<dynamic>)
      .map((e) => LibSongResult.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$LibSongSearchResponseToJson(
  LibSongSearchResponse instance,
) => <String, dynamic>{
  'total': instance.total,
  'start': instance.start,
  'results': instance.results,
};

LibSongResult _$LibSongResultFromJson(Map<String, dynamic> json) =>
    LibSongResult(
      id: json['id'] as String,
      title: json['title'] as String,
      subtitle: json['subtitle'] as String,
      headerDesc: json['header_desc'] as String,
      type: json['type'] as String,
      permaUrl: json['perma_url'] as String,
      image: json['image'] as String,
      language: json['language'] as String,
      year: json['year'] as String,
      playCount: json['play_count'] as String,
      explicitContent: json['explicit_content'] as String,
      listCount: json['list_count'] as String,
      listType: json['list_type'] as String,
      list: json['list'] as String,
      moreInfo: LibSongMoreInfo.fromJson(
        json['more_info'] as Map<String, dynamic>,
      ),
      buttonTooltipInfo: json['button_tooltip_info'] as List<dynamic>,
      proHvaCampaigns: json['pro_hva_campaigns'] as List<dynamic>,
    );

Map<String, dynamic> _$LibSongResultToJson(LibSongResult instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'subtitle': instance.subtitle,
      'header_desc': instance.headerDesc,
      'type': instance.type,
      'perma_url': instance.permaUrl,
      'image': instance.image,
      'language': instance.language,
      'year': instance.year,
      'play_count': instance.playCount,
      'explicit_content': instance.explicitContent,
      'list_count': instance.listCount,
      'list_type': instance.listType,
      'list': instance.list,
      'more_info': instance.moreInfo,
      'button_tooltip_info': instance.buttonTooltipInfo,
      'pro_hva_campaigns': instance.proHvaCampaigns,
    };

LibSongMoreInfo _$LibSongMoreInfoFromJson(Map<String, dynamic> json) =>
    LibSongMoreInfo(
      music: json['music'] as String,
      albumId: json['album_id'] as String,
      album: json['album'] as String,
      label: json['label'] as String,
      labelId: json['labelId'] as String?,
      origin: json['origin'] as String,
      isDolbyContent: json['is_dolby_content'] as bool,
      kbps320: json['320kbps'] as String,
      encryptedMediaUrl: json['encrypted_media_url'] as String,
      encryptedCacheUrl: json['encrypted_cache_url'] as String,
      encryptedDrmCacheUrl: json['encrypted_drm_cache_url'] as String,
      encryptedDrmMediaUrl: json['encrypted_drm_media_url'] as String,
      albumUrl: json['album_url'] as String,
      duration: json['duration'] as String,
      rights: LibSongRights.fromJson(json['rights'] as Map<String, dynamic>),
      cacheState: json['cache_state'] as String,
      hasLyrics: json['has_lyrics'] as String,
      lyricsSnippet: json['lyrics_snippet'] as String,
      starred: json['starred'] as String,
      copyrightText: json['copyright_text'] as String,
      artistMap: LibSongArtistMap.fromJson(
        json['artist_map'] as Map<String, dynamic>,
      ),
      releaseDate: json['releaseDate'],
      labelUrl: json['label_url'] as String,
      vcode: json['vcode'] as String?,
      vlink: json['vlink'] as String?,
      trillerAvailable: json['triller_available'] as bool,
      requestJiotuneFlag: json['request_jiotune_flag'] as bool,
      webp: json['webp'] as bool,
      lyricsId: json['lyricsId'] as String?,
    );

Map<String, dynamic> _$LibSongMoreInfoToJson(LibSongMoreInfo instance) =>
    <String, dynamic>{
      'music': instance.music,
      'album_id': instance.albumId,
      'album': instance.album,
      'label': instance.label,
      'labelId': instance.labelId,
      'origin': instance.origin,
      'is_dolby_content': instance.isDolbyContent,
      '320kbps': instance.kbps320,
      'encrypted_media_url': instance.encryptedMediaUrl,
      'encrypted_cache_url': instance.encryptedCacheUrl,
      'encrypted_drm_cache_url': instance.encryptedDrmCacheUrl,
      'encrypted_drm_media_url': instance.encryptedDrmMediaUrl,
      'album_url': instance.albumUrl,
      'duration': instance.duration,
      'rights': instance.rights,
      'cache_state': instance.cacheState,
      'has_lyrics': instance.hasLyrics,
      'lyrics_snippet': instance.lyricsSnippet,
      'starred': instance.starred,
      'copyright_text': instance.copyrightText,
      'artist_map': instance.artistMap,
      'releaseDate': instance.releaseDate,
      'label_url': instance.labelUrl,
      'vcode': instance.vcode,
      'vlink': instance.vlink,
      'triller_available': instance.trillerAvailable,
      'request_jiotune_flag': instance.requestJiotuneFlag,
      'webp': instance.webp,
      'lyricsId': instance.lyricsId,
    };

LibSongRights _$LibSongRightsFromJson(Map<String, dynamic> json) =>
    LibSongRights(
      code: (json['code'] as num).toInt(),
      cacheable: json['cacheable'] as bool,
      deleteCachedObject: json['delete_cached_object'] as bool,
      reason: json['reason'] as String,
    );

Map<String, dynamic> _$LibSongRightsToJson(LibSongRights instance) =>
    <String, dynamic>{
      'code': instance.code,
      'cacheable': instance.cacheable,
      'delete_cached_object': instance.deleteCachedObject,
      'reason': instance.reason,
    };

LibSongArtistMap _$LibSongArtistMapFromJson(Map<String, dynamic> json) =>
    LibSongArtistMap(
      primaryArtists: (json['primary_artists'] as List<dynamic>)
          .map((e) => LibSongArtist.fromJson(e as Map<String, dynamic>))
          .toList(),
      featuredArtists: (json['featured_artists'] as List<dynamic>)
          .map((e) => LibSongArtist.fromJson(e as Map<String, dynamic>))
          .toList(),
      artists: (json['artists'] as List<dynamic>)
          .map((e) => LibSongArtist.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$LibSongArtistMapToJson(LibSongArtistMap instance) =>
    <String, dynamic>{
      'primary_artists': instance.primaryArtists,
      'featured_artists': instance.featuredArtists,
      'artists': instance.artists,
    };

LibSongArtist _$LibSongArtistFromJson(Map<String, dynamic> json) =>
    LibSongArtist(
      id: json['id'] as String,
      name: json['name'] as String,
      role: json['role'] as String,
      image: json['image'] as String,
      type: json['type'] as String,
      permaUrl: json['perma_url'] as String,
    );

Map<String, dynamic> _$LibSongArtistToJson(LibSongArtist instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'role': instance.role,
      'image': instance.image,
      'type': instance.type,
      'perma_url': instance.permaUrl,
    };
