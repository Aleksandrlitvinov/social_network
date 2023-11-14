import {PhotosType, ProfileType} from "../redux/reducers/profile-reducer.ts";
import {instance, APIResponseType} from "./api.ts";

type SavePhotoResponseDataType = {
  photos: PhotosType
}

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`)
      .then(res => res.data)
  },

  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`)
      .then(res => res.data)
  },

  updateStatus(status: string) {
    return instance.put<APIResponseType>(`profile/status`, {status: status})
      .then(res => res.data)
  },

  updatePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append("image", photoFile)
    return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => res.data)
  },

  updateProfile(updatedProfile: ProfileType) {

    return instance.put<APIResponseType<ProfileType>>(`profile`, updatedProfile, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.data)
  }
}