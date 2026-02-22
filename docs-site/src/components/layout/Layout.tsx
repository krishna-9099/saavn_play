import { useState, useEffect, ReactNode } from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Footer from './Footer';
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
      {/* Header */}
      <Header
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main content area with sidebars */}
      <div className="flex-1 flex">
        {/* Mobile overlay */}
        {isMobile && isSidebarOpen && !hideSidebars && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar - Global TOC */}
        {!hideSidebars && (
          <aside
            className={`
              fixed lg:sticky top-[64px] left-0 z-30 lg:z-10
              h-[calc(100vh-64px)] overflow-y-auto
              bg-background-darker lg:bg-transparent
              transform transition-transform duration-300 ease-in-out
              lg:transform-none
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
            style={{ width: spacing.sidebar.left }}
          >
            <LeftSidebar onNavigate={() => isMobile && setIsSidebarOpen(false)} />
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <div className={`${hideSidebars ? 'max-w-7xl' : 'max-w-4xl'} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
            {children}
          </div>
        </main>

        {/* Right Sidebar - Page TOC */}
        {!hideSidebars && (
          <aside
            className="hidden xl:block sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto"
            style={{ width: spacing.sidebar.right }}
          >
            <RightSidebar />
          </aside>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
