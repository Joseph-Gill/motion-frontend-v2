import {combineReducers} from "redux";
import {loginReducer} from "./reducers/loginReducers";
import {signUpReducer} from "./reducers/signUpReducer";
import {errorReducer} from "./reducers/errorReducer";
import {userProfileReducer} from "./reducers/userProfileReducer";
import {feedReducer} from "./reducers/feedReducer";
import {modalReducer} from "./reducers/modalReducer";
import {usersReducer} from "./reducers/usersReducer";


export const rootReducer = combineReducers({
    loginReducer,
    signUpReducer,
    errorReducer,
    userProfileReducer,
    feedReducer,
    modalReducer,
    usersReducer,
});