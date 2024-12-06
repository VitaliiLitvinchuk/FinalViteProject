import { Dispatch } from "redux";
import { IStatus, StatusesAction, StatusesActionTypes } from '../types';
import { http_json, http_form } from "../../../../utils/http/creator";
import axios, { CancelToken } from "axios";

const endpoints = {
    get: "/statuses",
    add: "/statuses/create",
    update: "/statuses/update",
    delete: "/statuses/delete"
}

export const getStatuses = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<StatusesAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: StatusesActionTypes.GET_STATUSES, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addStatus = (status: IStatus, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<StatusesAction>) => {
        try {
            const data = new FormData();

            data.append("name", status.name);

            const response = await http_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: StatusesActionTypes.ADD_STATUS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateStatus = (status: IStatus, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<StatusesAction>) => {
        try {
            const data = new FormData();

            Object.keys(status).forEach(key => data.append(key, status[key]));

            const response = await http_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: StatusesActionTypes.UPDATE_STATUS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}


export const deleteStatus = (id: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<StatusesAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await http_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: StatusesActionTypes.DELETE_STATUS, payload: response.data });
        }
        catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}
