import { getTutorialsByLanguage, getAllTutorials } from '@/lib/tutorial-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function CSSLearnPage() {
  const tutorials = getAllTutorials('css');

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-4">Learn CSS</h1>
        <p className="text-lg text-muted-foreground">
          Master CSS from basics to advanced with our comprehensive tutorials.
        </p>
      </div>

      {/* Beginner Section */}
      {tutorials.beginner.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">Beginner</h2>
            <Badge variant="secondary">{tutorials.beginner.length} tutorials</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.beginner.map((tutorial) => (
              <Link
                key={tutorial.id}
                href={`/css/learn/${tutorial.level}/${tutorial.id}`}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Beginner
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>Interactive lesson</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Intermediate Section */}
      {tutorials.intermediate.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">Intermediate</h2>
            <Badge variant="secondary">{tutorials.intermediate.length} tutorials</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.intermediate.map((tutorial) => (
              <Link
                key={tutorial.id}
                href={`/css/learn/${tutorial.level}/${tutorial.id}`}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Intermediate
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tutorial.prerequisites.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Prerequisites: {tutorial.prerequisites.length} lesson(s)
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Advanced Section */}
      {tutorials.advanced.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-2xl font-bold">Advanced</h2>
            <Badge variant="secondary">{tutorials.advanced.length} tutorials</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.advanced.map((tutorial) => (
              <Link
                key={tutorial.id}
                href={`/css/learn/${tutorial.level}/${tutorial.id}`}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        Advanced
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{tutorial.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tutorial.prerequisites.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        Prerequisites: {tutorial.prerequisites.length} lesson(s)
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Summary */}
      <div className="bg-muted rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
        <div className="flex gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span>0/{tutorials.beginner.length + tutorials.intermediate.length + tutorials.advanced.length} tutorials completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}