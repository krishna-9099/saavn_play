import { useState } from 'react';

interface InteractivePlaygroundProps {
    title?: string;
    defaultCode?: string;
    className?: string;
}

const InteractivePlayground = ({
    title = 'API Playground',
    defaultCode = `// Try editing this code
const response = await saavn.search({
  query: "Tum Hi Ho",
  limit: 5
});

console.log(response);`,
    className = '',
}: InteractivePlaygroundProps) => {
    const [code, setCode] = useState(defaultCode);
    const [response, setResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleTryIt = () => {
        setIsLoading(true);
        setResponse(null);

        setTimeout(() => {
            setResponse(JSON.stringify({
                success: true,
                data: {
                    results: [
                        { id: "1", title: "Tum Hi Ho", artist: "Arijit Singh", album: "Aashiqui 2" },
                        { id: "2", title: "Tum Hi Ho (Unplugged)", artist: "Arijit Singh", album: "Aashiqui 2" }
                    ],
                    total: 2,
                    query: "Tum Hi Ho"
                }
            }, null, 2));
            setIsLoading(false);
        }, 1500);
    };

    const handleCopyResponse = async () => {
        if (!response) return;
        try {
            await navigator.clipboard.writeText(response);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy response:', err);
        }
    };

    return (
        <div className={`relative rounded-2xl bg-white/[0.05] backdrop-blur-[10px] border border-white/[0.1] overflow-hidden ${className}`}>
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <span className="text-sm text-gray-400 font-medium">{title}</span>
                </div>
                <button
                    onClick={handleTryIt}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isLoading
                            ? 'bg-emerald-500/20 text-emerald-400 cursor-wait'
                            : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 hover:scale-105'
                    }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Running...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Try It
                        </>
                    )}
                </button>
            </div>

            <div className="p-4">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-48 bg-transparent text-gray-200 font-mono text-sm leading-relaxed resize-none outline-none placeholder-gray-600"
                    placeholder="Write your code here..."
                    spellCheck={false}
                />
            </div>

            {response && (
                <div className="border-t border-white/[0.08]">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02]">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Response</span>
                        <button
                            onClick={handleCopyResponse}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
                    <pre className="p-4 overflow-x-auto">
                        <code className="text-sm font-mono text-emerald-300 leading-relaxed">
                            {response}
                        </code>
                    </pre>
                </div>
            )}

            {isLoading && (
                <div className="border-t border-white/[0.08] p-8">
                    <div className="flex flex-col items-center justify-center gap-3">
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-sm text-gray-500">Executing request...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractivePlayground;
