'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import html from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker';
import go from 'react-syntax-highlighter/dist/esm/languages/prism/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/prism/rust';
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp';
import ruby from 'react-syntax-highlighter/dist/esm/languages/prism/ruby';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import swift from 'react-syntax-highlighter/dist/esm/languages/prism/swift';
import kotlin from 'react-syntax-highlighter/dist/esm/languages/prism/kotlin';
import scala from 'react-syntax-highlighter/dist/esm/languages/prism/scala';
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql';
import powershell from 'react-syntax-highlighter/dist/esm/languages/prism/powershell';
import lua from 'react-syntax-highlighter/dist/esm/languages/prism/lua';
import perl from 'react-syntax-highlighter/dist/esm/languages/prism/perl';
import objectivec from 'react-syntax-highlighter/dist/esm/languages/prism/objectivec';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

// Register all supported languages
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('py', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('shell', bash);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('xml', html);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('yml', yaml);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('md', markdown);
SyntaxHighlighter.registerLanguage('docker', docker);
SyntaxHighlighter.registerLanguage('go', go);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('c++', cpp);
SyntaxHighlighter.registerLanguage('c', cpp);
SyntaxHighlighter.registerLanguage('csharp', csharp);
SyntaxHighlighter.registerLanguage('c#', csharp);
SyntaxHighlighter.registerLanguage('ruby', ruby);
SyntaxHighlighter.registerLanguage('rb', ruby);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('swift', swift);
SyntaxHighlighter.registerLanguage('kotlin', kotlin);
SyntaxHighlighter.registerLanguage('kt', kotlin);
SyntaxHighlighter.registerLanguage('scala', scala);
SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('powershell', powershell);
SyntaxHighlighter.registerLanguage('ps1', powershell);
SyntaxHighlighter.registerLanguage('lua', lua);
SyntaxHighlighter.registerLanguage('perl', perl);
SyntaxHighlighter.registerLanguage('pl', perl);
SyntaxHighlighter.registerLanguage('objectivec', objectivec);
SyntaxHighlighter.registerLanguage('objc', objectivec);

interface ReadmeViewerProps {
  content: string;
  className?: string;
}

export function ReadmeViewer({ content, className }: ReadmeViewerProps) {
  const { theme } = useTheme();

  return (
    <div className={cn('markdown-body prose prose-sm dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { className: codeClassName, children, ...rest } = props;
            const match = /language-(\w+)/.exec(codeClassName || '');
            const language = match ? match[1] : '';
            const isInline = !match;
            
            if (!isInline && language) {
              return (
                <SyntaxHighlighter
                  // @ts-ignore - types mismatch
                  style={theme === 'dark' ? oneDark : oneLight}
                  language={language}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderRadius: '8px',
                    fontSize: '13px',
                  }}
                  {...rest}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            
            return (
              <code
                className={cn('px-1.5 py-0.5 rounded bg-muted font-mono text-sm', codeClassName)}
                {...rest}
              >
                {children}
              </code>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {children}
              </a>
            );
          },
          img({ src, alt }) {
            if (!src) return null;
            return (
              <img
                src={src}
                alt={alt || ''}
                className="max-w-full rounded-lg my-4"
                loading="lazy"
              />
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="w-full border-collapse">
                  {children}
                </table>
              </div>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="pl-4 border-l-4 border-muted-foreground/30 italic text-muted-foreground my-4">
                {children}
              </blockquote>
            );
          },
          h1({ children }) {
            return <h1 className="text-2xl font-bold mt-6 mb-4 pb-2 border-b">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-bold mt-6 mb-4 pb-2 border-b">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>;
          },
          h4({ children }) {
            return <h4 className="text-base font-semibold mt-4 mb-2">{children}</h4>;
          },
          ul({ children }) {
            return <ul className="list-disc pl-6 my-4 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 my-4 space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li className="my-1">{children}</li>;
          },
          p({ children }) {
            return <p className="my-4 leading-7">{children}</p>;
          },
          hr() {
            return <hr className="my-6 border-t border-border" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
