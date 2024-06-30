import { IUser } from "./typeForUserBoard";

export interface IParameterForAddChattingMessage {
    chatRoomId: string;
    content: string;
}

export interface IChatRoomOwner {
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

export interface IChatRoom {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    owner: IChatRoomOwner;
}

export type ITypeForGetAllChatRooms = IChatRoom[];


// src/types/typeForChatting.ts

// ... 기존 인터페이스들 ...

export interface User {
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

export interface IMessageForGlobalChatRoom {
    id: number;
    content: string;
    created_at: string;
    writer: IUser;
}

export interface GlobalChatRoomResponse {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    owner: User;
    users: User[]; // 추가된 부분
    messages: IMessageForGlobalChatRoom[];
}

export interface CreateMessageDtoForGlobolChatRoom {
    content: string;
}

export interface Message {
    id: number;
    content: string;
    created_at: string;
    writer: User;

}

export interface UserChatRoomResponse {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    owner: User;
    users: User[];
    messages: Message[];
}
