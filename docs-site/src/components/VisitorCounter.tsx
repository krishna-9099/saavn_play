import { useEffect, useState } from 'react';
import { Counter } from 'counterapi';

// Workspace/counter can be overridden via env; defaults match your public workspace.
const WORKSPACE = import.meta.env.VITE_COUNTER_WORKSPACE ?? 'saavn-play-docs';
const COUNTER_NAME = import.meta.env.VITE_COUNTER_NAME ?? 'saavn-play-docs';

// Public workspace: no token needed
const counterClient = new Counter({ workspace: WORKSPACE });

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

                // Increment only once per session, otherwise just read
                const data = alreadyCounted
                    ? await counterClient.get(COUNTER_NAME)
                    : await counterClient.up(COUNTER_NAME);

                // Mark this session as counted
                if (!alreadyCounted) {
                    sessionStorage.setItem(sessionKey, 'true');
                }

                // CounterAPI may return value at the top level or inside data/up_count
                let nextCount: number | null = null;

                if (typeof (data as { value?: number })?.value === 'number') {
                    nextCount = (data as { value?: number }).value!;
                } else if (typeof (data as { data?: { value?: number } })?.data?.value === 'number') {
                    nextCount = (data as { data?: { value?: number } })?.data?.value!;
                } else if (typeof (data as { data?: { up_count?: number } })?.data?.up_count === 'number') {
                    nextCount = (data as { data?: { up_count?: number } })?.data?.up_count!;
                }

                if (!cancelled) {
                    if (nextCount === null) {
                        setError('Counter value missing');
                        setCount(null);
                    } else {
                        setCount(nextCount);
                    }
                }
            } catch (err) {
                console.error('CounterAPI error', err);
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Unable to load visitor count');
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
                        {error ? '—' : count ?? '…'}
                    </p>
                    {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
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
