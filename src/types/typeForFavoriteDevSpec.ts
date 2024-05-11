export interface FavoriteDevSpecRow {
    id: number;
    language: string;
    backend: string;
    frontend: string;
    orm: string;
    css: string;
    app: string;
    likeCount?: number;
    dislikeCount?: number;
}

export interface FavoriteDevSpecRowForCreate {
    id?: number;
    language: string;
    backend: string;
    frontend: string;
    orm: string;
    css: string;
    app: string;
    likeCount?: number;
    dislikeCount?: number;
}

