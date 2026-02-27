import 'package:saavn_play/src/models/image.dart';
import 'package:saavn_play/src/utils/link.dart';
import 'package:json_annotation/json_annotation.dart';

part 'search.g.dart';

String _stringOrEmpty(Object? value) => value?.toString() ?? '';

String? _stringOrNull(Object? value) => value?.toString();

int _intOrZero(Object? value) {
  if (value is int) return value;
  return int.tryParse(value?.toString() ?? '') ?? 0;
}

Map<String, dynamic> _mapOrEmpty(Object? value) {
  if (value is Map<String, dynamic>) return value;
  return <String, dynamic>{};
}

List<dynamic> _listOrEmpty(Object? value) {
  if (value is List) return value;
  return const <dynamic>[];
}

/// Combined search response containing results for all content types.
///
/// Includes albums, songs, artists, playlists, and top query results.
@JsonSerializable()
class AllSearchResponse {
  /// Album search results.
  @JsonKey(name: 'albums')
  SearchResponse<List<SearchAlbumResponse>> albums;

  /// Song search results.
  @JsonKey(name: 'songs')
  SearchResponse<List<SearchSongResponse>> songs;

  /// Artist search results.
  @JsonKey(name: 'artists')
  SearchResponse<List<SearchArtistResponse>> artists;

  /// Playlist search results.
  @JsonKey(name: 'playlists')
  SearchResponse<List<SearchPlaylistResponse>> playlists;

  /// Top query results.
  @JsonKey(name: 'topQuery')
  SearchResponse<List<SearchTopQueryResponse>> topQuery;

  AllSearchResponse({
    required this.albums,
    required this.songs,
    required this.artists,
    required this.playlists,
    required this.topQuery,
  });

  /// Creates an AllSearchResponse from custom JSON format.
  factory AllSearchResponse.fromCustomJson(
    Map<String, dynamic> allSearchResults,
  ) {
    final topQueryMap = _mapOrEmpty(allSearchResults['topquery']);
    final songsMap = _mapOrEmpty(allSearchResults['songs']);
    final albumsMap = _mapOrEmpty(allSearchResults['albums']);
    final artistsMap = _mapOrEmpty(allSearchResults['artists']);
    final playlistsMap = _mapOrEmpty(allSearchResults['playlists']);

    return AllSearchResponse(
      topQuery: SearchResponse(
        results: _listOrEmpty(topQueryMap['data'])
            .map((item) => _mapOrEmpty(item))
            .map((item) => SearchTopQueryResponse.fromJson({
                  ...item,
                  ..._mapOrEmpty(item['more_info']),
                }))
            .toList()
            .cast<SearchTopQueryResponse>(),
        position: _intOrZero(topQueryMap['position']),
      ),
      songs: SearchResponse(
        results: _listOrEmpty(songsMap['data'])
            .map((item) => _mapOrEmpty(item))
            .map((item) => SearchSongResponse.fromJson({
                  ...item,
                  ..._mapOrEmpty(item['more_info']),
                }))
            .toList()
            .cast<SearchSongResponse>(),
        position: _intOrZero(songsMap['position']),
      ),
      albums: SearchResponse(
        results: _listOrEmpty(albumsMap['data'])
            .map((item) => _mapOrEmpty(item))
            .map((item) => SearchAlbumResponse.fromJson({
                  ...item,
                  ..._mapOrEmpty(item['more_info']),
                }))
            .toList()
            .cast<SearchAlbumResponse>(),
        position: _intOrZero(albumsMap['position']),
      ),
      artists: SearchResponse(
        results: _listOrEmpty(artistsMap['data'])
            .map((item) => SearchArtistResponse.fromJson(_mapOrEmpty(item)))
            .toList()
            .cast<SearchArtistResponse>(),
        position: _intOrZero(artistsMap['position']),
      ),
      playlists: SearchResponse(
        results: _listOrEmpty(playlistsMap['data'])
            .map((item) => _mapOrEmpty(item))
            .map((item) => SearchPlaylistResponse.fromJson({
                  ...item,
                  ..._mapOrEmpty(item['more_info']),
                }))
            .toList()
            .cast<SearchPlaylistResponse>(),
        position: _intOrZero(playlistsMap['position']),
      ),
    );
  }

  /// Creates an AllSearchResponse from a JSON map.
  factory AllSearchResponse.fromJson(Map<String, dynamic> json) =>
      _$AllSearchResponseFromJson(json);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$AllSearchResponseToJson(this);
}

/// Generic search response wrapper.
///
/// Contains results of type [T] and position information.
@JsonSerializable(genericArgumentFactories: true)
class SearchResponse<T> {
  /// Search results.
  T results;

  /// Position in the search results.
  int position;

  SearchResponse({required this.results, required this.position});

  /// Creates a SearchResponse from a JSON map.
  factory SearchResponse.fromJson(
    Map<String, dynamic> json,
    T Function(Object? json) fromJsonT,
  ) =>
      _$SearchResponseFromJson(json, fromJsonT);

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson(Object? Function(T value) toJsonT) =>
      _$SearchResponseToJson(this, toJsonT);
}

