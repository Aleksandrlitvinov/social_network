import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./reducers/profile-reducer.ts";
import dialogsReducer from "./reducers/dialogs-reducer.ts";
import usersReducer from "./reducers/users-reducer.ts";
import authReducer from "./reducers/auth-reducer.ts";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./reducers/app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

export type CommonThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, any, A>

const store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store