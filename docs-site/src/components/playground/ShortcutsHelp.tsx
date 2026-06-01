import { SHORTCUTS } from './KeyboardShortcuts';

interface ShortcutsHelpProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShortcutsHelp = ({ isOpen, onClose }: ShortcutsHelpProps) => {
    if (!isOpen) return null;

    const formatKey = (shortcut: (typeof SHORTCUTS)[number]) => {
        const parts: string[] = [];
        if (shortcut.ctrl) parts.push('Ctrl');
        if (shortcut.shift) parts.push('Shift');
        if (shortcut.alt) parts.push('Alt');

        const keyMap: Record<string, string> = {
            Enter: '↵',
            Escape: 'Esc',
        };
        parts.push(keyMap[shortcut.key] || shortcut.key.toUpperCase());
        return parts;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
                className="relative w-full max-w-md mx-4 rounded-2xl bg-gray-900/90 backdrop-blur-xl border border-white/[0.1] shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-5 space-y-2">
                    {SHORTCUTS.map((shortcut, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/[0.05] transition-colors group"
                        >
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                {shortcut.description}
                            </span>
                            <div className="flex items-center gap-1.5">
                                {formatKey(shortcut).map((part, i) => (
                                    <span key={i}>
                                        {i > 0 && <span className="text-gray-600 text-xs mx-0.5">+</span>}
                                        <kbd className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-white/[0.08] border border-white/[0.1] text-xs font-mono text-gray-300 shadow-sm">
                                            {part}
                                        </kbd>
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-5 py-3 border-t border-white/[0.08] bg-white/[0.02]">
                    <p className="text-xs text-gray-600 text-center">Press Esc to close</p>
                </div>
            </div>
        </div>
    );
};

export default ShortcutsHelp;
