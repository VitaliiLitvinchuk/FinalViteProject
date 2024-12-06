import { IGroup } from "../groups/types"
import { IUser } from "../users/types"

export enum CoursesActionTypes {
    GET_COURSES = "GET_COURSES",
    ADD_COURSE = "ADD_COURSE",
    UPDATE_COURSE = "UPDATE_COURSE",
    UPDATE_USER_FOR_COURSE = "UPDATE_USER_FOR_COURSE",
    UPDATE_GROUP_FOR_COURSE = "UPDATE_GROUP_FOR_COURSE",
    DELETE_COURSE = "DELETE_COURSE"
}

export interface ICourse {
    id: string
    name: string
    description: string
    createdAt: string
    userId: string
    groupId: string

    user?: IUser
    group?: IGroup
}

export interface ICreateCourse {
    [key: string]: string
    name: string
    description: string
    userId: string
    groupId: string
}

export interface IUpdateCourse {
    [key: string]: string
    id: string
    name: string
    description: string
}

export interface IUpdateUserForCourse {
    [key: string]: string
    id: string
    userId: string
}

export interface IUpdateGroupForCourse {
    [key: string]: string
    id: string
    groupId: string
}

export interface ICourseState {
    courses: ICourse[]
}

export interface IGetCoursesAction {
    type: CoursesActionTypes.GET_COURSES
    payload: ICourse[]
}

export interface IAddCourseAction {
    type: CoursesActionTypes.ADD_COURSE
    payload: ICourse
}

export interface IUpdateCourseAction {
    type: CoursesActionTypes.UPDATE_COURSE
    payload: ICourse
}

export interface IUpdateUserForCourseAction {
    type: CoursesActionTypes.UPDATE_USER_FOR_COURSE
    payload: ICourse
}

export interface IUpdateGroupForCourseAction {
    type: CoursesActionTypes.UPDATE_GROUP_FOR_COURSE
    payload: ICourse
}

export interface IDeleteCourseAction {
    type: CoursesActionTypes.DELETE_COURSE
    payload: ICourse
}

export type CoursesAction = IGetCoursesAction | IAddCourseAction | IUpdateCourseAction
    | IUpdateUserForCourseAction | IUpdateGroupForCourseAction | IDeleteCourseAction