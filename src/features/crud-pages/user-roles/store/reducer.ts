import { IUserRolesState, UserRolesAction, UserRolesActionTypes } from "../types";

const initialState: IUserRolesState = {
    userRoles: []
};

export const userRolesReducer = (state = initialState, action: UserRolesAction): IUserRolesState => {
    switch (action.type) {
        case UserRolesActionTypes.GET_USER_ROLES:
            return {
                ...state,
                userRoles: action.payload
            }
        case UserRolesActionTypes.ADD_USER_ROLE:
            return {
                ...state,
                userRoles: [...state.userRoles, action.payload]
            }
        case UserRolesActionTypes.UPDATE_USER_ROLE:
            return {
                ...state,
                userRoles: state.userRoles.map(role => role.id === action.payload.id ? action.payload : role)
            }
        case UserRolesActionTypes.DELETE_USER_ROLE:
            return {
                ...state,
                userRoles: state.userRoles.filter(role => role.id !== action.payload.id)
            }
        default:
            return state
    }
}