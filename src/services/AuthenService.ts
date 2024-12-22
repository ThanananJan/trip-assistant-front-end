import apiService from '@/services/ApiAuthService'
import { useUserStore } from '@/stores/user-store'
import ClientOAuth2 from 'client-oauth2'
const userStore = useUserStore()
export default class AuthService {
  async RequestToken() {
    const response = await apiService().get('auth/token/')
    return response.data
  }
  async refreshToken() {
    const jwt = userStore.jwt
    const response = await apiService().post('auth/token/refresh', jwt)
    return response.data
  }

  async loginOauth() {
    const config = await this.getOauthConfig()
    const uri = config.token.getUri()
    window.location.href = uri
  }
  logoutOauth() {
    userStore.logout()
    const redirectUrl = `${import.meta.env.VITE_APP_REDIRECT_URI}`
    window.location.href = redirectUrl
  }
  getOauthConfig() {
    return new ClientOAuth2({
      clientId: import.meta.env.VITE_APP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_APP_CLIENT_SECRET,
      accessTokenUri: import.meta.env.VITE_APP_ACCESS_TOKEN_URI,
      authorizationUri: import.meta.env.VITE_APP_AUTHORIZATION_URI,
      redirectUri: import.meta.env.VITE_APP_REDIRECT_URI,
      scopes: ['email', 'openid', 'phone'],
    })
  }
  getTokenOauthConfig() {
    return new ClientOAuth2({
      clientId: import.meta.env.VITE_APP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_APP_CLIENT_SECRET,
      accessTokenUri: import.meta.env.VITE_APP_ACCESS_TOKEN_URI,
      authorizationUri: import.meta.env.VITE_APP_AUTHORIZATION_URI,
      redirectUri: import.meta.env.VITE_APP_REDIRECT_URI,
      scopes: ['email', 'openid', 'phone'],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(import.meta.env.VITE_APP_CLIENT_ID + ':' + import.meta.env.VITE_APP_CLIENT_SECRET),
        grant_type: 'authorization_code',
        client_id: import.meta.env.VITE_APP_CLIENT_ID,
        code: `${userStore.code}`,
        redirect_uri: `${location.href}`,
      },
    })
  }
}
