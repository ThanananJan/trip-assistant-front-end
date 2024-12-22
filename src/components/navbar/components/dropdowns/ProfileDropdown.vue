<template>
  <div class="mr-4" height="32">
    <span>
      <VaIcon />
      <VaIcon class="mr-2" name="user" size="small" />
    </span>
    <h3>{{ jwt.userName }}</h3>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user-store'
import { storeToRefs } from 'pinia'

const { jwt } = storeToRefs(useUserStore())
</script>

<style lang="scss">
.profile-dropdown {
  cursor: pointer;

  &__content {
    .menu-item:hover {
      background: var(--hover-color);
    }
  }

  &__anchor {
    display: inline-block;
  }
}
</style>
