export enum UserGroupRolesActionTypes {
    GET_USER_GROUP_ROLES = "GET_USER_GROUP_ROLES",
    ADD_USER_GROUP_ROLE = "ADD_USER_GROUP_ROLE",
    UPDATE_USER_GROUP_ROLE = "UPDATE_USER_GROUP_ROLE",
    DELETE_USER_GROUP_ROLE = "DELETE_USER_GROUP_ROLE"
}

export interface IUserGroupRole {
    [key: string]: string
    id: string
    name: string
}

export interface IUserGroupRolesState {
    userGroupRoles: IUserGroupRole[]
}

export interface IGetUserGroupRolesAction {
    type: UserGroupRolesActionTypes.GET_USER_GROUP_ROLES
    payload: IUserGroupRole[]
}

export interface IAddUserGroupRoleAction {
    type: UserGroupRolesActionTypes.ADD_USER_GROUP_ROLE
    payload: IUserGroupRole
}

export interface IUpdateUserGroupRoleAction {
    type: UserGroupRolesActionTypes.UPDATE_USER_GROUP_ROLE
    payload: IUserGroupRole
}

export interface IDeleteUserGroupRoleAction {
    type: UserGroupRolesActionTypes.DELETE_USER_GROUP_ROLE
    payload: IUserGroupRole
}

export type UserGroupRolesAction = IGetUserGroupRolesAction | IAddUserGroupRoleAction | IUpdateUserGroupRoleAction | IDeleteUserGroupRoleAction;