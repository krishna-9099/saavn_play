import { useState, useEffect, useCallback } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { checkApiStatus, clearStatusCache, ApiStatusResult } from '../utils/apiStatus';

const ApiStatus = () => {
  const [status, setStatus] = useState<ApiStatusResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await checkApiStatus();
      setStatus(result);
    } catch (err) {
      setError('Failed to check API status');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const handleRefresh = () => {
    clearStatusCache();
    fetchStatus();
  };

  const statusConfig = {
    online: { color: 'emerald', label: 'Operational', icon: '●' },
    slow: { color: 'yellow', label: 'Degraded', icon: '●' },
    offline: { color: 'red', label: 'Down', icon: '●' },
  };

  const currentStatus = status ? statusConfig[status.status] : statusConfig.online;

  const formatTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString();
  };

  const getResponseTimeColor = (ms: number) => {
    if (ms < 1000) return 'text-emerald-400';
    if (ms < 3000) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          API Status
        </h1>
        <p className="text-gray-400 text-lg">
          Monitor the JioSaavn API health and performance in real-time.
        </p>
      </div>

      <GlassCard className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Current Status</h2>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-white/[0.05] border border-white/[0.1] text-gray-300 hover:bg-white/[0.1] hover:text-white transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Checking...' : 'Refresh'}
          </button>
        </div>

        {error ? (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <span
                className={`text-4xl ${
                  currentStatus.color === 'emerald'
                    ? 'text-emerald-400'
                    : currentStatus.color === 'yellow'
                    ? 'text-yellow-400'
                    : 'text-red-400'
                } ${loading ? 'animate-pulse' : ''}`}
              >
                {currentStatus.icon}
              </span>
              <div>
                <p className="text-2xl font-bold text-white">
                  {currentStatus.label}
                </p>
                <p className="text-gray-400">JioSaavn API is {currentStatus.label.toLowerCase()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-sm text-gray-500 mb-1">Response Time</p>
                <p className={`text-2xl font-bold ${status ? getResponseTimeColor(status.responseTime) : 'text-gray-400'}`}>
                  {status ? `${status.responseTime}ms` : '-'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-sm text-gray-500 mb-1">Status Code</p>
                <p className="text-2xl font-bold text-white">
                  {status?.statusCode ?? '-'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-sm text-gray-500 mb-1">Last Checked</p>
                <p className="text-sm font-medium text-gray-300">
                  {status ? formatTime(status.lastChecked) : '-'}
                </p>
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      <GlassCard className="p-8">
        <h2 className="text-xl font-semibold text-white mb-4">Status Legend</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 text-xl">●</span>
            <div>
              <p className="text-white font-medium">Operational</p>
              <p className="text-sm text-gray-400">API responding normally (&lt;3s)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-yellow-400 text-xl">●</span>
            <div>
              <p className="text-white font-medium">Degraded</p>
              <p className="text-sm text-gray-400">API responding slowly (&gt;3s)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-red-400 text-xl">●</span>
            <div>
              <p className="text-white font-medium">Down</p>
              <p className="text-sm text-gray-400">API not responding</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ApiStatus;
