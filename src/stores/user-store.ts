import { defineStore } from 'pinia'
type JwtModel = {
  userName: string
  accessToken: string
  refreshToken: string
}
type UserInfo = {
  userName: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as UserInfo,
    jwt: {} as JwtModel,
    loginAuth: {} as JwtModel,
    code: '' as string,
  }),

  actions: {
    updateLoginCode(code: any) {
      this.code = code
    },
    updateLoginAuth(auth: any) {
      this.loginAuth = Object.assign({} as JwtModel, auth)
    },
    updateJwt(jwt: any) {
      this.jwt = Object.assign({} as JwtModel, jwt)
    },
    updateUserInfo(userInfo: any) {
      this.userInfo = Object.assign({} as JwtModel, userInfo)
    },
    logout() {
      this.loginAuth = null
      this.jwt = null
      this.userInfo = null
      this.code = null
    },
  },
  getters: {},
  persist: true,
})
