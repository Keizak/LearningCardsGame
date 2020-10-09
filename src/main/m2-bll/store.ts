import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from './app-reducer'
import {registrationReducer} from "./registration-reducer";
import {passwordResetReducer} from "./password-reset-reducer";
import {passwordGenerationReducer} from "./password-gereration-reducer";
import {authReducer} from "./auth-reducer";
import {ProfileReducer} from "./profile-reducer";
import {tableReducer} from "./table-reduser";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    app: appReducer,
    registrationPage: registrationReducer,
    passwordResetPage: passwordResetReducer,
    passwordGenerationPage: passwordGenerationReducer,
    profilePage: ProfileReducer,
    auth:authReducer,
    table:tableReducer,

})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
