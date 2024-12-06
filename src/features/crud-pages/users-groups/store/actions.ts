import { Dispatch } from "redux";
import { ICreateUserGroup, IUpdateUserGroup, UsersGroupsAction, UsersGroupsActionTypes } from "../types";
import { http_json, http_form } from "../../../../utils/http/creator";
import axios, { CancelToken } from 'axios';

const endpoints = {
    get: "/users-groups",
    getById: "/users-groups/get-by-ids",
    add: "/users-groups/create",
    update: "/users-groups/update-user-role",
    delete: "/users-groups/delete"
}

export const getUsersGroups = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersGroupsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: UsersGroupsActionTypes.GET_USERS_GROUPS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addUserGroup = (userGroup: ICreateUserGroup, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersGroupsAction>) => {
        try {
            const data = new FormData();

            Object.keys(userGroup).forEach((key) => data.append(key, userGroup[key]));

            const response = await http_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: UsersGroupsActionTypes.ADD_USER_GROUP, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateUserGroup = (userGroup: IUpdateUserGroup, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersGroupsAction>) => {
        try {
            const data = new FormData();

            Object.keys(userGroup).forEach((key) => data.append(key, userGroup[key]));

            const response = await http_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: UsersGroupsActionTypes.UPDATE_USER_GROUP, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const deleteUserGroup = (userId: string, groupId: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersGroupsAction>) => {
        try {
            const params = new URLSearchParams({ userId, groupId });

            const response = await http_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: UsersGroupsActionTypes.DELETE_USER_GROUP, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}