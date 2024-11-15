export enum InformationMessengerActionTypes {
    SHOW_INFORMATION_MESSENGER = "SHOW_INFORMATION_MESSENGER",
    CLOSE_INFORMATION_MESSENGER = "CLOSE_INFORMATION_MESSENGER",
}

export interface InformationMessengersState {
    showInformationMessenger: boolean
    informationMessengerFileName: string
    backgroundColor: string
}

export interface ShowInformationAction {
    type: InformationMessengerActionTypes.SHOW_INFORMATION_MESSENGER
    payload: {
        informationMessengerFileName: string
        backgroundColor: string
    }
}

export interface CloseInformationAction {
    type: InformationMessengerActionTypes.CLOSE_INFORMATION_MESSENGER
}

export type InformationMessengersAction = ShowInformationAction | CloseInformationAction;
