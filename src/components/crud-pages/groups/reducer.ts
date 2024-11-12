import { GroupsAction, GroupsActionTypes, IGroupState } from "./types";

const initialState: IGroupState = {
    groups: []
};

export const groupsReducer = (state = initialState, action: GroupsAction): IGroupState => {
    switch (action.type) {
        case GroupsActionTypes.GET_GROUPS:
            return {
                ...state,
                groups: action.payload
            }
        case GroupsActionTypes.ADD_GROUP:
            return {
                ...state,
                groups: [...state.groups, action.payload]
            }
        case GroupsActionTypes.UPDATE_GROUP:
            return {
                ...state,
                groups: state.groups.map(group => group.id === action.payload.id ? action.payload : group)
            }
        case GroupsActionTypes.DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group.id !== action.payload.id)
            }
        default:
            return state
    }
}