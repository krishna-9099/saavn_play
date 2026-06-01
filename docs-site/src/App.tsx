import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import CommandPalette from './components/ui/CommandPalette';
import LoadingFallback from './components/ui/LoadingFallback';

const Home = lazy(() => import('./pages/Home'));
const Installation = lazy(() => import('./pages/Installation'));
const ApiReference = lazy(() => import('./pages/ApiReference'));
const Examples = lazy(() => import('./pages/Examples'));
const Playground = lazy(() => import('./pages/Playground'));
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

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPlayground = location.pathname === '/playground';

  return (
    <>
      <CommandPalette />
      <Layout hideSidebars={isHomePage || isPlayground}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/installation" element={<Installation />} />
            <Route path="/api-reference" element={<ApiReference />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/playground" element={<Playground />} />
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
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
