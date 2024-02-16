export interface Writer {
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

// return {
//     id: row.id,
//     title: row.title,
//     description: row.description,
//     category: row.category,
//     createdAt: row.createdAt,
//     writer: row.writer,
//     type: "MASTER",
//     expanded: false
// }

export type SkillNoteRow = {
    id: any;
    email?: string;
    title?: string;
    description?: string;
    category?: string;
    createdAt?: string;
    updatedAt?: string | null;
    writer?: Writer;
    type: string;
    expanded?: boolean;
    techNoteId?: any;
    likes: any[];
    bookMarks: any[];
    countForSkilNoteContents?: number
    countForSkilNoteContentsPages?: number;
    skilnote_contents?: []
    order?: number;
}

export interface SkillNoteListResponse {
    skilNoteList: SkillNoteRow[];
    totalCount: number;
    perPage: number;
}

export interface skilnoteRowToSave {
    email: string;
    title: string;
    description: string;
    category: string;
    techNoteId: number;
}

export interface dataForCreateSkilNoteContent {
    skilNoteId: any;
    pageNum: any;
    title: string;
    file: string;
    content: string;
}

export interface dataForUpdateSkilNoteContent {
    skilNoteContentId: any;
    title: string;
    file: string;
    content: string;
}

export interface DtoForChangePagesOrderForSkilNote {
    skilNoteId: number;
    targetOrder: string,
    destinationOrder: any
}