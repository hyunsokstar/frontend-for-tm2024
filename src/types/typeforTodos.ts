export interface IManager {
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

export interface IBriefing {
    id: number;
    content: string;
    position: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SupplementaryTodo {
    id: number;
    task: string;
    details: string | null;
    status: 'idea' | 'ready' | 'progress' | 'testing' | 'complete';
    startTime: Date | null;
    completedAt: Date | null;
    deadline: Date;
    elapsedTime: string | null;
    priority: number;
    briefings: IBriefing[];
    skilNoteUrl: string | null;
    refSkilNoteId: number | null;
    manager: IManager;
}


export interface ITypeForTodoRow {
    id: number;
    task: string;
    details: string;
    status: string;
    startTime: string;
    completedAt: string;
    deadline: Date;
    elapsedTime: string;
    priority: number;
    manager: IManager;
    supervisor: IManager | null;
    briefings: IBriefing[];
    supplementaryTodos: SupplementaryTodo[]
    skilNoteUrl: string;
    refSkilNoteId: number
}

export interface ITypeForToDosList {
    usersEmailInfo: string[];
    todoList: ITypeForTodoRow[];
    totalCount: number;
    perPage: number;
}

export interface ITypeForSaveChatBoardForTodo {
    todoId: string;
    userId: number;
    content: string;
    position: string;
}


interface Manager {
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

interface Briefing {
    id: number;
    content: string;
    position: string;
    createdAt: string;
    updatedAt: string;
    writer: Manager;
}

interface ITodoRow {
    id: number;
    task: string;
    details: string | null;
    status: string;
    startTime: string | null;
    completedAt: string | null;
    deadline: Date;
    elapsedTime: string;
    priority: number;
    skilNoteUrl: string | null;
    refSkilNoteId: number | null;
    manager: Manager;
    supervisor: any; // Supervisor의 타입을 알고 있다면 적절히 정의합니다.
    briefings: Briefing[];
}

export interface ResponseDataTypeForApiForGetTodoList {
    usersEmailInfo: string[];
    todoList: ITypeForTodoRow[];
    totalCount: number;
    perPage: number;
}

export interface parameterTypeForCreateChatBoardRow {
    todoId: any,
    userId: any,
    content: string,
    position: string,
    isMainOrSub: "main" | "sub"
}

export interface IParameterForUpdateRefSkilNoteForTodo {
    todoId: number;
    isMainOrSub: "main" | "sub"
}