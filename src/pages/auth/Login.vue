<script lang="ts" setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user-store'
import AuthService from '@/services/AuthenService'

const onLoad = async () => {
  const userStore = useUserStore()
  userStore.logout()
  new AuthService().loginOauth()
}

onMounted(onLoad)
</script>
