import { useState, useRef, useEffect } from 'react';
import { Collection, CollectionRequest } from './types';

const COLLECTIONS_KEY = 'saavn_playground_collections';

const defaultCollections: Collection[] = [
    {
        id: 'favorites',
        name: 'Favorites',
        requests: [],
        createdAt: Date.now(),
    },
];

const loadCollections = (): Collection[] => {
    try {
        const raw = localStorage.getItem(COLLECTIONS_KEY);
        if (!raw) return defaultCollections;
        const parsed = JSON.parse(raw) as Collection[];
        return parsed.length > 0 ? parsed : defaultCollections;
    } catch {
        return defaultCollections;
    }
};

const saveCollections = (collections: Collection[]) => {
    try {
        localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    } catch {
        // ignore
    }
};

interface RequestCollectionsProps {
    currentEndpointId: string;
    currentEndpointName: string;
    currentParams: Record<string, string>;
    currentUrl: string;
    onLoad: (endpointId: string, params: Record<string, string>) => void;
}

const RequestCollections = ({
    currentEndpointId,
    currentEndpointName,
    currentParams,
    currentUrl,
    onLoad,
}: RequestCollectionsProps) => {
    const [collections, setCollections] = useState<Collection[]>(loadCollections);
    const [expandedId, setExpandedId] = useState<string | null>('favorites');
    const [showAddModal, setShowAddModal] = useState(false);
    const [addTargetId, setAddTargetId] = useState<string>('favorites');
    const [requestName, setRequestName] = useState('');
    const [showNewCollection, setShowNewCollection] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        saveCollections(collections);
    }, [collections]);

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    const handleAddRequest = () => {
        if (!requestName.trim()) return;
        const newReq: CollectionRequest = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name: requestName.trim(),
            endpointId: currentEndpointId,
            endpointName: currentEndpointName,
            params: { ...currentParams },
            url: currentUrl,
            addedAt: Date.now(),
        };
        setCollections((prev) =>
            prev.map((c) =>
                c.id === addTargetId
                    ? { ...c, requests: [...c.requests, newReq] }
                    : c
            )
        );
        setRequestName('');
        setShowAddModal(false);
    };

    const handleRemoveRequest = (collectionId: string, requestId: string) => {
        setCollections((prev) =>
            prev.map((c) =>
                c.id === collectionId
                    ? { ...c, requests: c.requests.filter((r) => r.id !== requestId) }
                    : c
            )
        );
    };

    const handleCreateCollection = () => {
        if (!newCollectionName.trim()) return;
        const newCol: Collection = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            name: newCollectionName.trim(),
            requests: [],
            createdAt: Date.now(),
        };
        setCollections((prev) => [...prev, newCol]);
        setNewCollectionName('');
        setShowNewCollection(false);
        setExpandedId(newCol.id);
    };

    const handleDeleteCollection = (id: string) => {
        setCollections((prev) => prev.filter((c) => c.id !== id));
        if (expandedId === id) setExpandedId(null);
    };

    const handleStartRename = (id: string, currentName: string) => {
        setRenamingId(id);
        setRenameValue(currentName);
    };

    const handleConfirmRename = () => {
        if (!renamingId || !renameValue.trim()) return;
        setCollections((prev) =>
            prev.map((c) =>
                c.id === renamingId ? { ...c, name: renameValue.trim() } : c
            )
        );
        setRenamingId(null);
        setRenameValue('');
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(collections, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'saavn-collections.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const imported = JSON.parse(reader.result as string) as Collection[];
                if (Array.isArray(imported)) {
                    setCollections((prev) => {
                        const existingIds = new Set(prev.map((c) => c.id));
                        const newOnes = imported.filter((c) => !existingIds.has(c.id));
                        return [...prev, ...newOnes];
                    });
                }
            } catch {
                // ignore invalid JSON
            }
        };
        reader.readAsText(file);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">Collections</label>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setAddTargetId(collections[0]?.id || 'favorites');
                            setRequestName(currentEndpointName);
                            setShowAddModal(true);
                        }}
                        className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
                        title="Save current request"
                    >
                        + Save
                    </button>
                    <button
                        onClick={() => setShowNewCollection(true)}
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                        title="New collection"
                    >
                        + New
                    </button>
                    <button
                        onClick={handleExport}
                        className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                        title="Export collections"
                    >
                        Export
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
                        title="Import collections"
                    >
                        Import
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                    />
                </div>
            </div>

            {/* New collection input */}
            {showNewCollection && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateCollection()}
                        placeholder="Collection name..."
                        className="flex-1 px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs text-gray-200 placeholder-gray-600 outline-none focus:border-emerald-500/40"
                        autoFocus
                    />
                    <button
                        onClick={handleCreateCollection}
                        className="px-2 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/30"
                    >
                        Add
                    </button>
                    <button
                        onClick={() => setShowNewCollection(false)}
                        className="px-2 py-1.5 rounded-lg bg-white/[0.05] text-gray-500 text-xs hover:text-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            )}

            {/* Add request modal */}
            {showAddModal && (
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 space-y-2">
                    <div className="text-xs text-gray-400 font-medium">Save to Collection</div>
                    <select
                        value={addTargetId}
                        onChange={(e) => setAddTargetId(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs text-gray-200 outline-none focus:border-emerald-500/40"
                    >
                        {collections.map((c) => (
                            <option key={c.id} value={c.id} className="bg-gray-900">
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={requestName}
                        onChange={(e) => setRequestName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddRequest()}
                        placeholder="Request name..."
                        className="w-full px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs text-gray-200 placeholder-gray-600 outline-none focus:border-emerald-500/40"
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddRequest}
                            className="flex-1 px-2 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/30"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="flex-1 px-2 py-1.5 rounded-lg bg-white/[0.05] text-gray-500 text-xs hover:text-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Collections list */}
            <div className="space-y-1.5 max-h-[320px] overflow-y-auto scrollbar-hide">
                {collections.map((col) => (
                    <div
                        key={col.id}
                        className="rounded-xl bg-white/[0.02] border border-white/[0.05] overflow-hidden"
                    >
                        {/* Collection header */}
                        <div className="flex items-center gap-2 px-3 py-2">
                            <button
                                onClick={() => toggleExpand(col.id)}
                                className="flex items-center gap-2 flex-1 min-w-0 text-left"
                            >
                                <svg
                                    className={`w-3 h-3 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                                        expandedId === col.id ? 'rotate-90' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                {renamingId === col.id ? (
                                    <input
                                        type="text"
                                        value={renameValue}
                                        onChange={(e) => setRenameValue(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleConfirmRename();
                                            if (e.key === 'Escape') setRenamingId(null);
                                        }}
                                        onBlur={handleConfirmRename}
                                        className="flex-1 px-1 py-0.5 rounded bg-white/[0.05] border border-white/[0.1] text-xs text-gray-200 outline-none"
                                        autoFocus
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                ) : (
                                    <span className="text-xs text-gray-300 truncate">{col.name}</span>
                                )}
                                <span className="text-[10px] text-gray-600">
                                    {col.requests.length}
                                </span>
                            </button>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleStartRename(col.id, col.name)}
                                    className="p-1 rounded hover:bg-white/[0.05] text-gray-600 hover:text-gray-400 transition-colors"
                                    title="Rename"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                {col.id !== 'favorites' && (
                                    <button
                                        onClick={() => handleDeleteCollection(col.id)}
                                        className="p-1 rounded hover:bg-white/[0.05] text-gray-600 hover:text-red-400 transition-colors"
                                        title="Delete collection"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Requests */}
                        {expandedId === col.id && (
                            <div className="px-2 pb-2 space-y-1">
                                {col.requests.length === 0 ? (
                                    <p className="text-[10px] text-gray-600 italic px-1 py-1">
                                        No saved requests. Click "+ Save" to add.
                                    </p>
                                ) : (
                                    col.requests.map((req) => (
                                        <div
                                            key={req.id}
                                            className="group flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
                                        >
                                            <button
                                                onClick={() => onLoad(req.endpointId, req.params)}
                                                className="flex-1 min-w-0 text-left"
                                            >
                                                <span className="block text-xs text-gray-400 group-hover:text-emerald-400 truncate transition-colors">
                                                    {req.name}
                                                </span>
                                                <span className="block text-[10px] text-gray-600 truncate font-mono">
                                                    {req.endpointName}
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => handleRemoveRequest(col.id, req.id)}
                                                className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white/[0.05] text-gray-600 hover:text-red-400 transition-all"
                                                title="Remove"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RequestCollections;
