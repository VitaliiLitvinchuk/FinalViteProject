import { AssignmentsAction, AssignmentsActionTypes, IAssignmentsState } from "../types";

const initialState: IAssignmentsState = {
    assignments: []
}

export const assignmentsReducer = (state = initialState, action: AssignmentsAction): IAssignmentsState => {
    switch (action.type) {
        case AssignmentsActionTypes.GET_ASSIGNMENTS:
            return {
                ...state,
                assignments: action.payload
            }
        case AssignmentsActionTypes.ADD_ASSIGNMENT:
            return {
                ...state,
                assignments: [...state.assignments, action.payload]
            }
        case AssignmentsActionTypes.UPDATE_ASSIGNMENT:
            return {
                ...state,
                assignments: state.assignments.map(assignment => assignment.id === action.payload.id ? action.payload : assignment)
            }
        case AssignmentsActionTypes.UPDATE_COURSE_FOR_ASSIGNMENT:
            return {
                ...state,
                assignments: state.assignments.map(assignment => assignment.id === action.payload.id ? action.payload : assignment)
            }
        case AssignmentsActionTypes.DELETE_ASSIGNMENT:
            return {
                ...state,
                assignments: state.assignments.filter(assignment => assignment.id !== action.payload.id)
            }
        default:
            return state;
    }
}