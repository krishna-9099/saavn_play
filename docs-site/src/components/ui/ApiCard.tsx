import { Link } from 'react-router-dom';

interface ApiCardProps {
    title: string;
    description: string;
    path: string;
    methods?: string[];
    className?: string;
}

const ApiCard = ({ title, description, path, methods = [], className = '' }: ApiCardProps) => {
    return (
        <Link
            to={path}
            className={`block relative rounded-2xl p-6
                bg-white/[0.05] backdrop-blur-md
                border border-white/[0.08]
                shadow-lg shadow-black/20
                transition-all duration-300
                hover:scale-[1.02] hover:bg-white/[0.08]
                hover:border-emerald-500/30 hover:shadow-emerald-500/10 hover:shadow-xl
                group ${className}`}
        >
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    {title}
                </h3>
                {methods.length > 0 && (
                    <div className="flex gap-2">
                        {methods.map((method) => (
                            <span
                                key={method}
                                className="px-2 py-0.5 text-xs font-medium rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            >
                                {method}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <p className="text-gray-400 text-sm mb-4">{description}</p>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium group-hover:text-emerald-300 transition-colors">
                <span>View documentation</span>
                <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
        </Link>
    );
};

export default ApiCard;
