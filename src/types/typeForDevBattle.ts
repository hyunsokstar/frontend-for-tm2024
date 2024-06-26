export interface TagForDevBattleResponse {
    id: number;
    name: string;
}

export enum DevStatus {
    READY = 'ready',
    IN_PROGRESS = 'in_progress',
    TEST = 'test',
    COMPLETE = 'complete'
}

export interface DevProgressForTeamResponse {
    id: number;
    task: string;
    figmaUrl: string;
    youtubeUrl: string;
    noteUrl: string;
    status: DevStatus;
    createdAt: Date;
}

export interface UserResponse {
    id: number;
    email: string;
    password: string;
    nickname: string;
    cashPoints: number;
    role: string;
    gender: string;
    phoneNumber: string | null;
    backEndLevel: number;
    frontEndLevel: number;
    profileImage: string;
}

export interface IAddDevProgressForTeamDto {
    task: string;
    figmaUrl?: string;
    youtubeUrl?: string;
    noteUrl?: string;
    status?: DevStatus;
}

export interface IParameterForAddDevProgressForTeam {
    teamId: number;
    addDevProgressForTeamDto: IAddDevProgressForTeamDto;
}


export interface MemberForDevTeamResponse {
    id: number;
    position: string;
    createdAt: Date;
    user: UserResponse;
}

export interface DevSpecRowForTeamBattle {
    id?: number;
    backendLanguage: string | null;
    frontendLanguage: string | null;
    orm: string | null;
    backendLibrary: string[] | null;
    frontendLibrary: string[] | null;
    collaborationTool: string[] | null;
    devops: string[] | null;
    css: string | null;
    app: string | null;
    createdAt?: Date;
}

// interface IMessage {
//     id: number;
//     content: string;
//     created_at: string;
// }

// interface IChatRoom {
//     id: string;
//     title: string;
//     created_at: string;
//     updated_at: string;
//     messages: Message[];
// }

export interface TeamForDevBattleResponse {
    id: number;
    name: string;
    description: string;
    techNoteId: number;
    techNoteListUrl: string;
    createdAt: Date;
    devProgressForTeams: DevProgressForTeamResponse[];
    members: MemberForDevTeamResponse[];
    devSpecs: DevSpecRowForTeamBattle[];
    chatRoom: IChatRoom
}

export interface TodoRowForDevBattle {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface DevBattleResponse {
    id: number;
    subject: string;
    tags: TagForDevBattleResponse[];
    teams: TeamForDevBattleResponse[];
    todos: TodoRowForDevBattle[];
    chatRooms: IChatRoom[]
}

export interface CreateDevBattleDto {
    subject: string;
}

export interface ParameterForCreateDevBattleDto {
    createDevBattleDto: CreateDevBattleDto;
}

export interface AddTeamToDevBattleDto {
    name: string,
    description: string
}
export interface IParameterForAddTeamToDevBattle {
    devBattleId: number,
    addTeamToDevBattleDto: AddTeamToDevBattleDto
}

export interface IParameterForAddMemberToDevBattle {
    teamId: number,
    memberId: number
}

export interface IDevSpecForTeamBattleUpdateDto {
    fieldName: string;
    itemText: string;
}

export interface IParameterForTeamBattleUpdateDto {
    teamId: number,
    devSpecForTeamBattleUpdateDto: IDevSpecForTeamBattleUpdateDto
}

export interface IParameterForUpdateForSpecificDevSpecForNotArryTypeForTeamBattle {
    teamId: number;
    fieldName: string;
    itemText: string;
}

export interface IUpdateDevProgressForTeamDto {
    task?: string;
    figmaUrl?: string;
    youtubeUrl?: string;
    noteUrl?: string;
    status?: DevStatus;
}

export interface ResponseForUpdateDevProgressForTeam {
    id: number;
    task: string;
    figmaUrl: string;
    youtubeUrl: string;
    skilNoteId: number;
    noteUrl: string;
    status: DevStatus;
    createdAt: Date;
}

export interface IParameterForUpdateDevProgress {
    progressId: number;
    updateDevProgressForTeamDto: IUpdateDevProgressForTeamDto;
}
export interface IAddTodoForDevBattleDto {
    title: string;
    dueDate?: string;
    description?: string;
}

export interface ITypeForParameterForAddTodoForDevBattle {
    devBattleId: number;
    addTodoForDevBattleDto: IAddTodoForDevBattleDto;
}

// export interface IMessage {
//     id: number;
//     content: string;
//     created_at: string;
// }

export interface IUser {
    id: number;
    email: string;
    password: string;
    nickname: string;
    cashPoints: number;
    role: string;
    gender: string;
    phoneNumber: string | null;
    backEndLevel: number;
    frontEndLevel: number;
    profileImage: string;
}

export interface IMessage {
    id: number;
    content: string;
    created_at: string;
    writer: IUser; // 작성자 정보 추가
}


export interface IChatRoom {
    id: string;
    created_at: string;
    updated_at: string;
    messages: IMessage[];
}

export interface IChatRooms {
    chatRooms: IChatRoom[];
}