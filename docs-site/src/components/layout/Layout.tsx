import { useState, useEffect, ReactNode } from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Footer from './Footer';
import Breadcrumbs from '../ui/Breadcrumbs';
import { spacing } from '../../theme';

interface LayoutProps {
  children: ReactNode;
  hideSidebars?: boolean;
}

const Layout = ({ children, hideSidebars = false }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background-dark">
      <Header
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        hideSidebars={hideSidebars}
      />

      <div className="flex-1 flex">
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {!hideSidebars && (
          <aside
            className={`
              fixed lg:sticky top-[64px] left-0 z-30 lg:z-10
              h-[calc(100vh-64px)] overflow-y-auto
              bg-background-darker/60 backdrop-blur-xl lg:bg-transparent lg:backdrop-blur-none
              border-r border-white/5 lg:border-r-0
              transform transition-transform duration-300 ease-in-out
              lg:transform-none
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
            style={{ width: spacing.sidebar.left }}
          >
            <LeftSidebar onNavigate={() => isMobile && setIsSidebarOpen(false)} />
          </aside>
        )}

        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className={`${hideSidebars ? 'max-w-7xl' : 'max-w-4xl'} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
            {!hideSidebars && <Breadcrumbs />}
            {children}
          </div>
        </main>

        {!hideSidebars && (
          <aside
            className="hidden xl:block sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto"
            style={{ width: spacing.sidebar.right }}
          >
            <RightSidebar />
          </aside>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
