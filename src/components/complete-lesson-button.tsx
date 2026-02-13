"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Play } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { LanguageId } from "@/lib/language-config";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface CompleteLessonButtonProps {
    languageId: string;
    lessonId: string;
}

export function CompleteLessonButton({ languageId, lessonId }: CompleteLessonButtonProps) {
    const { markLessonComplete, completedLessons } = useLanguage();
    const router = useRouter();

    const isCompleted = completedLessons[languageId as LanguageId]?.includes(lessonId);

    const handleComplete = () => {
        markLessonComplete(languageId as LanguageId, lessonId);
        toast({
            title: "Lesson Completed! 🎉",
            description: "Progress saved locally.",
        });
        router.push(`/${languageId}/learn`);
    };

    return (
        <Button onClick={handleComplete} variant={isCompleted ? "outline" : "default"} size="lg">
            {isCompleted ? (
                <>
                    Completed
                    <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
                </>
            ) : (
                <>
                    Mark as Complete
                    <CheckCircle className="ml-2 h-5 w-5" />
                </>
            )}
        </Button>
    );
}
