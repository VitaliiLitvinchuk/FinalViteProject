import axios, { CancelToken } from "axios";
import { ICreateUser, IUpdateRoleForUser, IUpdateUser, IUser, UsersAction, UsersActionTypes } from "./types";
import { Dispatch } from "redux";
import { http_form, http_json } from "../../../utils/http/creator";

const endpoints = {
    get: '/users',
    getById: '/users/get-by-id',
    add: '/users/create',
    update: '/users/update',
    updateRole: '/users/update-role',
    delete: '/users/delete',
};

export const getUsers = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: UsersActionTypes.GET_USERS, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addUser = (user: ICreateUser, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            const data = new FormData();

            Object.keys(user).forEach((key) => data.append(key, user[key]));

            const response = await http_form(cancelToken).post<IUser>(endpoints.add, data);

            dispatch({ type: UsersActionTypes.ADD_USER, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateUser = (user: IUpdateUser, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            const data = new FormData();

            Object.keys(user).forEach((key) => data.append(key, user[key]));

            const response = await http_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: UsersActionTypes.UPDATE_USER, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateRoleForUser = (user: IUpdateRoleForUser, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            const data = new FormData();

            Object.keys(user).forEach((key) => data.append(key, user[key]));

            const response = await http_form(cancelToken).put(endpoints.updateRole, data);

            dispatch({ type: UsersActionTypes.UPDATE_ROLE_FOR_USER, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const deleteUser = (id: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await http_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: UsersActionTypes.DELETE_USER, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}
