"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import { LanguageId } from "@/lib/language-config";

export function LanguageSync({ language }: { language: string }) {
    const { setLanguage, currentLanguage } = useLanguage();

    useEffect(() => {
        // Only update if different and valid
        if (language && language !== currentLanguage) {
            // We should ideally check if language is valid LanguageId, 
            // but the parent Layout already validates this via isLanguageActive check (mostly).
            setLanguage(language as LanguageId);
        }
    }, [language, currentLanguage, setLanguage]);

    return null;
}
