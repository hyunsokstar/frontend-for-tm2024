import { IBriefing } from '@/types/typeforTodos';

export interface IWriter {
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
    profileImage: string | null;
}

export interface IBriefingForSubChallengeRow {
    id: number;
    content: string;
    position: "manager" | "commenter"; // 혹은 enum으로 정의된 타입으로 변경하세요
    createdAt: Date;
    updatedAt: Date;
    refImage: string | null; // 혹은 이미지 URL을 나타내는 타입으로 변경하세요
}

export type SubChallengeRow = {
    id: number;
    challengeName: string;
    description: string;
    prize: number;
    deadline: string; // ISO 8601 형식의 문자열
    createdAt: string; // ISO 8601 형식의 문자열
    updatedAt: string; // ISO 8601 형식의 문자열
    briefings: IBriefingForSubChallengeRow[]
    writer: IWriter;
};

export interface IChallengeRow {
    id: number;
    challengeName: string;
    description: string;
    prize: number;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
    writer: IWriter;
    subChallenges: SubChallengeRow[]
}

export interface responseTypeForGetAllChallengeList {
    challengeList: IChallengeRow[];
    totalCount: number;
    perPage: number;
}

export interface ICreateChallengeDto {
    challengeName: string;
    description: string;
    prize: number;
    deadline: string; // 적절한 날짜 형식으로 제공해야 합니다.
}

export interface IUpdateChallengeDto {
    challengeName: string;
    description: string;
    prize: number;
    deadline: string; // 적절한 날짜 형식으로 제공해야 합니다.
}

export interface IParamterForApiForUpdateChallenge {
    isMainOrSub: string;
    challengeId: number
    updateChallengeDto: IUpdateChallengeDto
}

export interface IFormDataForUpdateChallenge {
    challengeId: number;
    UpdateChallengeDto: IUpdateChallengeDto
}

export interface CreateSubChallengeDto {
    challengeName: string;
    description: string;
    prize: number;
    deadline: string; // ISO 8601 형식의 문자열
}

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
    profileImage: string | null;
}

export interface ITypeForChallengersRow {
    id: number;
    createdAt: string;
    updatedAt: string;
    noteUrl: string;
    user: IUser;
    isPassed: boolean;
}


export interface ResponseTypeForGetAllParticipantsForSubChallenges {
    success: true,
    participantsEmailList: string[],
    participantsForSubChallenge: ITypeForChallengersRow[]
}


export interface CreateBriefingForSubChallengeDto {
    // 필요한 속성들을 정의하세요.
    content: string;
    refImageUrl?: string;
    position: 'manager' | 'commenter';
}

export interface IParameterForCreateBriefingForSubChallenge {
    subChallengeId: number,
    createBriefingForSubChallengeDto: CreateBriefingForSubChallengeDto
}