"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useRef, useEffect, useState } from "react";

interface MonacoEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
    language?: string;
    readOnly?: boolean;
}

export function MonacoEditor({ value, onChange, language = "javascript", readOnly = false }: MonacoEditorProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Wait for mount to access theme
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="h-full w-full bg-muted animate-pulse" />;

    return (
        <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            value={value}
            onChange={onChange}
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                readOnly,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
            }}
        />
    );
}
