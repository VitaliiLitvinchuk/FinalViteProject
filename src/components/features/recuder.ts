import { FeaturesAction, FeaturesActionTypes, FeaturesState } from './types';

const initialState: FeaturesState = {
    showInformationMessanger: false,
    informationMessangerFileName: ""
}

export default function featuresReducer(state = initialState, action: FeaturesAction): FeaturesState {
    switch (action.type) {
        case FeaturesActionTypes.SHOW_INFORMATION_MESSENGER:
            return {
                ...state,
                showInformationMessanger: true,
                informationMessangerFileName: action.payload
            }
        case FeaturesActionTypes.CLOSE_INFORMATION_MESSENGER:
            return {
                ...state,
                showInformationMessanger: false,
                informationMessangerFileName: ""
            }
        default:
            return state
    }
}