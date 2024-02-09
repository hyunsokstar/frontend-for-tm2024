// SkilNoteContentsModel.ts

// "skilNoteContent": {
//     "id": 306,
//         "title": "todo1 for page",
//             "file": ".todo",
//                 "content": "<p>배포 과정과 관련한 액션 설정 하기</p>",
//                     "page": 1,
//                         "order": 1,
//                             "createdAt": "2024-01-23T07:14:16.850Z",
//                                 "updatedAt": null
// }

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

export type responseTypeForGetSkilNoteContents = {
    title: string;
    writer: Writer;
    skilnoteContents: SkilNoteContentsRow[]
    skilnotePagesCount: number;
    skilnoteContentsPagesInfo: SkilNoteContentsRow[]
};