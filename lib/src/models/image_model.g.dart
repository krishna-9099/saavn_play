// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'image_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ImageModel _$ImageModelFromJson(Map<String, dynamic> json) => ImageModel(
  quality: json['quality'] as String,
  link: json['link'] as String,
  width: (json['width'] as num?)?.toInt(),
  height: (json['height'] as num?)?.toInt(),
  isDefault: json['isDefault'] as bool? ?? false,
);

Map<String, dynamic> _$ImageModelToJson(ImageModel instance) =>
    <String, dynamic>{
      'quality': instance.quality,
      'link': instance.link,
      'width': instance.width,
      'height': instance.height,
      'isDefault': instance.isDefault,
    };
