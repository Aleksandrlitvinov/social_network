import axios, {AxiosInstance} from "axios";


export const instance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    //"Content-Type": "application/json",
    "API-KEY": "433ee17a-f239-4e64-894e-ce6aeb51155f",
  }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodesForCaptcha {
  CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D,
  messages: Array<string>
  resultCode: RC
}

export type GetItemsType<ItemType> = {
  items: Array<ItemType>
  totalCount: number
  error: string | null
}


