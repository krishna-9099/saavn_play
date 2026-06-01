import { useState, useMemo } from 'react';
import hljs from 'highlight.js/lib/core';
import dart from 'highlight.js/lib/languages/dart';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('dart', dart);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);

type Language = 'dart' | 'javascript' | 'python' | 'curl';

interface CodeSnippetGeneratorProps {
    url: string;
    endpointName: string;
    params: Record<string, string>;
    call: string;
}

const languageConfig: Record<Language, { label: string; icon: string; language: string }> = {
    dart: { label: 'Dart', icon: '🎯', language: 'dart' },
    javascript: { label: 'JavaScript', icon: 'JS', language: 'javascript' },
    python: { label: 'Python', icon: '🐍', language: 'python' },
    curl: { label: 'cURL', icon: '$', language: 'bash' },
};

const generateDartSnippet = (_endpointName: string, call: string, params: Record<string, string>): string => {
    const methodName = call.split('.').pop() || 'getResults';
    
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
  final song = await client.songs.details('${pids}');
  
  print('Title: \${song.title}');
  print('Album: \${song.album.name}');
  print('Duration: \${song.duration}s');
  
  client.close();
}`;
    }
    
    if (call === 'content.getAlbumDetails') {
        const albumid = params.albumid || 'album_id';
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final album = await client.albums.details('${albumid}');
  
  print('Album: \${album.name}');
  print('Artist: \${album.artist}');
  print('Songs: \${album.songs.length}');
  
  for (final song in album.songs) {
    print('  - \${song.title}');
  }
  
  client.close();
}`;
    }
    
    if (call === 'artist.getArtistPageDetails') {
        const artistId = params.artistId || 'artist_id';
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final artist = await client.artists.details('${artistId}');
  
  print('Artist: \${artist.name}');
  print('Top Songs: \${artist.topSongs.length}');
  print('Albums: \${artist.albums.length}');
  
  client.close();
}`;
    }
    
    if (call === 'lyrics.getLyrics') {
        const lyricsId = params.lyrics_id || 'song_id';
        return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final lyrics = await client.songs.lyrics('${lyricsId}');
  
  print(lyrics.lyrics);
  
  client.close();
}`;
    }
    
    return `import 'package:saavn_play/saavn_play.dart';

void main() async {
  final client = SaavnPlayClient();
  final result = await client.${methodName}(${Object.entries(params).filter(([_, v]) => v).map(([_, v]) => `'${v}'`).join(', ')});
  
  print(result);
  
  client.close();
}`;
};

const generateJavaScriptSnippet = (_url: string): string => {
    return `const url = '${_url}';

const response = await fetch(url);
const data = await response.json();
console.log(data);`;
};

const generatePythonSnippet = (_url: string, params: Record<string, string>): string => {
    void _url;
    const baseUrl = 'https://www.jiosaavn.com/api.php';
    const allParams: Record<string, string> = {
        '_format': 'json',
        '_marker': '0',
        'ctx': 'web6dot0',
        'api_version': '4',
        ...params,
    };
    
    const paramsEntries = Object.entries(allParams)
        .filter(([_, v]) => v !== '')
        .map(([key, value]) => `    "${key}": "${value}"`)
        .join(',\n');
    
    return `import requests

url = "${baseUrl}"
params = {
${paramsEntries}
}

response = requests.get(url, params=params)
data = response.json()
print(data)`;
};

const generateCurlSnippet = (url: string): string => {
    return `curl -X GET "${url}"`;
};

const CodeSnippetGenerator = ({ url, endpointName, params, call }: CodeSnippetGeneratorProps) => {
    const [activeLanguage, setActiveLanguage] = useState<Language>('dart');
    const [copied, setCopied] = useState(false);

    const snippets = useMemo(() => ({
        dart: generateDartSnippet(endpointName, call, params),
        javascript: generateJavaScriptSnippet(url),
        python: generatePythonSnippet(url, params),
        curl: generateCurlSnippet(url),
    }), [url, endpointName, params, call]);

    const highlightedCode = useMemo(() => {
        const snippet = snippets[activeLanguage];
        const lang = languageConfig[activeLanguage].language;
        try {
            return hljs.highlight(snippet, { language: lang }).value;
        } catch {
            return snippet;
        }
    }, [snippets, activeLanguage]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(snippets[activeLanguage]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Language tabs */}
            <div className="flex items-center gap-1 px-4 py-3 bg-white/[0.03] border-b border-white/[0.08] flex-shrink-0">
                {(Object.keys(languageConfig) as Language[]).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            activeLanguage === lang
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
                        }`}
                    >
                        <span className="text-[10px] font-mono">{languageConfig[lang].icon}</span>
                        {languageConfig[lang].label}
                    </button>
                ))}
                
                <div className="flex-1" />
                
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
                        className={`language-${languageConfig[activeLanguage].language}`}
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                </pre>
            </div>
        </div>
    );
};

export default CodeSnippetGenerator;
