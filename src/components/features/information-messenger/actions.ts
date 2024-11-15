import { Dispatch } from "redux";
import { InformationMessengerActionTypes, InformationMessengersAction } from "./types";

export const showInformationMessenger = (informationMessengerFileName: string, backgroundColor: string = "white") => {
    return async (dispatch: Dispatch<InformationMessengersAction>) => {
        dispatch({ type: InformationMessengerActionTypes.SHOW_INFORMATION_MESSENGER, payload: { informationMessengerFileName, backgroundColor: backgroundColor } })
    }
}

export const closeInformationMessenger = () => {
    return async (dispatch: Dispatch<InformationMessengersAction>) => {
        dispatch({ type: InformationMessengerActionTypes.CLOSE_INFORMATION_MESSENGER })
    }
}