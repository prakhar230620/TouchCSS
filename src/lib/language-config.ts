/**
 * Language Configuration System
 * Central configuration for all supported programming languages
 */

export type LanguageId = 'css' | 'javascript' | 'python' | 'java' | 'cpp' | 'c' | 'r' | 'typescript' | 'sql' | 'html';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface LanguageFeatures {
    hasVisualEditor: boolean;
    hasREPL: boolean;
    hasCodeRunner: boolean;
    hasSyntaxHighlighting: boolean;
    hasAIExplainer: boolean;
}

export interface LearningPath {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
}

export interface LanguageResources {
    officialDocs: string;
    playground?: string;
    tutorial?: string;
    cheatSheet?: string;
}

export interface LanguageConfig {
    id: LanguageId;
    name: string;
    displayName: string;
    description: string;
    icon: string; // emoji or icon name
    color: string; // hex color for theme
    bgGradient: string; // gradient for cards
    fileExtensions: string[];
    features: LanguageFeatures;
    learningPath: LearningPath;
    resources: LanguageResources;
    popularity: number; // 1-10 for sorting
    isActive: boolean; // for phased rollout
}

export const LANGUAGES: Record<LanguageId, LanguageConfig> = {
    css: {
        id: 'css',
        name: 'css',
        displayName: 'CSS',
        description: 'Style the web with Cascading Style Sheets',
        icon: '🎨',
        color: '#264de4',
        bgGradient: 'from-blue-500 to-purple-600',
        fileExtensions: ['.css', '.scss', '.sass', '.less'],
        features: {
            hasVisualEditor: true,
            hasREPL: false,
            hasCodeRunner: true,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-css', 'selectors-basics', 'box-model', 'colors-typography', 'display-positioning'],
            intermediate: ['flexbox', 'css-grid', 'transitions-transforms', 'animations', 'responsive-design'],
            advanced: ['custom-properties', 'container-queries', 'advanced-selectors'],
        },
        resources: {
            officialDocs: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
            playground: 'https://codepen.io/',
            cheatSheet: 'https://cssreference.io/',
        },
        popularity: 9,
        isActive: true,
    },

    javascript: {
        id: 'javascript',
        name: 'javascript',
        displayName: 'JavaScript',
        description: 'The language of the web - interactive and dynamic',
        icon: '⚡',
        color: '#f7df1e',
        bgGradient: 'from-yellow-400 to-orange-500',
        fileExtensions: ['.js', '.mjs', '.cjs'],
        features: {
            hasVisualEditor: true,
            hasREPL: true,
            hasCodeRunner: true,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-javascript', 'variables-datatypes', 'operators-expressions', 'conditionals', 'loops', 'functions-basics', 'arrays', 'objects-basics'],
            intermediate: ['dom-manipulation', 'events', 'array-methods', 'async-basics', 'fetch-api', 'es6-features', 'modules'],
            advanced: ['closures-scope', 'prototypes-classes', 'advanced-async', 'error-handling', 'performance'],
        },
        resources: {
            officialDocs: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
            playground: 'https://jsfiddle.net/',
            tutorial: 'https://javascript.info/',
        },
        popularity: 10,
        isActive: true,
    },

    python: {
        id: 'python',
        name: 'python',
        displayName: 'Python',
        description: 'Simple, powerful, and beginner-friendly',
        icon: '🐍',
        color: '#3776ab',
        bgGradient: 'from-blue-600 to-green-500',
        fileExtensions: ['.py', '.pyw', '.pyi'],
        features: {
            hasVisualEditor: true,
            hasREPL: true,
            hasCodeRunner: true,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-python', 'variables-types', 'control-flow', 'functions'],
            intermediate: ['oop-basics', 'file-handling', 'modules', 'error-handling'],
            advanced: ['decorators', 'generators', 'async-python', 'testing'],
        },
        resources: {
            officialDocs: 'https://docs.python.org/3/',
            playground: 'https://www.python.org/shell/',
            tutorial: 'https://docs.python.org/3/tutorial/',
        },
        popularity: 9,
        isActive: true,
    },

    html: {
        id: 'html',
        name: 'html',
        displayName: 'HTML',
        description: 'Structure the web with HyperText Markup Language',
        icon: '📄',
        color: '#e34c26',
        bgGradient: 'from-orange-500 to-red-600',
        fileExtensions: ['.html', '.htm'],
        features: {
            hasVisualEditor: true,
            hasREPL: true,
            hasCodeRunner: true,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-html', 'basic-tags', 'forms', 'semantic-html'],
            intermediate: ['html5-apis', 'accessibility', 'seo-basics'],
            advanced: ['microdata', 'web-components', 'canvas'],
        },
        resources: {
            officialDocs: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
            cheatSheet: 'https://htmlreference.io/',
        },
        popularity: 8,
        isActive: true, // Activated
    },

    typescript: {
        id: 'typescript',
        name: 'typescript',
        displayName: 'TypeScript',
        description: 'JavaScript with types for safer code',
        icon: '📘',
        color: '#3178c6',
        bgGradient: 'from-blue-600 to-indigo-700',
        fileExtensions: ['.ts', '.tsx'],
        features: {
            hasVisualEditor: false,
            hasREPL: true,
            hasCodeRunner: true,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-ts', 'basic-types', 'interfaces', 'functions'],
            intermediate: ['generics', 'advanced-types', 'modules'],
            advanced: ['decorators', 'compiler-api', 'best-practices'],
        },
        resources: {
            officialDocs: 'https://www.typescriptlang.org/docs/',
            playground: 'https://www.typescriptlang.org/play',
        },
        popularity: 8,
        isActive: false, // Phase 2
    },

    sql: {
        id: 'sql',
        name: 'sql',
        displayName: 'SQL',
        description: 'Query and manage databases',
        icon: '🗄️',
        color: '#00758f',
        bgGradient: 'from-cyan-600 to-blue-700',
        fileExtensions: ['.sql'],
        features: {
            hasVisualEditor: true,
            hasREPL: true,
            hasCodeRunner: true,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-sql', 'select-queries', 'filtering', 'joins'],
            intermediate: ['aggregations', 'subqueries', 'indexes'],
            advanced: ['optimization', 'transactions', 'stored-procedures'],
        },
        resources: {
            officialDocs: 'https://www.postgresql.org/docs/',
            tutorial: 'https://www.sqltutorial.org/',
        },
        popularity: 7,
        isActive: false, // Phase 2
    },

    java: {
        id: 'java',
        name: 'java',
        displayName: 'Java',
        description: 'Enterprise-grade object-oriented programming',
        icon: '☕',
        color: '#b07219',
        bgGradient: 'from-orange-600 to-red-700',
        fileExtensions: ['.java'],
        features: {
            hasVisualEditor: false,
            hasREPL: false,
            hasCodeRunner: false,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-java', 'variables-types', 'oop-basics', 'methods'],
            intermediate: ['inheritance', 'interfaces', 'collections', 'exceptions'],
            advanced: ['multithreading', 'streams', 'design-patterns'],
        },
        resources: {
            officialDocs: 'https://docs.oracle.com/en/java/',
            tutorial: 'https://docs.oracle.com/javase/tutorial/',
        },
        popularity: 8,
        isActive: false, // Phase 3
    },

    cpp: {
        id: 'cpp',
        name: 'cpp',
        displayName: 'C++',
        description: 'High-performance systems programming',
        icon: '⚙️',
        color: '#00599c',
        bgGradient: 'from-blue-700 to-indigo-800',
        fileExtensions: ['.cpp', '.cc', '.cxx', '.hpp', '.h'],
        features: {
            hasVisualEditor: true,
            hasREPL: true,
            hasCodeRunner: true,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-cpp', 'variables-types', 'control-flow', 'functions'],
            intermediate: ['pointers', 'oop-cpp', 'stl', 'templates'],
            advanced: ['memory-management', 'move-semantics', 'modern-cpp'],
        },
        resources: {
            officialDocs: 'https://en.cppreference.com/',
            tutorial: 'https://www.learncpp.com/',
        },
        popularity: 7,
        isActive: true, // Activated
    },

    c: {
        id: 'c',
        name: 'c',
        displayName: 'C',
        description: 'The foundation of modern programming',
        icon: '🔧',
        color: '#555555',
        bgGradient: 'from-gray-600 to-gray-800',
        fileExtensions: ['.c', '.h'],
        features: {
            hasVisualEditor: true,
            hasREPL: true,
            hasCodeRunner: true,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-c', 'variables-types', 'control-flow', 'functions'],
            intermediate: ['pointers', 'arrays', 'strings', 'structures'],
            advanced: ['memory-management', 'file-io', 'preprocessor'],
        },
        resources: {
            officialDocs: 'https://en.cppreference.com/',
            tutorial: 'https://www.learn-c.org/',
        },
        popularity: 6,
        isActive: true, // Activated
    },

    r: {
        id: 'r',
        name: 'r',
        displayName: 'R',
        description: 'Statistical computing and data analysis',
        icon: '📊',
        color: '#276dc3',
        bgGradient: 'from-blue-500 to-cyan-600',
        fileExtensions: ['.r', '.R', '.Rmd'],
        features: {
            hasVisualEditor: false,
            hasREPL: true,
            hasCodeRunner: false,
            hasSyntaxHighlighting: true,
            hasAIExplainer: true,
        },
        learningPath: {
            beginner: ['intro-to-r', 'data-types', 'vectors-lists', 'functions'],
            intermediate: ['data-frames', 'ggplot2', 'dplyr', 'tidyverse'],
            advanced: ['statistical-modeling', 'shiny', 'r-packages'],
        },
        resources: {
            officialDocs: 'https://www.r-project.org/other-docs.html',
            tutorial: 'https://www.datacamp.com/courses/free-introduction-to-r',
        },
        popularity: 6,
        isActive: false, // Phase 3
    },
};

// Helper functions
export function getLanguage(id: LanguageId): LanguageConfig {
    return LANGUAGES[id];
}

export function getAllLanguages(): LanguageConfig[] {
    return Object.values(LANGUAGES);
}

export function getActiveLanguages(): LanguageConfig[] {
    return getAllLanguages()
        .filter((lang) => lang.isActive)
        .sort((a, b) => b.popularity - a.popularity);
}

export function getLanguagesByPopularity(): LanguageConfig[] {
    return getAllLanguages().sort((a, b) => b.popularity - a.popularity);
}

export function isLanguageActive(id: LanguageId): boolean {
    return LANGUAGES[id].isActive;
}

export function getLanguageColor(id: LanguageId): string {
    return LANGUAGES[id].color;
}

export function getLanguageIcon(id: LanguageId): string {
    return LANGUAGES[id].icon;
}
