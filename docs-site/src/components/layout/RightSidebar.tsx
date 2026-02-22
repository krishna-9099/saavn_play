import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

const RightSidebar = () => {
    const [tocItems, setTocItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const location = useLocation();

    // Extract headings from the main content
    useEffect(() => {
        const extractHeadings = () => {
            const mainContent = document.querySelector('main');
            if (!mainContent) return;

            const headings = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
            const items: TocItem[] = Array.from(headings).map((heading) => {
                const level = parseInt(heading.tagName.charAt(1));
                const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';

                // Ensure heading has an ID for anchor links
                if (!heading.id) {
                    heading.id = id;
                }

                return {
                    id,
                    text: heading.textContent || '',
                    level,
                };
            });

            setTocItems(items);
            setActiveId(''); // Reset active ID when page changes
        };

        // Run on mount and after a short delay for dynamic content
        extractHeadings();
        const timer = setTimeout(extractHeadings, 100);

        return () => clearTimeout(timer);
    }, [location.pathname]); // Re-run when path changes

    // Track active section using Intersection Observer
    useEffect(() => {
        if (tocItems.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0% -35% 0%',
                threshold: 0,
            }
        );

        const mainContent = document.querySelector('main');
        if (mainContent) {
            const headings = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach((heading) => observer.observe(heading));
        }

        return () => observer.disconnect();
    }, [tocItems]);

    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    if (tocItems.length === 0) {
        return (
            <div className="p-4">
                <p className="text-sm text-gray-500">No headings on this page</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h4 className="mb-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                On this page
            </h4>
            <nav>
                <ul className="space-y-1 border-l border-border">
                    {tocItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => scrollToHeading(item.id)}
                                className={`toc-item w-full text-left ${activeId === item.id ? 'active' : ''
                                    }`}
                                style={{ paddingLeft: `${(item.level - 1) * 12 + 16}px` }}
                            >
                                {item.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default RightSidebar;
