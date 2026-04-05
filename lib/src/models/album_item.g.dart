// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'album_item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AlbumItem _$AlbumItemFromJson(Map<String, dynamic> json) => AlbumItem(
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
      : AlbumMoreInfo.fromJson(json['more_info'] as Map<String, dynamic>),
  buttonTooltipInfo: json['button_tooltip_info'] as List<dynamic>,
  proHvaCampaigns: json['pro_hva_campaigns'] as List<dynamic>,
);

Map<String, dynamic> _$AlbumItemToJson(AlbumItem instance) => <String, dynamic>{
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

AlbumMoreInfo _$AlbumMoreInfoFromJson(Map<String, dynamic> json) =>
    AlbumMoreInfo(
      query: json['query'] as String,
      text: json['text'] as String,
      music: json['music'] as String?,
      songCount: json['song_count'] as String,
      artistMap: json['artist_map'] == null
          ? null
          : ArtistMap.fromJson(json['artist_map'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$AlbumMoreInfoToJson(AlbumMoreInfo instance) =>
    <String, dynamic>{
      'query': instance.query,
      'text': instance.text,
      'music': instance.music,
      'song_count': instance.songCount,
      'artist_map': instance.artistMap,
    };

ArtistMap _$ArtistMapFromJson(Map<String, dynamic> json) => ArtistMap(
  primaryArtists: (json['primary_artists'] as List<dynamic>?)
      ?.map((e) => ArtistInfo.fromJson(e as Map<String, dynamic>))
      .toList(),
  featuredArtists: (json['featured_artists'] as List<dynamic>?)
      ?.map((e) => ArtistInfo.fromJson(e as Map<String, dynamic>))
      .toList(),
  artists: (json['artists'] as List<dynamic>?)
      ?.map((e) => ArtistInfo.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$ArtistMapToJson(ArtistMap instance) => <String, dynamic>{
  'primary_artists': instance.primaryArtists,
  'featured_artists': instance.featuredArtists,
  'artists': instance.artists,
};

ArtistInfo _$ArtistInfoFromJson(Map<String, dynamic> json) => ArtistInfo(
  id: json['id'] as String,
  name: json['name'] as String,
  role: json['role'] as String?,
  image: json['image'] as String?,
  type: json['type'] as String,
  permaUrl: json['perma_url'] as String?,
);

Map<String, dynamic> _$ArtistInfoToJson(ArtistInfo instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'role': instance.role,
      'image': instance.image,
      'type': instance.type,
      'perma_url': instance.permaUrl,
    };
