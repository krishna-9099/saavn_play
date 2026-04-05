// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'song_search_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SongSearchResponse _$SongSearchResponseFromJson(Map<String, dynamic> json) =>
    SongSearchResponse(
      total: (json['total'] as num).toInt(),
      start: (json['start'] as num).toInt(),
      results: (json['results'] as List<dynamic>)
          .map((e) => SongItem.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$SongSearchResponseToJson(SongSearchResponse instance) =>
    <String, dynamic>{
      'total': instance.total,
      'start': instance.start,
      'results': instance.results,
    };
