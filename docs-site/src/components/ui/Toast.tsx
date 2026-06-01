import { createContext, useCallback, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    addToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

const typeStyles: Record<ToastType, string> = {
    success: 'border-emerald-500/40 bg-emerald-500/10',
    error: 'border-red-500/40 bg-red-500/10',
    info: 'border-blue-500/40 bg-blue-500/10',
    warning: 'border-yellow-500/40 bg-yellow-500/10',
};

const typeIcons: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
};

const typeIconColors: Record<ToastType, string> = {
    success: 'text-emerald-400',
    error: 'text-red-400',
    info: 'text-blue-400',
    warning: 'text-yellow-400',
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Date.now().toString() + Math.random().toString(36).slice(2);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
                            pointer-events-auto
                            flex items-center gap-3 px-4 py-3 rounded-xl
                            bg-white/[0.06] backdrop-blur-xl
                            border ${typeStyles[toast.type]}
                            shadow-lg shadow-black/20
                            animate-toast-in
                            cursor-pointer
                        `}
                        onClick={() => removeToast(toast.id)}
                    >
                        <span className={`text-lg font-bold ${typeIconColors[toast.type]}`}>
                            {typeIcons[toast.type]}
                        </span>
                        <span className="text-sm text-gray-200 flex-1">{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
