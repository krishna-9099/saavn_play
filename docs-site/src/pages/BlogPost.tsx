import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { blogPosts } from '../data/blogPosts';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="space-y-8">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${post.title} - saavn_play Blog`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentCodeBlock: string[] | null = null;
    let codeLanguage = '';

    const processInlineCode = (text: string) => {
      const parts = text.split(/(`[^`]+`)/);
      return parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={i}
              className="px-2 py-0.5 bg-white/10 text-emerald-400 rounded text-sm font-mono"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      });
    };

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (currentCodeBlock === null) {
          currentCodeBlock = [];
          codeLanguage = line.slice(3).trim();
        } else {
          elements.push(
            <div key={`code-${index}`} className="my-4">
              {codeLanguage && (
                <div className="px-4 py-2 bg-white/5 text-gray-500 text-xs font-mono rounded-t-xl border-b border-white/10">
                  {codeLanguage}
                </div>
              )}
              <pre className="p-4 bg-black/30 rounded-b-xl overflow-x-auto">
                <code className="text-sm font-mono text-gray-300">
                  {currentCodeBlock.join('\n')}
                </code>
              </pre>
            </div>
          );
          currentCodeBlock = null;
          codeLanguage = '';
        }
        return;
      }

      if (currentCodeBlock !== null) {
        currentCodeBlock.push(line);
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1
            key={index}
            className="text-3xl font-bold text-white mt-8 mb-4"
          >
            {processInlineCode(line.slice(2))}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={index}
            className="text-2xl font-semibold text-white mt-8 mb-4 pb-2 border-b border-white/10"
          >
            {processInlineCode(line.slice(3))}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={index}
            className="text-xl font-semibold text-white mt-6 mb-3"
          >
            {processInlineCode(line.slice(4))}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li
            key={index}
            className="ml-6 text-gray-300 list-disc"
          >
            {processInlineCode(line.slice(2))}
          </li>
        );
      } else if (line.match(/^\d+\. /)) {
        const content = line.replace(/^\d+\. /, '');
        elements.push(
          <li
            key={index}
            className="ml-6 text-gray-300 list-decimal"
          >
            {processInlineCode(content)}
          </li>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={index} className="h-4" />);
      } else {
        elements.push(
          <p key={index} className="text-gray-300 leading-relaxed mb-4">
            {processInlineCode(line)}
          </p>
        );
      }
    });

    return elements;
  };

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors duration-200 mb-6"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </button>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <time className="text-gray-500 text-sm">
            {formatDate(post.date)}
          </time>
          <span className="text-gray-600">•</span>
          <span className="text-gray-500 text-sm">{post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <span className="text-emerald-400 font-semibold">
                {post.author.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-white font-medium">{post.author}</p>
              <p className="text-gray-500 text-sm">Author</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <GlassCard className="p-6 sm:p-8">
        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </div>
      </GlassCard>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="text-gray-400 font-medium">Share this post:</span>
        <div className="flex gap-3">
          <button
            onClick={shareOnTwitter}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                <GlassCard className="p-5 h-full group">
                  <time className="text-gray-500 text-sm block mb-2">
                    {formatDate(relatedPost.date)}
                  </time>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-200">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
