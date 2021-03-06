import axios from 'axios';
import {UserProfile} from '../Redux/profile-reducer';
import {UserType} from '../Redux/users-reducer';

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': 'f3f54432-d8c8-49d7-98bb-7ebfd06f7be2'}
})
type userAPIType = {
    items: UserType[]
    'totalCount': number
    'error': string
}

export type ResponseAPIType<D = {}> = {
    fieldsErrors: any[]
    resultCode: number
    messages: Array<string>
    data: D
}
export type photosType = {
    photos: { small: string, large: File }
}

export type ProfileUpdateProperties = {
    // userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string;
    contacts?: {
        github: string | null
        vk: string | null
        facebook: string | null
        instagram: string | null
        twitter: string | null
        website: string | null
        youtube: string | null
        mainLink: string | null
    }
}

export type UsersQueryParams = {
    count: number
    page: number
    term?: string
    friend?: boolean
}

export const userAPI = {
    getUsers: (params: UsersQueryParams) => instance
        .get<userAPIType>('users', {params})
        .then(res => res.data),

    postFollow: (id: number) => instance
        .post<ResponseAPIType>(`follow/${id}`)
        .then(res => res.data),

    deleteFollow: (id: number) => instance
        .delete<ResponseAPIType>(`follow/${id}`)
        .then(res => res.data),
}

export const profileAPI = {
    getProfile: (userID: number) => instance
        .get<UserProfile>(`profile/${userID}`)
        .then(res => res.data),

    getStatus: (userID: number | null) => instance
        .get<string>(`profile/status/${userID}`)
        .then(res => res.data),

    updateStatus: (status: string) => instance
        .put<ResponseAPIType>(`profile/status`, {status})
        .then(res => res.data),

    updateProfile: (payload: ProfileUpdateProperties) => instance
        .put<ResponseAPIType>(`profile`, payload)
        .then(res => res.data),

    savePhoto: (photoFile: File) => {
        let formData = new FormData();
        formData.append('image', photoFile);
        return instance
            .put<ResponseAPIType<photosType>>
            (`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
    }


}

export const authAPI = {
    me: () => instance
        .get<ResponseAPIType<{ id: number, email: string, login: string }>>(`auth/me`)
        .then(res => res.data),

    login: (email: string, password: string, rememberMe: boolean, captcha?: string) => instance
        .post<ResponseAPIType<{ userId: number }>>
        (`auth/login`, {email, password, rememberMe, captcha})
        .then(res => res.data),

    logout: () => instance
        .delete<ResponseAPIType>(`auth/login`)
        .then(res => res.data),
}

type ResponseCaptchaType = {
        url: string
}

export const securityAPI = {
    getCaptcha: () => instance
        .get<ResponseCaptchaType>(`security/get-captcha-url`)
        .then(res => res.data),
}


