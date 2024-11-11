import { combineReducers } from "redux";
import { statusesReducer } from "../../components/crud-pages/statuses/reducer";
import { userRolesReducer } from "../../components/crud-pages/user-roles/reducer";
import { userGroupRolesReducer } from "../../components/crud-pages/user-group-roles/reducer";

export const rootReducer = combineReducers({
    statusesReducer,
    userRolesReducer,
    userGroupRolesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;