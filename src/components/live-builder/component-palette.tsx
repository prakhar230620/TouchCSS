
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import type { CanvasComponentType } from './live-component-builder';
import { Square, Type, MinusSquare } from 'lucide-react'; // Using MinusSquare for Button icon

interface ComponentPaletteProps {
  onAddComponent: (type: CanvasComponentType) => void;
}

const paletteItems: { label: string; type: CanvasComponentType; icon: React.ElementType }[] = [
  { label: 'Box', type: 'Box', icon: Square },
  { label: 'Text', type: 'Text', icon: Type },
  { label: 'Button', type: 'Button', icon: MinusSquare },
];

export function ComponentPalette({ onAddComponent }: ComponentPaletteProps) {
  return (
    <div className="space-y-3">
      {paletteItems.map(item => (
        <Button
          key={item.type}
          variant="outline"
          className="w-full justify-start text-left hover:bg-primary/10 hover:text-primary group"
          onClick={() => onAddComponent(item.type)}
        >
          <item.icon className="mr-2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          {item.label}
        </Button>
      ))}
    </div>
  );
}

    