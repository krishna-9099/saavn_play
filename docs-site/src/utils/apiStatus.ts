export interface ApiStatusResult {
  status: 'online' | 'slow' | 'offline';
  responseTime: number;
  lastChecked: string;
  statusCode?: number;
}

const CACHE_KEY = 'saavn_api_status';
const CACHE_DURATION = 60 * 1000; // 1 minute

const API_BASE = 'https://saavn.dev/api';

export async function checkApiStatus(): Promise<ApiStatusResult> {
  const cached = getCachedStatus();
  if (cached) return cached;

  const start = performance.now();
  try {
    const response = await fetch(`${API_BASE}/search/songs?query=test`, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    });
    const responseTime = Math.round(performance.now() - start);

    const result: ApiStatusResult = {
      status: response.ok ? (responseTime > 3000 ? 'slow' : 'online') : 'offline',
      responseTime,
      lastChecked: new Date().toISOString(),
      statusCode: response.status,
    };

    setCachedStatus(result);
    return result;
  } catch {
    const responseTime = Math.round(performance.now() - start);
    const result: ApiStatusResult = {
      status: 'offline',
      responseTime,
      lastChecked: new Date().toISOString(),
    };

    setCachedStatus(result);
    return result;
  }
}

function getCachedStatus(): ApiStatusResult | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

function setCachedStatus(data: ApiStatusResult): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {
    // localStorage might be full or disabled
  }
}

export function clearStatusCache(): void {
  localStorage.removeItem(CACHE_KEY);
}
