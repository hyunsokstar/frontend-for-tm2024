// shortcut의 한 행을 나타내는 타입
export interface ITypeForShortCutRow {
    id: number;
    shortcut: string;
    description: string;
    category: string;
}

// getAllShortCutList 요청에 대한 응답 타입
export interface ITypeForResponseForGetAllShortCutList {
    perPage: number;
    totalCount: number;
    shortCutList: ITypeForShortCutRow[];
}
