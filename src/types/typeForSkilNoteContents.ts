interface IWriter {
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

export interface ISkilNoteContent {
    id: number,
    title: string;
    file: string;
    content: string;
    page: number;
    order: number;
    createdAt: Date,
    updatedAt: Date
}

export interface IBookmarkForSkilNoteContent {
    id: number;
    createdAt: string;
    updatedAt: string;
    user: {
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
    };
    skilNoteContent: ISkilNoteContent
}

export interface SkilNoteContentsRow {
    id: number;
    title: string;
    file: string;
    content: string;
    page: number;
    order: number;
    createdAt: string; // 혹은 Date 타입으로 변환하여 사용
    updatedAt: string | null; // 혹은 Date 타입으로 변환하여 사용
    bookMarks: IBookmarkForSkilNoteContent[]
}

export interface TypeForRelatedSkilNoteRow {
    id: number;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string | null;
    order: number;
}

export interface ITypeForSkilNoteForMyBookMark {
    id: number;
    title: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string | null;
    order: number;
}


export interface ITypeForSkilNoteContentForMyBookMark {
    id: number;
    title: string;
    file: string;
    content: string;
    page: number;
    order: number;
    createdAt: string;
    updatedAt: string | null;
    skilNote: ITypeForSkilNoteForMyBookMark
}
export interface ITypeForMyBookMarksRow {
    id: number;
    createdAt: string;
    updatedAt: string | null;
    skilNoteContent: ITypeForSkilNoteContentForMyBookMark;
}




export type responseTypeForGetSkilNoteContents = {
    title: string;
    writer: IWriter;
    skilnoteContents: SkilNoteContentsRow[]
    skilnotePagesCount: number;
    skilnoteContentsPagesInfo: SkilNoteContentsRow[]
    relatedSkilnoteList: TypeForRelatedSkilNoteRow[]
    myBookMarks: ITypeForMyBookMarksRow[]
};

