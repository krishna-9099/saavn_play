import { useState, useMemo, useRef, useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', json);

interface ResponseViewerProps {
    data: unknown;
    status: number | null;
    duration: number;
    url: string;
    error?: string;
    isLoading: boolean;
}

const ResponseViewer = ({ data, status, duration, url, error, isLoading }: ResponseViewerProps) => {
    const [copied, setCopied] = useState(false);
    const [showRaw, setShowRaw] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const codeRef = useRef<HTMLElement>(null);

    const jsonString = useMemo(() => {
        if (!data) return '';
        try {
            return JSON.stringify(data, null, 2);
        } catch {
            return String(data);
        }
    }, [data]);

    const highlightedCode = useMemo(() => {
        if (!jsonString) return '';
        try {
            return hljs.highlight(jsonString, { language: 'json' }).value;
        } catch {
            return jsonString;
        }
    }, [jsonString]);

    useEffect(() => {
        if (codeRef.current && jsonString) {
            try {
                hljs.highlightElement(codeRef.current);
            } catch {
                // ignore
            }
        }
    }, [jsonString, showRaw]);

    const handleCopy = async () => {
        if (!jsonString) return;
        try {
            await navigator.clipboard.writeText(jsonString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const formatSize = (str: string) => {
        const bytes = new Blob([str]).size;
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-gray-500">Sending request...</span>
            </div>
        );
    }

    if (!data && !error) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
                <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                    <p className="text-sm text-gray-500">No response yet</p>
                    <p className="text-xs text-gray-700 mt-1">Select an endpoint and send a request</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.08] flex-shrink-0">
                <div className="flex items-center gap-3">
                    {status !== null && (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            status >= 200 && status < 300
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/20 text-red-400'
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                                status >= 200 && status < 300 ? 'bg-emerald-400' : 'bg-red-400'
                            }`} />
                            {status}
                        </span>
                    )}
                    <span className="text-xs text-gray-500 font-mono">{duration}ms</span>
                    {jsonString && (
                        <span className="text-xs text-gray-600">{formatSize(jsonString)}</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                            expanded
                                ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                    >
                        {expanded ? 'Show Less' : 'Show Full'}
                    </button>
                    <button
                        onClick={() => setShowRaw(!showRaw)}
                        className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                            showRaw
                                ? 'bg-white/10 text-white'
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                        }`}
                    >
                        Raw
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${
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
                                Copied
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
            </div>

            {/* URL display */}
            {url && (
                <div className="px-4 py-2 bg-white/[0.02] border-b border-white/[0.06] flex-shrink-0">
                    <p className="text-[11px] text-gray-600 font-mono truncate" title={url}>
                        {url}
                    </p>
                </div>
            )}

            {/* Error display */}
            {error && (
                <div className="px-4 py-3 bg-red-500/10 border-b border-red-500/20 flex-shrink-0">
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            )}

            {/* JSON display */}
            <div className="flex-1 overflow-auto min-h-0">
                {!expanded ? (
                    <div className="p-4">
                        <pre className="text-sm font-mono leading-relaxed text-gray-300 whitespace-pre-wrap break-all max-h-[200px] overflow-hidden relative">
                            {jsonString.substring(0, 500)}...
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                        </pre>
                        <button
                            onClick={() => setExpanded(true)}
                            className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                            Click "Show Full" to see complete response
                        </button>
                    </div>
                ) : showRaw ? (
                    <pre className="p-4 text-sm font-mono leading-relaxed text-gray-300 whitespace-pre-wrap break-all">
                        {jsonString}
                    </pre>
                ) : (
                    <pre className="p-4 text-sm font-mono leading-relaxed">
                        <code
                            ref={codeRef}
                            className="language-json"
                            dangerouslySetInnerHTML={{ __html: highlightedCode }}
                        />
                    </pre>
                )}
            </div>
        </div>
    );
};

export default ResponseViewer;
