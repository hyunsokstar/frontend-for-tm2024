// 응답 타입에 대한 인터페이스 타입도 필요
export interface DevRelayResponse {
    id: number;
    devTitle: string;
    devNote: string;
    figmaUrl: string;
    githubUrl: string;
    dayOfTheWeek: string;
}