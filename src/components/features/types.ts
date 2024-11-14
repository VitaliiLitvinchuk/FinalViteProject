export enum FeaturesActionTypes {
    SHOW_INFORMATION_MESSENGER = "SHOW_INFORMATION_MESSENGER",
    CLOSE_INFORMATION_MESSENGER = "CLOSE_INFORMATION_MESSENGER",
}

export interface FeaturesState {
    showInformationMessanger: boolean
    informationMessangerFileName: string
}

export interface ShowInformationFeaturesAction {
    type: FeaturesActionTypes.SHOW_INFORMATION_MESSENGER
    payload: string
}

export interface CloseInformationFeaturesAction {
    type: FeaturesActionTypes.CLOSE_INFORMATION_MESSENGER
}

export type FeaturesAction = ShowInformationFeaturesAction | CloseInformationFeaturesAction;
