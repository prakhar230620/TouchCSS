"use client";

import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '@/components/code-block';

interface TutorialContentProps {
    content: string;
}

export function TutorialContent({ content }: TutorialContentProps) {
    return (
        <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20">
            <ReactMarkdown
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-3xl font-bold mt-12 mb-6 pb-3 border-b">{children}</h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>
                    ),
                    h4: ({ children }) => (
                        <h4 className="text-lg font-semibold mt-6 mb-2">{children}</h4>
                    ),
                    p: ({ children }) => (
                        <p className="mb-6 leading-8 text-foreground/90">{children}</p>
                    ),
                    code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !match;

                        if (isInline) {
                            return (
                                <code className="bg-muted px-2 py-1 rounded text-sm font-mono border border-border" {...props}>
                                    {children}
                                </code>
                            );
                        }

                        return (
                            <CodeBlock className={className} language={match?.[1]}>
                                {String(children).replace(/\n$/, '')}
                            </CodeBlock>
                        );
                    },
                    pre: ({ children }) => <>{children}</>,
                    ul: ({ children }) => (
                        <ul className="list-disc list-outside ml-6 mb-6 space-y-3">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal list-outside ml-6 mb-6 space-y-3">{children}</ol>
                    ),
                    li: ({ children }) => (
                        <li className="leading-7 text-foreground/90">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary/50 pl-6 py-2 my-6 italic bg-muted/30 rounded-r">
                            {children}
                        </blockquote>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-8 rounded-lg border border-border">
                            <table className="min-w-full divide-y divide-border">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-muted/50">{children}</thead>
                    ),
                    th: ({ children }) => (
                        <th className="px-6 py-3 text-left text-sm font-semibold">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="px-6 py-4 text-sm border-t border-border">{children}</td>
                    ),
                    hr: () => <hr className="my-12 border-border" />,
                    strong: ({ children }) => (
                        <strong className="font-bold text-foreground">{children}</strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic text-foreground/90">{children}</em>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}
