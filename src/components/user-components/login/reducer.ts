import rolesAccess from "../../../utils/user-specific/roles-access";
import { ILoginState, LoginAction, LoginActionTypes } from './types';

const initialState: ILoginState = {
    username: '',
    role: rolesAccess.guest,
    isLoggined: false,
};

export const loginReducer = (state = initialState, action: LoginAction): ILoginState => {
    switch (action.type) {
        case LoginActionTypes.LOGIN:
            return {
                ...state,
                username: action.payload.username,
                role: action.payload.role,
                isLoggined: true,
            }
        case LoginActionTypes.LOGOUT:
            return {
                ...state,
                role: rolesAccess.guest,
                isLoggined: false,
            }
        default:
            return state
    }
}