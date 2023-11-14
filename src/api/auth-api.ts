import {instance, ResultCodesEnum, ResultCodesForCaptcha} from "./api.ts";
import {APIResponseType} from './api.ts'


type MeResponseDataType = {
  id: number
  email: string
  login: string
}

type LoginResponseDataType = {
  userId: number
}


export type LogoutResponseType = {
  resultCode: ResultCodesEnum
  messages: string[]
  data: null
}


export const authAPI = {

  me() {
    return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
      .then(res => res.data)
  },

  login(email: string, password: string, rememberMe: boolean = false,
        captcha: string | null = null) {
    return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesForCaptcha>>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha
    })
      .then(res => res.data)
  },

  logout() {
    return instance.delete<LogoutResponseType>(`auth/login`)
      .then(res => res.data)
  }
}