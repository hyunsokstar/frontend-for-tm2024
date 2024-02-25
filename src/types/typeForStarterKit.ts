export interface ITypeForStarterKitRow {
    id: number;
    title: string;
    description: string;
    skilNoteUrl: string;
    createdAt: Date;
    updatedAt: Date | null;
}


export interface ResponseTypeForStarterKitList {
    perPage: number;
    totalCount: number;
    starterKitList: ITypeForStarterKitRow[]
}