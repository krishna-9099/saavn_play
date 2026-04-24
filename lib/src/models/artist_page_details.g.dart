// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'artist_page_details.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ArtistPageDetails _$ArtistPageDetailsFromJson(Map<String, dynamic> json) =>
    ArtistPageDetails(
      artistId: json['artistId'] as String,
      name: json['name'] as String,
      subtitle: json['subtitle'] as String?,
      image: json['image'] as String?,
      followerCount: json['follower_count'] as String?,
      type: json['type'] as String?,
      isVerified: json['isVerified'] as bool?,
      dominantLanguage: json['dominantLanguage'] as String?,
      dominantType: json['dominantType'] as String?,
      topSongs: json['topSongs'] as List<dynamic>?,
      topAlbums: json['topAlbums'] as List<dynamic>?,
      latestReleases: json['latest_release'] as List<dynamic>?,
      featuredInPlaylists: json['featured_artist_playlist'] as List<dynamic>?,
      singles: json['singles'] as List<dynamic>?,
      dedicatedPlaylists: json['dedicated_artist_playlist'] as List<dynamic>?,
      similarArtists: json['similarArtists'] as List<dynamic>?,
      bio: json['bio'] as String?,
      isRadioPresent: json['isRadioPresent'] as bool?,
      isFollowed: json['is_followed'] as bool?,
      fanCount: json['fan_count'] as String?,
    );

Map<String, dynamic> _$ArtistPageDetailsToJson(ArtistPageDetails instance) =>
    <String, dynamic>{
      'artistId': instance.artistId,
      'name': instance.name,
      'subtitle': instance.subtitle,
      'image': instance.image,
      'follower_count': instance.followerCount,
      'type': instance.type,
      'isVerified': instance.isVerified,
      'dominantLanguage': instance.dominantLanguage,
      'dominantType': instance.dominantType,
      'topSongs': instance.topSongs,
      'topAlbums': instance.topAlbums,
      'latest_release': instance.latestReleases,
      'featured_artist_playlist': instance.featuredInPlaylists,
      'singles': instance.singles,
      'dedicated_artist_playlist': instance.dedicatedPlaylists,
      'similarArtists': instance.similarArtists,
      'bio': instance.bio,
      'isRadioPresent': instance.isRadioPresent,
      'is_followed': instance.isFollowed,
      'fan_count': instance.fanCount,
    };
