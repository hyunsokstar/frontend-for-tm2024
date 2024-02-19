
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
    techNotes?: ITypeForTechNotesRowForRoadMapsMasterDetail[]
}

interface IDetailRoadMapRow {
    id: any;
    type: 'DETAIL';
    expanded?: boolean;
    title: string;
    parentId?: number;
    techNotes?: ITypeForTechNotesRowForRoadMapsMasterDetail[]
}

export type ITypeForRoadMapRow = IMasterRoadMapRow | IDetailRoadMapRow;
export interface ITypeForTechNotesRowForRoadMapsMasterDetail {
    id: number;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string | null;
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