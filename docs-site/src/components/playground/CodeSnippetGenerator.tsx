import { useState, useMemo } from 'react';
import hljs from 'highlight.js/lib/core';
import dart from 'highlight.js/lib/languages/dart';

hljs.registerLanguage('dart', dart);

interface CodeSnippetGeneratorProps {
    url: string;
    endpointName: string;
    params: Record<string, string>;
    call: string;
}

const generateDartSnippet = (_endpointName: string, call: string, params: Record<string, string>): string => {
    const searchEndpoints = ['search.getResults', 'search.getAlbumResults', 'search.getArtistResults', 'search.getPlaylistResults'];
    const isSearch = searchEndpoints.includes(call);
    
    if (isSearch) {
        const query = params.q || 'your query';
        const page = params.p || '1';
        const limit = params.n || '10';
        const searchType = call.includes('Album') ? 'albums' : call.includes('Artist') ? 'artists' : call.includes('Playlist') ? 'playlists' : 'songs';
        
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final results = await client.search.${searchType}('${query}', page: ${page}, limit: ${limit});
  
  for (final item in results.results) {
    print('\${item.title} - \${item.subtitle}');
  }
  
  client.close();
}`;
    }
    
    if (call === 'song.getDetails') {
        const pids = params.pids || 'song_id';
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final song = await client.songs.detailsById(['${pids}']);
  
  print('Title: \${song['title']}');
  print('Album: \${song['more_info']['album']}');
  print('Duration: \${song['more_info']['duration']}s');
  
  client.close();
}`;
    }
    
    if (call === 'content.getAlbumDetails') {
        const albumid = params.albumid || 'album_id';
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final album = await client.albums.detailsById('${albumid}');
  
  print('Album: \${album['title']}');
  print('Artist: \${album['primary_artists']}');
  
  final songs = album['songs'] as List<dynamic>? ?? [];
  print('Songs: \${songs.length}');
  
  for (final song in songs) {
    print('  - \${song['song'] ?? song['title']}');
  }
  
  client.close();
}`;
    }
    
    if (call === 'artist.getArtistPageDetails') {
        const artistId = params.artistId || 'artist_id';
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final artist = await client.artists.getArtistPageDetails('${artistId}');
  
  print('Artist: \${artist.name}');
  print('Followers: \${artist.followerCount}');
  print('Top Songs: \${artist.topSongs.length}');
  print('Albums: \${artist.topAlbums.length}');
  
  client.close();
}`;
    }
    
    if (call === 'lyrics.getLyrics') {
        const lyricsId = params.lyrics_id || 'song_id';
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final lyrics = await client.lyrics.get('${lyricsId}');
  
  print(lyrics.lyrics);
  
  client.close();
}`;
    }
    
    if (call === 'webapi.getLaunchData') {
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final homeData = await client.home.getLaunchData();
  
  print('Trending: \${homeData.newTrending?.length ?? 0}');
  print('Top Playlists: \${homeData.topPlaylists?.length ?? 0}');
  print('Charts: \${homeData.charts?.length ?? 0}');
  
  client.close();
}`;
    }
    
    if (call === 'content.getFeaturedPlaylists') {
        const limit = params.n || '10';
        const page = params.p || '1';
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final playlists = await client.featuredPlaylists.getFeaturedPlaylists(
    n: ${limit},
    p: ${page},
  );
  
  for (final playlist in playlists.data) {
    print('\${playlist.listname} - \${playlist.listid}');
  }
  
  client.close();
}`;
    }
    
    return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  // TODO: Add your code here
  
  client.close();
}`;
};

const CodeSnippetGenerator = ({ url, endpointName, params, call }: CodeSnippetGeneratorProps) => {
    const [copied, setCopied] = useState(false);

    const snippet = useMemo(() => {
        return generateDartSnippet(endpointName, call, params);
    }, [url, endpointName, params, call]);

    const highlightedCode = useMemo(() => {
        try {
            return hljs.highlight(snippet, { language: 'dart' }).value;
        } catch {
            return snippet;
        }
    }, [snippet]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(snippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.08] flex-shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-400">Dart</span>
                    <span className="text-xs text-gray-500">using saavn_play package</span>
                </div>
                
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        copied
                            ? 'text-emerald-400 bg-emerald-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                    {copied ? (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </>
                    )}
                </button>
            </div>

            {/* Code display */}
            <div className="flex-1 overflow-auto min-h-0">
                <pre className="p-4 text-sm font-mono leading-relaxed">
                    <code
                        className="language-dart"
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                </pre>
            </div>
        </div>
    );
};

export default CodeSnippetGenerator;
