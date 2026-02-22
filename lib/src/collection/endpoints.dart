const endpoints = (
  modules: 'content.getBrowseModules',
  search: (
    all: 'autocomplete.get',
    songs: 'search.getResults',
    albums: 'search.getAlbumResults',
    artists: 'search.getArtistResults',
    playlists: 'search.getPlaylistResults',
  ),
  songs: (id: 'song.getDetails'),
  albums: (id: 'content.getAlbumDetails'),
  playlists: (id: 'playlist.getDetails'),
  featuredPlaylists: 'content.getFeaturedPlaylists',
  artists: (
    id: 'artist.getArtistPageDetails',
    songs: 'artist.getArtistMoreSong',
    albums: 'artist.getArtistMoreAlbum',
    topSongs: 'search.artistOtherTopSongs',
  ),
  lyrics: 'lyrics.getLyrics',
  radio: (
    browse: 'content.getBrowseModules',
    createStation: 'webradio.createFeaturedStation',
    getSong: 'webradio.getSong',
  ),
  home: (launchData: 'webapi.getLaunchData'),
  podcasts: (topShows: 'content.getTopShows'),
  webapi: (
    get: 'webapi.get',
    footerDetails: 'webapi.getFooterDetails',
    browseHoverDetails: 'webapi.getBrowseHoverDetails',
  ),
);
