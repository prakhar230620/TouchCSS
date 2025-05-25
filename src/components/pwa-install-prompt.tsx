'use client';

import { useEffect, useState } from 'react';

export function PWAInstallPrompt() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
          function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          function(err) {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });

      // Handle install prompt
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);
      });

      // Hide the prompt when PWA is installed
      window.addEventListener('appinstalled', () => {
        setIsInstallable(false);
        setDeferredPrompt(null);
        console.log('PWA was installed');
      });
    }
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Reset the deferred prompt variable
    setDeferredPrompt(null);
    setIsInstallable(false);
  };
  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slide-up">
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Install TouchCSS
      </button>
      <div className="mt-2 text-xs text-muted-foreground text-center animate-pulse">
        Install for offline access
      </div>
    </div>
  );
}
