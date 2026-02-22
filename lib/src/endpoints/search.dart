import 'package:saavn_play/src/client.dart';
import 'package:saavn_play/src/collection/endpoints.dart';
import 'package:saavn_play/src/models/album.dart';
import 'package:saavn_play/src/models/artist.dart';
import 'package:saavn_play/src/models/playlist.dart';
import 'package:saavn_play/src/models/search.dart';
import 'package:saavn_play/src/models/song.dart';

class SearchEndpoint extends BaseClient {
  SearchEndpoint([super.options]);

  Future<AllSearchResponse> all(String query) async {
    // api v4 doest not provide positions
    final result = await request(
      call: endpoints.search.all,
      queryParameters: {"query": query},
    );

    return AllSearchResponse.fromCustomJson(result);
  }

  Future<SongSearchResponse> songs(
    String query, {
    int page = 0,
    int limit = 10,
  }) async {
    // api v4 does not contain media_preview_url
    final response = await request(
      call: endpoints.search.songs,
      queryParameters: {"q": query, "p": page, "n": limit},
    );

    final req = SongSearchRequest.fromJson(response);

    return SongSearchResponse(
      results: req.results.map((e) => SongResponse.fromSongRequest(e)).toList(),
      start: req.start,
      total: req.total,
    );
  }

  Future<AlbumSearchResponse> albums(
    String query, {
    int page = 0,
    int limit = 10,
  }) async {
    // api v4 does not contain media_preview_url
    final response = await request(
      call: endpoints.search.albums,
      queryParameters: {"q": query, "p": page, "n": limit},
    );

    final req = AlbumSearchRequest.fromJson(response);

    return AlbumSearchResponse(
      results: req.results
          .map((e) => AlbumResponse.fromAlbumRequest(e))
          .toList(),
      start: req.start,
      total: req.total,
    );
  }

  Future<ArtistSearchResponse> artists(
    String query, {
    int page = 0,
    int limit = 10,
  }) async {
    // api v4 does not contain media_preview_url
    final response = await request(
      call: endpoints.search.artists,
      queryParameters: {"q": query, "p": page, "n": limit},
    );

    final req = ArtistSearchRequest.fromJson(response);

    return ArtistSearchResponse(
      results: req.results
          .map((e) => ArtistResponse.fromArtistRequest(e))
          .toList(),
      start: req.start,
      total: req.total,
    );
  }

  Future<PlaylistSearchResponse> playlists(
    String query, {
    int page = 0,
    int limit = 10,
  }) async {
    final response = await request(
      call: endpoints.search.playlists,
      queryParameters: {"q": query, "p": page, "n": limit},
    );

    final req = PlaylistSearchRequest.fromJson(response);

    return PlaylistSearchResponse(
      results: req.results
          .map((playlist) => PlaylistResponse.fromPlaylistRequest(playlist))
          .toList(),
      start: req.start,
      total: req.total,
    );
  }
}
