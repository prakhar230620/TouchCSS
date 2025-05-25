
"use client";

import React, { useState, useCallback } from 'react';
import { ComponentPalette } from './component-palette';
import { CanvasArea } from './canvas-area';
import { PropertyPanel } from './property-panel';
import { CodeExporter } from './code-exporter';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Trash2, Code2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export type CanvasComponentType = 'Box' | 'Text' | 'Button';

export interface CanvasComponentProps {
  textContent?: string;
  buttonText?: string;
}

export interface CanvasComponent {
  id: string;
  type: CanvasComponentType;
  props: CanvasComponentProps;
  styles: React.CSSProperties;
}

const initialComponents: CanvasComponent[] = [
  {
    id: crypto.randomUUID(),
    type: 'Box',
    props: {},
    styles: {
      width: '200px',
      height: '100px',
      backgroundColor: 'hsl(var(--primary)/0.2)',
      padding: '10px',
      margin: '10px auto', // Center boxes by default
      border: '1px solid hsl(var(--primary)/0.5)',
      borderRadius: 'var(--radius)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  {
    id: crypto.randomUUID(),
    type: 'Text',
    props: { textContent: 'Edit this text!' },
    styles: {
      fontSize: '16px',
      color: 'hsl(var(--foreground))',
      padding: '10px',
      margin: '10px auto',
      textAlign: 'center',
    },
  },
];


export function LiveComponentBuilder() {
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponent[]>(initialComponents);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const { toast } = useToast();

  const addComponent = useCallback((type: CanvasComponentType) => {
    let newComponent: CanvasComponent;
    const newId = crypto.randomUUID();

    switch (type) {
      case 'Box':
        newComponent = {
          id: newId,
          type,
          props: {},
          styles: { width: '150px', height: '80px', backgroundColor: 'hsl(var(--secondary)/0.3)', padding: '10px', margin: '10px auto', border: '1px dashed hsl(var(--border))', borderRadius: 'var(--radius)' },
        };
        break;
      case 'Text':
        newComponent = {
          id: newId,
          type,
          props: { textContent: 'New Text Element' },
          styles: { fontSize: '16px', color: 'hsl(var(--foreground))', padding: '5px', margin: '10px auto', textAlign: 'left' },
        };
        break;
      case 'Button':
        newComponent = {
          id: newId,
          type,
          props: { buttonText: 'Click Me' },
          styles: {
            backgroundColor: 'hsl(var(--primary))',
            color: 'hsl(var(--primary-foreground))',
            padding: '10px 15px',
            border: 'none',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            margin: '10px auto',
            display: 'block' // Buttons are block to respect margin:auto
          },
        };
        break;
      default:
        throw new Error('Unknown component type');
    }
    setCanvasComponents(prev => [...prev, newComponent]);
    setSelectedComponentId(newId);
    toast({ title: `${type} added to canvas!`, description: "You can now select and style it."});
  }, [toast]);

  const selectComponent = useCallback((id: string | null) => {
    setSelectedComponentId(id);
  }, []);

  const updateComponentStyle = useCallback((id: string, newStyles: React.CSSProperties) => {
    setCanvasComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, styles: { ...comp.styles, ...newStyles } } : comp
      )
    );
  }, []);
  
  const updateComponentProp = useCallback((id: string, propName: keyof CanvasComponentProps, value: string) => {
    setCanvasComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, props: { ...comp.props, [propName]: value } } : comp
      )
    );
  }, []);

  const deleteSelectedComponent = useCallback(() => {
    if (!selectedComponentId) {
      toast({ title: "No component selected", description: "Click a component on the canvas to select it.", variant: "destructive"});
      return;
    }
    setCanvasComponents(prev => prev.filter(comp => comp.id !== selectedComponentId));
    setSelectedComponentId(null);
    toast({ title: "Component Deleted", description: "The selected component has been removed."});
  }, [selectedComponentId, toast]);

  const clearCanvas = () => {
    setCanvasComponents([]);
    setSelectedComponentId(null);
    toast({ title: "Canvas Cleared", description: "All components removed from the canvas."});
  };
  
  const selectedComponent = canvasComponents.find(comp => comp.id === selectedComponentId) || null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-background rounded-lg border border-border shadow-sm min-h-[600px]">
      {/* Left Column: Palette & Actions */}
      <div className="lg:w-1/4 space-y-6 p-4 bg-card rounded-lg border shadow-xs">
        <h3 className="text-lg font-semibold text-primary-dark flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5"/>
          Add Elements
        </h3>
        <ComponentPalette onAddComponent={addComponent} />
        <div className="pt-4 border-t">
           <h3 className="text-md font-semibold text-muted-foreground mb-2">Canvas Actions</h3>
           <Button variant="outline" size="sm" onClick={deleteSelectedComponent} disabled={!selectedComponentId} className="w-full mb-2">
            <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
          </Button>
          <Button variant="destructive" size="sm" onClick={clearCanvas} className="w-full">
            Clear Canvas
          </Button>
        </div>
         <div className="pt-4 border-t">
           <h3 className="text-md font-semibold text-muted-foreground mb-2 flex items-center gap-2"><Code2 className="w-5 h-5"/> Export</h3>
          <CodeExporter components={canvasComponents} />
        </div>
      </div>

      {/* Middle Column: Canvas Area */}
      <ScrollArea className="lg:w-1/2 flex-1 bg-muted/30 rounded-lg border-2 border-dashed border-border p-1 shadow-inner min-h-[400px] lg:min-h-0">
        <CanvasArea
          components={canvasComponents}
          selectedComponentId={selectedComponentId}
          onSelectComponent={selectComponent}
        />
      </ScrollArea>

      {/* Right Column: Property Panel */}
      <ScrollArea className="lg:w-1/4 p-4 bg-card rounded-lg border shadow-xs min-h-[300px] lg:min-h-0">
        <PropertyPanel
          component={selectedComponent}
          onUpdateStyle={updateComponentStyle}
          onUpdateProp={updateComponentProp}
        />
      </ScrollArea>
    </div>
  );
}

    