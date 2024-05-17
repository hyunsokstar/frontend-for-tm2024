export interface DevAssignmentSubmissionRow {
    id: number;
    title: string;
    noteUrl: string;
    figmaUrl: string;
    youtubeUrl: string;
}

export interface DevAssignmentRow {
    id: number;
    day: string;
    title: string;
    category: string;
    submissions: DevAssignmentSubmissionRow[]; // 수정된 부분: submissions 필드 추가
}

export interface CreateDevAssignmentSubmission {
    title: string;
    noteUrl?: string;
    figmaUrl?: string;
    youtubeUrl?: string;
}

export interface IParameterForCreateDevAssignmentSubmission {
    devAssignmentId: number;
    createDevAssignmentSubmissionDto: CreateDevAssignmentSubmission
}