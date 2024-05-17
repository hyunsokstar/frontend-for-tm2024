export interface DevAssignmentSubmissionRow {
    id: number;
    title: string;
    noteUrl: string;
    figmaUrl: string;
    youtubeUrl: string;
}

export enum AssignmentCategory {
    BASIC = 'basic',
    FRAMEWORK = 'framework',
    LIBRARY = 'library',
    UI = 'ui',
    DEVOPS = 'devops',
    LANGUAGE = 'language',
}

export interface DevAssignmentRow {
    id: number;
    day: string;
    title: string;
    category: AssignmentCategory; // enum으로 변경
    submissions: DevAssignmentSubmissionRow[];
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