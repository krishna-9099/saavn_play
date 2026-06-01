export function registerSW() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/saavn_play/sw.js', {
        scope: '/saavn_play/',
      });

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
            window.dispatchEvent(new CustomEvent('sw-updated'));
          }
        });
      });
    } catch (error) {
      console.warn('SW registration failed:', error);
    }
  });
}
