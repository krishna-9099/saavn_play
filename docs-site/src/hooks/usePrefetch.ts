import { useCallback, useRef } from 'react';

const prefetchedRoutes = new Set<string>();

function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function prefetchRoute(path: string): void {
  if (prefetchedRoutes.has(path)) return;
  prefetchedRoutes.add(path);

  const routeMap: Record<string, () => Promise<unknown>> = {
    '/': () => import('../pages/Home'),
    '/installation': () => import('../pages/Installation'),
    '/api-reference': () => import('../pages/ApiReference'),
    '/examples': () => import('../pages/Examples'),
    '/playground': () => import('../pages/Playground'),
    '/models': () => import('../pages/Models'),
    '/changelog': () => import('../pages/Changelog'),
    '/contributing': () => import('../pages/Contributing'),
    '/api/search': () => import('../pages/endpoints/SearchEndpoint'),
    '/api/song': () => import('../pages/endpoints/SongEndpoint'),
    '/api/album': () => import('../pages/endpoints/AlbumEndpoint'),
    '/api/artist': () => import('../pages/endpoints/ArtistEndpoint'),
    '/api/home': () => import('../pages/endpoints/HomeEndpoint'),
    '/api/podcast': () => import('../pages/endpoints/PodcastEndpoint'),
    '/api/radio': () => import('../pages/endpoints/RadioEndpoint'),
  };

  const importFn = routeMap[path];
  if (!importFn) return;

  const executePrefetch = () => {
    importFn().catch(() => {
      prefetchedRoutes.delete(path);
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(executePrefetch);
  } else {
    setTimeout(executePrefetch, 1);
  }
}

export function usePrefetch() {
  const isMobileDevice = useRef(isMobile());

  const prefetch = useCallback((path: string) => {
    if (isMobileDevice.current) return;
    prefetchRoute(path);
  }, []);

  return { prefetch };
}
