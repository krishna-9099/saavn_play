import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Installation from './pages/Installation';
import ApiReference from './pages/ApiReference';
import Examples from './pages/Examples';
import SearchEndpoint from './pages/endpoints/SearchEndpoint';
import SongEndpoint from './pages/endpoints/SongEndpoint';
import AlbumEndpoint from './pages/endpoints/AlbumEndpoint';
import ArtistEndpoint from './pages/endpoints/ArtistEndpoint';
import PlaylistEndpoint from './pages/endpoints/PlaylistEndpoint';
import RadioEndpoint from './pages/endpoints/RadioEndpoint';
import LyricsEndpoint from './pages/endpoints/LyricsEndpoint';
import Models from './pages/Models';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Layout hideSidebars={isHomePage}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/installation" element={<Installation />} />
        <Route path="/api-reference" element={<ApiReference />} />
        <Route path="/examples" element={<Examples />} />
        <Route path="/api/search" element={<SearchEndpoint />} />
        <Route path="/api/song" element={<SongEndpoint />} />
        <Route path="/api/album" element={<AlbumEndpoint />} />
        <Route path="/api/artist" element={<ArtistEndpoint />} />
        <Route path="/api/playlist" element={<PlaylistEndpoint />} />
        <Route path="/api/radio" element={<RadioEndpoint />} />
        <Route path="/api/lyrics" element={<LyricsEndpoint />} />
        <Route path="/models" element={<Models />} />
      </Routes>
    </Layout>
  );
}

export default App;
