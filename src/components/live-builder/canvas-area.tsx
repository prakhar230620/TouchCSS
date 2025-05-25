
"use client";

import React from 'react';
import type { CanvasComponent } from './live-component-builder';
import { cn } from '@/lib/utils';

interface CanvasAreaProps {
  components: CanvasComponent[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string | null) => void;
}

export function CanvasArea({ components, selectedComponentId, onSelectComponent }: CanvasAreaProps) {
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If click is on the canvas itself (not an element), deselect
    if (e.target === e.currentTarget) {
      onSelectComponent(null);
    }
  };
  
  const renderComponent = (component: CanvasComponent) => {
    // Destructure key from the rest of the common props
    const { id: key, ...restOfComponentProps } = component;

    const commonPropsBase = {
      style: restOfComponentProps.styles,
      className: cn(
        "relative transition-all duration-100 ease-in-out", // Added relative for potential future absolute positioning of handles
        selectedComponentId === component.id ? 'outline outline-2 outline-accent outline-offset-2 shadow-lg' : 'hover:shadow-md',
        component.type === 'Box' ? 'min-h-[20px] min-w-[20px]' : '', // Ensure boxes have some size even if empty
        component.type === 'Button' ? 'inline-block' : 'block' // Buttons inline-block, others block to stack
      ),
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent canvas click from deselecting
        onSelectComponent(component.id);
      },
      // Add data-component-id for easier debugging or E2E testing
      'data-component-id': component.id,
      'data-component-type': component.type,
    };

    switch (component.type) {
      case 'Box':
        return <div key={key} {...commonPropsBase}>{/* Can add children concept later */}</div>;
      case 'Text':
        return <p key={key} {...commonPropsBase}>{component.props.textContent || 'Text'}</p>;
      case 'Button':
        return <button key={key} {...commonPropsBase} type="button">{component.props.buttonText || 'Button'}</button>;
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full h-full p-4 space-y-2" // Added space-y-2 to stack elements by default
      onClick={handleCanvasClick}
      data-ai-hint="live component builder canvas area interactive components"
    >
      {components.length === 0 && (
        <div className="flex items-center justify-center h-full text-muted-foreground text-center">
          <p className="text-lg">Canvas is empty.<br/>Add elements from the palette to start building!</p>
        </div>
      )}
      {components.map(renderComponent)}
    </div>
  );
}
