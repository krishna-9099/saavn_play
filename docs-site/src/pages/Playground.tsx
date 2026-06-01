import { useState, useCallback, useEffect } from 'react';
import EndpointSelector from '../components/playground/EndpointSelector';
import ParameterForm from '../components/playground/ParameterForm';
import ResponseViewer from '../components/playground/ResponseViewer';
import ExampleRequests from '../components/playground/ExampleRequests';
import RequestHistory from '../components/playground/RequestHistory';
import { getEndpointById } from '../components/playground/endpoints';
import { ApiResponse, HistoryEntry } from '../components/playground/types';

const HISTORY_KEY = 'saavn_playground_history';
const MAX_HISTORY = 50;

const CORS_PROXIES = [
    'https://corsproxy.io/?',
    'https://api.allorigins.win/raw?url=',
];

const fetchWithCorsProxy = async (url: string): Promise<Response> => {
    let lastError: Error | null = null;

    for (const proxy of CORS_PROXIES) {
        try {
            const proxyUrl = proxy + encodeURIComponent(url);
            const response = await fetch(proxyUrl);
            if (response.ok) return response;
            lastError = new Error(`Proxy returned status ${response.status}`);
        } catch (err) {
            lastError = err instanceof Error ? err : new Error('Unknown proxy error');
            continue;
        }
    }

    throw lastError || new Error('All CORS proxies failed');
};

const loadHistory = (): HistoryEntry[] => {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

const saveHistory = (history: HistoryEntry[]) => {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
    } catch {
        // ignore
    }
};

const Playground = () => {
    const [selectedEndpointId, setSelectedEndpointId] = useState('search-songs');
    const [paramValues, setParamValues] = useState<Record<string, string>>({});
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);

    const endpoint = getEndpointById(selectedEndpointId);

    useEffect(() => {
        if (endpoint) {
            const defaults: Record<string, string> = {};
            endpoint.params.forEach((p) => {
                if (p.defaultValue !== undefined) {
                    defaults[p.name] = String(p.defaultValue);
                }
            });
            setParamValues((prev) => ({ ...defaults, ...prev }));
        }
    }, [selectedEndpointId]);

    const handleParamChange = useCallback((name: string, value: string) => {
        setParamValues((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleEndpointSelect = useCallback((id: string) => {
        setSelectedEndpointId(id);
        setParamValues({});
        setResponse(null);
    }, []);

    const handleSendRequest = useCallback(async () => {
        if (!endpoint) return;

        setIsLoading(true);
        setResponse(null);

        const url = endpoint.urlBuilder(paramValues);
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

            const apiResponse: ApiResponse = {
                data,
                status: res.status,
                duration,
                url,
            };

            setResponse(apiResponse);

            const entry: HistoryEntry = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                timestamp: Date.now(),
                endpointId: endpoint.id,
                endpointName: endpoint.name,
                params: { ...paramValues },
                url,
                status: res.status,
                duration,
                responseSize: new Blob([text]).size,
            };

            setHistory((prev) => {
                const next = [entry, ...prev].slice(0, MAX_HISTORY);
                saveHistory(next);
                return next;
            });
        } catch (err) {
            const duration = Math.round(performance.now() - startTime);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';

            setResponse({
                data: null,
                status: 0,
                duration,
                url,
                error: `Network error: ${errorMessage}. CORS proxy request failed - this may be due to proxy rate limits or network issues. Try again later.`,
            });

            const entry: HistoryEntry = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                timestamp: Date.now(),
                endpointId: endpoint.id,
                endpointName: endpoint.name,
                params: { ...paramValues },
                url,
                status: null,
                duration,
                responseSize: 0,
            };

            setHistory((prev) => {
                const next = [entry, ...prev].slice(0, MAX_HISTORY);
                saveHistory(next);
                return next;
            });
        } finally {
            setIsLoading(false);
        }
    }, [endpoint, paramValues]);

    const handleExampleSelect = useCallback((endpointId: string, params: Record<string, string>) => {
        setSelectedEndpointId(endpointId);
        setParamValues(params);
        setResponse(null);
    }, []);

    const handleHistorySelect = useCallback((entry: HistoryEntry) => {
        setSelectedEndpointId(entry.endpointId);
        setParamValues(entry.params);
        setResponse(null);
    }, []);

    const handleClearHistory = useCallback(() => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    <span className="text-emerald-500">API</span> Playground
                </h1>
                <p className="text-gray-400">
                    Try the JioSaavn API directly in your browser. Select an endpoint, fill in parameters, and hit Send.
                </p>
            </div>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row gap-4 min-h-[calc(100vh-220px)]">
                {/* Left panel - Controls */}
                <div className="w-full lg:w-[40%] flex-shrink-0 space-y-4">
                    <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] p-5 space-y-5">
                        <EndpointSelector
                            selectedEndpointId={selectedEndpointId}
                            onSelect={handleEndpointSelect}
                        />

                        {/* Method badge + call name */}
                        {endpoint && (
                            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase">
                                    GET
                                </span>
                                <span className="text-xs text-gray-500 font-mono truncate">
                                    /api.php?__call={endpoint.call}
                                </span>
                            </div>
                        )}

                        <ParameterForm
                            params={endpoint?.params || []}
                            values={paramValues}
                            onChange={handleParamChange}
                            onSubmit={handleSendRequest}
                            isLoading={isLoading}
                        />
                    </div>

                    <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] p-5">
                        <ExampleRequests onSelect={handleExampleSelect} />
                    </div>

                    <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] p-5">
                        <RequestHistory
                            history={history}
                            onSelect={handleHistorySelect}
                            onClear={handleClearHistory}
                        />
                    </div>
                </div>

                {/* Right panel - Response */}
                <div className="w-full lg:w-[60%] min-h-[400px] lg:min-h-0">
                    <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] h-full flex flex-col overflow-hidden">
                        <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="h-4 w-px bg-white/10" />
                                <span className="text-sm text-gray-400 font-medium">Response</span>
                            </div>
                        </div>
                        <div className="flex-1 min-h-0 overflow-hidden">
                            <ResponseViewer
                                data={response?.data ?? null}
                                status={response?.status ?? null}
                                duration={response?.duration ?? 0}
                                url={response?.url ?? ''}
                                error={response?.error}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playground;
