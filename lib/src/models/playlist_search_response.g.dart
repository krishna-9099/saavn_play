// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'playlist_search_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PlaylistSearchResponse _$PlaylistSearchResponseFromJson(
  Map<String, dynamic> json,
) => PlaylistSearchResponse(
  total: (json['total'] as num).toInt(),
  start: (json['start'] as num).toInt(),
  results: (json['results'] as List<dynamic>)
      .map((e) => PlaylistItem.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$PlaylistSearchResponseToJson(
  PlaylistSearchResponse instance,
) => <String, dynamic>{
  'total': instance.total,
  'start': instance.start,
  'results': instance.results,
};
