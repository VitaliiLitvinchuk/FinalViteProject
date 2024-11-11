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

export interface IGetStatuses {
    type: StatusesActionTypes.GET_STATUSES
    payload: IStatus[]
}

export interface IAddStatus {
    type: StatusesActionTypes.ADD_STATUS
    payload: IStatus
}

export interface IUpdateStatus {
    type: StatusesActionTypes.UPDATE_STATUS
    payload: IStatus
}

export interface IDeleteStatus {
    type: StatusesActionTypes.DELETE_STATUS
    payload: IStatus
}

export type StatusesAction = IGetStatuses | IAddStatus | IUpdateStatus | IDeleteStatus;