<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { SelectOption, useToast } from 'vuestic-ui'
import { useTripStore } from '@/stores/trip-store'
import { useRouter, useRoute } from 'vue-router'

// 🌟variables
const route = useRoute()
const router = useRouter()
const idTrip = route.params.id
const mode = route.params.mode
const members = ref([])
const tripStore = useTripStore()
const selectTrip = ref(null)
const { init: notify } = useToast()

// 🌟computed
const isNewMode = computed(() => mode == 'new')
const saveButtonLabel = computed(() => (isNewMode.value ? 'Add' : 'Save'))
// 🌟functions
const required = (v: string | SelectOption) => !!v || 'This field is required'
const setMembers = () => {
  if (selectTrip.value != null && selectTrip.value.members != null && selectTrip.value.members.length > 0) {
    selectTrip.value.members = selectTrip.value.members.map((m) => ({
      idTripMember: m.idTripMember,
      namMember: m.namMember,
      id: m.idTripMember,
    }))
    members.value = selectTrip.value.members
  } else {
    members.value = []
  }
}
const addNewMember = (name: string) => {
  const member = {
    id: members.value.map((p) => p.id).reduce((max, c) => (max > c ? max : c), 0) + 1,
    namMember: name,
    isNew: true,
  }
  members.value.push(member)
}
const deleteChip = (chip: TripMember) => {
  selectTrip.value.members = selectTrip.value.members.filter((m) => m.id !== chip.id)
}
const onSave = async () => {
  if (isNewMode.value) {
    await tripStore.create(selectTrip.value)
    notify({
      message: 'Trip created',
      color: 'success',
    })
  } else {
    await tripStore.update(selectTrip.value)
    notify({
      message: 'Trip updated',
      color: 'success',
    })
  }
  gotoTripPage()
}
const setSelectTrip = async () => {
  if (isNewMode.value) {
    selectTrip.value = tripStore.getTripCreate()
  } else {
    selectTrip.value = await tripStore.getTripUpdate(idTrip)
  }
}
const gotoTripPage = () => {
  router.push({ name: 'trips' })
}
// 🌟hooks
onMounted(async () => {
  await setSelectTrip()
  setMembers()
})
</script>

<template>
  <VaCard v-if="selectTrip != null">
    <VaCardContent>
      <h1 v-if="tripStore.isCreateMode" class="va-h5 mb-4">Add trip</h1>
      <h1 v-else class="va-h5 mb-4">Edit trip</h1>
      <VaForm v-slot="{ validate }" class="flex flex-col gap-2 xs12 md8 lg8">
        <VaInput v-model="selectTrip.namTrip" label="Trip name" :rules="[required]" />
        <VaSelect
          v-model="selectTrip.members"
          label="members"
          :options="members"
          text-by="namMember"
          multiple
          allow-create
          track-by="id"
          highlight-matched-text
          @createNew="addNewMember"
        >
          <template #content="{}">
            <VaChip
              v-for="chip in selectTrip.members"
              :key="chip.id"
              :text="chip.namMember"
              size="small"
              class="mr-1 my-1"
              closeable
              @update:modelValue="deleteChip(chip)"
            >
              {{ chip.namMember }}
            </VaChip>
          </template>
        </VaSelect>
        <VaDateInput v-model="selectTrip.dtmCreate" label="Date" readonly />
        <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2 mb-2">
          <VaButton preset="secondary" color="secondary" @click="gotoTripPage()">Cancel</VaButton>
          <VaButton @click="validate() && onSave()">{{ saveButtonLabel }}</VaButton>
        </div>
      </VaForm>
    </VaCardContent>
  </VaCard>
</template>

<style lang="scss" scoped>
.va-select-content__autocomplete {
  flex: 1;
}
.va-input-wrapper__text {
  gap: 0.2rem;
}
</style>
