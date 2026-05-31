# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-05-31

### Fixed
- Fixed `artistMap` key name mismatch in `SongMoreInfo` and `AlbumMoreInfo` models - API sends `artistMap` (camelCase) but models expected `artist_map` (snake_case), causing artist data to always deserialize as null

### Added
- New API endpoints in `endpoints.dart`:
  - `content.getTrending` - Paginated trending content
  - `content.getCharts` - Paginated charts
  - `content.getAlbums` - Paginated new albums
  - `webradio.getFeaturedStations` - Paginated radio stations
  - `search.actorOtherTopSongs` - Songs by same actors
  - `reco.getreco` - Song recommendations
  - `reco.getAlbumReco` - Album recommendations
  - `search.topAlbumsoftheYear` - Top albums from same year
- New model classes:
  - `ArtistUrls` - Artist page navigation URLs (albums, bio, comments, songs, overview)
  - `ViewMoreConfig` - Pagination configuration for modules with api, page_param, size_param, default_size
  - `BrowseChannel` - Browse/discover channel items with mood/genre/situation/seasonality tags
  - `GlobalConfigPlaylist` - Typed global config playlist entries with listid, image, title, count
- New endpoint methods:
  - `SongEndpoint.getRecommendations()` - Get song recommendations based on song ID
  - `SongEndpoint.getCurrentlyTrending()` - Get currently trending songs
  - `SongEndpoint.getSongsBySameArtists()` - Get top songs by same artists
  - `SongEndpoint.getSongsBySameActors()` - Get top songs by same actors
  - `AlbumEndpoint.getRecommendations()` - Get album recommendations based on album ID
  - `AlbumEndpoint.getCurrentlyTrending()` - Get currently trending albums
  - `AlbumEndpoint.getTopAlbumsFromSameYear()` - Get top albums from the same year

### Changed
- Enhanced `ArtistPageDetails` model with missing fields:
  - `dob` - Date of birth (e.g., "25-04-1987")
  - `fb` - Facebook profile URL
  - `twitter` - Twitter profile URL
  - `wiki` - Wikipedia URL
  - `urls` - ArtistUrls object with page navigation URLs
  - `availableLanguages` - List of languages artist has content in
  - `topEpisodes` - Podcast episodes by the artist
  - `modules` - Module configuration metadata for UI rendering
- Enhanced `HomeSectionItem` model with missing fields:
  - `secondarySubtitle` - Secondary subtitle text
  - `miniObj` - Whether this is a mini object
  - `listCount` - Number of items in list
  - `listType` - Type of list
  - `list` - List data
- Enhanced `ModuleConfig` model with comprehensive fields:
  - `score`, `bucket`, `scrollType` - Module metadata
  - `simpleHeader`, `noHeader`, `hideMeta` - Display flags
  - `featured`, `featuredText` - Featured module configuration
  - `viewMore` - ViewMoreConfig object for pagination support
  - `isJtModule`, `buttonTooltipInfo` - Additional metadata
- Enhanced `GlobalConfig` to use typed `GlobalConfigPlaylist` objects instead of raw `Map<String, dynamic>`
- Enhanced `AlbumItem` model with `description` field for latest_release items (e.g., "Released 30 May 2026")

### Changed
- Updated documentation website content to match current public client API (`albums`, `artists`, `songs`, `home`, `podcasts`, `radio`)
- Added API documentation pages for Home and Podcast endpoints
- Refreshed examples and installation snippets to use current endpoint names and latest package version (`^1.2.0`)

## [1.2.0] - 2026-04-10

### Added
- Artist endpoint: Added `getArtistPageDetails()` method that returns full artist page data with all sections:
  - `topSongs` (10 items) - Artist's top songs
  - `topAlbums` (12 items) - Artist's top albums
  - `latest_release` (4 items) - Latest album releases
  - `featured_artist_playlist` (10 items) - Playlists where artist is featured
  - `singles` (20 items) - Single tracks
  - `dedicated_artist_playlist` (10 items) - Playlists dedicated to artist
  - `bio` - Artist biography
  - `follower_count`, `isVerified`, `dominantLanguage`, `dominantType`
- Added `ArtistPageDetails` model class with JSON serialization for all artist page fields

### Changed
- Updated `detailsById()` in ArtistEndpoint to use API v4 for more complete data

## [1.1.0] - 2026-02-27

### Added
- Home/launch data endpoint with dynamic section handling and error-tolerant variants
- Album `detailsByToken` helper for fetching albums via webapi token

### Changed
- Normalized album responses (image extraction, flexible song lists, primary artist and duration fallbacks)
- Hardened search and song model JSON parsing to handle missing or loosely-typed fields safely
- Exported home endpoint from the main library entrypoint

## [1.0.1] - 2026-02-23

### Fixed
- Standardized MIT license file for pub.dev recognition
- Added type annotation to `SongRequest._toString` parameter for static analysis
- Updated pointycastle dependency from ^3.7.0 to ^4.0.0
- Added comprehensive dartdoc comments to all public API models (album, artist, song, playlist, search, lyrics, image)

## [1.0.0] - 2026-02-23

### Added
- Comprehensive README documentation with API reference
- Home endpoint for fetching launch data (trending, playlists, albums, charts, radio)
- Radio endpoint with featured stations and station songs
- Podcast endpoint for browsing top shows
- Featured playlist endpoint with filters
- Web API endpoint for footer details, browse menus, and show details
- Lyrics endpoint for fetching song lyrics
- Strongly-typed models for all API responses
- Download URL generation with multiple quality options
- Image URL generation with multiple sizes
- Full API documentation with dartdoc comments
- Example file with usage demonstrations

### Changed
- Improved documentation and code examples
- Updated dependencies to latest versions
- Fixed all lint issues for perfect static analysis score
- Renamed classes to follow Dart naming conventions (SaavnPlayClient, SaavnPlayResponse)

## [0.1.0] - Initial Release

### Added
- Basic search functionality (songs, albums, artists, playlists)
- Song details by ID
- Album details by ID
- Artist details, songs, and albums
- Playlist details by ID
- API versioning support (v1-v6)
- Dio-based HTTP client
- JSON serialization with json_annotation
