// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'artist_search_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ArtistSearchResponse _$ArtistSearchResponseFromJson(
  Map<String, dynamic> json,
) => ArtistSearchResponse(
  total: (json['total'] as num).toInt(),
  start: (json['start'] as num).toInt(),
  results: (json['results'] as List<dynamic>)
      .map((e) => ArtistItem.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$ArtistSearchResponseToJson(
  ArtistSearchResponse instance,
) => <String, dynamic>{
  'total': instance.total,
  'start': instance.start,
  'results': instance.results,
};
