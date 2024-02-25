
interface IWriterForRoadMap {
    id: number;
    email: string;
    password: string;
    nickname: string;
    role: string;
    gender: string;
    phoneNumber: string | null;
    backEndLevel: number;
    frontEndLevel: number;
    profileImage: string | null;
}



interface IMasterRoadMapRow {
    type: 'MASTER';
    parentId?: number;
    expanded: boolean;
    id: any;
    writer: IWriterForRoadMap;
    email: string;
    title: string;
    description: string;
    category: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    techNotes?: ITypeForTechNotesRowForRoadMapsMasterDetail[]
}

interface IDetailRoadMapRow {
    type: 'DETAIL';
    expanded?: boolean;
    id: any;
    title: string;
    parentId?: number;
    techNotes?: ITypeForTechNotesRowForRoadMapsMasterDetail[]
}

export type ITypeForRoadMapRow = IMasterRoadMapRow | IDetailRoadMapRow;

export interface ITypeForSkilNoteRowForMasterDetail {
    id: number;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string | null;
    order: number;
}

export interface ITypeForTechNotesRowForRoadMapsMasterDetail {
    id: number;
    email: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string | null;
    skilnotes: ITypeForSkilNoteRowForMasterDetail[]
}

interface ResponseTypeForRoadMapRow {
    id: any;
    writer: IWriterForRoadMap;
    email: string;
    title: string;
    description: string;
    category: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    type: 'MASTER';
    expanded: boolean;
    parentId?: number;
    techNotes: ITypeForTechNotesRowForRoadMapsMasterDetail[]
}

export interface ReponseTypeForGetAllRoadMapList {
    perPage: number,
    totalCount: number;
    roadMapList: ResponseTypeForRoadMapRow[]
}

export interface SaveRoadMapsDto {
    id: number;
    email: string;
    title: string;
    category?: string;
}