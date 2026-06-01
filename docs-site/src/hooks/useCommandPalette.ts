import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

export interface Command {
  id: string;
  label: string;
  description?: string;
  icon: string;
  category: 'page' | 'api' | 'action';
  action: () => void;
  keywords?: string[];
}

const RECENT_SEARCHES_KEY = 'command-palette-recent';
const MAX_RECENT = 5;

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  const saveRecentSearch = useCallback((search: string) => {
    if (!search.trim()) return;
    setRecentSearches((prev) => {
      const updated = [search, ...prev.filter((s) => s !== search)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const commands: Command[] = useMemo(
    () => [
      {
        id: 'go-home',
        label: 'Go to Home',
        description: 'Navigate to the home page',
        icon: 'home',
        category: 'page',
        action: () => { navigate('/'); setIsOpen(false); },
        keywords: ['home', 'main', 'start'],
      },
      {
        id: 'go-installation',
        label: 'Go to Installation',
        description: 'Installation guide and setup',
        icon: 'install',
        category: 'page',
        action: () => { navigate('/installation'); setIsOpen(false); },
        keywords: ['install', 'setup', 'getting started'],
      },
      {
        id: 'go-api-reference',
        label: 'Go to API Reference',
        description: 'Full API documentation',
        icon: 'api',
        category: 'page',
        action: () => { navigate('/api-reference'); setIsOpen(false); },
        keywords: ['api', 'reference', 'docs', 'documentation'],
      },
      {
        id: 'go-examples',
        label: 'Go to Examples',
        description: 'Code examples and tutorials',
        icon: 'examples',
        category: 'page',
        action: () => { navigate('/examples'); setIsOpen(false); },
        keywords: ['examples', 'tutorials', 'code'],
      },
      {
        id: 'go-playground',
        label: 'Go to Playground',
        description: 'Interactive API playground',
        icon: 'playground',
        category: 'page',
        action: () => { navigate('/playground'); setIsOpen(false); },
        keywords: ['playground', 'try', 'test', 'interactive'],
      },
      {
        id: 'go-models',
        label: 'Go to Models',
        description: 'Data models and schemas',
        icon: 'models',
        category: 'page',
        action: () => { navigate('/models'); setIsOpen(false); },
        keywords: ['models', 'schemas', 'types'],
      },
      {
        id: 'api-search',
        label: 'Search API Endpoint',
        description: '/api/search - Search for songs, albums, artists',
        icon: 'search',
        category: 'api',
        action: () => { navigate('/api/search'); setIsOpen(false); },
        keywords: ['search', 'find', 'query'],
      },
      {
        id: 'api-song',
        label: 'Song API Endpoint',
        description: '/api/song - Get song details',
        icon: 'song',
        category: 'api',
        action: () => { navigate('/api/song'); setIsOpen(false); },
        keywords: ['song', 'track', 'music'],
      },
      {
        id: 'api-album',
        label: 'Album API Endpoint',
        description: '/api/album - Get album details',
        icon: 'album',
        category: 'api',
        action: () => { navigate('/api/album'); setIsOpen(false); },
        keywords: ['album', 'playlist'],
      },
      {
        id: 'api-artist',
        label: 'Artist API Endpoint',
        description: '/api/artist - Get artist details',
        icon: 'artist',
        category: 'api',
        action: () => { navigate('/api/artist'); setIsOpen(false); },
        keywords: ['artist', 'singer', 'musician'],
      },
      {
        id: 'api-home',
        label: 'Home API Endpoint',
        description: '/api/home - Get homepage data',
        icon: 'home-api',
        category: 'api',
        action: () => { navigate('/api/home'); setIsOpen(false); },
        keywords: ['home', 'homepage', 'feed'],
      },
      {
        id: 'api-podcast',
        label: 'Podcast API Endpoint',
        description: '/api/podcast - Get podcast data',
        icon: 'podcast',
        category: 'api',
        action: () => { navigate('/api/podcast'); setIsOpen(false); },
        keywords: ['podcast', 'episode'],
      },
      {
        id: 'api-radio',
        label: 'Radio API Endpoint',
        description: '/api/radio - Get radio stations',
        icon: 'radio',
        category: 'api',
        action: () => { navigate('/api/radio'); setIsOpen(false); },
        keywords: ['radio', 'station'],
      },
      {
        id: 'toggle-theme',
        label: 'Toggle Theme',
        description: 'Switch between light and dark mode',
        icon: 'theme',
        category: 'action',
        action: () => {
          document.documentElement.classList.toggle('dark');
          setIsOpen(false);
        },
        keywords: ['theme', 'dark', 'light', 'mode'],
      },
      {
        id: 'open-playground',
        label: 'Open Playground',
        description: 'Open the interactive API playground',
        icon: 'playground',
        category: 'action',
        action: () => { navigate('/playground'); setIsOpen(false); },
        keywords: ['playground', 'try', 'test'],
      },
      {
        id: 'copy-url',
        label: 'Copy Current URL',
        description: 'Copy the current page URL to clipboard',
        icon: 'copy',
        category: 'action',
        action: () => {
          navigator.clipboard.writeText(window.location.href);
          setIsOpen(false);
        },
        keywords: ['copy', 'url', 'link'],
      },
      {
        id: 'scroll-top',
        label: 'Scroll to Top',
        description: 'Scroll to the top of the page',
        icon: 'scroll',
        category: 'action',
        action: () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setIsOpen(false);
        },
        keywords: ['scroll', 'top', 'up'],
      },
    ],
    [navigate]
  );

  const fuse = useMemo(
    () =>
      new Fuse(commands, {
        keys: [
          { name: 'label', weight: 0.4 },
          { name: 'description', weight: 0.3 },
          { name: 'keywords', weight: 0.3 },
        ],
        threshold: 0.4,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 1,
      }),
    [commands]
  );

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    return fuse.search(query).map((result) => result.item);
  }, [query, commands, fuse]);

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const executeCommand = useCallback(
    (command: Command) => {
      saveRecentSearch(command.label);
      command.action();
    },
    [saveRecentSearch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            executeCommand(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          close();
          break;
      }
    },
    [filteredCommands, selectedIndex, executeCommand, close]
  );

  return {
    isOpen,
    query,
    setQuery,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    recentSearches,
    open,
    close,
    toggle,
    executeCommand,
    handleKeyDown,
  };
}
