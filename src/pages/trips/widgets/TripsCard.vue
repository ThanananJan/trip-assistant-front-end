<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Trip } from '@/pages/trips/types'
import { useToast, useModal } from 'vuestic-ui'
import { useTripStore } from '@/stores/trip-store'
import { storeToRefs } from 'pinia'
import { avatarColor } from '@/services/utils'
import { useRouter } from 'vue-router'

// 🌟variables
const tripStore = useTripStore()
const { loading } = storeToRefs(tripStore)
const trips = ref([])
const { init: notify } = useToast()
const { confirm } = useModal()
const router = useRouter()
// 🌟functions
const loadTrips = async () => {
  loading.value = true
  trips.value = await tripStore.getTrips()
  loading.value = false
}
const onDelete = async (trip: Trip) => {
  const response = await confirm({
    title: 'Delete trip',
    message: `Are you sure you want to delete trip "${trip.namTrip}"?`,
    okText: 'Delete',
    size: 'small',
    maxWidth: '380px',
  })
  if (!response) {
    return
  }
  await tripStore.delete(trip)
  notify({
    message: 'Trip deleted',
    color: 'success',
  })
  await loadTrips()
}

const gotoTripForm = (idTrip: number, action: 'new' | 'edit') => {
  router.push({ name: 'trip-form', params: { id: idTrip, mode: action } })
}
// 🌟hooks
onMounted(async () => await loadTrips())
</script>

<template>
  <VaInnerLoading v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[4rem]">
    <VaCard
      v-for="trip in trips"
      :key="trip.namTrip"
      :style="{ '--va-card-outlined-border': '1px solid var(--va-background-element)' }"
      outlined
    >
      <VaCardContent class="flex flex-col h-full">
        <div class="text-[var(--va-secondary)]">
          {{ tripStore.formateDate(trip.dtmCreate) }}
        </div>
        <div class="flex flex-col items-center gap-4 grow">
          <h4 class="va-h4 text-center item-center self-stretch overflow-hidden line-clamp-2 text-ellipsis">
            <VaBreadcrumbs>
              <VaBreadcrumbsItem :label="trip.namTrip" :to="{ path: `trips/${trip.idTrip}` }" />
            </VaBreadcrumbs>
          </h4>

          <VaAvatarGroup
            class="my-4"
            :options="
              trip.members.map((user) => ({
                label: user.namMember,
                src: null,
                fallbackText: user.namMember[0],
                color: avatarColor(user.namMember),
              }))
            "
            :max="5"
          />
        </div>
        <VaDivider class="my-6" />
        <div class="flex justify-between">
          <VaButton preset="secondary" icon="mso-edit" color="secondary" @click="gotoTripForm(trip.idTrip, 'edit')" />
          <VaButton preset="secondary" icon="mso-delete" color="danger" @click="onDelete(trip)" />
        </div>
      </VaCardContent>
    </VaCard>
  </VaInnerLoading>
  <div v-else class="p-4 flex justify-center items-center text-[var(--va-secondary)]">No trips</div>
  <div>
    <VaButton class="pl-1 pr-1" preset="primary" size="small" icon="add" @click="gotoTripForm(0, 'new')">TRIP</VaButton>
  </div>
</template>
