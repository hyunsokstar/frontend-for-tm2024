export interface TagForDevBattleResponse {
    id: number;
    name: string;
}

export interface DevStatus {
    READY: 'ready';
    IN_PROGRESS: 'in_progress';
    TEST: 'test';
    COMPLETE: 'complete';
}

export interface DevProgressForTeamResponse {
    id: string;
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

export interface MemberForDevTeamResponse {
    id: number;
    position: string;
    createdAt: Date;
    user: UserResponse;
}

export interface TeamForDevBattleResponse {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    devProgressForTeams: DevProgressForTeamResponse[];
    members: MemberForDevTeamResponse[];
}

export interface DevBattleResponse {
    id: number;
    subject: string;
    tags: TagForDevBattleResponse[];
    teams: TeamForDevBattleResponse[];
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