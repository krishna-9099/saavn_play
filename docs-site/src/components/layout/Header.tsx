import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors } from '../../theme';
import SearchModal from '../ui/SearchModal';

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
  hideSidebars?: boolean;
}

const Header = ({ onMenuClick, isSidebarOpen, hideSidebars = false }: HeaderProps) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/installation', label: 'Installation' },
    { path: '/api-reference', label: 'API Reference' },
    { path: '/examples', label: 'Examples' },
    { path: '/models', label: 'Models' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Keyboard shortcut for search (Cmd/Ctrl + K)
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
        className="sticky top-0 z-40 bg-background-darker/95 backdrop-blur-md border-b border-border"
        style={{ height: '64px' }}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left section - Logo and menu button */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-background-hover transition-colors"
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

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/saavn_play/favicon.svg"
                alt="saavn_play logo"
                className="w-10 h-10"
              />
              <span className="text-xl font-bold group-hover:opacity-80 transition-opacity">
                <span className="text-primary-400">saavn</span><span className="text-pink-400">_play</span>
              </span>
            </Link>
          </div>

          {/* Center/Right section - Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                  ? 'text-white bg-primary-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-background-hover'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Menu - Only show on pages without sidebars (homepage) */}
          {hideSidebars && isSidebarOpen && (
            <div className="md:hidden fixed left-0 right-0 top-[64px] bg-background-darker border-b border-border shadow-xl z-50">
              <nav className="max-w-md mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={onMenuClick}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(link.path)
                      ? 'text-white bg-primary-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-background-hover'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}

          {/* Right section - Search and links */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-white/10 hover:border-white/20"
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

            {/* GitHub link */}
            <a
              href="https://github.com/krishna-9099/saavn_play"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-background-hover transition-colors"
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

            {/* Pub.dev badge */}
            <a
              href="https://pub.dev/packages/saavn_play"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: `${colors.primary[500]}20`,
                color: colors.primary[400]
              }}
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

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;
