import {authAPI} from '../../api/auth-api';
import {securityAPI} from '../../api/sequrity-api'
import {ResultCodesEnum, ResultCodesForCaptcha} from '../../api/api'
import {FormAction, stopSubmit} from 'redux-form';
import {CommonThunkType, InferActionsTypes} from '../redux-store';


const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'SET_CAPTCHA_URL'

type InitialStateAuthType = {
  userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
  captchaUrl: string | null
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes | FormAction>

const initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null // if null captcha is not required
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateAuthType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }

    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default :
      return {
        ...state
      }
  }
}
export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
  } as const),
  setCaptchaUrl: (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
  } as const)
}


export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authAPI.me()

  if (meData.resultCode === ResultCodesEnum.Success) {
    let {id, email, login} = meData.data
    dispatch(actions.setAuthUserData(id, email, login, true))
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaURL()
  const captchaUrl = data.url
  dispatch(actions.setCaptchaUrl(captchaUrl))
}

export const login = (email: string,
                      password: string,
                      rememberMe: boolean,
                      captcha: string | null): ThunkType => async (dispatch) => {
  const loginData = await authAPI.login(email, password, rememberMe, captcha)

  if (loginData.resultCode === ResultCodesEnum.Success) {
    await dispatch(getAuthUserData())
  } else {
    if (loginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
      await dispatch(getCaptchaUrl())
    }
    let message = loginData.messages.length ? loginData.messages[0] : "Email or Password is wrong"
    dispatch(stopSubmit("login", {_error: message}))
  }
}

export const logout = (): ThunkType => async (dispatch) => {
  const logoutData = await authAPI.logout()

  if (logoutData.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false))
  }
}
export default authReducer

