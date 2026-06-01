import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeLabels: Record<string, string> = {
  '': 'Home',
  'installation': 'Installation',
  'api-reference': 'API Reference',
  'examples': 'Examples',
  'playground': 'Playground',
  'models': 'Models',
  'api': 'API',
  'search': 'Search',
  'song': 'Songs',
  'album': 'Albums',
  'artist': 'Artists',
  'home': 'Home Data',
  'podcast': 'Podcasts',
  'radio': 'Radio',
};

const Breadcrumbs = () => {
  const location = useLocation();

  const breadcrumbs = useMemo((): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) return [];

    const items: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      items.push({ label, path: currentPath });
    }

    return items;
  }, [location.pathname]);

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6"
    >
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-gray-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {isLast ? (
                <span className="text-white font-medium">{crumb.label}</span>
              ) : (
                <Link
                  to={crumb.path}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
