import { HistoryEntry } from './types';

interface RequestHistoryProps {
    history: HistoryEntry[];
    onSelect: (entry: HistoryEntry) => void;
    onClear: () => void;
}

const RequestHistory = ({ history, onSelect, onClear }: RequestHistoryProps) => {
    if (history.length === 0) {
        return (
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                    History
                </label>
                <p className="text-xs text-gray-600 italic">No requests yet.</p>
            </div>
        );
    }

    const formatTime = (ts: number) => {
        const d = new Date(ts);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                    History
                </label>
                <button
                    onClick={onClear}
                    className="text-xs text-gray-600 hover:text-red-400 transition-colors"
                >
                    Clear
                </button>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto scrollbar-hide">
                {history.map((entry) => (
                    <button
                        key={entry.id}
                        onClick={() => onSelect(entry)}
                        className="group w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-emerald-500/20 transition-all duration-200 text-left"
                    >
                        <span
                            className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${
                                entry.status && entry.status >= 200 && entry.status < 300
                                    ? 'bg-emerald-500'
                                    : entry.status
                                    ? 'bg-red-500'
                                    : 'bg-gray-600'
                            }`}
                        />
                        <div className="min-w-0 flex-1">
                            <span className="block text-xs text-gray-400 group-hover:text-gray-300 truncate font-mono">
                                {entry.endpointName}
                            </span>
                            <span className="block text-[10px] text-gray-600">
                                {formatTime(entry.timestamp)} &middot; {entry.duration}ms &middot; {formatSize(entry.responseSize)}
                            </span>
                        </div>
                        {entry.status && (
                            <span className={`text-[10px] font-mono ${
                                entry.status >= 200 && entry.status < 300 ? 'text-emerald-500' : 'text-red-400'
                            }`}>
                                {entry.status}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RequestHistory;
