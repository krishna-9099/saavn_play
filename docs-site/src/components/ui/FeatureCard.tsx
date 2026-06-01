import { ReactNode } from 'react';

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    className?: string;
}

const FeatureCard = ({ icon, title, description, className = '' }: FeatureCardProps) => {
    return (
        <div
            className={`relative rounded-2xl bg-white/[0.05] backdrop-blur-[10px] border border-white/[0.1] p-6 transition-all duration-300 hover:bg-white/[0.08] hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 hover:scale-[1.03] group ${className}`}
        >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/20">
                <div className="text-emerald-400">
                    {icon}
                </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
};

export default FeatureCard;
