import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CommandPalette from './components/ui/CommandPalette';
import CustomCursor from './components/ui/CustomCursor';
import LoadingFallback from './components/ui/LoadingFallback';

const Home = lazy(() => import('./pages/Home'));
const Installation = lazy(() => import('./pages/Installation'));
const ApiReference = lazy(() => import('./pages/ApiReference'));
const Examples = lazy(() => import('./pages/Examples'));
const Playground = lazy(() => import('./pages/Playground'));
const Comparison = lazy(() => import('./pages/Comparison'));
const SearchEndpoint = lazy(() => import('./pages/endpoints/SearchEndpoint'));
const SongEndpoint = lazy(() => import('./pages/endpoints/SongEndpoint'));
const AlbumEndpoint = lazy(() => import('./pages/endpoints/AlbumEndpoint'));
const ArtistEndpoint = lazy(() => import('./pages/endpoints/ArtistEndpoint'));
const HomeEndpoint = lazy(() => import('./pages/endpoints/HomeEndpoint'));
const PodcastEndpoint = lazy(() => import('./pages/endpoints/PodcastEndpoint'));
const RadioEndpoint = lazy(() => import('./pages/endpoints/RadioEndpoint'));
const Models = lazy(() => import('./pages/Models'));
const Changelog = lazy(() => import('./pages/Changelog'));
const Contributing = lazy(() => import('./pages/Contributing'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ApiStatus = lazy(() => import('./pages/ApiStatus'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPlayground = location.pathname === '/playground';
  const [transitionState, setTransitionState] = useState<'idle' | 'entering'>('idle');

  useEffect(() => {
    setTransitionState('entering');
    const timer = setTimeout(() => setTransitionState('idle'), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <Layout hideSidebars={isHomePage || isPlayground}>
        <div
          className={`transition-all duration-300 ease-out ${
            transitionState === 'entering'
              ? 'opacity-0 translate-y-2'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/installation" element={<Installation />} />
              <Route path="/api-reference" element={<ApiReference />} />
              <Route path="/examples" element={<Examples />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/comparison" element={<Comparison />} />
              <Route path="/api/search" element={<SearchEndpoint />} />
              <Route path="/api/song" element={<SongEndpoint />} />
              <Route path="/api/album" element={<AlbumEndpoint />} />
              <Route path="/api/artist" element={<ArtistEndpoint />} />
              <Route path="/api/home" element={<HomeEndpoint />} />
              <Route path="/api/podcast" element={<PodcastEndpoint />} />
              <Route path="/api/radio" element={<RadioEndpoint />} />
            <Route path="/models" element={<Models />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/contributing" element={<Contributing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/api-status" element={<ApiStatus />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </Layout>
    </>
  );
}

export default App;
