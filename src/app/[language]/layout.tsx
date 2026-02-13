
import { notFound } from 'next/navigation';
import { LanguageId, getLanguage, isLanguageActive } from '@/lib/language-config';
import { LanguageSync } from '@/components/language-sync';

export async function generateStaticParams() {
    return [
        { language: 'css' },
        { language: 'javascript' },
        { language: 'html' },
        { language: 'python' },
        { language: 'c' },
        { language: 'cpp' },
    ];
}

export default async function LanguageLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ language: string }>;
}) {
    const { language } = await params;
    const languageId = language as LanguageId;

    // Check if language exists and isactive
    if (!isLanguageActive(languageId)) {
        notFound();
    }

    const langConfig = getLanguage(languageId);

    return (
        <div className="space-y-6">
            <LanguageSync language={languageId} />

            {/* Language Header with Playground Link */}
            <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-4">
                    <span className="text-4xl">{langConfig.icon}</span>
                    <div>
                        <h1 className="text-3xl font-bold">{langConfig.displayName}</h1>
                        <p className="text-muted-foreground">{langConfig.description}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div>{children}</div>
        </div>
    );
}

// Note: I modified header to remove hardcoded structure if needed,
// but actually I should keep it consistent.
