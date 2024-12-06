import { IUserRole } from "../user-roles/types"

export enum UsersActionTypes {
    GET_USERS = "GET_USERS",
    ADD_USER = "ADD_USER",
    UPDATE_USER = "UPDATE_USER",
    UPDATE_ROLE_FOR_USER = "UPDATE_ROLE_FOR_USER",
    DELETE_USER = "DELETE_USER"
}

export interface IUser {
    id: string
    firstName: string
    lastName: string
    email: string
    googleId: string
    avatarUrl: string
    userRoleId: string
    userRole: IUserRole
}

export interface ICreateUser {
    [key: string]: string
    firstName: string
    lastName: string
    email: string
    googleId: string
    avatarUrl: string
}

export interface IUpdateUser {
    [key: string]: string
    id: string
    firstName: string
    lastName: string
    avatarUrl: string
}

export interface IUpdateRoleForUser {
    [key: string]: string
    id: string
    userRoleId: string
}

export interface IUserState {
    users: IUser[]
}

export interface IGetUserAction {
    type: UsersActionTypes.GET_USERS
    payload: IUser[]
}

export interface IAddUserAction {
    type: UsersActionTypes.ADD_USER
    payload: IUser
}

export interface IUpdateUserAction {
    type: UsersActionTypes.UPDATE_USER
    payload: IUser
}

export interface IUpdateRoleForUserAction {
    type: UsersActionTypes.UPDATE_ROLE_FOR_USER
    payload: IUser
}

export interface IDeleteUserAction {
    type: UsersActionTypes.DELETE_USER
    payload: IUser
}

export type UsersAction = IGetUserAction | IAddUserAction | IUpdateUserAction | IDeleteUserAction | IUpdateRoleForUserAction;