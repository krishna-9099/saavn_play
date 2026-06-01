import { useState } from 'react';
import CodeBlock from '../components/ui/CodeBlock';
import GlassCard from '../components/ui/GlassCard';

const Models = () => {
    const [expandedModel, setExpandedModel] = useState<string | null>('song');

    const toggleModel = (id: string) => {
        setExpandedModel(expandedModel === id ? null : id);
    };

    const songModelExample = `class Song {
  final String id;
  final String name;
  final String? subtitle;
  final Album? album;
  final List<Artist> artists;
  final String? primaryArtists;
  final String? featuredArtists;
  final int? duration;
  final String? playUrl;
  final String? downloadUrl;
  final String? copyright;
  final int? releaseDate;
  final List<Image>? images;
  final bool? hasLyrics;
  final String? lyricsId;
}`;

    const albumModelExample = `class Album {
  final String id;
  final String name;
  final String? subtitle;
  final String? description;
  final int? year;
  final int? songCount;
  final List<Artist>? artists;
  final String? primaryArtists;
  final List<Image>? images;
  final List<Song>? songs;
  final String? copyright;
}`;

    const artistModelExample = `class Artist {
  final String id;
  final String name;
  final String? subtitle;
  final String? bio;
  final int? followerCount;
  final bool? isVerified;
  final List<Image>? images;
  final List<Song>? topSongs;
  final List<Album>? albums;
  final List<Artist>? similarArtists;
}`;

    const playlistModelExample = `class Playlist {
  final String id;
  final String name;
  final String? subtitle;
  final String? description;
  final int? songCount;
  final int? followerCount;
  final List<Image>? images;
  final List<Song>? songs;
  final User? createdBy;
}`;

    const searchResultExample = `class SearchResult {
  final List<Song> songs;
  final List<Album> albums;
  final List<Artist> artists;
  final List<Playlist> playlists;
}`;

    const models = [
        {
            id: 'song',
            title: 'Song',
            description: 'Represents a song with all its metadata including audio URLs, album info, and artist details.',
            code: songModelExample,
        },
        {
            id: 'album',
            title: 'Album',
            description: 'Represents an album with track listing, artist information, and cover art.',
            code: albumModelExample,
        },
        {
            id: 'artist',
            title: 'Artist',
            description: 'Represents an artist with biography, top songs, albums, and similar artists.',
            code: artistModelExample,
        },
        {
            id: 'playlist',
            title: 'Playlist',
            description: 'Represents a playlist with songs, metadata, and creator information.',
            code: playlistModelExample,
        },
        {
            id: 'search-result',
            title: 'SearchResult',
            description: 'Container for search results containing songs, albums, artists, and playlists.',
            code: searchResultExample,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Data</span> Models
                </h1>
                <p className="text-gray-400 text-lg">
                    All API responses are strongly typed using Dart models. Here's a reference of the available models.
                </p>
            </div>

            {/* Model Accordions */}
            <div className="space-y-4">
                {models.map((model) => (
                    <GlassCard key={model.id} className="overflow-hidden" hover={false}>
                        <button
                            onClick={() => toggleModel(model.id)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors hover:bg-white/[0.02]"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-white">
                                    <span className="text-emerald-500">{model.title}</span>
                                </h2>
                                <p className="text-gray-400 text-sm mt-1">{model.description}</p>
                            </div>
                            <svg
                                className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${
                                    expandedModel === model.id ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {expandedModel === model.id && (
                            <div className="px-6 pb-4 animate-fade-in">
                                <CodeBlock
                                    code={model.code}
                                    language="dart"
                                    title={`${model.id}.dart`}
                                />
                            </div>
                        )}
                    </GlassCard>
                ))}
            </div>

            {/* Common Models */}
            <GlassCard className="p-6">
                <h2 id="common" className="text-2xl font-bold text-white mb-4">
                    <span className="text-emerald-500">Common</span> Models
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            <span className="text-emerald-400">Image</span>
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Represents an image with different quality levels.
                        </p>
                        <CodeBlock
                            code={`class Image {
  final String url;
  final String? quality; // 'low', 'medium', 'high'
  final int? width;
  final int? height;
}`}
                            language="dart"
                            title="image.dart"
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                            <span className="text-emerald-400">Lyrics</span>
                        </h3>
                        <p className="text-gray-400 mb-3">
                            Represents song lyrics with optional sync information.
                        </p>
                        <CodeBlock
                            code={`class Lyrics {
  final String id;
  final String text;
  final bool synced;
  final List<SyncedLine>? syncedLyrics;
}

class SyncedLine {
  final Duration timestamp;
  final String text;
}`}
                            language="dart"
                            title="lyrics.dart"
                        />
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};

export default Models;
