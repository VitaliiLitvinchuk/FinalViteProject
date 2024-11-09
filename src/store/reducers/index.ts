import { combineReducers } from "redux";
import { statusesReducer } from "../../components/crud-pages/statuses/reducer";

export const rootReducer = combineReducers({
    statusesReducer
});

export type RootState = ReturnType<typeof rootReducer>;