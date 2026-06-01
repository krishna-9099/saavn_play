export type ChangeType = 'added' | 'fixed' | 'changed' | 'removed';

export interface Change {
  type: ChangeType;
  description: string;
}

export interface VersionEntry {
  version: string;
  date: string;
  changes: Change[];
}

export const changelog: VersionEntry[] = [
  {
    version: 'v1.3.0',
    date: '2025-01-15',
    changes: [
      { type: 'added', description: 'New Podcast API for discovering top shows' },
      { type: 'added', description: 'Radio API for accessing radio stations and streaming content' },
      { type: 'added', description: 'Lyrics API for fetching song lyrics with copyright info' },
      { type: 'added', description: 'Playlist API for getting playlist details and featured lists' },
      { type: 'added', description: 'Home endpoint for launch data with trending modules and charts' },
      { type: 'added', description: 'Interactive API playground for testing endpoints' },
      { type: 'added', description: 'Batch request support for multiple API calls' },
      { type: 'added', description: 'Request history and collections features' },
      { type: 'changed', description: 'Improved error handling with detailed error messages' },
      { type: 'changed', description: 'Enhanced type safety across all models' },
      { type: 'fixed', description: 'Resolved timeout issues on large search results' },
      { type: 'fixed', description: 'Fixed null safety issues in Artist model' },
    ],
  },
  {
    version: 'v1.2.0',
    date: '2024-11-20',
    changes: [
      { type: 'added', description: 'Artist API with profile, songs, and albums support' },
      { type: 'added', description: 'ArtistPageDetails typed response model' },
      { type: 'added', description: 'Social links extraction for artist profiles' },
      { type: 'added', description: 'Language and dominant type fields for artists' },
      { type: 'changed', description: 'Refactored search to support pagination parameters' },
      { type: 'changed', description: 'Updated Song model with additional metadata fields' },
      { type: 'fixed', description: 'Fixed album track listing order inconsistency' },
      { type: 'fixed', description: 'Resolved image URL encoding issues' },
    ],
  },
  {
    version: 'v1.1.0',
    date: '2024-09-10',
    changes: [
      { type: 'added', description: 'Album API with detailed album information' },
      { type: 'added', description: 'Album recommendations endpoint' },
      { type: 'added', description: 'Song recommendations based on listening history' },
      { type: 'added', description: 'Cover art and image URL support for albums' },
      { type: 'changed', description: 'Improved search result accuracy' },
      { type: 'changed', description: 'Enhanced error messages for API failures' },
      { type: 'fixed', description: 'Fixed client connection pooling issues' },
    ],
  },
  {
    version: 'v1.0.0',
    date: '2024-07-01',
    changes: [
      { type: 'added', description: 'Initial release of saavn_play package' },
      { type: 'added', description: 'Search API for songs, albums, artists, and playlists' },
      { type: 'added', description: 'Song details API with comprehensive metadata' },
      { type: 'added', description: 'SaavnPlayClient with configurable base URL' },
      { type: 'added', description: 'Full type safety with Dart 3.x support' },
      { type: 'added', description: 'MIT License for open source usage' },
    ],
  },
];

export const changeTypeLabels: Record<ChangeType, string> = {
  added: 'Added',
  fixed: 'Fixed',
  changed: 'Changed',
  removed: 'Removed',
};

export const changeTypeColors: Record<ChangeType, string> = {
  added: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  fixed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  changed: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  removed: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default changelog;
