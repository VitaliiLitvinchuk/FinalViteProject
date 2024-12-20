import { combineReducers } from "redux";
import { statusesReducer } from "../../components/crud-pages/statuses/reducer";
import { userRolesReducer } from "../../components/crud-pages/user-roles/reducer";
import { userGroupRolesReducer } from "../../components/crud-pages/user-group-roles/reducer";
import { groupsReducer } from "../../components/crud-pages/groups/reducer";
import { informationMessengerReducer } from "../../components/features/information-messenger/recuder";
import { usersReducer } from "../../components/crud-pages/users/reducer";
import { usersGroupsReducer } from '../../components/crud-pages/users-groups/reducer';
import { coursesReducer } from "../../components/crud-pages/courses/reducer";
import { assignmentsReducer } from "../../components/crud-pages/assignments/reducer";
import { usersAssignmentsReducer } from "../../components/crud-pages/users-assignments/reducer";
import { loginReducer } from "../../components/user-components/login/reducer";

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