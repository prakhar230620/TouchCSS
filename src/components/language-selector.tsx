"use client";

import { useState } from 'react';
import { Check, Search, TrendingUp } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getActiveLanguages, LanguageConfig, LanguageId } from '@/lib/language-config';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
    trigger?: React.ReactNode;
    showInactive?: boolean;
}

export function LanguageSelector({ trigger, showInactive = false }: LanguageSelectorProps) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { currentLanguage, setLanguage, progress } = useLanguage();

    const languages = getActiveLanguages();

    const filteredLanguages = languages.filter((lang) =>
        lang.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectLanguage = (languageId: LanguageId) => {
        setLanguage(languageId);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" className="gap-2">
                        <span className="text-lg">{getActiveLanguages().find(l => l.id === currentLanguage)?.icon}</span>
                        Switch Language
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Choose a Language</DialogTitle>
                    <DialogDescription>
                        Select a programming language to learn and build with
                    </DialogDescription>
                </DialogHeader>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search languages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Language Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[50vh] py-2">
                    {filteredLanguages.map((lang) => (
                        <LanguageCard
                            key={lang.id}
                            language={lang}
                            isSelected={lang.id === currentLanguage}
                            progress={progress[lang.id] || 0}
                            onSelect={handleSelectLanguage}
                        />
                    ))}
                </div>

                {filteredLanguages.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No languages found matching "{searchQuery}"
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

interface LanguageCardProps {
    language: LanguageConfig;
    isSelected: boolean;
    progress: number;
    onSelect: (id: LanguageId) => void;
}

function LanguageCard({ language, isSelected, progress, onSelect }: LanguageCardProps) {
    return (
        <button
            onClick={() => onSelect(language.id)}
            className={cn(
                "relative p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-[1.02]",
                isSelected
                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50 bg-card"
            )}
        >
            {/* Selected Indicator */}
            {isSelected && (
                <div className="absolute top-2 right-2">
                    <Check className="h-5 w-5 text-primary" />
                </div>
            )}

            {/* Language Icon & Name */}
            <div className="flex items-start gap-3 mb-2">
                <span className="text-3xl">{language.icon}</span>
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">{language.displayName}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {language.description}
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            {progress > 0 && (
                <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Popularity Badge */}
            {language.popularity >= 8 && (
                <Badge variant="secondary" className="mt-2 gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Popular
                </Badge>
            )}
        </button>
    );
}
