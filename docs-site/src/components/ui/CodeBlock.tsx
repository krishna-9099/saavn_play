import { useEffect, useRef, useState, useMemo } from 'react';
import hljs from 'highlight.js/lib/core';
import dart from 'highlight.js/lib/languages/dart';
import yaml from 'highlight.js/lib/languages/yaml';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';

// Register languages
hljs.registerLanguage('dart', dart);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);

interface CodeBlockProps {
    code: string;
    language?: 'dart' | 'yaml' | 'bash' | 'json' | 'plaintext';
    title?: string;
    showLineNumbers?: boolean;
    copyable?: boolean;
}

const CodeBlock = ({
    code,
    language = 'dart',
    title,
    showLineNumbers = false,
    copyable = true,
}: CodeBlockProps) => {
    const codeRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    // Memoize highlighted code
    const highlightedCode = useMemo(() => {
        if (language === 'plaintext') {
            return code;
        }
        try {
            return hljs.highlight(code, { language }).value;
        } catch {
            return code;
        }
    }, [code, language]);

    useEffect(() => {
        // Re-apply highlighting when code or language changes
        if (codeRef.current && language !== 'plaintext') {
            hljs.highlightElement(codeRef.current);
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    const lines = code.split('\n');
    const lineNumberWidth = String(lines.length).length * 0.6 + 1;

    return (
        <div className="relative group rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-xl">
            {/* Header */}
            {(title || copyable) && (
                <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/10">
                    <div className="flex items-center gap-3">
                        {/* Traffic lights */}
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="h-4 w-px bg-white/10"></div>
                        <span className="text-xs text-gray-500 uppercase font-medium tracking-wider">{language}</span>
                        {title && (
                            <>
                                <span className="text-gray-600">•</span>
                                <span className="text-sm text-gray-400 font-mono">{title}</span>
                            </>
                        )}
                    </div>
                    {copyable && (
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
                            title="Copy code"
                        >
                            {copied ? (
                                <>
                                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-green-400">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}

            {/* Code content */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {showLineNumbers ? (
                    <div className="flex">
                        {/* Line numbers column */}
                        <div
                            className="flex-shrink-0 py-4 text-right select-none border-r border-white/5 bg-[#0d1117]"
                            style={{ minWidth: `${lineNumberWidth}rem`, paddingLeft: '1rem', paddingRight: '0.75rem' }}
                        >
                            {lines.map((_, index) => (
                                <div
                                    key={index}
                                    className="text-[#484f58] text-sm leading-[1.6] font-mono hover:text-[#8b949e] transition-colors"
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                        {/* Code column */}
                        <pre className="py-4 pl-4 pr-4 text-sm flex-1 overflow-x-auto bg-[#0d1117]">
                            <code
                                ref={codeRef}
                                className={`language-${language} font-mono text-sm leading-[1.6] block`}
                                dangerouslySetInnerHTML={{ __html: highlightedCode }}
                            />
                        </pre>
                    </div>
                ) : (
                    <pre className="p-4 text-sm overflow-x-auto bg-[#0d1117]">
                        <code
                            ref={codeRef}
                            className={`language-${language} font-mono text-sm leading-[1.6] block`}
                        >
                            {code}
                        </code>
                    </pre>
                )}
            </div>
        </div>
    );
};

export default CodeBlock;
