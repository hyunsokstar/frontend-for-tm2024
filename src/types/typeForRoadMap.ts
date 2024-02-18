interface IWriterForRoadMap {
    id: number;
    email: string;
    password: string;
    nickname: string;
    role: string;
    gender: string;
    phoneNumber: string | null;
    backEndLevel: number;
    frontEndLevel: number;
    profileImage: string | null;
}



export interface ITypeForRoadMapRow {
    id: number;
    title: string;
    description: string;
    category: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    writer: IWriterForRoadMap
}

export interface ReponseTypeForGetAllRoadMapList {
    perPage: number,
    totalCount: number;
    roadMapList: ITypeForRoadMapRow[]
}

export interface SaveRoadMapsDto {
    id: number;
    email: string;
    title: string;
    category?: string;
}