import axios, { CancelToken } from 'axios';
import { CoursesAction, CoursesActionTypes, ICreateCourse, IUpdateCourse, IUpdateGroupForCourse, IUpdateUserForCourse } from '../types';
import { Dispatch } from 'redux';
import { http_form, http_json } from '../../../../utils/http/creator';

const endpoints = {
    get: "/courses",
    add: "/courses/create",
    update: "/courses/update",
    updateGroup: "/courses/update-group",
    updateUser: "/courses/update-user",
    delete: "/courses/delete"
}

export const getCourses = (cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<CoursesAction>) => {
        try {
            const response = await http_json(cancelToken).get(endpoints.get);

            dispatch({ type: CoursesActionTypes.GET_COURSES, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const addCourse = (course: ICreateCourse, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<CoursesAction>) => {
        try {
            const data = new FormData();

            Object.keys(course).forEach((key) => data.append(key, course[key]));

            const response = await http_form(cancelToken).post(endpoints.add, data);

            dispatch({ type: CoursesActionTypes.ADD_COURSE, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateCourse = (course: IUpdateCourse, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<CoursesAction>) => {
        try {
            const data = new FormData();

            Object.keys(course).forEach((key) => data.append(key, course[key]));

            const response = await http_form(cancelToken).put(endpoints.update, data);

            dispatch({ type: CoursesActionTypes.UPDATE_COURSE, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateGroupForCourse = (course: IUpdateGroupForCourse, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<CoursesAction>) => {
        try {
            const data = new FormData();

            Object.keys(course).forEach((key) => data.append(key, course[key]));

            const response = await http_form(cancelToken).put(endpoints.updateGroup, data);

            dispatch({ type: CoursesActionTypes.UPDATE_GROUP_FOR_COURSE, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const updateUserForCourse = (course: IUpdateUserForCourse, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<CoursesAction>) => {
        try {
            const data = new FormData();

            Object.keys(course).forEach((key) => data.append(key, course[key]));

            const response = await http_form(cancelToken).put(endpoints.updateUser, data);

            dispatch({ type: CoursesActionTypes.UPDATE_USER_FOR_COURSE, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}

export const deleteCourse = (id: string, cancelToken?: CancelToken) => {
    return async (dispatch: Dispatch<CoursesAction>) => {
        try {
            const params = new URLSearchParams({ id });

            const response = await http_json(cancelToken).delete(`${endpoints.delete}?${params}`);

            dispatch({ type: CoursesActionTypes.DELETE_COURSE, payload: response.data });
        } catch (error) {
            if (axios.isCancel(error))
                console.log('Request canceled:', error.message);
            else
                console.log(error);
        }
    }
}