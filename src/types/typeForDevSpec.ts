export interface GroupedDevSpecs {
    language: DevSpec[];
    backend: DevSpec[];
    frontend: DevSpec[];
    orm: DevSpec[];
    css: DevSpec[];
}

export interface DevSpec {
    id: number;
    spec: string;
    category: string;
}

// FavoriteDevSpec
