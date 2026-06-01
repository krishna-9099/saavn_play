import { useEffect, useCallback, useState } from 'react';

export interface Shortcut {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    description: string;
    action: () => void;
}

interface UseKeyboardShortcutsOptions {
    shortcuts: Shortcut[];
    enabled?: boolean;
}

export const useKeyboardShortcuts = ({ shortcuts, enabled = true }: UseKeyboardShortcutsOptions) => {
    const [lastTriggered, setLastTriggered] = useState<string | null>(null);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!enabled) return;

            const target = e.target as HTMLElement;
            const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT';

            for (const shortcut of shortcuts) {
                const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : !(e.ctrlKey || e.metaKey);
                const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
                const altMatch = shortcut.alt ? e.altKey : !e.altKey;

                if (ctrlMatch && shiftMatch && altMatch && e.key.toLowerCase() === shortcut.key.toLowerCase()) {
                    if (shortcut.ctrl && isInput && shortcut.key === 'Enter') {
                        e.preventDefault();
                        shortcut.action();
                        setLastTriggered(shortcut.description);
                        setTimeout(() => setLastTriggered(null), 1500);
                        return;
                    }

                    if (shortcut.ctrl || !isInput) {
                        e.preventDefault();
                        shortcut.action();
                        setLastTriggered(shortcut.description);
                        setTimeout(() => setLastTriggered(null), 1500);
                        return;
                    }
                }
            }
        },
        [shortcuts, enabled]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return { lastTriggered };
};

export const SHORTCUTS: Omit<Shortcut, 'action'>[] = [
    { key: 'Enter', ctrl: true, description: 'Send request' },
    { key: 'f', ctrl: true, description: 'Search in response' },
    { key: 'c', ctrl: true, shift: true, description: 'Copy URL' },
    { key: 'l', ctrl: true, description: 'Clear response' },
    { key: 'k', ctrl: true, description: 'Show shortcuts' },
    { key: 'Escape', description: 'Close modal/search' },
];
