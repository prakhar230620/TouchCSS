"use client";

import { Rocket, TrendingUp, Sparkles, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getActiveLanguages } from "@/lib/language-config";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSelector } from "@/components/language-selector";
import { Logo } from "@/components/logo";

export default function HomePage() {
  const { currentLanguage, setLanguage, progress } = useLanguage();
  const activeLanguages = getActiveLanguages();

  return (
    <div className="space-y-16 sm:space-y-20 md:space-y-24">
      {/* Hero Section */}
      <header className="text-center py-10 sm:py-12 md:py-16">
        <div className="flex justify-center mb-6">
          <Logo size="xl" showText={false} />
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-primary mb-2">
          KeyCodeX
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-4">
          Unlock Your Coding Potential
        </p>
        <p className="mt-4 text-lg sm:text-xl leading-8 text-muted-foreground max-w-2xl mx-auto">
          Master programming languages with interactive tutorials, visual editors, and AI-powered learning.
        </p>

        {/* Quick Language Selector */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <LanguageSelector
            trigger={
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-primary/30 transition-all duration-300">
                <span className="text-2xl mr-2">{activeLanguages.find(l => l.id === currentLanguage)?.icon}</span>
                Choose Language
              </Button>
            }
          />
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
            <Link href={`/${currentLanguage}/learn`}>
              Start Learning <Rocket className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </header>

      {/* Available Languages */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Available Languages
            </h2>
            <p className="text-muted-foreground mt-2">
              Choose from {activeLanguages.length} programming languages
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeLanguages.map((lang) => (
            <Card
              key={lang.id}
              className={`rounded-2xl shadow-xl hover:shadow-primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1.5 cursor-pointer ${currentLanguage === lang.id ? 'ring-2 ring-primary' : ''
                }`}
              onClick={() => setLanguage(lang.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{lang.icon}</span>
                    <div>
                      <CardTitle className="text-2xl">{lang.displayName}</CardTitle>
                      {lang.popularity >= 8 && (
                        <Badge variant="secondary" className="mt-1 gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {lang.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Progress Bar */}
                {progress[lang.id] > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>Your Progress</span>
                      <span className="font-semibold">{progress[lang.id]}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300"
                        style={{ width: `${progress[lang.id]}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {lang.features.hasVisualEditor && (
                    <Badge variant="outline">Visual Editor</Badge>
                  )}
                  {lang.features.hasCodeRunner && (
                    <Badge variant="outline">Code Runner</Badge>
                  )}
                  {lang.features.hasAIExplainer && (
                    <Badge variant="outline">AI Explainer</Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/${lang.id}/learn`}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Learn
                    </Link>
                  </Button>
                  {(lang.features.hasVisualEditor || lang.features.hasCodeRunner) && (
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/${lang.id}/build`}>
                        <Target className="mr-2 h-4 w-4" />
                        Build
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl shadow-xl hover:shadow-accent/20 transition-all duration-300">
          <CardHeader>
            <BookOpen className="w-12 h-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Interactive Tutorials</CardTitle>
            <CardDescription>
              Step-by-step lessons with hands-on exercises and real-time feedback
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-accent/20 transition-all duration-300">
          <CardHeader>
            <Target className="w-12 h-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Visual Editors</CardTitle>
            <CardDescription>
              Build and experiment with visual tools designed for each language
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="rounded-2xl shadow-xl hover:shadow-accent/20 transition-all duration-300">
          <CardHeader>
            <Sparkles className="w-12 h-12 text-primary mb-4" />
            <CardTitle className="text-2xl">AI-Powered</CardTitle>
            <CardDescription>
              Get instant explanations, debugging help, and code reviews from AI
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 px-6 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of developers mastering programming languages with our interactive platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
            <Link href={`/${currentLanguage}/learn`}>
              <Rocket className="mr-2 h-5 w-5" />
              Start Learning {activeLanguages.find(l => l.id === currentLanguage)?.displayName}
            </Link>
          </Button>
          <LanguageSelector
            trigger={
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg">
                Browse All Languages
              </Button>
            }
          />
        </div>
      </section>
    </div>
  );
}
