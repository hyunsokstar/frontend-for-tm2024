// src/types/typeForDevBattle.ts
export interface TagForDevBattleResponse {
    id: number;
    name: string;
}

export interface TeamForDevBattleResponse {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    // 다른 필드가 있다면 여기에 추가하세요.
}

export interface DevBattleResponse {
    id: number;
    subject: string;
    tags: TagForDevBattleResponse[]; // Optional tags array
    teams: TeamForDevBattleResponse[]; // 새로 추가된 teams 필드
}
