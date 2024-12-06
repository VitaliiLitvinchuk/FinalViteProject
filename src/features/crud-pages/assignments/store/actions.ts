import { Dispatch } from "redux"
import { AssignmentsAction, AssignmentsActionTypes, ICreateAssignment, IUpdateAssignment, IUpdateCourseForAssignment } from "../types"
import { http_form, http_json } from "../../../../utils/http/creator"
import axios, { CancelToken } from 'axios';

const endpoints = {
    get: "/assignments",
    add: "/assignments/create",
    update: "/assignments/update",
    updateCourse: "/assignments/update-course",
    delete: "/assignments/delete"
}

export const getAssignments = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<AssignmentsAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: AssignmentsActionTypes.GET_ASSIGNMENTS, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addAssignment = (assignment: ICreateAssignment, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<AssignmentsAction>) => {
        try {
            const data = new FormData();

            Object.keys(assignment).forEach((key) => data.append(key, assignment[key].toString()));

            const response = await http_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: AssignmentsActionTypes.ADD_ASSIGNMENT, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateAssignment = (assignment: IUpdateAssignment, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<AssignmentsAction>) => {
        try {
            const data = new FormData();

            Object.keys(assignment).forEach((key) => data.append(key, assignment[key].toString()));

            const response = await http_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: AssignmentsActionTypes.UPDATE_ASSIGNMENT, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateCourseForAssignment = (assignment: IUpdateCourseForAssignment, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<AssignmentsAction>) => {
        try {
            const data = new FormData();

            Object.keys(assignment).forEach((key) => data.append(key, assignment[key]));

            const response = await http_form(cancelToken).put(endpoints.updateCourse, data);

            dispatch({ type: AssignmentsActionTypes.UPDATE_COURSE_FOR_ASSIGNMENT, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const deleteAssignment = (id: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<AssignmentsAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await http_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: AssignmentsActionTypes.DELETE_ASSIGNMENT, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}