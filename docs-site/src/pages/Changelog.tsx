import { useMemo } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { changelog, changeTypeLabels, changeTypeColors, type ChangeType } from '../data/changelog';

const Changelog = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const changesByType = useMemo(() => {
    return changelog.map((entry) => ({
      ...entry,
      grouped: entry.changes.reduce(
        (acc, change) => {
          if (!acc[change.type]) {
            acc[change.type] = [];
          }
          acc[change.type].push(change.description);
          return acc;
        },
        {} as Record<ChangeType, string[]>
      ),
    }));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">
          <span className="text-emerald-500">Changelog</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Track the evolution of saavn_play with version history and release notes.
        </p>
      </div>

      <div className="space-y-6">
        {changesByType.map((entry, index) => (
          <GlassCard key={entry.version} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-emerald-400">
                  {entry.version}
                </h2>
                {index === 0 && (
                  <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                    Latest
                  </span>
                )}
              </div>
              <time className="text-gray-500 text-sm">
                {formatDate(entry.date)}
              </time>
            </div>

            <div className="space-y-4">
              {(Object.entries(entry.grouped) as [ChangeType, string[]][]).map(
                ([type, descriptions]) => (
                  <div key={type}>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold border rounded-full mb-3 ${changeTypeColors[type]}`}
                    >
                      {changeTypeLabels[type]}
                    </span>
                    <ul className="space-y-2 ml-4">
                      {descriptions.map((desc, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400">
                          <span className="text-gray-600 mt-1">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Changelog;
