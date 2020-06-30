import {combineReducers} from "redux";
import {loginReducer} from "./reducers/loginReducers";
import {signUpReducer} from "./reducers/signUpReducer";
import {errorReducer} from "./reducers/errorReducer";


export const rootReducer = combineReducers({
    loginReducer,
    signUpReducer,
    errorReducer,
});