import axios, { CancelToken } from "axios";
import { Dispatch } from "redux";
import { GroupsAction, GroupsActionTypes, ICreateGroup, IUpdateGroup } from "./types";
import { http_form, http_json } from "../../../utils/http/creator";

const endpoints = {
    get: "/groups",
    add: "/groups/create",
    update: "/groups/update",
    delete: "/groups/delete"
}

export const getGroups = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GroupsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: GroupsActionTypes.GET_GROUPS, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addGroup = (group: ICreateGroup, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GroupsAction>) => {
        try {
            const data = new FormData();

            Object.keys(group).forEach((key) => data.append(key, group[key]));

            const response = await http_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: GroupsActionTypes.ADD_GROUP, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateGroup = (group: IUpdateGroup, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GroupsAction>) => {
        try {
            const data = new FormData();

            Object.keys(group).forEach((key) => data.append(key, group[key]));

            const response = await http_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: GroupsActionTypes.UPDATE_GROUP, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error)
        }
    }
}

export const deleteGroup = (id: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<GroupsAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await http_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: GroupsActionTypes.DELETE_GROUP, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}