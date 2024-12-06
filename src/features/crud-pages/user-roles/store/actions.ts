import axios, { CancelToken } from "axios";
import { IUserRole, UserRolesAction, UserRolesActionTypes } from "../types";
import { http_form, http_json } from "../../../../utils/http/creator";
import { Dispatch } from "redux";

const endpoints = {
    get: "/user-roles",
    add: "/user-roles/create",
    update: "/user-roles/update",
    delete: "/user-roles/delete"
}

export const getUserRoles = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UserRolesAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: UserRolesActionTypes.GET_USER_ROLES, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const addUserRole = (userRole: IUserRole, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UserRolesAction>) => {
        try {
            const data = new FormData();

            data.append("name", userRole.name);

            const response = await http_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: UserRolesActionTypes.ADD_USER_ROLE, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const updateUserRole = (userRole: IUserRole, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UserRolesAction>) => {
        try {
            const data = new FormData();

            Object.keys(userRole).forEach(key => data.append(key, userRole[key]));

            const response = await http_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: UserRolesActionTypes.UPDATE_USER_ROLE, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    };
}

export const deleteUserRole = (id: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UserRolesAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await http_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: UserRolesActionTypes.DELETE_USER_ROLE, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}