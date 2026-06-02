import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <GlassCard className="p-12 text-center max-w-lg mx-auto">
        <div className="mb-8">
          <span className="text-8xl font-bold text-emerald-500/20 animate-pulse select-none">
            404
          </span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium hover:bg-emerald-500/30 hover:border-emerald-400/50 transition-all duration-200"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate('/api-reference')}
            className="px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-300 font-medium hover:bg-white/[0.1] hover:text-white transition-all duration-200"
          >
            API Reference
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default NotFound;
