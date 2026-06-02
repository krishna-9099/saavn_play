import { useState, useRef, useCallback } from 'react';
import GlassCard from './GlassCard';

interface VideoEmbedProps {
    videoId: string;
    title?: string;
    className?: string;
}

const VideoEmbed = ({ videoId, title = 'Video Tutorial', className = '' }: VideoEmbedProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePlay = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <GlassCard hover={false} className={`overflow-hidden ${className}`}>
            <div ref={containerRef} className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {!isPlaying ? (
                    <div className="absolute inset-0">
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                            <button
                                onClick={handlePlay}
                                className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 hover:bg-emerald-500/30 hover:border-emerald-400/60 hover:scale-110 active:scale-95 transition-all duration-300"
                                aria-label={`Play ${title}`}
                            >
                                <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
                                <svg
                                    className="w-10 h-10 text-emerald-400 ml-1 group-hover:text-emerald-300 transition-colors"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    />
                )}
            </div>
        </GlassCard>
    );
};

export default VideoEmbed;
