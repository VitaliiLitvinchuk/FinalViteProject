import * as StatusesActions from "../../features/crud-pages/statuses/store/actions";
import * as UserRolesActions from "../../features/crud-pages/user-roles/store/actions";
import * as UserGroupRolesActions from "../../features/crud-pages/user-group-roles/store/actions";
import * as GroupsActions from "../../features/crud-pages/groups/store/actions";
import * as InformationMessengerActions from "../../components/information-messenger/actions";
import * as UsersActions from "../../features/crud-pages/users/store/actions";
import * as UsersGroupsActions from "../../features/crud-pages/users-groups/store/actions";
import * as CoursesActions from "../../features/crud-pages/courses/store/actions";
import * as AssignmentsActions from "../../features/crud-pages/assignments/store/actions";
import * as UsersAssignmentsActions from "../../features/crud-pages/users-assignments/store/actions";
import * as LoginActions from "../../features/user-pages/login/store/actions";

export default {
    informationMessenger: InformationMessengerActions,
    statuses: StatusesActions,
    userRoles: UserRolesActions,
    userGroupRoles: UserGroupRolesActions,
    groups: GroupsActions,
    users: UsersActions,
    usersGroups: UsersGroupsActions,
    courses: CoursesActions,
    assignments: AssignmentsActions,
    usersAssignments: UsersAssignmentsActions,
    login: LoginActions,
}