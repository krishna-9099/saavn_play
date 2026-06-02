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

      if ('sync' in registration) {
        try {
          await (registration as any).sync.register('sync-feedback');
        } catch {
          // Sync not supported or permission denied
        }
      }
    } catch (error) {
      console.warn('SW registration failed:', error);
    }
  });

  window.addEventListener('online', () => {
    showToast('You\'re back online', 'success');
    document.documentElement.classList.remove('is-offline');
  });

  window.addEventListener('offline', () => {
    showToast('You\'re offline. Cached content is available.', 'warning');
    document.documentElement.classList.add('is-offline');
  });

  if (!navigator.onLine) {
    document.documentElement.classList.add('is-offline');
  }
}

function showToast(message: string, type: 'success' | 'warning') {
  const existing = document.getElementById('sw-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'sw-toast';
  toast.className = `sw-toast sw-toast-${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  const style = document.createElement('style');
  style.textContent = `
    .sw-toast {
      position: fixed;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      padding: 0.75rem 1.5rem;
      border-radius: 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      z-index: 9999;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      animation: sw-toast-in 0.3s ease forwards;
      white-space: nowrap;
    }
    .sw-toast-success {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.3);
    }
    .sw-toast-warning {
      background: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
      border-color: rgba(245, 158, 11, 0.3);
    }
    @keyframes sw-toast-in {
      to { transform: translateX(-50%) translateY(0); }
    }
    @keyframes sw-toast-out {
      to { transform: translateX(-50%) translateY(100px); opacity: 0; }
    }
  `;

  if (!document.getElementById('sw-toast-styles')) {
    style.id = 'sw-toast-styles';
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'sw-toast-out 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