/// Album search result response.
///
/// Contains album information from search results.
@JsonSerializable()
class SearchAlbumResponse {
  /// Unique identifier for the album.
  @JsonKey(name: 'id')
  String id;

  /// Title of the album.
  @JsonKey(name: 'title')
  String title;

  /// Album cover images in multiple sizes.
  @JsonKey(name: 'image', fromJson: createImageLinks)
  List<DownloadLink>? image;

  /// Artist name(s).
  @JsonKey(name: 'artist')
  String? artist;

  /// URL to the album page.
  @JsonKey(name: 'url')
  String url;

  /// Type of content.
  @JsonKey(name: 'type')
  String type;

  /// Description text.
  @JsonKey(name: 'description')
  String description;

  /// Position in search results.
  @JsonKey(name: 'position')
  int position;

  /// Release year.
  @JsonKey(name: 'year')
  String year;

  /// Language of the album.
  @JsonKey(name: 'language')
  String language;

  /// IDs of songs in the album.
  @JsonKey(name: 'song_ids')
  String? songIds;

  SearchAlbumResponse({
    required this.id,
    required this.title,
    required this.image,
    required this.artist,
    required this.url,
    required this.type,
    required this.description,
    required this.position,
    required this.year,
    required this.language,
    required this.songIds,
  });

