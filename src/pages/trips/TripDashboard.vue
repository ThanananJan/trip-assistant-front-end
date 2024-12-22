<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TripTransactionsTable from '@/pages/trips/widgets/TripTransactionsTable.vue'
import { useTripStore } from '@/stores/trip-store'
import { useRoute } from 'vue-router'
import MemberSectionItem from '@/pages/trips/widgets/MemberSectionItem.vue'
// 🌟variables
const route = useRoute()
const idTrip = route.params.id
const tripStore = useTripStore()
const tripSummary = ref(null)
// 🌟functions

onMounted(async () => {
  tripSummary.value = await tripStore.getTripSummary(idTrip)
})
</script>

<template>
  <div v-if="tripSummary">
    <h1 class="page-title">{{ tripSummary.namTrip }}</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <div>
        <MemberSectionItem
          v-for="member in tripSummary.members"
          :key="member.idMember"
          :trip-member="member"
          class="mb-2"
        >
          <template #icon>
            <VaIcon name="user" size="large" />
          </template>
        </MemberSectionItem>
      </div>
      <div class="">
        <TripTransactionsTable :id-trip="idTrip" />
      </div>
    </div>
  </div>
</template>
