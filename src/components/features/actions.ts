import { Dispatch } from "redux";
import { FeaturesAction, FeaturesActionTypes } from "./types";

export const featureShowInformationMessenger = (nodeName: string) => {
    return async (dispatch: Dispatch<FeaturesAction>) => {
        dispatch({ type: FeaturesActionTypes.SHOW_INFORMATION_MESSENGER, payload: nodeName })
    }
}

export const featureCloseInformationMessenger = () => {
    return async (dispatch: Dispatch<FeaturesAction>) => {
        dispatch({ type: FeaturesActionTypes.CLOSE_INFORMATION_MESSENGER })
    }
}