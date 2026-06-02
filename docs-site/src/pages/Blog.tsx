import { Link } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { blogPosts } from '../data/blogPosts';

const Blog = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">
          <span className="text-emerald-500">Blog</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Tutorials, updates, and insights about saavn_play
        </p>
      </div>

      <div className="grid gap-6">
        {blogPosts.map((post, index) => (
          <Link key={post.id} to={`/blog/${post.id}`}>
            <GlassCard className="p-6 group">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <time className="text-gray-500 text-sm">
                      {formatDate(post.date)}
                    </time>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                    {index === 0 && (
                      <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                        Latest
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-200">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-white/5 text-gray-400 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-500 group-hover:text-emerald-400 transition-colors duration-200">
                  <span className="text-sm hidden sm:block">Read</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
