import { useState, useEffect } from 'react';
import { EnvironmentVariable } from './types';

const ENV_KEY = 'saavn_playground_env_vars';

const defaultVars: EnvironmentVariable[] = [
    { key: 'songId', value: '' },
    { key: 'artistId', value: '' },
    { key: 'albumId', value: '' },
    { key: 'playlistId', value: '' },
];

const loadVars = (): EnvironmentVariable[] => {
    try {
        const raw = localStorage.getItem(ENV_KEY);
        if (!raw) return defaultVars;
        const parsed = JSON.parse(raw) as EnvironmentVariable[];
        return parsed.length > 0 ? parsed : defaultVars;
    } catch {
        return defaultVars;
    }
};

const saveVars = (vars: EnvironmentVariable[]) => {
    try {
        localStorage.setItem(ENV_KEY, JSON.stringify(vars));
    } catch {
        // ignore
    }
};

export const replaceVariables = (
    text: string,
    vars: EnvironmentVariable[]
): string => {
    let result = text;
    for (const v of vars) {
        if (v.key && v.value) {
            result = result.replace(new RegExp(`\\{\\{${v.key}\\}\\}`, 'g'), v.value);
        }
    }
    return result;
};

export const replaceVariablesInParams = (
    params: Record<string, string>,
    vars: EnvironmentVariable[]
): Record<string, string> => {
    const result: Record<string, string> = {};
    for (const [k, v] of Object.entries(params)) {
        result[k] = replaceVariables(v, vars);
    }
    return result;
};

interface EnvironmentVariablesProps {
    onVarsChange: (vars: EnvironmentVariable[]) => void;
}

const EnvironmentVariables = ({ onVarsChange }: EnvironmentVariablesProps) => {
    const [vars, setVars] = useState<EnvironmentVariable[]>(loadVars);
    const [isOpen, setIsOpen] = useState(false);
    const [newKey, setNewKey] = useState('');

    useEffect(() => {
        saveVars(vars);
        onVarsChange(vars);
    }, [vars]);

    const handleValueChange = (index: number, value: string) => {
        setVars((prev) => prev.map((v, i) => (i === index ? { ...v, value } : v)));
    };

    const handleAddVar = () => {
        if (!newKey.trim()) return;
        if (vars.some((v) => v.key === newKey.trim())) return;
        setVars((prev) => [...prev, { key: newKey.trim(), value: '' }]);
        setNewKey('');
    };

    const handleRemoveVar = (index: number) => {
        setVars((prev) => prev.filter((_, i) => i !== index));
    };

    const handleKeyChange = (index: number, newKeyVal: string) => {
        setVars((prev) =>
            prev.map((v, i) => (i === index ? { ...v, key: newKeyVal } : v))
        );
    };

    const filledCount = vars.filter((v) => v.value).length;

    return (
        <div className="space-y-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
            >
                <div className="flex items-center gap-2">
                    <svg
                        className="w-4 h-4 text-emerald-500/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                    </svg>
                    <span className="text-sm text-gray-300 font-medium">Variables</span>
                    {filledCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">
                            {filledCount}
                        </span>
                    )}
                </div>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 space-y-2">
                    <div className="text-[10px] text-gray-600 mb-2">
                        Use <code className="px-1 py-0.5 rounded bg-white/[0.05] text-emerald-400">{'{{key}}'}</code> syntax in parameters
                    </div>

                    {vars.map((v, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <input
                                type="text"
                                value={v.key}
                                onChange={(e) => handleKeyChange(i, e.target.value)}
                                placeholder="key"
                                className="w-24 px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-emerald-400 font-mono placeholder-gray-600 outline-none focus:border-emerald-500/40"
                            />
                            <span className="text-gray-600 text-xs">=</span>
                            <input
                                type="text"
                                value={v.value}
                                onChange={(e) => handleValueChange(i, e.target.value)}
                                placeholder="value"
                                className="flex-1 min-w-0 px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-gray-300 font-mono placeholder-gray-600 outline-none focus:border-emerald-500/40"
                            />
                            <button
                                onClick={() => handleRemoveVar(i)}
                                className="p-1 rounded hover:bg-white/[0.05] text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}

                    <div className="flex gap-1.5 pt-1">
                        <input
                            type="text"
                            value={newKey}
                            onChange={(e) => setNewKey(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddVar()}
                            placeholder="new variable..."
                            className="flex-1 px-2 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-gray-300 placeholder-gray-600 outline-none focus:border-emerald-500/40"
                        />
                        <button
                            onClick={handleAddVar}
                            className="px-2 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/30 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnvironmentVariables;
