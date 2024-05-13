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
