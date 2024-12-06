import { ICourse } from "../courses/types";

export enum AssignmentsActionTypes {
    GET_ASSIGNMENTS = "GET_ASSIGNMENTS",
    ADD_ASSIGNMENT = "ADD_ASSIGNMENT",
    UPDATE_ASSIGNMENT = "UPDATE_ASSIGNMENT",
    UPDATE_COURSE_FOR_ASSIGNMENT = "UPDATE_COURSE_FOR_ASSIGNMENT",
    DELETE_ASSIGNMENT = "DELETE_ASSIGNMENT"
}

export interface IAssignment {
    id: string,
    title: string,
    description: string,
    dueDate: string,
    maxScore: number,
    createdAt: string,
    courseId: string,

    course?: ICourse
}

export interface ICreateAssignment {
    [key: string]: string | number
    title: string,
    description: string,
    dueDate: string,
    maxScore: number,
    courseId: string
}

export interface IUpdateAssignment {
    [key: string]: string | number
    id: string,
    title: string,
    description: string,
    dueDate: string,
    maxScore: number,
}

export interface IUpdateCourseForAssignment {
    [key: string]: string
    id: string,
    courseId: string
}

export interface IAssignmentsState {
    assignments: IAssignment[]
}

export interface IGetAssignmentsAction {
    type: AssignmentsActionTypes.GET_ASSIGNMENTS,
    payload: IAssignment[]
}

export interface IAddAssignmentAction {
    type: AssignmentsActionTypes.ADD_ASSIGNMENT,
    payload: IAssignment
}

export interface IUpdateAssignmentAction {
    type: AssignmentsActionTypes.UPDATE_ASSIGNMENT,
    payload: IAssignment
}

export interface IUpdateCourseForAssignmentAction {
    type: AssignmentsActionTypes.UPDATE_COURSE_FOR_ASSIGNMENT,
    payload: IAssignment
}

export interface IDeleteAssignmentAction {
    type: AssignmentsActionTypes.DELETE_ASSIGNMENT,
    payload: IAssignment
}

export type AssignmentsAction = IGetAssignmentsAction | IAddAssignmentAction | IUpdateAssignmentAction | IUpdateCourseForAssignmentAction | IDeleteAssignmentAction;