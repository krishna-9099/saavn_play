import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchModal from '../ui/SearchModal';
import { useThrottle } from '../../hooks/useThrottle';
import { usePrefetch } from '../../hooks/usePrefetch';

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  hideSidebars?: boolean;
}

const Header = ({ onMenuClick, isSidebarOpen, hideSidebars = false }: HeaderProps) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 100);
  const isScrolled = throttledScrollY > 10;
  const { prefetch } = usePrefetch();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/installation', label: 'Installation' },
    { path: '/api-reference', label: 'API Reference' },
    { path: '/examples', label: 'Examples' },
    { path: '/playground', label: 'Playground' },
    { path: '/models', label: 'Models' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background-darker/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-background-darker/80 backdrop-blur-md border-b border-white/5'
        }`}
        style={{ height: '64px' }}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isSidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/saavn_play/favicon.svg"
                  alt="saavn_play logo"
                  className="w-10 h-10 transition-all duration-300 group-hover:scale-110 logo-pulse"
                />
                <div className="absolute inset-0 rounded-full bg-green-500/0 group-hover:bg-green-500/20 blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100" />
              </div>
              <span className="text-xl font-bold group-hover:opacity-80 transition-opacity">
                <span className="text-green-400">saavn</span><span className="text-pink-400">_play</span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => prefetch(link.path)}
                className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-white bg-green-500/10 shadow-sm shadow-green-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {hideSidebars && isSidebarOpen && (
            <div className="md:hidden fixed left-0 right-0 top-[64px] bg-background-darker/80 backdrop-blur-xl border-b border-white/10 shadow-xl z-50">
              <nav className="max-w-md mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onMenuClick}
                    onMouseEnter={() => prefetch(link.path)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-white bg-green-500/10'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-white/20 backdrop-blur-sm"
              aria-label="Search documentation"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="hidden sm:inline text-sm">Search</span>
              <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-medium text-gray-500 bg-white/5 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            <a
              href="https://github.com/krishna-9099/saavn_play"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="https://pub.dev/packages/saavn_play"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors border border-green-500/20"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              pub.dev
            </a>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;
