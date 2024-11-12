export enum UserRolesActionTypes {
    GET_USER_ROLES = "GET_USER_ROLES",
    ADD_USER_ROLE = "ADD_USER_ROLE",
    UPDATE_USER_ROLE = "UPDATE_USER_ROLE",
    DELETE_USER_ROLE = "DELETE_USER_ROLE"
}

export interface IUserRole {
    [key: string]: string
    id: string;
    name: string;
}

export interface IUserRolesState {
    userRoles: IUserRole[];
}

export interface IGetUserRolesAction {
    type: UserRolesActionTypes.GET_USER_ROLES;
    payload: IUserRole[];
}

export interface IAddUserRoleAction {
    type: UserRolesActionTypes.ADD_USER_ROLE;
    payload: IUserRole;
}

export interface IUpdateUserRoleAction {
    type: UserRolesActionTypes.UPDATE_USER_ROLE;
    payload: IUserRole;
}

export interface IDeleteUserRoleAction {
    type: UserRolesActionTypes.DELETE_USER_ROLE;
    payload: IUserRole;
}

export type UserRolesAction = IGetUserRolesAction | IAddUserRoleAction | IUpdateUserRoleAction | IDeleteUserRoleAction;