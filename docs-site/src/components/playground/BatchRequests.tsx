import { useState, useCallback } from 'react';
import { getEndpointById } from './endpoints';
import { ApiResponse } from './types';

interface BatchRequest {
    id: string;
    endpointId: string;
    params: Record<string, string>;
    result?: ApiResponse;
    isLoading?: boolean;
}

interface BatchRequestsProps {
    currentEndpointId: string;
    currentParams: Record<string, string>;
    fetchWithCorsProxy: (url: string) => Promise<Response>;
}

const BatchRequests = ({ currentEndpointId, currentParams, fetchWithCorsProxy }: BatchRequestsProps) => {
    const [requests, setRequests] = useState<BatchRequest[]>([]);
    const [executionMode, setExecutionMode] = useState<'parallel' | 'sequential'>('parallel');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const addCurrentAsRequest = useCallback(() => {
        const endpoint = getEndpointById(currentEndpointId);
        if (!endpoint) return;

        const newRequest: BatchRequest = {
            id: `batch-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            endpointId: currentEndpointId,
            params: { ...currentParams },
        };
        setRequests(prev => [...prev, newRequest]);
    }, [currentEndpointId, currentParams]);

    const removeRequest = useCallback((id: string) => {
        setRequests(prev => prev.filter(r => r.id !== id));
    }, []);

    const clearAll = useCallback(() => {
        setRequests([]);
        setExpandedId(null);
    }, []);

    const executeRequest = async (request: BatchRequest): Promise<ApiResponse> => {
        const endpoint = getEndpointById(request.endpointId);
        if (!endpoint) {
            return { data: null, status: 0, duration: 0, url: '', error: 'Endpoint not found' };
        }

        const url = endpoint.urlBuilder(request.params);
        const startTime = performance.now();

        try {
            const res = await fetchWithCorsProxy(url);
            const duration = Math.round(performance.now() - startTime);
            const text = await res.text();

            let data: unknown;
            try {
                data = JSON.parse(text);
            } catch {
                data = text;
            }

            return { data, status: res.status, duration, url };
        } catch (err) {
            const duration = Math.round(performance.now() - startTime);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            return {
                data: null,
                status: 0,
                duration,
                url,
                error: `Network error: ${errorMessage}`,
            };
        }
    };

    const runAll = useCallback(async () => {
        if (requests.length === 0 || isRunning) return;

        setIsRunning(true);

        setRequests(prev => prev.map(r => ({ ...r, result: undefined, isLoading: true })));

        if (executionMode === 'parallel') {
            const results = await Promise.all(
                requests.map(async (req) => {
                    const result = await executeRequest(req);
                    return { id: req.id, result };
                })
            );

            setRequests(prev => prev.map(r => {
                const found = results.find(res => res.id === r.id);
                return found ? { ...r, result: found.result, isLoading: false } : r;
            }));
        } else {
            for (const req of requests) {
                const result = await executeRequest(req);
                setRequests(prev => prev.map(r =>
                    r.id === req.id ? { ...r, result, isLoading: false } : r
                ));
            }
        }

        setIsRunning(false);
    }, [requests, executionMode, isRunning]);

    const getEndpointName = (endpointId: string): string => {
        const endpoint = getEndpointById(endpointId);
        return endpoint?.name || endpointId;
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Batch Requests
                </h3>
                <span className="text-xs text-gray-500">{requests.length} requests</span>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={addCurrentAsRequest}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] transition-all backdrop-blur-sm"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Current
                </button>

                <div className="flex items-center gap-1 bg-white/[0.03] rounded-lg p-0.5 border border-white/[0.06]">
                    <button
                        onClick={() => setExecutionMode('parallel')}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                            executionMode === 'parallel'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        Parallel
                    </button>
                    <button
                        onClick={() => setExecutionMode('sequential')}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                            executionMode === 'sequential'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                        Sequential
                    </button>
                </div>

                <button
                    onClick={runAll}
                    disabled={requests.length === 0 || isRunning}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all backdrop-blur-sm border ${
                        requests.length === 0 || isRunning
                            ? 'bg-white/[0.03] text-gray-600 border-white/[0.05] cursor-not-allowed'
                            : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30'
                    }`}
                >
                    {isRunning ? (
                        <>
                            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Running...
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Run All
                        </>
                    )}
                </button>

                <button
                    onClick={clearAll}
                    disabled={requests.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.03] text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-white/[0.05] hover:border-red-500/20 transition-all backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear
                </button>
            </div>

            {/* Request List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {requests.length === 0 ? (
                    <div className="text-center py-8">
                        <svg className="w-8 h-8 text-gray-700 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-xs text-gray-500">No batch requests</p>
                        <p className="text-[10px] text-gray-700 mt-1">Click "Add Current" to add the current request</p>
                    </div>
                ) : (
                    requests.map((req, index) => {
                        const isExpanded = expandedId === req.id;
                        const hasResult = req.result !== undefined;

                        return (
                            <div
                                key={req.id}
                                className={`rounded-xl border transition-all ${
                                    hasResult
                                        ? req.result?.error
                                            ? 'bg-red-500/5 border-red-500/20'
                                            : 'bg-emerald-500/5 border-emerald-500/20'
                                        : 'bg-white/[0.03] border-white/[0.06]'
                                }`}
                            >
                                {/* Request Header */}
                                <div
                                    className="flex items-center justify-between px-3 py-2 cursor-pointer"
                                    onClick={() => setExpandedId(isExpanded ? null : req.id)}
                                >
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-[10px] text-gray-600 font-mono w-4">{index + 1}</span>
                                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 uppercase">
                                            GET
                                        </span>
                                        <span className="text-xs text-gray-300 truncate">
                                            {getEndpointName(req.endpointId)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {req.isLoading && (
                                            <div className="w-3 h-3 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
                                        )}
                                        {hasResult && !req.isLoading && (
                                            <span className={`text-[10px] font-medium ${
                                                req.result?.error ? 'text-red-400' : 'text-emerald-400'
                                            }`}>
                                                {req.result?.error ? 'Error' : `${req.result?.status} · ${req.result?.duration}ms`}
                                            </span>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeRequest(req.id);
                                            }}
                                            className="p-1 text-gray-600 hover:text-red-400 transition-colors"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="px-3 pb-3 space-y-2">
                                        {/* Params */}
                                        <div className="text-[10px] text-gray-500">
                                            <span className="font-medium">Params:</span>{' '}
                                            {Object.entries(req.params)
                                                .filter(([_, v]) => v)
                                                .map(([k, v]) => `${k}=${v}`)
                                                .join(', ') || 'none'}
                                        </div>

                                        {/* Result */}
                                        {hasResult && req.result && (
                                            <div className="mt-2">
                                                {req.result.error ? (
                                                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                                                        <p className="text-xs text-red-400">{req.result.error}</p>
                                                    </div>
                                                ) : (
                                                    <div className="rounded-lg bg-black/30 border border-white/[0.06] overflow-hidden">
                                                        <div className="px-3 py-1.5 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between">
                                                            <span className="text-[10px] text-gray-500 font-mono">
                                                                {req.result.duration}ms · {req.result.status}
                                                            </span>
                                                        </div>
                                                        <pre className="p-3 text-[11px] font-mono text-gray-400 overflow-x-auto max-h-[200px] overflow-y-auto">
                                                            {JSON.stringify(req.result.data, null, 2)}
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Summary */}
            {requests.length > 0 && requests.some(r => r.result) && (
                <div className="pt-2 border-t border-white/[0.06]">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>
                            {requests.filter(r => r.result && !r.result.error).length} succeeded
                        </span>
                        <span>
                            {requests.filter(r => r.result?.error).length} failed
                        </span>
                        <span>
                            Avg: {Math.round(
                                requests
                                    .filter(r => r.result && !r.result.error)
                                    .reduce((acc, r) => acc + (r.result?.duration || 0), 0) /
                                requests.filter(r => r.result && !r.result.error).length
                            )}ms
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BatchRequests;
