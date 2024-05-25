
export interface AssignmentCategory {
    id: number;
    name: string;
    dev_assignments_count: number;
}

export interface CreateDevAssignmentDto {
    day: string;
    title: string;
}

export interface CategoryForDevAssignmentDto {
    name: string;
}


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

export interface IParameterForUpdateCategoryForDevAssignment {
    id: number;
    updateCategoryDto: CategoryForDevAssignmentDto;
}

export interface SubjectForCategoryRow {
    id: number;
    name: string;
}

