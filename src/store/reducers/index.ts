import { combineReducers } from "redux";
import { statusesReducer } from "../../components/crud-pages/statuses/reducer";
import { userRolesReducer } from "../../components/crud-pages/user-roles/reducer";

export const rootReducer = combineReducers({
    statusesReducer,
    userRolesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;