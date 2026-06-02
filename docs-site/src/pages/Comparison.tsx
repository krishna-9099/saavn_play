import { useMemo } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ComparisonFeature {
    feature: string;
    saavn_play: string | boolean;
    jiosaavn_api: string | boolean;
    saavn_api: string | boolean;
}

const Comparison = () => {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.1 });
    const { ref: tableRef, isVisible: tableVisible } = useScrollAnimation({ threshold: 0.1 });
    const { ref: prosRef, isVisible: prosVisible } = useScrollAnimation({ threshold: 0.1 });

    const features: ComparisonFeature[] = useMemo(() => [
        { feature: 'Language', saavn_play: 'Dart', jiosaavn_api: 'Python', saavn_api: 'Node.js' },
        { feature: 'Type Safety', saavn_play: true, jiosaavn_api: false, saavn_api: false },
        { feature: 'Search Songs', saavn_play: true, jiosaavn_api: true, saavn_api: true },
        { feature: 'Search Albums', saavn_play: true, jiosaavn_api: true, saavn_api: true },
        { feature: 'Search Artists', saavn_play: true, jiosaavn_api: true, saavn_api: true },
        { feature: 'Search Playlists', saavn_play: true, jiosaavn_api: true, saavn_api: false },
        { feature: 'Song Lyrics', saavn_play: true, jiosaavn_api: true, saavn_api: false },
        { feature: 'Download URLs', saavn_play: true, jiosaavn_api: true, saavn_api: true },
        { feature: 'Home Feed', saavn_play: true, jiosaavn_api: false, saavn_api: false },
        { feature: 'Radio Stations', saavn_play: true, jiosaavn_api: false, saavn_api: false },
        { feature: 'Podcast Support', saavn_play: true, jiosaavn_api: false, saavn_api: false },
        { feature: 'Recommendations', saavn_play: true, jiosaavn_api: false, saavn_api: false },
        { feature: 'Trending Content', saavn_play: true, jiosaavn_api: true, saavn_api: true },
        { feature: 'Pagination Support', saavn_play: true, jiosaavn_api: true, saavn_api: true },
        { feature: 'Error Handling', saavn_play: 'Comprehensive', jiosaavn_api: 'Basic', saavn_api: 'Basic' },
        { feature: 'Documentation', saavn_play: 'Extensive', jiosaavn_api: 'Minimal', saavn_api: 'Moderate' },
        { feature: 'Flutter Support', saavn_play: true, jiosaavn_api: false, saavn_api: false },
        { feature: 'Active Maintenance', saavn_play: true, jiosaavn_api: false, saavn_api: false },
    ], []);

    const pros = useMemo(() => [
        {
            title: 'saavn_play',
            items: [
                'Full type safety with Dart',
                'Comprehensive API coverage',
                'Flutter & Dart support',
                'Extensive documentation',
                'Active development',
                'Modern async/await patterns',
            ],
            isPrimary: true,
        },
        {
            title: 'jiosaavn_api (Python)',
            items: [
                'Python ecosystem',
                'Simple setup',
                'Good for scripts',
            ],
            isPrimary: false,
        },
        {
            title: 'saavn-api (Node.js)',
            items: [
                'JavaScript/TypeScript',
                'npm ecosystem',
                'REST API focus',
            ],
            isPrimary: false,
        },
    ], []);

    const renderCell = (value: string | boolean) => {
        if (typeof value === 'boolean') {
            return value ? (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </span>
            ) : (
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            );
        }
        return <span className="text-gray-300">{value}</span>;
    };

    return (
        <div className="min-h-screen py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center mb-16 transition-all duration-600 ease-out ${
                        headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Comparison
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        See how saavn_play compares to other JioSaavn API clients.
                        We offer the most comprehensive feature set with modern Dart support.
                    </p>
                </div>

                {/* Comparison Table */}
                <div
                    ref={tableRef}
                    className={`mb-20 transition-all duration-600 ease-out ${
                        tableVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <GlassCard hover={false} className="overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left p-6 text-gray-400 font-medium text-sm uppercase tracking-wider">
                                            Feature
                                        </th>
                                        <th className="p-6 text-center">
                                            <div className="text-emerald-400 font-bold text-lg">saavn_play</div>
                                            <div className="text-gray-500 text-sm">Dart</div>
                                        </th>
                                        <th className="p-6 text-center">
                                            <div className="text-white font-bold text-lg">jiosaavn_api</div>
                                            <div className="text-gray-500 text-sm">Python</div>
                                        </th>
                                        <th className="p-6 text-center">
                                            <div className="text-white font-bold text-lg">saavn-api</div>
                                            <div className="text-gray-500 text-sm">Node.js</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map((feature, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                                        >
                                            <td className="p-4 pl-6 text-gray-300 font-medium">
                                                {feature.feature}
                                            </td>
                                            <td className="p-4 text-center">
                                                {renderCell(feature.saavn_play)}
                                            </td>
                                            <td className="p-4 text-center">
                                                {renderCell(feature.jiosaavn_api)}
                                            </td>
                                            <td className="p-4 text-center">
                                                {renderCell(feature.saavn_api)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </GlassCard>
                </div>

                {/* Pros Section */}
                <div
                    ref={prosRef}
                    className={`transition-all duration-600 ease-out ${
                        prosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                        Why Choose saavn_play?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {pros.map((pro, index) => (
                            <GlassCard
                                key={index}
                                hover={false}
                                className={`p-6 ${
                                    pro.isPrimary
                                        ? 'border-emerald-500/30 bg-emerald-500/5'
                                        : ''
                                }`}
                            >
                                <h3
                                    className={`text-xl font-bold mb-4 ${
                                        pro.isPrimary ? 'text-emerald-400' : 'text-white'
                                    }`}
                                >
                                    {pro.title}
                                    {pro.isPrimary && (
                                        <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                                            Recommended
                                        </span>
                                    )}
                                </h3>
                                <ul className="space-y-3">
                                    {pro.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-3 text-gray-400">
                                            <svg
                                                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                                    pro.isPrimary ? 'text-emerald-400' : 'text-gray-500'
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comparison;
