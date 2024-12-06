import axios, { CancelToken } from "axios";
import { IUserGroupRole, UserGroupRolesAction, UserGroupRolesActionTypes } from "../types";
import { http_form, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";

const endpoints = {
    get: "/user-group-roles",
    create: "/user-group-roles/create",
    update: "/user-group-roles/update",
    delete: "/user-group-roles/delete",
};

export const getUserGroupRoles = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UserGroupRolesAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: UserGroupRolesActionTypes.GET_USER_GROUP_ROLES, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addUserGroupRole = (userGroupRole: IUserGroupRole, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UserGroupRolesAction>) => {
        try {
            const data = new FormData();

            data.append("name", userGroupRole.name);

            const response = await http_form(cancelToken).post(endpoints.create, data);

            dispatch({ type: UserGroupRolesActionTypes.ADD_USER_GROUP_ROLE, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateUserGroupRole = (userGroupRole: IUserGroupRole, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UserGroupRolesAction>) => {
        try {
            const data = new FormData();

            Object.keys(userGroupRole).forEach(key => data.append(key, userGroupRole[key]));

            const response = await http_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: UserGroupRolesActionTypes.UPDATE_USER_GROUP_ROLE, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const deleteUserGroupRole = (id: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UserGroupRolesAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await http_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: UserGroupRolesActionTypes.DELETE_USER_GROUP_ROLE, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}
