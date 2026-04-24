import 'package:json_annotation/json_annotation.dart';

part 'artist_page_details.g.dart';

@JsonSerializable()
class ArtistPageDetails {
  final String artistId;
  final String name;
  @JsonKey(name: 'subtitle')
  final String? subtitle;
  final String? image;
  @JsonKey(name: 'follower_count')
  final String? followerCount;
  final String? type;
  @JsonKey(name: 'isVerified')
  final bool? isVerified;
  @JsonKey(name: 'dominantLanguage')
  final String? dominantLanguage;
  @JsonKey(name: 'dominantType')
  final String? dominantType;
  @JsonKey(name: 'topSongs')
  final List<dynamic>? topSongs;
  @JsonKey(name: 'topAlbums')
  final List<dynamic>? topAlbums;
  @JsonKey(name: 'latest_release')
  final List<dynamic>? latestReleases;
  @JsonKey(name: 'featured_artist_playlist')
  final List<dynamic>? featuredInPlaylists;
  @JsonKey(name: 'singles')
  final List<dynamic>? singles;
  @JsonKey(name: 'dedicated_artist_playlist')
  final List<dynamic>? dedicatedPlaylists;
  @JsonKey(name: 'similarArtists')
  final List<dynamic>? similarArtists;
  final String? bio;
  @JsonKey(name: 'isRadioPresent')
  final bool? isRadioPresent;
  @JsonKey(name: 'is_followed')
  final bool? isFollowed;
  @JsonKey(name: 'fan_count')
  final String? fanCount;

  ArtistPageDetails({
    required this.artistId,
    required this.name,
    this.subtitle,
    this.image,
    this.followerCount,
    this.type,
    this.isVerified,
    this.dominantLanguage,
    this.dominantType,
    this.topSongs,
    this.topAlbums,
    this.latestReleases,
    this.featuredInPlaylists,
    this.singles,
    this.dedicatedPlaylists,
    this.similarArtists,
    this.bio,
    this.isRadioPresent,
    this.isFollowed,
    this.fanCount,
  });

  factory ArtistPageDetails.fromJson(Map<String, dynamic> json) =>
      _$ArtistPageDetailsFromJson(json);

  Map<String, dynamic> toJson() => _$ArtistPageDetailsToJson(this);

  @override
  String toString() {
    return 'ArtistPageDetails(artistId: $artistId, name: $name, topSongs: ${topSongs?.length ?? 0}, topAlbums: ${topAlbums?.length ?? 0}, latestReleases: ${latestReleases?.length ?? 0}, featuredInPlaylists: ${featuredInPlaylists?.length ?? 0})';
  }
}
