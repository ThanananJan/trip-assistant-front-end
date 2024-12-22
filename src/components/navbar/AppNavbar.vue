<template>
  <VaNavbar class="app-layout-navbar py-2 px-2">
    <template #left>
      <div class="left">
        <RouterLink to="/trips" aria-label="Visit home page">
          <Logo />
        </RouterLink>
      </div>
    </template>
    <template #right>
      <AppNavbarActions class="app-navbar__actions mr-2" :is-mobile="isMobile" />
      <MenuNavigation class="mr-2" />
    </template>
  </VaNavbar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '../../stores/global-store'
import AppNavbarActions from './components/AppNavbarActions.vue'
import Logo from '../Logo.vue'
import MenuNavigation from '../app-layout-navigation/MenuNavigation.vue'

defineProps({
  isMobile: { type: Boolean, default: false },
})

const GlobalStore = useGlobalStore()
</script>

<style lang="scss" scoped>
.va-navbar {
  z-index: 2;

  @media screen and (max-width: 950px) {
    .left {
      width: 100%;
    }

    .app-navbar__actions {
      display: flex;
      justify-content: space-between;
    }
  }
}

.left {
  display: flex;
  align-items: center;
  margin-left: 1rem;

  & > * {
    margin-right: 1rem;
  }

  & > *:last-child {
    margin-right: 0;
  }
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: transform 0.5s ease;
}

.icon-fade-enter,
.icon-fade-leave-to {
  transform: scale(0.5);
}
</style>
