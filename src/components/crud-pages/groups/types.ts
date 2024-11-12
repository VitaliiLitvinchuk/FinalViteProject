export enum GroupsActionTypes {
    GET_GROUPS = "GET_GROUPS",
    ADD_GROUP = "ADD_GROUP",
    UPDATE_GROUP = "UPDATE_GROUP",
    DELETE_GROUP = "DELETE_GROUP"
}

export interface IGroup {
    [key: string]: string
    id: string
    name: string
    description: string
    createdAt: string
}

export interface ICreateGroup {
    [key: string]: string
    name: string
    description: string
}

export interface IUpdateGroup {
    [key: string]: string
    id: string
    name: string
    description: string
}

export interface IGroupState {
    groups: IGroup[]
}

export interface IGetGroupsAction {
    type: GroupsActionTypes.GET_GROUPS
    payload: IGroup[]
}

export interface IAddGroupAction {
    type: GroupsActionTypes.ADD_GROUP
    payload: IGroup
}

export interface IUpdateGroupAction {
    type: GroupsActionTypes.UPDATE_GROUP
    payload: IGroup
}

export interface IDeleteGroupAction {
    type: GroupsActionTypes.DELETE_GROUP
    payload: IGroup
}

export type GroupsAction = IGetGroupsAction | IAddGroupAction | IUpdateGroupAction | IDeleteGroupAction;