import { useEffect, useState } from 'react';

// Workspace/counter can be overridden via env; defaults match your public workspace.
const WORKSPACE = import.meta.env.VITE_COUNTER_WORKSPACE ?? 'saavn-play-docs';
const COUNTER_NAME = import.meta.env.VITE_COUNTER_NAME ?? 'saavn-play-docs';
const API_URL = `https://api.counterapi.dev/v2/${WORKSPACE}/${COUNTER_NAME}`;

export function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchCount() {
            try {
                // Check if we've already counted this session
                const sessionKey = `counter_${WORKSPACE}_${COUNTER_NAME}`;
                const alreadyCounted = sessionStorage.getItem(sessionKey);

                // Use direct fetch to CounterAPI v2 endpoint
                const endpoint = alreadyCounted ? `${API_URL}` : `${API_URL}/up`;

                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                }

                const data = await response.json();

                // Mark this session as counted
                if (!alreadyCounted) {
                    sessionStorage.setItem(sessionKey, 'true');
                }

                // CounterAPI v2 returns: { code: "200", data: { up_count, down_count, ... }, message }
                let nextCount: number | null = null;

                if (typeof data?.data?.up_count === 'number') {
                    nextCount = data.data.up_count;
                } else if (typeof data?.value === 'number') {
                    nextCount = data.value;
                }

                if (!cancelled) {
                    if (nextCount === null) {
                        console.error('CounterAPI response:', data);
                        setError('Counter value missing in response');
                        setCount(null);
                    } else {
                        setCount(nextCount);
                        setError(null);
                    }
                }
            } catch (err) {
                console.error('CounterAPI error:', err);
                if (!cancelled) {
                    const errorMsg = err instanceof Error ? err.message : 'Network error';
                    setError(errorMsg);
                    setCount(null);
                }
            }
        }

        fetchCount();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 shadow-lg shadow-primary-500/5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm uppercase tracking-wide text-gray-500">Visitors</p>
                    <p className="mt-2 text-4xl font-semibold text-white">
                        {error ? '—' : count === null ? '…' : count.toLocaleString()}
                    </p>
                    {error && (
                        <p className="mt-2 text-xs text-red-400" title={error}>
                            Counter unavailable
                        </p>
                    )}
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15 text-primary-300">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
            <p className="mt-3 text-sm text-gray-400">Live page views powered by CounterAPI.</p>
        </div>
    );
}
