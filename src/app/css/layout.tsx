import { notFound } from 'next/navigation';
import { LanguageId, getLanguage, isLanguageActive } from '@/lib/language-config';

export default function CSSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const languageId: LanguageId = 'css';

    if (!isLanguageActive(languageId)) {
        notFound();
    }

    const langConfig = getLanguage(languageId);

    return (
        <div className="space-y-6">
            {/* Language Header */}
            <div className="flex items-center gap-4 pb-4 border-b">
                <span className="text-4xl">{langConfig.icon}</span>
                <div>
                    <h1 className="text-3xl font-bold">{langConfig.displayName}</h1>
                    <p className="text-muted-foreground">{langConfig.description}</p>
                </div>
            </div>

            {/* Content */}
            <div>{children}</div>
        </div>
    );
}
