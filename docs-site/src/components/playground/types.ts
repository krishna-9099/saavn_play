export interface EndpointParam {
    name: string;
    label: string;
    type: 'text' | 'number' | 'select';
    placeholder?: string;
    required?: boolean;
    defaultValue?: string | number;
    options?: { label: string; value: string }[];
}

export interface Endpoint {
    id: string;
    name: string;
    category: string;
    call: string;
    description: string;
    params: EndpointParam[];
    urlBuilder: (params: Record<string, string>) => string;
}

export interface ExampleRequest {
    id: string;
    label: string;
    description: string;
    endpointId: string;
    params: Record<string, string>;
}

export interface HistoryEntry {
    id: string;
    timestamp: number;
    endpointId: string;
    endpointName: string;
    params: Record<string, string>;
    url: string;
    status: number | null;
    duration: number;
    responseSize: number;
}

export interface ApiResponse {
    data: unknown;
    status: number;
    duration: number;
    url: string;
    error?: string;
}

export interface CollectionRequest {
    id: string;
    name: string;
    endpointId: string;
    endpointName: string;
    params: Record<string, string>;
    url: string;
    addedAt: number;
}

export interface Collection {
    id: string;
    name: string;
    requests: CollectionRequest[];
    createdAt: number;
}

export interface EnvironmentVariable {
    key: string;
    value: string;
}
