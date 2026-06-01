import { useEffect, useRef, useCallback } from 'react';

interface UseFocusTrapOptions {
    enabled?: boolean;
    restoreFocus?: boolean;
}

export function useFocusTrap<T extends HTMLElement>({
    enabled = true,
    restoreFocus = true,
}: UseFocusTrapOptions = {}) {
    const containerRef = useRef<T>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    const getFocusableElements = useCallback(() => {
        if (!containerRef.current) return [];

        const selectors = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            '[contenteditable]',
        ];

        return Array.from(
            containerRef.current.querySelectorAll<HTMLElement>(selectors.join(','))
        ).filter(
            (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
        );
    }, []);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key !== 'Tab' || !containerRef.current) return;

            const focusableElements = getFocusableElements();
            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        },
        [getFocusableElements]
    );

    useEffect(() => {
        if (!enabled) return;

        // Store the currently focused element
        previousActiveElement.current = document.activeElement as HTMLElement;

        // Focus the first focusable element in the container
        const focusableElements = getFocusableElements();
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        // Add keydown listener
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);

            // Restore focus to the previously active element
            if (restoreFocus && previousActiveElement.current) {
                previousActiveElement.current.focus();
            }
        };
    }, [enabled, handleKeyDown, getFocusableElements, restoreFocus]);

    return containerRef;
}
