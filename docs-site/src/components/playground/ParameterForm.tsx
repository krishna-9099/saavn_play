import { EndpointParam } from './types';
import IdAutocomplete from './IdAutocomplete';

interface ParameterFormProps {
    params: EndpointParam[];
    values: Record<string, string>;
    onChange: (name: string, value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
}

const ID_FIELD_TYPES: Record<string, 'songs' | 'albums' | 'artists' | 'playlists' | 'auto'> = {
    pids: 'songs',
    albumid: 'albums',
    artistId: 'artists',
    lyrics_id: 'songs',
};

const ParameterForm = ({ params, values, onChange, onSubmit, isLoading }: ParameterFormProps) => {
    if (params.length === 0) {
        return (
            <div className="py-4">
                <p className="text-sm text-gray-500 italic">This endpoint has no parameters.</p>
            </div>
        );
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isLoading) {
            onSubmit();
        }
    };

    const inputClassName = "w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-200 text-sm font-mono placeholder-gray-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 outline-none";

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
                Parameters
            </label>
            <div className="space-y-3">
                {params.map((param) => (
                    <div key={param.name}>
                        <label className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1.5">
                            <span className="font-mono text-emerald-400/80">{param.name}</span>
                            {param.required && (
                                <span className="text-red-400 text-[10px]">required</span>
                            )}
                        </label>
                        {param.type === 'select' ? (
                            <select
                                value={values[param.name] || ''}
                                onChange={(e) => onChange(param.name, e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-200 text-sm font-mono focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 outline-none appearance-none cursor-pointer"
                            >
                                {param.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        ) : param.type === 'number' ? (
                            <input
                                type="number"
                                value={values[param.name] || ''}
                                onChange={(e) => onChange(param.name, e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={param.placeholder}
                                min="1"
                                className={inputClassName}
                            />
                        ) : ID_FIELD_TYPES[param.name] ? (
                            <IdAutocomplete
                                value={values[param.name] || ''}
                                onChange={(value) => onChange(param.name, value)}
                                onKeyDown={handleKeyDown}
                                placeholder={param.placeholder}
                                idType={ID_FIELD_TYPES[param.name]}
                                className={inputClassName}
                            />
                        ) : (
                            <input
                                type="text"
                                value={values[param.name] || ''}
                                onChange={(e) => onChange(param.name, e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={param.placeholder}
                                className={inputClassName}
                            />
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={onSubmit}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isLoading
                        ? 'bg-emerald-500/20 text-emerald-400 cursor-wait border border-emerald-500/20'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98]'
                }`}
            >
                {isLoading ? (
                    <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Send Request
                    </>
                )}
            </button>
        </div>
    );
};

export default ParameterForm;
