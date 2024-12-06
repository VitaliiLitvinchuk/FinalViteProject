import { IUsersAssignmentsState, UsersAssignmentsAction, UsersAssignmentsActionTypes } from "../types";

const initialState: IUsersAssignmentsState = {
    usersAssignments: []
};

export const usersAssignmentsReducer = (state = initialState, action: UsersAssignmentsAction): IUsersAssignmentsState => {
    switch (action.type) {
        case UsersAssignmentsActionTypes.GET_USERS_ASSIGNMENTS:
            return {
                ...state,
                usersAssignments: action.payload
            }
        case UsersAssignmentsActionTypes.ADD_USER_ASSIGNMENT:
            return {
                ...state,
                usersAssignments: [...state.usersAssignments, action.payload]
            }
        case UsersAssignmentsActionTypes.UPDATE_USER_ASSIGNMENT:
            return {
                ...state,
                usersAssignments: state.usersAssignments.map(assignment => assignment.userId === action.payload.userId && assignment.assignmentId === action.payload.assignmentId ? action.payload : assignment)
            }
        case UsersAssignmentsActionTypes.DELETE_USER_ASSIGNMENT:
            return {
                ...state,
                usersAssignments: state.usersAssignments.filter(assignment => !(assignment.userId === action.payload.userId && assignment.assignmentId === action.payload.assignmentId))
            }
        default:
            return state;
    }
}