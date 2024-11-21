import axios, { CancelToken } from "axios";
import { Dispatch } from "redux";
import { ICreateUserAssignment, IUpdateUserAssignment, UsersAssignmentsAction, UsersAssignmentsActionTypes } from "./types";
import { http_form, http_json } from "../../../utils/http/creator";

const endpoints = {
    get: "/users-assignments",
    add: "/users-assignments/create",
    update: "/users-assignments/update",
    delete: "/users-assignments/delete"
}

export const getUsersAssignments = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAssignmentsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: UsersAssignmentsActionTypes.GET_USERS_ASSIGNMENTS, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addUserAssignment = (userAssignment: ICreateUserAssignment, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAssignmentsAction>) => {
        try {
            const response = await http_form(cancelToken).post(endpoints.add, userAssignment);

            dispatch({ type: UsersAssignmentsActionTypes.ADD_USER_ASSIGNMENT, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateUserAssignment = (userAssignment: IUpdateUserAssignment, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAssignmentsAction>) => {
        try {
            const response = await http_form(cancelToken).put(endpoints.update, userAssignment);

            dispatch({ type: UsersAssignmentsActionTypes.UPDATE_USER_ASSIGNMENT, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const deleteUserAssignment = (userId: string, assignmentId: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<UsersAssignmentsAction>) => {
        try {
            const params = new URLSearchParams({ userId, assignmentId });

            const response = await http_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: UsersAssignmentsActionTypes.DELETE_USER_ASSIGNMENT, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}