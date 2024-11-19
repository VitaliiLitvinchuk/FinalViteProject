import { IUsersGroupsState, UsersGroupsAction, UsersGroupsActionTypes } from "./types";

const initialState: IUsersGroupsState = {
    usersGroups: []
}

export const usersGroupsReducer = (state = initialState, action: UsersGroupsAction): IUsersGroupsState => {
    switch (action.type) {
        case UsersGroupsActionTypes.GET_USERS_GROUPS:
            return {
                ...state,
                usersGroups: action.payload
            }
        case UsersGroupsActionTypes.ADD_USER_GROUP:
            return {
                ...state,
                usersGroups: [...state.usersGroups, action.payload]
            }
        case UsersGroupsActionTypes.UPDATE_USER_GROUP:
            return {
                ...state,
                usersGroups: state.usersGroups.map(userGroup => userGroup.userId === action.payload.userId && userGroup.groupId === action.payload.groupId ? action.payload : userGroup)
            }
        case UsersGroupsActionTypes.DELETE_USER_GROUP:
            return {
                ...state,
                usersGroups: state.usersGroups.filter(usersGroup => !(usersGroup.userId === action.payload.userId && usersGroup.groupId === action.payload.groupId))
            }
        default:
            return state
    }
}