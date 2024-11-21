import { IAssignment } from "../assignments/types"
import { IStatus } from "../statuses/types"
import { IUser } from '../users/types';

export enum UsersAssignmentsActionTypes {
    GET_USERS_ASSIGNMENTS = "GET_USERS_ASSIGNMENTS",
    ADD_USER_ASSIGNMENT = "ADD_USER_ASSIGNMENT",
    UPDATE_USER_ASSIGNMENT = "UPDATE_USER_ASSIGNMENT",
    DELETE_USER_ASSIGNMENT = "DELETE_USER_ASSIGNMENT"
}

export interface IUserAssignment {
    userId: string
    assignmentId: string
    statusId: string
    score?: number
    submittedAt?: string

    user?: IUser
    assignment?: IAssignment
    status?: IStatus
}

export interface ICreateUserAssignment {
    [key: string]: string
    userId: string
    assignmentId: string
}

export interface IUpdateUserAssignment {
    [key: string]: string | number | undefined

    userId: string
    assignmentId: string
    statusId: string
    submittedAt?: string
    score?: number
}

export interface IUsersAssignmentsState {
    usersAssignments: IUserAssignment[]
}

export interface IGetUsersAssignmentsAction {
    type: UsersAssignmentsActionTypes.GET_USERS_ASSIGNMENTS
    payload: IUserAssignment[]
}

export interface IAddUserAssignmentAction {
    type: UsersAssignmentsActionTypes.ADD_USER_ASSIGNMENT
    payload: IUserAssignment
}

export interface IUpdateUserAssignmentAction {
    type: UsersAssignmentsActionTypes.UPDATE_USER_ASSIGNMENT
    payload: IUpdateUserAssignment
}

export interface IDeleteUserAssignmentAction {
    type: UsersAssignmentsActionTypes.DELETE_USER_ASSIGNMENT
    payload: IUserAssignment
}

export type UsersAssignmentsAction = IGetUsersAssignmentsAction | IAddUserAssignmentAction | IUpdateUserAssignmentAction | IDeleteUserAssignmentAction;