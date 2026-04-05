// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'album_search_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AlbumSearchResponse _$AlbumSearchResponseFromJson(Map<String, dynamic> json) =>
    AlbumSearchResponse(
      total: (json['total'] as num).toInt(),
      start: (json['start'] as num).toInt(),
      results: (json['results'] as List<dynamic>)
          .map((e) => AlbumItem.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$AlbumSearchResponseToJson(
  AlbumSearchResponse instance,
) => <String, dynamic>{
  'total': instance.total,
  'start': instance.start,
  'results': instance.results,
};
