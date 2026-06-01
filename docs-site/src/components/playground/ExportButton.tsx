import { useState } from 'react';

interface ExportButtonProps {
    data: unknown;
    endpoint?: string;
}

const ExportButton = ({ data, endpoint }: ExportButtonProps) => {
    const [exported, setExported] = useState(false);

    const generateFilename = (): string => {
        if (!endpoint) return 'response.json';
        try {
            const url = new URL(endpoint);
            const pathParts = url.pathname.split('/').filter(Boolean);
            const lastPart = pathParts[pathParts.length - 1] || 'response';
            return `${lastPart.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
        } catch {
            return 'response.json';
        }
    };

    const handleExport = () => {
        if (!data) return;
        try {
            const jsonString = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = generateFilename();
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setExported(true);
            setTimeout(() => setExported(false), 2000);
        } catch (err) {
            console.error('Failed to export:', err);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={!data}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                exported
                    ? 'text-emerald-400 bg-emerald-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed'
            }`}
            title="Export as JSON"
        >
            {exported ? (
                <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Exported
                </>
            ) : (
                <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export
                </>
            )}
        </button>
    );
};

export default ExportButton;
