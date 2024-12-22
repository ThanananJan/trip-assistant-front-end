<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user-store'
import AuthService from '@/services/AuthenService'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const onLoad = async () => {
  const code = ref(
    route.fullPath.includes('#')
      ? route.fullPath
          .split('#')[1]
          .split('&')
          .filter((p) => p.includes('access_token'))[0]
          .split('=')[1]
      : undefined,
  )
  const userStore = useUserStore()
  try {
    if (typeof code.value !== 'undefined') {
      userStore.updateLoginAuth({ accessToken: code.value })
      const token = await new AuthService().RequestToken()
      userStore.updateJwt(token)
      router.push({ name: 'home' })
    } else {
      loginOAuth()
    }
  } catch (e) {
    console.log(e)
    loginOAuth()
  }
}
const loginOAuth = () => {
  new AuthService().loginOauth()
}
onMounted(onLoad)
</script>
