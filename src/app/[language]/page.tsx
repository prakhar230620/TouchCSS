import { redirect } from "next/navigation";

export async function generateStaticParams() {
    return [
        { language: 'css' },
        { language: 'javascript' },
        { language: 'html' },
        { language: 'python' },
        { language: 'c' },
        { language: 'java' },
        { language: 'cpp' }
    ];
}

export default async function LanguageRootPage({ params }: { params: Promise<{ language: string }> }) {
    const { language } = await params;
    redirect(`/${language}/learn`);
}
