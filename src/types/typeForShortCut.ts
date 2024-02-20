interface IWriterForShortCut {
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

// shortcut의 한 행을 나타내는 타입
export interface ITypeForShortCutRow {
    id: number;
    shortcut: string;
    description: string;
    category: string;
    writer: IWriterForShortCut;
}

// getAllShortCutList 요청에 대한 응답 타입
export interface ITypeForResponseForGetAllShortCutList {
    perPage: number;
    totalCount: number;
    shortCutList: ITypeForShortCutRow[];
}
