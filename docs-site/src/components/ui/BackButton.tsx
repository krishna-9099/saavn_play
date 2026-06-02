import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/') {
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [location.pathname]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleBack}
      className={`
        fixed bottom-6 left-6 z-40
        w-12 h-12 rounded-full
        flex items-center justify-center
        bg-white/[0.05] backdrop-blur-xl
        border border-white/[0.1]
        text-gray-400
        shadow-lg shadow-black/20
        hover:bg-white/[0.1] hover:border-emerald-500/30 hover:text-emerald-400
        hover:shadow-emerald-500/10 hover:scale-110
        active:scale-95
        transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Go back"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>
  );
};

export default BackButton;
