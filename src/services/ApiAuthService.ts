import { useUserStore } from '@/stores/user-store'
import authService from '@/services/AuthenService'
import axios from 'axios'
export default () => {
  const userStore = useUserStore()
  const api = axios.create({
    headers: { Authorization: 'Bearer ' + userStore?.loginAuth.accessToken },
    baseURL: import.meta.env.VITE_APP_TRIPASSISTANT_API_URL,
  })
  api.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      new authService().logoutOauth()
      console.log(err)
      return Promise.reject(err)
    },
  )
  return api
}
