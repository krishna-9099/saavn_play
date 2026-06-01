import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import EndpointSelector from '../components/playground/EndpointSelector';
import ParameterForm from '../components/playground/ParameterForm';
import ResponseViewer from '../components/playground/ResponseViewer';
import CodeSnippetGenerator from '../components/playground/CodeSnippetGenerator';
import ExampleRequests from '../components/playground/ExampleRequests';
import RequestHistory from '../components/playground/RequestHistory';
import RequestCollections from '../components/playground/RequestCollections';
import ResponseTimeGraph from '../components/playground/ResponseTimeGraph';
import MockResponse, {
    getMockData,
    loadMockMode,
    saveMockMode,
} from '../components/playground/MockResponse';
import EnvironmentVariables, {
    replaceVariablesInParams,
} from '../components/playground/EnvironmentVariables';
import ShareButton, { parseShareUrl } from '../components/playground/ShareButton';
import BatchRequests from '../components/playground/BatchRequests';
import ModelGenerator from '../components/playground/ModelGenerator';
import { getEndpointById } from '../components/playground/endpoints';
import { ApiResponse, HistoryEntry, EnvironmentVariable } from '../components/playground/types';
import { useKeyboardShortcuts, Shortcut } from '../components/playground/KeyboardShortcuts';
import ShortcutsHelp from '../components/playground/ShortcutsHelp';
import { extractIdsFromResponse, storeIds } from '../components/playground/IdAutocomplete';

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
    const [envVars, setEnvVars] = useState<EnvironmentVariable[]>([]);
    const [activeTab, setActiveTab] = useState<'response' | 'code' | 'model'>('response');
    const [isBatchMode, setIsBatchMode] = useState(false);
    const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
    const [isMockMode, setIsMockMode] = useState(loadMockMode);
    const [isMockResponse, setIsMockResponse] = useState(false);
    const responseRef = useRef<HTMLDivElement>(null);

    const endpoint = useMemo(() => getEndpointById(selectedEndpointId), [selectedEndpointId]);

    // Parse URL params on mount to restore shared request
    useEffect(() => {
        const shared = parseShareUrl();
        if (shared) {
            const endpoint = getEndpointById(shared.endpointId);
            if (endpoint) {
                setSelectedEndpointId(shared.endpointId);
                const defaults: Record<string, string> = {};
                endpoint.params.forEach((p) => {
                    if (p.defaultValue !== undefined) {
                        defaults[p.name] = String(p.defaultValue);
                    }
                });
                setParamValues({ ...defaults, ...shared.params });
            }
        }
    }, []);

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
        setIsMockResponse(false);

        const resolvedParams = replaceVariablesInParams(paramValues, envVars);
        const url = endpoint.urlBuilder(resolvedParams);
        const startTime = performance.now();

        // Mock mode
        if (isMockMode) {
            const mockData = getMockData(endpoint.id);
            const duration = Math.round(Math.random() * 50 + 10); // 10-60ms for mock

            const apiResponse: ApiResponse = {
                data: mockData,
                status: 200,
                duration,
                url,
            };

            setTimeout(() => {
                setResponse(apiResponse);
                setIsMockResponse(true);

                // Extract and store IDs from response
                if (mockData && typeof mockData === 'object') {
                    const extractedIds = extractIdsFromResponse(mockData, url);
                    storeIds(extractedIds);
                }

                const entry: HistoryEntry = {
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                    timestamp: Date.now(),
                    endpointId: endpoint.id,
                    endpointName: endpoint.name,
                    params: { ...paramValues },
                    url,
                    status: 200,
                    duration,
                    responseSize: new Blob([JSON.stringify(mockData)]).size,
                };

                setHistory((prev) => {
                    const next = [entry, ...prev].slice(0, MAX_HISTORY);
                    saveHistory(next);
                    return next;
                });

                setIsLoading(false);
            }, duration);
            return;
        }

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

            // Extract and store IDs from response
            if (data && typeof data === 'object') {
                const extractedIds = extractIdsFromResponse(data, url);
                storeIds(extractedIds);
            }

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
    }, [endpoint, paramValues, envVars, isMockMode]);

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

    const handleCollectionLoad = useCallback((endpointId: string, params: Record<string, string>) => {
        setSelectedEndpointId(endpointId);
        setParamValues(params);
        setResponse(null);
    }, []);

    const handleEnvVarsChange = useCallback((vars: EnvironmentVariable[]) => {
        setEnvVars(vars);
    }, []);

    const handleToggleMockMode = useCallback((enabled: boolean) => {
        setIsMockMode(enabled);
        saveMockMode(enabled);
    }, []);

    const handleClearResponse = useCallback(() => {
        setResponse(null);
    }, []);

    const handleCopyUrl = useCallback(async () => {
        if (!endpoint) return;
        const url = endpoint.urlBuilder(paramValues);
        try {
            await navigator.clipboard.writeText(url);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    }, [endpoint, paramValues]);

    const handleFocusSearch = useCallback(() => {
        const searchInput = responseRef.current?.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
            searchInput.focus();
        }
    }, []);

    // Keyboard shortcuts
    const shortcuts: Shortcut[] = useMemo(() => [
        {
            key: 'Enter',
            ctrl: true,
            description: 'Send request',
            action: handleSendRequest,
        },
        {
            key: 'f',
            ctrl: true,
            description: 'Search in response',
            action: handleFocusSearch,
        },
        {
            key: 'c',
            ctrl: true,
            shift: true,
            description: 'Copy URL',
            action: handleCopyUrl,
        },
        {
            key: 'l',
            ctrl: true,
            description: 'Clear response',
            action: handleClearResponse,
        },
        {
            key: 'k',
            ctrl: true,
            description: 'Show shortcuts',
            action: () => setShowShortcutsHelp(true),
        },
        {
            key: 'Escape',
            description: 'Close modal/search',
            action: () => setShowShortcutsHelp(false),
        },
    ], [handleSendRequest, handleFocusSearch, handleCopyUrl, handleClearResponse]);

    const { lastTriggered } = useKeyboardShortcuts({ shortcuts });

    return (
        <div className="space-y-6">
            {/* Keyboard shortcut feedback toast */}
            {lastTriggered && (
                <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2">
                    <div className="px-4 py-2 rounded-xl bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 text-emerald-400 text-sm font-medium shadow-lg shadow-emerald-500/10">
                        {lastTriggered}
                    </div>
                </div>
            )}

            {/* Shortcuts help modal */}
            <ShortcutsHelp isOpen={showShortcutsHelp} onClose={() => setShowShortcutsHelp(false)} />

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        <span className="text-emerald-500">API</span> Playground
                    </h1>
                    <p className="text-gray-400">
                        Try the JioSaavn API directly in your browser. Select an endpoint, fill in parameters, and hit Send.
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={() => setShowShortcutsHelp(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all backdrop-blur-sm border bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1] border-white/[0.08] hover:border-white/[0.15]"
                        title="Keyboard shortcuts (Ctrl+K)"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Shortcuts
                    </button>
                    <ShareButton endpointId={selectedEndpointId} params={paramValues} />
                    <button
                        onClick={() => setIsBatchMode(!isBatchMode)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all backdrop-blur-sm border ${
                            isBatchMode
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.1] border-white/[0.08] hover:border-white/[0.15]'
                        }`}
                        title="Toggle batch mode"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Batch
                    </button>
                </div>
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
                        <EnvironmentVariables onVarsChange={handleEnvVarsChange} />
                    </div>

                    <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] p-5">
                        <RequestCollections
                            currentEndpointId={selectedEndpointId}
                            currentEndpointName={endpoint?.name || ''}
                            currentParams={paramValues}
                            currentUrl={endpoint ? endpoint.urlBuilder(paramValues) : ''}
                            onLoad={handleCollectionLoad}
                        />
                    </div>

                    <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] p-5">
                        <MockResponse
                            endpointId={selectedEndpointId}
                            isMockMode={isMockMode}
                            onToggleMockMode={handleToggleMockMode}
                        />
                    </div>

                    <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] p-5">
                        <ResponseTimeGraph history={history} />
                    </div>

                    <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] p-5">
                        <RequestHistory
                            history={history}
                            onSelect={handleHistorySelect}
                            onClear={handleClearHistory}
                        />
                    </div>

                    {isBatchMode && (
                        <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] p-5">
                            <BatchRequests
                                currentEndpointId={selectedEndpointId}
                                currentParams={paramValues}
                                fetchWithCorsProxy={fetchWithCorsProxy}
                            />
                        </div>
                    )}
                </div>

                {/* Right panel - Response / Code */}
                <div ref={responseRef} className="w-full lg:w-[60%] min-h-[400px] lg:min-h-0">
                    <div className="rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/[0.08] h-full flex flex-col overflow-hidden">
                        <div className="px-4 py-3 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="h-4 w-px bg-white/10" />
                                <div className="flex items-center gap-1 bg-white/[0.05] rounded-lg p-0.5">
                                    <button
                                        onClick={() => setActiveTab('response')}
                                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                                            activeTab === 'response'
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                    >
                                        Response
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('code')}
                                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                                            activeTab === 'code'
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                    >
                                        Code
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('model')}
                                        className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                                            activeTab === 'model'
                                                ? 'bg-emerald-500/20 text-emerald-400'
                                                : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                    >
                                        Model
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-gray-600 hidden sm:block">Ctrl+Enter to send</span>
                            </div>
                        </div>
                        <div className="flex-1 min-h-0 overflow-hidden">
                            {activeTab === 'response' ? (
                                <ResponseViewer
                                    data={response?.data ?? null}
                                    status={response?.status ?? null}
                                    duration={response?.duration ?? 0}
                                    url={response?.url ?? ''}
                                    error={response?.error}
                                    isLoading={isLoading}
                                    isMock={isMockResponse}
                                    onGenerateModel={() => setActiveTab('model')}
                                />
                            ) : activeTab === 'model' ? (
                                <ModelGenerator
                                    data={response?.data ?? null}
                                    endpointName={endpoint?.name}
                                    onClose={() => setActiveTab('response')}
                                />
                            ) : endpoint ? (
                                <CodeSnippetGenerator
                                    url={endpoint.urlBuilder(paramValues)}
                                    endpointName={endpoint.name}
                                    params={paramValues}
                                    call={endpoint.call}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
                                    <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-500">No endpoint selected</p>
                                        <p className="text-xs text-gray-700 mt-1">Select an endpoint to generate code snippets</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playground;
