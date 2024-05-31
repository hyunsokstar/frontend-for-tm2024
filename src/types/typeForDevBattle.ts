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

export interface TeamForDevBattleResponse {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    devProgressForTeams: DevProgressForTeamResponse[];
    members: MemberForDevTeamResponse[];
    devSpecs: DevSpecRowForTeamBattle[]
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
