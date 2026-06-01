import { useState, useCallback } from 'react';
import { getEndpointById } from './endpoints';

interface ShareButtonProps {
    endpointId: string;
    params: Record<string, string>;
}

const ShareButton = ({ endpointId, params }: ShareButtonProps) => {
    const [copied, setCopied] = useState(false);

    const generateShareUrl = useCallback((): string => {
        const url = new URL(window.location.href);
        url.pathname = '/playground';
        url.search = '';

        url.searchParams.set('endpoint', endpointId);

        Object.entries(params).forEach(([key, value]) => {
            if (value !== '' && value !== undefined) {
                url.searchParams.set(key, value);
            }
        });

        return url.toString();
    }, [endpointId, params]);

    const handleShare = async () => {
        const shareUrl = generateShareUrl();
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const endpoint = getEndpointById(endpointId);

    return (
        <div className="relative group">
            <button
                onClick={handleShare}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all backdrop-blur-sm border ${
                    copied
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1] border-white/[0.08] hover:border-white/[0.15]'
                }`}
                title="Share this request"
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                    </>
                )}
            </button>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-gray-900 border border-white/[0.1] shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                <p className="text-xs text-gray-300 mb-1">Share this request configuration</p>
                {endpoint && (
                    <p className="text-[10px] text-gray-500 font-mono">
                        {endpoint.name} with {Object.keys(params).filter(k => params[k]).length} params
                    </p>
                )}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-white/[0.1] transform rotate-45 -mt-1" />
            </div>
        </div>
    );
};

export default ShareButton;

export const parseShareUrl = (): { endpointId: string; params: Record<string, string> } | null => {
    const url = new URL(window.location.href);
    const endpointId = url.searchParams.get('endpoint');

    if (!endpointId) return null;

    const params: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
        if (key !== 'endpoint') {
            params[key] = value;
        }
    });

    return { endpointId, params };
};
