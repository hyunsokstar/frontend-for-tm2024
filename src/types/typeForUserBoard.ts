// User 인터페이스 정의
export interface ITypeForPerformanceLevel {
    performanceLevel: 'struggling' | 'offroad' | 'ninja' | 'cheetah' | 'rocket';
}

export interface IUser extends ITypeForPerformanceLevel {
    id: number;
    email: string;
    nickname: string;
    role: string;
    gender: string;
    phoneNumber: string;
    frontEndLevel: number;
    backEndLevel: number;
    profileImage: string;
    isOnline: boolean;
    currentTask: string | null;
    currentTaskProgressPercent: number;
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

export interface RowTypeForPaymentHistoryData {
    id: number;
    paymentAmount: number;
    merchantUid: string;
    createdAt: string;
}

