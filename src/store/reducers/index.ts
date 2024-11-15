import { combineReducers } from "redux";
import { statusesReducer } from "../../components/crud-pages/statuses/reducer";
import { userRolesReducer } from "../../components/crud-pages/user-roles/reducer";
import { userGroupRolesReducer } from "../../components/crud-pages/user-group-roles/reducer";
import { groupsReducer } from "../../components/crud-pages/groups/reducer";
import { informationMessengerReducer } from "../../components/features/information-messenger/recuder";

export const rootReducer = combineReducers({
    informationMessengerReducer,
    statusesReducer,
    userRolesReducer,
    userGroupRolesReducer,
    groupsReducer
});

export type RootState = ReturnType<typeof rootReducer>;