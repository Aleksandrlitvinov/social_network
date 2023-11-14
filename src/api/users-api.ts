import {instance} from './api.ts'
import {GetItemsType, APIResponseType} from './api.ts'
import {UserType} from '../redux/reducers/users-reducer.ts'


export const usersApi = {

  getUsers(currentPage: number = 1, pageSize: number = 5) {
    return instance.get<GetItemsType<UserType>>(
      `users?page=${currentPage}&count=${pageSize}`)
      .then(res => res.data)
  },

  follow(id: number): Promise<any> {
    return instance.post<APIResponseType>(`follow/${id}`)
      .then(res => res.data)
  },

  unfollow(id: number): Promise<any> {
    return instance.delete<APIResponseType>(`follow/${id}`)
      .then(res => res.data)
  }
}