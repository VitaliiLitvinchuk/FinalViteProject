import * as StatusesActions from "../../components/crud-pages/statuses/actions";
import * as UserRolesActions from "../../components/crud-pages/user-roles/actions";
import * as UserGroupRolesActions from "../../components/crud-pages/user-group-roles/actions";
import * as GroupsActions from "../../components/crud-pages/groups/actions";
import * as InformationMessengerActions from "../../components/features/information-messenger/actions";
import * as UsersActions from "../../components/crud-pages/users/actions";
import * as UsersGroupsActions from "../../components/crud-pages/users-groups/actions";
import * as CoursesActions from "../../components/crud-pages/courses/actions";
import * as AssignmentsActions from "../../components/crud-pages/assignments/actions";
import * as UsersAssignmentsActions from "../../components/crud-pages/users-assignments/actions";
import * as LoginActions from "../../components/user-components/login/actions";

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