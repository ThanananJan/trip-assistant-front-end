<script lang="ts" setup>
import { onMounted } from 'vue'
import { useTripStore } from '@/stores/trip-store'
// 🌟variables
const tripStore = useTripStore()

// 🌟functions
const loadTrips = async () => {
  await tripStore.loadTrips()
}
onMounted(loadTrips)
</script>

<template>
  <section class="flex flex-col gap-4"></section>
</template>
