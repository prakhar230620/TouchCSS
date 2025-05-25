'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);

    // Add listeners for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null; // Don't show anything when online
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <WifiOff className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">You're Offline</CardTitle>
          <CardDescription className="text-center">
            Don't worry! Most features will still work offline thanks to PWA capabilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            The app will automatically reconnect when your internet connection is restored.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <Wifi className="mr-2 h-4 w-4" />
            Try to Reconnect
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
