import axios from "axios";

const baseUrl = 'https://social-network.samuraijs.com/api/1.0/'

// const instance = axios.create({
//   withCredentials: true,
//   baseURL: 'https://social-network.samuraijs.com/api/1.0/',
//   headers: {
//     "Content-Type": "application/json",
//     "API-KEY": "9284d891-46f2-4575-8a4e-85cd4bbdcd06",
//   }
// })


export const usersApi = {

  getUsers(currentPage = 1, pageSize = 5) {
    return axios.get(
      `${ baseUrl }users?page=${ currentPage }&count=${ pageSize }`, {
        withCredentials: true
      })
      .then(response => response.data)
  },

  follow(id) {
    return axios
      .post(
        `https://social-network.samuraijs.com/api/1.0/follow/${ id }`, {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "api-key": "9284d891-46f2-4575-8a4e-85cd4bbdcd06",
          }
        }
      ).then(response => response.data)
  },

  unfollow(id) {
    return axios
      .delete(`https://social-network.samuraijs.com/api/1.0/follow/${ id }`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "API-KEY": "9284d891-46f2-4575-8a4e-85cd4bbdcd06",
        }
      }).then(response => response.data)
  }
}

export const profileAPI = {
  getProfile(userId) {
    return axios.get(
      `https://social-network.samuraijs.com/api/1.0/profile/${ userId }`)
  }
}

export const authApi = {
  me() {
    return axios
      .get('https://social-network.samuraijs.com/api/1.0/auth/me', {
        withCredentials: true
      })
  }
}