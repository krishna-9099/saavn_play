import 'package:saavn_play/saavn_play.dart';

void main(List<String> args) async {
  final client = SaavnPlayClient();

  print('=== Testing Artist Page Details API ===');

  // Get artist page details with all sections
  final details = await client.artists.getArtistPageDetails('459320');

  print('Artist: ${details.name}');
  print('Followers: ${details.followerCount}');
  print('Verified: ${details.isVerified}');
  print('Bio length: ${details.bio?.length ?? 0} chars');
  print('');

  print('=== Sections Available ===');
  print('topSongs: ${details.topSongs?.length ?? 0} items');
  print('topAlbums: ${details.topAlbums?.length ?? 0} items');
  print('latestReleases: ${details.latestReleases?.length ?? 0} items');
  print(
    'featuredInPlaylists: ${details.featuredInPlaylists?.length ?? 0} items',
  );
  print('singles: ${details.singles?.length ?? 0} items');
  print('dedicatedPlaylists: ${details.dedicatedPlaylists?.length ?? 0} items');
  print('');

  // Show top songs titles
  if (details.topSongs != null && details.topSongs!.isNotEmpty) {
    print('=== Top Songs ===');
    for (
      var i = 0;
      i < (details.topSongs!.length > 5 ? 5 : details.topSongs!.length);
      i++
    ) {
      final song = details.topSongs![i];
      print('${i + 1}. ${song['title'] ?? song['song'] ?? 'Unknown'}');
    }
  }

  // Show top albums
  if (details.topAlbums != null && details.topAlbums!.isNotEmpty) {
    print('');
    print('=== Top Albums ===');
    for (
      var i = 0;
      i < (details.topAlbums!.length > 5 ? 5 : details.topAlbums!.length);
      i++
    ) {
      final album = details.topAlbums![i];
      print('${i + 1}. ${album['title'] ?? 'Unknown'}');
    }
  }

  // Show latest releases
  if (details.latestReleases != null && details.latestReleases!.isNotEmpty) {
    print('');
    print('=== Latest Releases ===');
    for (var i = 0; i < details.latestReleases!.length; i++) {
      final album = details.latestReleases![i];
      print('${i + 1}. ${album['title'] ?? 'Unknown'}');
    }
  }

  // Show featured in (songs where artist is featured)
  if (details.featuredInPlaylists != null &&
      details.featuredInPlaylists!.isNotEmpty) {
    print('');
    print('=== Featured In (Playlists) ===');
    for (
      var i = 0;
      i <
          (details.featuredInPlaylists!.length > 3
              ? 3
              : details.featuredInPlaylists!.length);
      i++
    ) {
      final playlist = details.featuredInPlaylists![i];
      print('${i + 1}. ${playlist['title'] ?? 'Unknown'}');
    }
  }

  print('');
  print('=== Test Complete ===');
}
