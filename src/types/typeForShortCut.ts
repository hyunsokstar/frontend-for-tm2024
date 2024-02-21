
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

export interface ITypeForSubShortCutListRow {
    id: number;
    shortcut: string;
    description: string;
    category: string;
}



// shortcut의 한 행을 나타내는 타입
export interface ITypeForShortCutMasterRow {
    type: 'MASTER';
    parentId?: number;
    id: any;
    shortcut?: string;
    description?: string;
    category?: string;
    writer?: IWriterForShortCut;
    expanded: boolean,
    email?: string,
    subShortCuts?: ITypeForSubShortCutListRow[]
}

export interface ITypeForShortCutDetailRow {
    type: 'DETAIL';
    expanded?: boolean;
    parentId?: number;
    id: any;
    shortcut?: string;
    description?: string;
    category?: string;
    writer?: IWriterForShortCut;
    subShortCuts?: ITypeForSubShortCutListRow[]

}

export type ITypeForShortCutRow = ITypeForShortCutMasterRow | ITypeForShortCutDetailRow


// getAllShortCutList 요청에 대한 응답 타입
export interface ITypeForResponseForGetAllShortCutList {

    perPage: number;
    totalCount: number;
    shortCutList: ITypeForShortCutRow[];
}

export interface CreateOneShortCutDto {
    shortcut: string;
    description: string;
    category?: string;
}
