
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

export interface TeamForDevBattleResponse {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    devProgressForTeams: DevProgressForTeamResponse[]; // 추가된 필드
}

export interface DevBattleResponse {
    id: number;
    subject: string;
    tags: TagForDevBattleResponse[]; // Optional tags array
    teams: TeamForDevBattleResponse[]; // 새로 추가된 teams 필드
}
