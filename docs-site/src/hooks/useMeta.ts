import { useEffect } from 'react';

interface MetaOptions {
    title: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    twitterTitle?: string;
    twitterDescription?: string;
}

const SITE_NAME = 'saavn_play';
const DEFAULT_DESCRIPTION = 'Unofficial Dart package for interacting with the JioSaavn API. Search songs, albums, artists, playlists, podcasts, radio stations, and more.';

export function useMeta(options: MetaOptions) {
    useEffect(() => {
        const {
            title,
            description = DEFAULT_DESCRIPTION,
            ogTitle,
            ogDescription,
            ogImage,
            ogUrl,
            twitterTitle,
            twitterDescription,
        } = options;

        // Update document title
        document.title = `${title} | ${SITE_NAME}`;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }

        // Update Open Graph tags
        const updateMeta = (property: string, content: string) => {
            let element = document.querySelector(`meta[property="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('property', property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        updateMeta('og:title', ogTitle || `${title} | ${SITE_NAME}`);
        updateMeta('og:description', ogDescription || description);
        if (ogImage) updateMeta('og:image', ogImage);
        if (ogUrl) updateMeta('og:url', ogUrl);

        // Update Twitter Card tags
        const updateTwitterMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        updateTwitterMeta('twitter:title', twitterTitle || `${title} | ${SITE_NAME}`);
        updateTwitterMeta('twitter:description', twitterDescription || description);

        // Cleanup on unmount - restore defaults
        return () => {
            document.title = `${SITE_NAME} - Dart API Client for JioSaavn`;
            if (metaDescription) {
                metaDescription.setAttribute('content', DEFAULT_DESCRIPTION);
            }
        };
    }, [options]);
}
