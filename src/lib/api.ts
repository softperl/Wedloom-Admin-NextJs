import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

API.interceptors.request.use((req: any) => {
  const accessToken = getCookie('accessToken')
  const refreshToken = getCookie('refreshToken')
  req.headers.Authorization = `Bearer ${accessToken}`
  req.headers['x-refresh-token'] = refreshToken
  return req
})

API.interceptors.response.use(
  res => {
    const newAccessToken = res.headers['x-access-token']
    if (newAccessToken) {
      setCookie('accessToken', newAccessToken)
    }
    return res
  },
  async error => {
    if (error.response.status === 401) {
      setCookie('accessToken', '')
      setCookie('refreshToken', '')
      window.location.reload()
    }

    return Promise.reject(error)
  }
)

//Auth
export const logout = () => API.delete('/auth/logout')
export const getRoleFe = () => API.get('/auth/get-role')
export const renewAccessToken = (formData: { refreshToken: string }) => API.post('/auth/renew', formData)
export const signIn = (formData: any) => API.post('/auth/login-admin', formData)
export const getAllUsers = () => API.get('/admin/auth/get-all-users')

//Blog
export const newPost = (formData: any) => API.post('/blog/post/new', formData)
export const newCategory = (formData: any) => API.post('/blog/category/new', formData)
export const deleteCategory = (id: string) => API.delete(`/blog/category/delete/${id}`)
export const deletePost = (id: string) => API.delete(`/blog/post/delete/${id}`)
