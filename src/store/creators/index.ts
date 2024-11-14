import * as StatusesActions from "../../components/crud-pages/statuses/actions";
import * as UserRolesActions from "../../components/crud-pages/user-roles/actions";
import * as UserGroupRolesActions from "../../components/crud-pages/user-group-roles/actions";
import * as GroupsActions from "../../components/crud-pages/groups/actions";
import * as FeaturesActions from "../../components/features/actions";

export default {
    features: FeaturesActions,
    statuses: StatusesActions,
    userRoles: UserRolesActions,
    userGroupRoles: UserGroupRolesActions,
    groups: GroupsActions
}