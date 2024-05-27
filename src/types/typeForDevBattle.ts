// src\types\typeForDevBattle.ts
export interface TagForDevBattleResponse {
    id: number;
    name: string;
}

export interface DevBattleResponse {
    id: number;
    subject: string;
    tags: TagForDevBattleResponse[]; // Optional tags array
}