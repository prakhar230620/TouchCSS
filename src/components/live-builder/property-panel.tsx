
"use client";

import React from 'react';
import type { CanvasComponent, CanvasComponentType, CanvasComponentProps } from './live-component-builder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { SlidersHorizontal } from 'lucide-react';

interface PropertyPanelProps {
  component: CanvasComponent | null;
  onUpdateStyle: (id: string, newStyles: React.CSSProperties) => void;
  onUpdateProp: (id: string, propName: keyof CanvasComponentProps, value: string) => void;
}

export function PropertyPanel({ component, onUpdateStyle, onUpdateProp }: PropertyPanelProps) {
  if (!component) {
    return (
      <div className="text-sm text-muted-foreground text-center py-10">
        <SlidersHorizontal className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50"/>
        Select a component on the canvas to edit its properties.
      </div>
    );
  }

  const handleStyleChange = (property: keyof React.CSSProperties, value: string) => {
    onUpdateStyle(component.id, { [property]: value });
  };

  const handlePropChange = (propName: keyof CanvasComponentProps, value: string) => {
    onUpdateProp(component.id, propName, value);
  };

  // Helper to parse pixel values for inputs
  const parsePx = (value: string | number | undefined): string => {
    if (typeof value === 'string') return value.replace('px', '');
    if (typeof value === 'number') return String(value);
    return '0';
  };
  
  const commonStyles = component.styles;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-primary-dark mb-1">Properties for: <span className="text-accent">{component.type}</span></h3>
        <p className="text-xs text-muted-foreground">ID: {component.id}</p>
      </div>
      
      <Separator />

      {/* General Styles */}
      <div className="space-y-3">
        <h4 className="text-md font-medium text-foreground mb-2">Layout & Sizing</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor={`width-${component.id}`} className="text-xs">Width</Label>
            <Input
              id={`width-${component.id}`}
              value={commonStyles.width as string || ''}
              onChange={(e) => handleStyleChange('width', e.target.value)}
              placeholder="e.g., 100px or 50%"
              className="mt-1 h-8 text-xs"
            />
          </div>
          <div>
            <Label htmlFor={`height-${component.id}`} className="text-xs">Height</Label>
            <Input
              id={`height-${component.id}`}
              value={commonStyles.height as string || ''}
              onChange={(e) => handleStyleChange('height', e.target.value)}
              placeholder="e.g., 50px"
              className="mt-1 h-8 text-xs"
            />
          </div>
        </div>
         <div className="grid grid-cols-2 gap-3">
           <div>
            <Label htmlFor={`padding-${component.id}`} className="text-xs">Padding</Label>
            <Input
              id={`padding-${component.id}`}
              value={commonStyles.padding as string || ''}
              onChange={(e) => handleStyleChange('padding', e.target.value)}
              placeholder="e.g., 10px"
              className="mt-1 h-8 text-xs"
            />
          </div>
          <div>
            <Label htmlFor={`margin-${component.id}`} className="text-xs">Margin</Label>
            <Input
              id={`margin-${component.id}`}
              value={commonStyles.margin as string || ''}
              onChange={(e) => handleStyleChange('margin', e.target.value)}
              placeholder="e.g., 10px auto"
              className="mt-1 h-8 text-xs"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-md font-medium text-foreground mb-2">Appearance</h4>
        <div>
          <Label htmlFor={`bgColor-${component.id}`} className="text-xs">Background Color</Label>
          <Input
            id={`bgColor-${component.id}`}
            type="color"
            value={commonStyles.backgroundColor as string || '#ffffff'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            className="mt-1 h-8 w-full p-0.5"
          />
        </div>
         <div>
          <Label htmlFor={`borderRadius-${component.id}`} className="text-xs">Border Radius</Label>
          <Input
            id={`borderRadius-${component.id}`}
            value={commonStyles.borderRadius as string || ''}
            onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
            placeholder="e.g., 8px or 0.5rem"
            className="mt-1 h-8 text-xs"
          />
        </div>
         <div>
          <Label htmlFor={`border-${component.id}`} className="text-xs">Border</Label>
          <Input
            id={`border-${component.id}`}
            value={commonStyles.border as string || ''}
            onChange={(e) => handleStyleChange('border', e.target.value)}
            placeholder="e.g., 1px solid #ccc"
            className="mt-1 h-8 text-xs"
          />
        </div>
      </div>


      {/* Type-specific props */}
      {component.type === 'Text' && (
        <>
          <Separator />
          <div className="space-y-3">
             <h4 className="text-md font-medium text-foreground mb-2">Text Content</h4>
            <div>
              <Label htmlFor={`textContent-${component.id}`} className="text-xs">Content</Label>
              <Textarea
                id={`textContent-${component.id}`}
                value={component.props.textContent || ''}
                onChange={(e) => handlePropChange('textContent', e.target.value)}
                className="mt-1 text-xs"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor={`fontSize-${component.id}`} className="text-xs">Font Size</Label>
              <Input
                id={`fontSize-${component.id}`}
                value={parsePx(commonStyles.fontSize)}
                onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
                type="number"
                className="mt-1 h-8 text-xs"
                placeholder="e.g. 16"
              />
            </div>
            <div>
              <Label htmlFor={`textColor-${component.id}`} className="text-xs">Text Color</Label>
              <Input
                id={`textColor-${component.id}`}
                type="color"
                value={commonStyles.color as string || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="mt-1 h-8 w-full p-0.5"
              />
            </div>
             <div>
                <Label htmlFor={`textAlign-${component.id}`} className="text-xs">Text Align</Label>
                <select
                    id={`textAlign-${component.id}`}
                    value={commonStyles.textAlign || 'left'}
                    onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                    className="w-full mt-1 h-8 text-xs border border-input bg-background rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                </select>
            </div>
          </div>
        </>
      )}

      {component.type === 'Button' && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-md font-medium text-foreground mb-2">Button Content & Style</h4>
            <div>
              <Label htmlFor={`buttonText-${component.id}`} className="text-xs">Button Text</Label>
              <Input
                id={`buttonText-${component.id}`}
                value={component.props.buttonText || ''}
                onChange={(e) => handlePropChange('buttonText', e.target.value)}
                className="mt-1 h-8 text-xs"
              />
            </div>
             <div>
              <Label htmlFor={`btnFontSize-${component.id}`} className="text-xs">Font Size</Label>
              <Input
                id={`btnFontSize-${component.id}`}
                value={parsePx(commonStyles.fontSize)}
                onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
                type="number"
                className="mt-1 h-8 text-xs"
                 placeholder="e.g. 14"
              />
            </div>
            <div>
              <Label htmlFor={`btnTextColor-${component.id}`} className="text-xs">Text Color</Label>
              <Input
                id={`btnTextColor-${component.id}`}
                type="color"
                value={commonStyles.color as string || '#ffffff'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                className="mt-1 h-8 w-full p-0.5"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

    