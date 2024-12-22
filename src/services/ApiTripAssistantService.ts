import { useUserStore } from '@/stores/user-store'
import AuthService from '@/services/AuthenService'
import axios from 'axios'
export default () => {
  const userStore = useUserStore()
  const api = axios.create({
    headers: { Authorization: 'Bearer ' + userStore?.jwt.accessToken },
    baseURL: import.meta.env.VITE_APP_TRIPASSISTANT_API_URL,
  })
  api.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      const originalConfig = err.config
      if (originalConfig.url !== '/login' && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          try {
            const refreshData = await new AuthService().refreshToken()
            userStore.updateJwt(refreshData)

            err.config.headers['Authorization'] = `Bearer ${refreshData.accessToken}`
            return new Promise((resolve, reject) => {
              axios
                .request(originalConfig)
                .then((response) => {
                  resolve(response)
                })
                .catch((err) => {
                  console.log(err)
                  reject(err)
                })
            })
          } catch (_error) {
            console.log(_error)
            return Promise.reject(_error)
          }
        }
      }
      new AuthService().logoutOauth()
      console.log(err)
      return Promise.reject(err)
    },
  )
  return api
}
