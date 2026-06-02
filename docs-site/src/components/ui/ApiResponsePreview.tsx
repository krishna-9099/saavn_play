import { useState, useRef, useMemo } from 'react';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', json);

interface ApiResponsePreviewProps {
    endpoint: string;
    sampleData: Record<string, unknown>;
    children: React.ReactNode;
}

const ApiResponsePreview = ({ endpoint, sampleData, children }: ApiResponsePreviewProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    const highlightedJson = useMemo(() => {
        const jsonString = JSON.stringify(sampleData, null, 2);
        try {
            return hljs.highlight(jsonString, { language: 'json' }).value;
        } catch {
            return jsonString;
        }
    }, [sampleData]);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top,
        });
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 200);
    };

    const handleTooltipEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleTooltipLeave = () => {
        setIsVisible(false);
    };

    return (
        <>
            <div
                ref={triggerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inline-block"
            >
                {children}
            </div>

            {isVisible && (
                <div
                    className="fixed z-50 pointer-events-auto"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y - 8}px`,
                        transform: 'translate(-50%, -100%)',
                    }}
                    onMouseEnter={handleTooltipEnter}
                    onMouseLeave={handleTooltipLeave}
                >
                    <div className="relative rounded-xl overflow-hidden bg-white/[0.05] backdrop-blur-xl border border-white/[0.15] shadow-2xl shadow-black/40 max-w-md">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.08]">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 text-xs font-medium rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    GET
                                </span>
                                <span className="text-xs text-gray-400 font-mono">
                                    {endpoint}
                                </span>
                            </div>
                            <span className="text-xs text-gray-600">
                                Sample Response
                            </span>
                        </div>
                        <div className="p-4 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <pre className="text-xs leading-relaxed">
                                <code
                                    className="language-json font-mono text-gray-300"
                                    dangerouslySetInnerHTML={{ __html: highlightedJson }}
                                />
                            </pre>
                        </div>
                        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.05]">
                            <p className="text-xs text-gray-600">
                                Hover over API cards to preview responses
                            </p>
                        </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 rotate-45 bg-white/[0.05] border-r border-b border-white/[0.15]" />
                </div>
            )}
        </>
    );
};

export default ApiResponsePreview;
