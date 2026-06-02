import { useState, useCallback } from 'react';
import GlassCard from './GlassCard';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    className?: string;
}

const FAQ = ({ items, className = '' }: FAQProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = useCallback((index: number) => {
        setOpenIndex(prev => prev === index ? null : index);
    }, []);

    return (
        <div className={`space-y-4 ${className}`}>
            {items.map((item, index) => (
                <GlassCard key={index} hover={false} className="overflow-hidden">
                    <button
                        onClick={() => toggleItem(index)}
                        className="w-full flex items-center justify-between p-6 text-left"
                        aria-expanded={openIndex === index}
                    >
                        <span className="text-lg font-semibold text-white pr-4">
                            {item.question}
                        </span>
                        <svg
                            className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform duration-300 ${
                                openIndex === index ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    <div
                        className={`transition-all duration-300 ease-in-out ${
                            openIndex === index
                                ? 'max-h-96 opacity-100'
                                : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                            {item.answer}
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
    );
};

export default FAQ;
