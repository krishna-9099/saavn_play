import { useState, useMemo } from 'react';
import hljs from 'highlight.js/lib/core';
import dart from 'highlight.js/lib/languages/dart';
import { generateDartModel } from '../../utils/modelGenerator';

hljs.registerLanguage('dart', dart);

interface ModelGeneratorProps {
    data: unknown;
    endpointName?: string;
    onClose: () => void;
}

const ModelGenerator = ({ data, endpointName, onClose }: ModelGeneratorProps) => {
    const [className, setClassName] = useState(endpointName || 'ApiResponse');
    const [copiedClass, setCopiedClass] = useState<string | null>(null);
    const [allCopied, setAllCopied] = useState(false);

    const generatedCode = useMemo(() => {
        if (!data || typeof data !== 'object') return '';
        return generateDartModel(data, className);
    }, [data, className]);

    const highlightedCode = useMemo(() => {
        if (!generatedCode) return '';
        try {
            return hljs.highlight(generatedCode, { language: 'dart' }).value;
        } catch {
            return generatedCode;
        }
    }, [generatedCode]);

    const classes = useMemo(() => {
        if (!generatedCode) return [];
        const regex = /@JsonSerializable\(\)\nclass (\w+)/g;
        const matches: { name: string; code: string }[] = [];
        let match;
        while ((match = regex.exec(generatedCode)) !== null) {
            const name = match[1];
            const startIdx = match.index;
            let braceCount = 0;
            let endIdx = startIdx;
            let foundOpen = false;
            for (let i = startIdx; i < generatedCode.length; i++) {
                if (generatedCode[i] === '{') {
                    braceCount++;
                    foundOpen = true;
                }
                if (generatedCode[i] === '}') braceCount--;
                if (foundOpen && braceCount === 0) {
                    endIdx = i + 1;
                    break;
                }
            }
            const classCode = generatedCode.substring(startIdx, endIdx);
            matches.push({ name, code: classCode });
        }
        return matches;
    }, [generatedCode]);

    const handleCopyClass = async (code: string, name: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedClass(name);
            setTimeout(() => setCopiedClass(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCopyAll = async () => {
        try {
            await navigator.clipboard.writeText(generatedCode);
            setAllCopied(true);
            setTimeout(() => setAllCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([generatedCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${className.toLowerCase().replace(/[^a-z0-9]/g, '_')}.dart`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!data || typeof data !== 'object') {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
                <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <div>
                    <p className="text-sm text-gray-500">No JSON data available</p>
                    <p className="text-xs text-gray-700 mt-1">Send a request first to generate model classes</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header controls */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border-b border-white/[0.08] flex-shrink-0">
                <div className="flex items-center gap-2 flex-1">
                    <label className="text-xs text-gray-500 font-medium">Class Name:</label>
                    <input
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.1] text-sm text-white font-mono focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 w-48"
                        placeholder="ApiResponse"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopyAll}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            allCopied
                                ? 'text-emerald-400 bg-emerald-500/20'
                                : 'text-gray-400 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        {allCopied ? (
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
                                Copy All
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-gray-400 hover:text-white hover:bg-white/10"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download .dart
                    </button>

                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Class tabs */}
            {classes.length > 1 && (
                <div className="flex items-center gap-1 px-4 py-2 bg-white/[0.02] border-b border-white/[0.06] flex-shrink-0 overflow-x-auto">
                    <span className="text-[10px] text-gray-600 mr-2">Classes:</span>
                    {classes.map((cls) => (
                        <button
                            key={cls.name}
                            onClick={() => handleCopyClass(cls.code, cls.name)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono font-medium transition-all whitespace-nowrap ${
                                copiedClass === cls.name
                                    ? 'text-emerald-400 bg-emerald-500/20'
                                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                            }`}
                            title={`Click to copy ${cls.name}`}
                        >
                            {copiedClass === cls.name ? (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            )}
                            {cls.name}
                        </button>
                    ))}
                </div>
            )}

            {/* Code display */}
            <div className="flex-1 overflow-auto min-h-0">
                <pre className="p-4 text-sm font-mono leading-relaxed">
                    <code
                        className="language-dart"
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                </pre>
            </div>

            {/* Footer info */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-t border-white/[0.06] flex-shrink-0">
                <span className="text-[10px] text-gray-600">
                    {classes.length} class{classes.length !== 1 ? 'es' : ''} generated &middot; Uses json_serializable
                </span>
                <span className="text-[10px] text-gray-600">
                    Click class name to copy individually
                </span>
            </div>
        </div>
    );
};

export default ModelGenerator;