  /// Creates a SearchAlbumResponse from a JSON map.
  factory SearchAlbumResponse.fromJson(Map<String, dynamic> json) {
    return SearchAlbumResponse(
      id: _stringOrEmpty(json['id']),
      title: _stringOrEmpty(json['title']),
      image: createImageLinks(_stringOrNull(json['image'])),
      artist: _stringOrNull(json['artist']),
      url: _stringOrEmpty(json['url']),
      type: _stringOrEmpty(json['type']),
      description: _stringOrEmpty(json['description']),
      position: _intOrZero(json['position']),
      year: _stringOrEmpty(json['year']),
      language: _stringOrEmpty(json['language']),
      songIds: _stringOrNull(json['song_ids']),
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SearchAlbumResponseToJson(this);
}

/// Song search result response.
///
/// Contains song information from search results.
@JsonSerializable()
class SearchSongResponse {
  /// Unique identifier for the song.
  @JsonKey(name: 'id')
  String id;

  /// Title of the song.
  @JsonKey(name: 'title')
  String title;

  /// Song cover images in multiple sizes.
  @JsonKey(name: 'image', fromJson: createImageLinks)
  List<DownloadLink>? image;

  /// Album name.
  @JsonKey(name: 'album')
  String album;

  /// URL to the song page.
  @JsonKey(name: 'url')
  String url;

  /// Type of content.
  @JsonKey(name: 'type')
  String type;

  /// Description text.
  @JsonKey(name: 'description')
  String description;

  /// Position in search results.
  @JsonKey(name: 'position')
  int position;

  /// Primary artists string.
  @JsonKey(name: 'primary_artists')
  String primaryArtists;

  /// Singers/performers.
  @JsonKey(name: 'singers')
  String singers;

  /// Language of the song.
  @JsonKey(name: 'language')
  String language;

  /// Link to the song.
  @JsonKey(name: 'link')
  String? link;

  SearchSongResponse({
    required this.id,
    required this.title,
    required this.image,
    required this.album,
    required this.url,
    required this.type,
    required this.description,
    required this.position,
    required this.primaryArtists,
    required this.singers,
    required this.language,
    this.link,
  });

  /// Creates a SearchSongResponse from a JSON map.
  factory SearchSongResponse.fromJson(Map<String, dynamic> json) {
    return SearchSongResponse(
      id: _stringOrEmpty(json['id']),
      title: _stringOrEmpty(json['title']),
      image: createImageLinks(_stringOrNull(json['image'])),
      album: _stringOrEmpty(json['album']),
      url: _stringOrEmpty(json['url']),
      type: _stringOrEmpty(json['type']),
      description: _stringOrEmpty(json['description']),
      position: _intOrZero(json['position']),
      primaryArtists: _stringOrEmpty(json['primary_artists']),
      singers: _stringOrEmpty(json['singers']),
      language: _stringOrEmpty(json['language']),
      link: _stringOrNull(json['link']),
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SearchSongResponseToJson(this);
}

/// Artist search result response.
///
/// Contains artist information from search results.
@JsonSerializable()
class SearchArtistResponse {
  /// Unique identifier for the artist.
  @JsonKey(name: 'id')
  String id;

  /// Name of the artist.
  @JsonKey(name: 'title')
  String title;

  /// Artist images in multiple sizes.
  @JsonKey(name: 'image', fromJson: createImageLinks)
  List<DownloadLink>? image;

  /// URL to the artist page.
  @JsonKey(name: 'url')
  String url;

  /// Type of content.
  @JsonKey(name: 'type')
  String type;

  /// Description text.
  @JsonKey(name: 'description')
  String description;

  /// Position in search results.
  @JsonKey(name: 'position')
  int position;

  SearchArtistResponse({
    required this.id,
    required this.title,
    required this.image,
    required this.url,
    required this.type,
    required this.description,
    required this.position,
  });

  /// Creates a SearchArtistResponse from a JSON map.
  factory SearchArtistResponse.fromJson(Map<String, dynamic> json) {
    return SearchArtistResponse(
      id: _stringOrEmpty(json['id']),
      title: _stringOrEmpty(json['title']),
      image: createImageLinks(_stringOrNull(json['image'])),
      url: _stringOrEmpty(json['url']),
      type: _stringOrEmpty(json['type']),
      description: _stringOrEmpty(json['description']),
      position: _intOrZero(json['position']),
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SearchArtistResponseToJson(this);
}

/// Playlist search result response.
///
/// Contains playlist information from search results.
@JsonSerializable()
class SearchPlaylistResponse {
  /// Unique identifier for the playlist.
  @JsonKey(name: 'id')
  String id;

  /// Title of the playlist.
  @JsonKey(name: 'title')
  String title;

  /// Playlist cover images in multiple sizes.
  @JsonKey(name: 'image', fromJson: createImageLinks)
  List<DownloadLink>? image;

  /// URL to the playlist page.
  @JsonKey(name: 'url')
  String url;

  /// Language of the playlist.
  @JsonKey(name: 'language')
  String language;

  /// Type of content.
  @JsonKey(name: 'type')
  String type;

  /// Description text.
  @JsonKey(name: 'description')
  String description;

  /// Position in search results.
  @JsonKey(name: 'position')
  int position;

  SearchPlaylistResponse({
    required this.id,
    required this.title,
    required this.image,
    required this.url,
    required this.language,
    required this.type,
    required this.description,
    required this.position,
  });

  /// Creates a SearchPlaylistResponse from a JSON map.
  factory SearchPlaylistResponse.fromJson(Map<String, dynamic> json) {
    return SearchPlaylistResponse(
      id: _stringOrEmpty(json['id']),
      title: _stringOrEmpty(json['title']),
      image: createImageLinks(_stringOrNull(json['image'])),
      url: _stringOrEmpty(json['url']),
      language: _stringOrEmpty(json['language']),
      type: _stringOrEmpty(json['type']),
      description: _stringOrEmpty(json['description']),
      position: _intOrZero(json['position']),
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SearchPlaylistResponseToJson(this);
}

/// Top query search result response.
///
/// Contains the top matching result from a search query.
@JsonSerializable()
class SearchTopQueryResponse {
  /// Unique identifier.
  @JsonKey(name: 'id')
  String id;

  /// Title of the result.
  @JsonKey(name: 'title')
  String title;

  /// Images in multiple sizes.
  @JsonKey(name: 'image', fromJson: createImageLinks)
  List<DownloadLink>? image;

  /// Album name (if applicable).
  @JsonKey(name: 'album')
  String? album;

  /// URL to the content page.
  @JsonKey(name: 'url')
  String url;

  /// Type of content.
  @JsonKey(name: 'type')
  String type;

  /// Description text.
  @JsonKey(name: 'description')
  String description;

  /// Position in results.
  @JsonKey(name: 'position')
  int position;

  /// Primary artists (if applicable).
  @JsonKey(name: 'primary_artists')
  String? primaryArtists;

  /// Singers/performers (if applicable).
  @JsonKey(name: 'singers')
  String? singers;

  /// Language of the content.
  @JsonKey(name: 'language')
  String? language;

  /// Link to the content.
  @JsonKey(name: 'link')
  String? link;

  SearchTopQueryResponse({
    required this.id,
    required this.title,
    this.image,
    required this.album,
    required this.url,
    required this.type,
    required this.description,
    required this.position,
    required this.primaryArtists,
    required this.singers,
    required this.language,
    this.link,
  });

  /// Creates a SearchTopQueryResponse from a JSON map.
  factory SearchTopQueryResponse.fromJson(Map<String, dynamic> json) {
    return SearchTopQueryResponse(
      id: _stringOrEmpty(json['id']),
      title: _stringOrEmpty(json['title']),
      image: createImageLinks(_stringOrNull(json['image'])),
      album: _stringOrNull(json['album']),
      url: _stringOrEmpty(json['url']),
      type: _stringOrEmpty(json['type']),
      description: _stringOrEmpty(json['description']),
      position: _intOrZero(json['position']),
      primaryArtists: _stringOrNull(json['primary_artists']),
      singers: _stringOrNull(json['singers']),
      language: _stringOrNull(json['language']),
      link: _stringOrNull(json['link']),
    );
  }

  /// Converts this instance to a JSON map.
  Map<String, dynamic> toJson() => _$SearchTopQueryResponseToJson(this);
}
