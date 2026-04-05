// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'playlist_item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PlaylistItem _$PlaylistItemFromJson(Map<String, dynamic> json) => PlaylistItem(
  id: json['id'] as String,
  title: json['title'] as String,
  subtitle: json['subtitle'] as String,
  type: json['type'] as String,
  image: json['image'] as String,
  permaUrl: json['perma_url'] as String,
  explicitContent: json['explicit_content'] as String,
  miniObj: json['mini_obj'] as bool,
  numsongs: json['numsongs'],
  moreInfo: json['more_info'] as Map<String, dynamic>?,
);

Map<String, dynamic> _$PlaylistItemToJson(PlaylistItem instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'subtitle': instance.subtitle,
      'type': instance.type,
      'image': instance.image,
      'perma_url': instance.permaUrl,
      'explicit_content': instance.explicitContent,
      'mini_obj': instance.miniObj,
      'numsongs': instance.numsongs,
      'more_info': instance.moreInfo,
    };
