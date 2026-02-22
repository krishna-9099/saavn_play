import { Link } from 'react-router-dom';
import { colors } from '../../theme';

interface ApiCardProps {
    title: string;
    description: string;
    path: string;
    methods?: string[];
    className?: string;
}

const ApiCard = ({ title, description, path, methods = [], className = '' }: ApiCardProps) => {
    return (
        <Link to={path} className={`block card ${className}`}>
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                {methods.length > 0 && (
                    <div className="flex gap-2">
                        {methods.map((method) => (
                            <span
                                key={method}
                                className="px-2 py-0.5 text-xs font-medium rounded"
                                style={{
                                    backgroundColor: method === 'GET'
                                        ? `${colors.status.success}20`
                                        : method === 'POST'
                                            ? `${colors.status.info}20`
                                            : `${colors.status.warning}20`,
                                    color: method === 'GET'
                                        ? colors.status.success
                                        : method === 'POST'
                                            ? colors.status.info
                                            : colors.status.warning,
                                }}
                            >
                                {method}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <p className="text-gray-400 text-sm mb-3">{description}</p>
            <div className="flex items-center gap-2 text-primary-400 text-sm font-medium">
                <span>View documentation</span>
                <svg
                    className="w-4 h-4"
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
