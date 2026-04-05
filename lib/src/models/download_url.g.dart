// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'download_url.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DownloadUrl _$DownloadUrlFromJson(Map<String, dynamic> json) => DownloadUrl(
  quality: json['quality'] as String,
  link: json['link'] as String,
  isDefault: json['isDefault'] as bool? ?? false,
);

Map<String, dynamic> _$DownloadUrlToJson(DownloadUrl instance) =>
    <String, dynamic>{
      'quality': instance.quality,
      'link': instance.link,
      'isDefault': instance.isDefault,
    };
