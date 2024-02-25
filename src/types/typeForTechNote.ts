interface Writer {
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

interface Skilnote {
    id: number;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string | null;
}

// interface Skilnotes {
//     skilnotes: Skilnote[];
// }

export type TechNote = {
    type: "MASTER";
    id: number;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    writer: Writer;
    updatedAt?: string | null;
    expanded?: boolean;
    parentId?: any;
    skilnotes: Skilnote[];
    likes: any[]
    countForLikes: number;
    countForBookMarks: number;
    countForSkilNotes: number;
} | {
    type: "DETAIL",
    id: any;
    parentId: number;
}

export type ResponseDataTypeForGetAllTechNoteList = {
    techNoteList: TechNote[];
    totalCount: number;
    perPage: number;
}

export type IParameterForLikeTechNote = {
    userId: string | number;
    techNoteId: string | number;
}

export type IParameterForLikeSkilNote = {
    userId: string | number;
    skilNoteId: string | number;
}

export interface DtoForSaveTechNote {
    techNotesToSave: any[];
    roadMapId?: any;
}