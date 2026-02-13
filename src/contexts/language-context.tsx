"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageId, getLanguage, LanguageConfig } from '@/lib/language-config';

interface LanguageContextType {
    currentLanguage: LanguageId;
    languageConfig: LanguageConfig;
    setLanguage: (language: LanguageId) => void;
    progress: Record<LanguageId, number>; // 0-100 percentage
    updateProgress: (language: LanguageId, progress: number) => void;
    completedLessons: Record<LanguageId, string[]>;
    markLessonComplete: (language: LanguageId, lessonId: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'codeStudio_currentLanguage';
const PROGRESS_KEY = 'codeStudio_progress';

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<LanguageId>('css');
    const [progress, setProgress] = useState<Record<LanguageId, number>>({} as Record<LanguageId, number>);

    // Load saved language and progress from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem(STORAGE_KEY) as LanguageId;
            if (savedLanguage) {
                setCurrentLanguage(savedLanguage);
            }

            const savedProgress = localStorage.getItem(PROGRESS_KEY);
            if (savedProgress) {
                try {
                    setProgress(JSON.parse(savedProgress));
                } catch (e) {
                    console.error('Failed to parse saved progress:', e);
                }
            }
        }
    }, []);

    const setLanguage = (language: LanguageId) => {
        setCurrentLanguage(language);
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, language);
        }
    };

    const updateProgress = (language: LanguageId, newProgress: number) => {
        const updatedProgress = {
            ...progress,
            [language]: Math.min(100, Math.max(0, newProgress)),
        };
        setProgress(updatedProgress);

        if (typeof window !== 'undefined') {
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));
        }
    };

    // New: Track specific completed lessons
    const [completedLessons, setCompletedLessons] = useState<Record<LanguageId, string[]>>({} as any);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('codeStudio_completedLessons');
            if (saved) {
                try {
                    setCompletedLessons(JSON.parse(saved));
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }, []);

    const markLessonComplete = (language: LanguageId, lessonId: string) => {
        const currentList = completedLessons[language] || [];
        if (!currentList.includes(lessonId)) {
            const newList = [...currentList, lessonId];
            const updated = { ...completedLessons, [language]: newList };
            setCompletedLessons(updated);
            if (typeof window !== 'undefined') {
                localStorage.setItem('codeStudio_completedLessons', JSON.stringify(updated));
            }
        }
    };

    const languageConfig = getLanguage(currentLanguage);

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                languageConfig,
                setLanguage,
                progress,
                updateProgress,
                completedLessons,
                markLessonComplete,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
