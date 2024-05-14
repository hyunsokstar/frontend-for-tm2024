export enum LibraryCategory {
    BACKEND = 'backend',
    STATE_MANAGEMENT = 'state_management',
    UI = 'ui',
}

export interface LibraryRowForFavoriteDevSpec {
    id: number;
    library: string;
    description: string;
    siteUrl: string;
    // category: string;
    category: LibraryCategory;

}


export interface FavoriteDevSpecRow {
    id: number;
    company: string;
    language: string;
    backend: string;
    frontend: string;
    orm: string;
    css: string;
    app: string;
    likeCount?: number;
    dislikeCount?: number;

    authGithub: string;
    authNote: string;
    boardGithub: string;
    boardNote: string;
    chatGithub: string;
    chatNote: string;
    paymentGithub: string;
    paymentNote: string;
    devOpsGithub: string;
    devOpsNote: string;
    figma: string;

    libraries: LibraryRowForFavoriteDevSpec[]
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

export interface UpdateFavoriteDevSpecBoilerPlateInfoDto {
    authGithub?: string;
    authNote?: string;
    boardGithub?: string;
    boardNote?: string;
    chatGithub?: string;
    chatNote?: string;
    paymentGithub?: string;
    paymentNote?: string;
    devOpsGithub?: string;
    devOpsNote?: string;
}

export interface UpdateFavoriteDevSpecParameter {
    id: number, data: UpdateFavoriteDevSpecBoilerPlateInfoDto
}

export interface IDtoTypeForUpdateFavoriteDevSpecCompany {
    id: number,
    company: string
}

export interface CreateLibraryForFavoriteDevSpecDto {
    library: string;
    siteUrl?: string;
    description?: string; // description 속성 추가
}

export interface LibraryForFavoriteDevSpec {
    library: string;
    siteUrl: string;
    favoriteDevSpec: {
        id: number;
        company: string;
        language: string;
        backend: string;
        frontend: string;
        orm: string;
        css: string;
        app: string;
        likeCount: number;
        dislikeCount: number;
        authGithub: string;
        authNote: string;
        boardGithub: string;
        boardNote: string;
        chatGithub: string;
        chatNote: string;
        paymentGithub: string;
        paymentNote: string;
        devOpsGithub: string;
        devOpsNote: string;
        figma: string;
    };
    description: string;
    id: number;
}

export interface ParameterTypeForAddLibraryToFavoriteDevSpec {
    favoriteDevSpecId: number
    createLibraryDto: CreateLibraryForFavoriteDevSpecDto
}
