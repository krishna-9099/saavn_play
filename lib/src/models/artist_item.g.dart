// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'artist_item.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ArtistItem _$ArtistItemFromJson(Map<String, dynamic> json) => ArtistItem(
  name: json['name'] as String,
  id: json['id'] as String,
  ctr: (json['ctr'] as num?)?.toDouble(),
  entity: (json['entity'] as num?)?.toInt(),
  image: json['image'] as String?,
  role: json['role'] as String?,
  permaUrl: json['perma_url'] as String?,
  type: json['type'] as String,
  miniObj: json['mini_obj'] as bool?,
  isRadioPresent: json['is_radio_present'] as bool?,
  isFollowed: json['is_followed'] as bool?,
);

Map<String, dynamic> _$ArtistItemToJson(ArtistItem instance) =>
    <String, dynamic>{
      'name': instance.name,
      'id': instance.id,
      'ctr': instance.ctr,
      'entity': instance.entity,
      'image': instance.image,
      'role': instance.role,
      'perma_url': instance.permaUrl,
      'type': instance.type,
      'mini_obj': instance.miniObj,
      'is_radio_present': instance.isRadioPresent,
      'is_followed': instance.isFollowed,
    };
