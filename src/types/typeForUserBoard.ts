// User 인터페이스 정의
export interface IUser {
    id: number;
    email: string;
    nickname: string;
    role: string;
    gender: string;
    phoneNumber: string;
    frontEndLevel: number;
    backEndLevel: number;
    profileImage: string;
}

export type ITypeForResponseDataForGetAllUsers = {
    users: IUser[];
    totalCount: number;
    perPage: number;
};

export type Direction = 'ltr' | 'rtl';

export type Row = {
    id: number;
    email: string;
    nickname: string;
    role: string;
    gender: string;
    frontEndLevel: number;
    backEndLevel: number;
    phoneNumber: string | null;
};

