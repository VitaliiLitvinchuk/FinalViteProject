import { IUserState, UsersAction, UsersActionTypes } from "../types";

const initialState: IUserState = {
    users: []
};

export const usersReducer = (state = initialState, action: UsersAction): IUserState => {
    switch (action.type) {
        case UsersActionTypes.GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case UsersActionTypes.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case UsersActionTypes.UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
            }
        case UsersActionTypes.UPDATE_ROLE_FOR_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
            }
        case UsersActionTypes.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload.id)
            }
        default:
            return state
    }
}