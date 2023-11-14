import {getAuthUserData} from "./auth-reducer.ts";
import {InferActionsTypes} from "../redux-store.ts";

const INITIALIZED_SUCCESS = 'SN/APP/SET_INITIALIZED_SUCCESS'

const initialState = {
  initialized: false
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action:ActionsTypes): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }

    default:
      return {
        ...state
      }
  }
}

// type InitializedSuccessActionType = {
//   type: typeof INITIALIZED_SUCCESS // 'SN/APP/SET_INITIALIZED_SUCCESS'
// }

const actions = {
  initializedSuccess: () => ({type: INITIALIZED_SUCCESS})

}

//const initializedSuccess = ():InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData())

  promise.then(() => {
    dispatch(actions.initializedSuccess())
  })
}

export default appReducer
