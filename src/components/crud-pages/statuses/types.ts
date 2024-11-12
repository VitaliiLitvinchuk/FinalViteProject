export enum StatusesActionTypes {
    GET_STATUSES = "GET_STATUSES",
    ADD_STATUS = "ADD_STATUS",
    UPDATE_STATUS = "UPDATE_STATUS",
    DELETE_STATUS = "DELETE_STATUS"
}

export interface IStatus {
    [key: string]: string
    id: string
    name: string
}

export interface IStatusesState {
    statuses: IStatus[]
}

export interface IGetStatusesAction {
    type: StatusesActionTypes.GET_STATUSES
    payload: IStatus[]
}

export interface IAddStatusAction {
    type: StatusesActionTypes.ADD_STATUS
    payload: IStatus
}

export interface IUpdateStatusAction {
    type: StatusesActionTypes.UPDATE_STATUS
    payload: IStatus
}

export interface IDeleteStatusAction {
    type: StatusesActionTypes.DELETE_STATUS
    payload: string
}

export type StatusesAction = IGetStatusesAction | IAddStatusAction | IUpdateStatusAction | IDeleteStatusAction;