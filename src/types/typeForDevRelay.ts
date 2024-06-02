import { TechNote } from '@/types/typeForTechNote';

export interface AssignmentCategory {
    id: number;
    name: string;
    dev_assignments_count: number;
}

export interface CreateDevAssignmentDto {
    title: string;
    subtitle: string;
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
    title: string;
    subtitle: string;
    category: AssignmentCategory; // enum으로 변경
    submissions: DevAssignmentSubmissionRow[];
    techNoteId: number;
    techNoteListUrl: string;
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
    countForCategories: number
}

export interface CategoryResponse {
    id: number;
    name: string;
}

export interface IParameterForCreateCategoryForSubject {
    subjectId: number;
    name: string
}