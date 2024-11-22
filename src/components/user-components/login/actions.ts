import { Dispatch } from "redux";
import rolesAccess from "../../../utils/user-specific/roles-access";
import { ILogin, ILoginUser, LoginAction, LoginActionTypes } from "./types";
import { InformationMessengerActionTypes } from "../../features/information-messenger/types";

// in code users 
const users = [
    {
        username: "admin",
        password: "admin",
        role: rolesAccess.admin
    },
    {
        username: "user",
        password: "user",
        role: rolesAccess.user
    }
] as ILoginUser[];

export const loginAction = (user: ILogin) => {
    return async (dispatch: Dispatch) => {
        const currentUser = users.find((u) => u.username === user.username && u.password === user.password);

        if (currentUser) {
            dispatch({ type: LoginActionTypes.LOGIN, payload: currentUser });
        }
        else {
            dispatch({ type: InformationMessengerActionTypes.SHOW_INFORMATION_MESSENGER, payload: { informationMessengerFileName: "error-login", backgroundColor: "#ffb6c1" } });
        }
    }
}

export const logoutAction = () => {
    return async (dispatch: Dispatch<LoginAction>) => {
        dispatch({ type: LoginActionTypes.LOGOUT });
    }
}