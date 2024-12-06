import { IStatusesState, StatusesAction, StatusesActionTypes } from "../types";

const initialState: IStatusesState = {
    statuses: []
}

export const statusesReducer = (state = initialState, action: StatusesAction): IStatusesState => {
    switch (action.type) {
        case StatusesActionTypes.GET_STATUSES:
            return {
                ...state,
                statuses: action.payload
            }
        case StatusesActionTypes.ADD_STATUS:
            return {
                ...state,
                statuses: [...state.statuses, action.payload]
            }
        case StatusesActionTypes.UPDATE_STATUS:
            return {
                ...state,
                statuses: state.statuses.map(status => status.id === action.payload.id ? action.payload : status)
            }
        case StatusesActionTypes.DELETE_STATUS:
            return {
                ...state,
                statuses: state.statuses.filter(status => status.id !== action.payload.id)
            }
        default:
            return state
    }
}