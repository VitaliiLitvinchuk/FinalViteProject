import rolesAccess from "../../../utils/user-specific/roles-access"

export enum LoginActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
}

export interface ILogin {
    username: string
    password: string
}

export interface ILoginUser {
    username: string
    password: string
    role: typeof rolesAccess[keyof typeof rolesAccess]
}

export interface ILoginState {
    username: string
    role: typeof rolesAccess[keyof typeof rolesAccess]
    isLoggined: boolean
}

export interface ILoginAction {
    type: LoginActionTypes
    payload: ILoginUser
}

export interface ILogoutAction {
    type: LoginActionTypes.LOGOUT
}

export type LoginAction = ILoginAction | ILogoutAction;