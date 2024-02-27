
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

export interface ITypeForParticipantsRow {
    id: number;
    user?: IUser;
    authorityForEdit: boolean;
    currentNote?: null; // 현재 노트의 타입은 무엇인지 알려주셨으면 더 좋을 것 같습니다.
    createdAt: string; // 날짜 형식 문자열로 저장된 것이기 때문에 해당 타입을 유추할 수 없습니다.
    updatedAt?: string; // 마찬가지로 날짜 형식 문자열로 저장된 것이기 때문에 해당 타입을 유추할 수 없습니다.
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
    participants?: ITypeForParticipantsRow[]
}

interface IDetailRoadMapRow {
    type: 'DETAIL';
    expanded?: boolean;
    id: any;
    title: string;
    parentId?: number;
    techNotes?: ITypeForTechNotesRowForRoadMapsMasterDetail[]
    participants?: ITypeForParticipantsRow[]
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

export interface IUser {
    id: number;
    email: string;
    password: string;
    nickname: string;
    role: string;
    gender: string;
    phoneNumber: string | null;
    backEndLevel: number;
    frontEndLevel: number;
    profileImage: string;
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
    participants: ITypeForParticipantsRow[]
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