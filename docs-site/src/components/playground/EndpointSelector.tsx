import { useState, useRef, useEffect } from 'react';
import { endpoints, categories } from './endpoints';

interface EndpointSelectorProps {
    selectedEndpointId: string;
    onSelect: (endpointId: string) => void;
}

const EndpointSelector = ({ selectedEndpointId, onSelect }: EndpointSelectorProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedEndpoint = endpoints.find((e) => e.id === selectedEndpointId);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (endpointId: string) => {
        onSelect(endpointId);
        setIsOpen(false);
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
                Endpoint
            </label>
            <div ref={dropdownRef} className="relative">
                {/* Trigger button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-200 font-mono text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 outline-none cursor-pointer text-left flex items-center justify-between"
                >
                    <span className="truncate">
                        {selectedEndpoint ? selectedEndpoint.name : 'Select endpoint...'}
                    </span>
                    <svg
                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 rounded-xl bg-[#1a1a2e] border border-white/[0.1] shadow-2xl shadow-black/50 overflow-hidden">
                        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                            {categories.map((category) => {
                                const categoryEndpoints = endpoints.filter((e) => e.category === category);
                                if (categoryEndpoints.length === 0) return null;

                                return (
                                    <div key={category}>
                                        {/* Category header */}
                                        <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.05]">
                                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                                                {category}
                                            </span>
                                        </div>

                                        {/* Endpoint options */}
                                        {categoryEndpoints.map((endpoint) => {
                                            const isSelected = endpoint.id === selectedEndpointId;
                                            return (
                                                <button
                                                    key={endpoint.id}
                                                    type="button"
                                                    onClick={() => handleSelect(endpoint.id)}
                                                    className={`w-full px-4 py-2.5 text-left transition-all duration-150 flex flex-col gap-1 ${
                                                        isSelected
                                                            ? 'bg-emerald-500/10 text-emerald-400'
                                                            : 'text-gray-300 hover:bg-white/[0.05] hover:text-white'
                                                    }`}
                                                >
                                                    <span className={`text-sm font-medium ${isSelected ? 'text-emerald-400' : 'text-gray-200'}`}>
                                                        {endpoint.name}
                                                    </span>
                                                    <span className="text-xs text-gray-500 truncate">
                                                        {endpoint.description}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            {selectedEndpoint && (
                <p className="text-xs text-gray-500">
                    {selectedEndpoint.description}
                </p>
            )}
        </div>
    );
};

export default EndpointSelector;
