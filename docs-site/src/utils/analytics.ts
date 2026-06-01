interface PageView {
  path: string;
  count: number;
  lastVisited: string;
}

interface FeatureUsage {
  feature: string;
  count: number;
  lastUsed: string;
}

interface AnalyticsData {
  pageViews: Record<string, PageView>;
  features: Record<string, FeatureUsage>;
  totalPageViews: number;
  startDate: string;
}

const STORAGE_KEY = 'saavn_play_analytics';

function getAnalyticsData(): AnalyticsData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Ignore parsing errors
  }

  return {
    pageViews: {},
    features: {},
    totalPageViews: 0,
    startDate: new Date().toISOString(),
  };
}

function saveAnalyticsData(data: AnalyticsData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
}

export function trackPageView(path: string): void {
  const data = getAnalyticsData();
  const now = new Date().toISOString();

  if (!data.pageViews[path]) {
    data.pageViews[path] = {
      path,
      count: 0,
      lastVisited: now,
    };
  }

  data.pageViews[path].count += 1;
  data.pageViews[path].lastVisited = now;
  data.totalPageViews += 1;

  saveAnalyticsData(data);
}

export function trackFeatureUsage(feature: string): void {
  const data = getAnalyticsData();
  const now = new Date().toISOString();

  if (!data.features[feature]) {
    data.features[feature] = {
      feature,
      count: 0,
      lastUsed: now,
    };
  }

  data.features[feature].count += 1;
  data.features[feature].lastUsed = now;

  saveAnalyticsData(data);
}

export function getAnalyticsStats(): AnalyticsData {
  return getAnalyticsData();
}

export function getPageViewCount(path: string): number {
  const data = getAnalyticsData();
  return data.pageViews[path]?.count ?? 0;
}

export function getFeatureUsageCount(feature: string): number {
  const data = getAnalyticsData();
  return data.features[feature]?.count ?? 0;
}

export function getTopPages(limit: number = 10): PageView[] {
  const data = getAnalyticsData();
  return Object.values(data.pageViews)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getTopFeatures(limit: number = 10): FeatureUsage[] {
  const data = getAnalyticsData();
  return Object.values(data.features)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function resetAnalytics(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export type { PageView, FeatureUsage, AnalyticsData };
