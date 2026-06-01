import { exampleRequests } from './endpoints';

interface ExampleRequestsProps {
    onSelect: (endpointId: string, params: Record<string, string>) => void;
}

const ExampleRequests = ({ onSelect }: ExampleRequestsProps) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
                Quick Examples
            </label>
            <div className="grid grid-cols-1 gap-2">
                {exampleRequests.map((example) => (
                    <button
                        key={example.id}
                        onClick={() => onSelect(example.endpointId, example.params)}
                        className="group flex items-start gap-3 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-emerald-500/20 transition-all duration-200 text-left"
                    >
                        <svg
                            className="w-4 h-4 mt-0.5 text-emerald-500/60 group-hover:text-emerald-400 transition-colors flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        <div className="min-w-0">
                            <span className="block text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                                {example.label}
                            </span>
                            <span className="block text-xs text-gray-600 truncate">
                                {example.description}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ExampleRequests;
