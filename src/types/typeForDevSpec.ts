export type GroupedDevSpecs = {
    [key: string]: { id: number; spec: string; category: string }[];
};

export interface DevSpec {
    id: number;
    spec: string;
    category: string;
}

export interface CreateDevSpecDto {
    spec: string;
    category: string;
}
