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

export interface IChallengeRow {
    id: number;
    challengeName: string;
    description: string;
    prize: number;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
    writer: IWriter;
}

export interface responseTypeForGetAllChallengeList {
    challengeList: IChallengeRow[];
    totalCount: number;
    perPage: number;
}