import { endpoints, categories } from './endpoints';

interface EndpointSelectorProps {
    selectedEndpointId: string;
    onSelect: (endpointId: string) => void;
}

const EndpointSelector = ({ selectedEndpointId, onSelect }: EndpointSelectorProps) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
                Endpoint
            </label>
            <select
                value={selectedEndpointId}
                onChange={(e) => onSelect(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-gray-200 font-mono text-sm focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all duration-200 outline-none appearance-none cursor-pointer"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '20px',
                }}
            >
                {categories.map((category) => (
                    <optgroup key={category} label={category}>
                        {endpoints
                            .filter((e) => e.category === category)
                            .map((endpoint) => (
                                <option key={endpoint.id} value={endpoint.id}>
                                    {endpoint.name}
                                </option>
                            ))}
                    </optgroup>
                ))}
            </select>
            {selectedEndpointId && (
                <p className="text-xs text-gray-500">
                    {endpoints.find((e) => e.id === selectedEndpointId)?.description}
                </p>
            )}
        </div>
    );
};

export default EndpointSelector;
