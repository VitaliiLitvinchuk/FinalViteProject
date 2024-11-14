import { IUserGroupRolesState, UserGroupRolesAction, UserGroupRolesActionTypes } from './types';

const initialState: IUserGroupRolesState = {
    userGroupRoles: []
};

export const userGroupRolesReducer = (state = initialState, action: UserGroupRolesAction): IUserGroupRolesState => {
    switch (action.type) {
        case UserGroupRolesActionTypes.GET_USER_GROUP_ROLES:
            return {
                ...state,
                userGroupRoles: action.payload
            }
        case UserGroupRolesActionTypes.ADD_USER_GROUP_ROLE:
            return {
                ...state,
                userGroupRoles: [...state.userGroupRoles, action.payload]
            }
        case UserGroupRolesActionTypes.UPDATE_USER_GROUP_ROLE:
            return {
                ...state,
                userGroupRoles: state.userGroupRoles.map(role => role.id === action.payload.id ? action.payload : role)
            }
        case UserGroupRolesActionTypes.DELETE_USER_GROUP_ROLE:
            return {
                ...state,
                userGroupRoles: state.userGroupRoles.filter(role => role.id !== action.payload.id)
            }
        default:
            return state
    }
}