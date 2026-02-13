import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { LANGUAGES, LanguageId } from './language-config';

export interface TutorialMetadata {
    id: string;
    language: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    title: string;
    description: string;
    duration: string;
    order: number;
    prerequisites: string[];
}

export interface Tutorial extends TutorialMetadata {
    content: string;
}

const contentDirectory = path.join(process.cwd(), 'src', 'content');

export function getTutorialsByLanguage(language: string, level?: string): Tutorial[] {
    const languageDir = path.join(contentDirectory, language, 'tutorials');

    if (!fs.existsSync(languageDir)) {
        return [];
    }

    const tutorials: Tutorial[] = [];
    const levels = level ? [level] : ['beginner', 'intermediate', 'advanced'];

    for (const lvl of levels) {
        const levelDir = path.join(languageDir, lvl);

        if (!fs.existsSync(levelDir)) {
            continue;
        }

        const files = fs.readdirSync(levelDir).filter(file => file.endsWith('.md'));

        for (const file of files) {
            const filePath = path.join(levelDir, file);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            const { data, content } = matter(fileContents);

            const id = (data.id as string) || file.replace(/\.md$/, '');
            const levelRaw = (data.level || data.difficulty || 'beginner') as string;
            const level = levelRaw.toLowerCase() as 'beginner' | 'intermediate' | 'advanced';

            tutorials.push({
                id,
                ...data as TutorialMetadata,
                level,
                content,
            });
        }
    }

    // Sort based on learningPath in config
    const config = LANGUAGES[language as LanguageId];
    if (config?.learningPath) {
        return tutorials.sort((a, b) => {
            // Find order in learning path
            // We need to check which level array to look in.
            // But here 'tutorials' contains mixed levels if no level arg?
            // Actually getTutorialsByLanguage is called with or without level.
            // If mixed, it's harder. But current usage in API (route.ts) calls getAllTutorials which calls this with specific level?
            // No, getAllTutorials (Line 93) calls this with specific level.

            // So 'a' and 'b' share a level (mostly). 
            // Better: Find the index of ID in the specific level list of learningPath.

            const levelA = a.level;
            const levelB = b.level;

            const listA = config.learningPath[levelA] || [];
            const listB = config.learningPath[levelB] || [];

            const indexA = listA.indexOf(a.id);
            const indexB = listB.indexOf(b.id);

            // If in list, use index. If not, use order field or Infinity
            const orderA = indexA !== -1 ? indexA : (a.order || 999);
            const orderB = indexB !== -1 ? indexB : (b.order || 999);

            return orderA - orderB;
        });
    }

    return tutorials.sort((a, b) => a.order - b.order);
}

export function getTutorial(language: string, level: string, id: string): Tutorial | null {
    const filePath = path.join(
        contentDirectory,
        language,
        'tutorials',
        level,
        `${id}.md`
    );

    if (!fs.existsSync(filePath)) {
        // Try finding by slug pattern
        const levelDir = path.join(contentDirectory, language, 'tutorials', level);
        const files = fs.readdirSync(levelDir).filter(file => file.includes(id));

        if (files.length === 0) {
            return null;
        }

        const fullPath = path.join(levelDir, files[0]);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        const levelRaw = (data.level || data.difficulty || 'beginner') as string;
        const levelNormalized = levelRaw.toLowerCase() as 'beginner' | 'intermediate' | 'advanced';

        return {
            id,
            ...data as TutorialMetadata,
            level: levelNormalized,
            content,
        };
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const levelRaw = (data.level || data.difficulty || 'beginner') as string;
    const levelNormalized = levelRaw.toLowerCase() as 'beginner' | 'intermediate' | 'advanced';

    return {
        id,
        ...data as TutorialMetadata,
        level: levelNormalized,
        content,
    };
}

export function getAllTutorials(language: string) {
    return {
        beginner: getTutorialsByLanguage(language, 'beginner'),
        intermediate: getTutorialsByLanguage(language, 'intermediate'),
        advanced: getTutorialsByLanguage(language, 'advanced'),
    };
}
