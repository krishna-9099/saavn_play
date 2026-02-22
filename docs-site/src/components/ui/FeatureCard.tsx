import { ReactNode } from 'react';
import { colors } from '../../theme';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
}

const FeatureCard = ({ icon, title, description, className = '' }: FeatureCardProps) => {
    return (
        <div className={`card ${className}`}>
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${colors.primary[500]}20` }}
            >
                <div style={{ color: colors.primary[400] }}>
                    {icon}
                </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
};

export default FeatureCard;
