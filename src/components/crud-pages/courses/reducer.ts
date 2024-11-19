import { CoursesAction, CoursesActionTypes, ICourseState } from "./types";

const initialState: ICourseState = {
    courses: []
};

export const coursesReducer = (state = initialState, action: CoursesAction): ICourseState => {
    switch (action.type) {
        case CoursesActionTypes.GET_COURSES:
            return {
                ...state,
                courses: action.payload
            }
        case CoursesActionTypes.ADD_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload]
            }
        case CoursesActionTypes.UPDATE_COURSE, CoursesActionTypes.UPDATE_USER_FOR_COURSE, CoursesActionTypes.UPDATE_GROUP_FOR_COURSE:
            return {
                ...state,
                courses: state.courses.map(course => course.id === action.payload.id ? action.payload : course)
            }
        case CoursesActionTypes.DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter(course => course.id !== action.payload.id)
            }
        default:
            return state
    }
}