# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
