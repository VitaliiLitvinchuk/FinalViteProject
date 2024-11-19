import { IGroup } from "../groups/types"
import { IUserGroupRole } from "../user-group-roles/types"
import { IUser } from "../users/types"

export enum UsersGroupsActionTypes {
    GET_USERS_GROUPS = "GET_USERS_GROUPS",
    ADD_USER_GROUP = "ADD_USER_GROUP",
    UPDATE_USER_GROUP = "UPDATE_USER_GROUP",
    DELETE_USER_GROUP = "DELETE_USER_GROUP",
    GET_BY_USER_ID_GROUP_ID = "GET_BY_USER_ID_GROUP_ID",
}

export interface IUserGroup {
    userId: string      // id
    groupId: string     // id
    userGroupRoleId: string
    joinedAt: string

    user?: IUser
    group?: IGroup
    userGroupRole?: IUserGroupRole
}

export interface ICreateUserGroup {
    [key: string]: string
    userId: string
    groupId: string
}

export interface IUpdateUserGroup {
    [key: string]: string
    userId: string
    groupId: string
    userGroupRoleId: string
}

export interface IUsersGroupsState {
    usersGroups: IUserGroup[]
}

export interface IAddUsersGroupAction {
    type: UsersGroupsActionTypes.ADD_USER_GROUP
    payload: IUserGroup
}

export interface IUpdateUsersGroupAction {
    type: UsersGroupsActionTypes.UPDATE_USER_GROUP
    payload: IUserGroup
}

export interface IDeleteUsersGroupAction {
    type: UsersGroupsActionTypes.DELETE_USER_GROUP
    payload: IUserGroup
}

export interface IGetUsersGroupsAction {
    type: UsersGroupsActionTypes.GET_USERS_GROUPS
    payload: IUserGroup[]
}

export type UsersGroupsAction = IAddUsersGroupAction | IUpdateUsersGroupAction | IDeleteUsersGroupAction | IGetUsersGroupsAction;