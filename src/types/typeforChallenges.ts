
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

export type SubChallengeRow = {
    id: number;
    challengeName: string;
    description: string;
    prize: number;
    deadline: string; // ISO 8601 형식의 문자열
    createdAt: string; // ISO 8601 형식의 문자열
    updatedAt: string; // ISO 8601 형식의 문자열
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
    participantsForSubChallenge: ITypeForChallengersRow[]
}