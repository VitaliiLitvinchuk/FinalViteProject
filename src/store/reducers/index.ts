import { combineReducers } from "redux";
import { statusesReducer } from "../../features/crud-pages/statuses/store/reducer";
import { userRolesReducer } from "../../features/crud-pages/user-roles/store/reducer";
import { userGroupRolesReducer } from "../../features/crud-pages/user-group-roles/store/reducer";
import { groupsReducer } from "../../features/crud-pages/groups/store/reducer";
import { informationMessengerReducer } from "../../components/information-messenger/recuder";
import { usersReducer } from "../../features/crud-pages/users/store/reducer";
import { usersGroupsReducer } from '../../features/crud-pages/users-groups/store/reducer';
import { coursesReducer } from "../../features/crud-pages/courses/store/reducer";
import { assignmentsReducer } from "../../features/crud-pages/assignments/store/reducer";
import { usersAssignmentsReducer } from "../../features/crud-pages/users-assignments/store/reducer";
import { loginReducer } from "../../features/user-pages/login/store/reducer";

export const rootReducer = combineReducers({
    informationMessengerReducer,
    statusesReducer,
    userRolesReducer,
    userGroupRolesReducer,
    groupsReducer,
    usersReducer,
    usersGroupsReducer,
    coursesReducer,
    assignmentsReducer,
    usersAssignmentsReducer,
    loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;