// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'song_item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SongItem _$SongItemFromJson(Map<String, dynamic> json) => SongItem(
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
  moreInfo: json['more_info'] == null
      ? null
      : SongMoreInfo.fromJson(json['more_info'] as Map<String, dynamic>),
  buttonTooltipInfo: json['button_tooltip_info'] as List<dynamic>,
  proHvaCampaigns: json['pro_hva_campaigns'] as List<dynamic>,
);

Map<String, dynamic> _$SongItemToJson(SongItem instance) => <String, dynamic>{
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

SongMoreInfo _$SongMoreInfoFromJson(Map<String, dynamic> json) => SongMoreInfo(
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
  rights: _parseSongRights(json['rights']),
  cacheState: json['cache_state'] as String,
  hasLyrics: json['has_lyrics'] as String,
  lyricsSnippet: json['lyrics_snippet'] as String,
  starred: json['starred'] as String,
  copyrightText: json['copyright_text'] as String,
  artistMap: json['artist_map'] == null
      ? null
      : SongArtistMap.fromJson(json['artist_map'] as Map<String, dynamic>),
  releaseDate: json['releaseDate'],
  labelUrl: json['label_url'] as String,
  vcode: json['vcode'] as String?,
  vlink: json['vlink'] as String?,
  trillerAvailable: json['triller_available'] as bool,
  requestJiotuneFlag: json['request_jiotune_flag'] as bool,
  webp: _parseBool(json['webp']),
  lyricsId: json['lyricsId'] as String?,
);

Map<String, dynamic> _$SongMoreInfoToJson(SongMoreInfo instance) =>
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

Map<String, dynamic> _$SongRightsToJson(SongRights instance) =>
    <String, dynamic>{
      'code': instance.code,
      'cacheable': instance.cacheable,
      'delete_cached_object': instance.deleteCachedObject,
      'reason': instance.reason,
    };

SongArtistMap _$SongArtistMapFromJson(Map<String, dynamic> json) =>
    SongArtistMap(
      primaryArtists: (json['primary_artists'] as List<dynamic>)
          .map((e) => SongArtist.fromJson(e as Map<String, dynamic>))
          .toList(),
      featuredArtists: (json['featured_artists'] as List<dynamic>)
          .map((e) => SongArtist.fromJson(e as Map<String, dynamic>))
          .toList(),
      artists: (json['artists'] as List<dynamic>)
          .map((e) => SongArtist.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$SongArtistMapToJson(SongArtistMap instance) =>
    <String, dynamic>{
      'primary_artists': instance.primaryArtists,
      'featured_artists': instance.featuredArtists,
      'artists': instance.artists,
    };

SongArtist _$SongArtistFromJson(Map<String, dynamic> json) => SongArtist(
  id: json['id'] as String,
  name: json['name'] as String,
  role: json['role'] as String,
  image: json['image'] as String,
  type: json['type'] as String,
  permaUrl: json['perma_url'] as String,
);

Map<String, dynamic> _$SongArtistToJson(SongArtist instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'role': instance.role,
      'image': instance.image,
      'type': instance.type,
      'perma_url': instance.permaUrl,
    };
