<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { SelectOption, useToast } from 'vuestic-ui'
import { useTripStore } from '@/stores/trip-store'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
// 🌟variables
const route = useRoute()
const router = useRouter()
const idTrip = route.params.id
const mode = route.params.mode
const idTransaction = route.params.idTransaction
const payers = ref([])
const debtors = ref([])
const tripStore = useTripStore()
const { init: notify } = useToast()
// 🌟computed
const isNewMode = computed(() => mode == 'new')
const saveButtonLabel = computed(() => (isNewMode.value ? 'Add' : 'Save'))
const selectTrip = ref(null)
const selectTransaction = ref(null)
const { loading } = storeToRefs(tripStore)
// 🌟watch
const setMembers = () => {
  if (selectTrip.value != null && selectTrip.value.members != null && selectTrip.value.members.length > 0) {
    debtors.value = selectTrip.value.members.map((m) => ({
      idDebtor: m.idTripMember,
      namDebtor: m.namMember,
    }))
    payers.value = selectTrip.value.members.map((m) => ({
      idPayer: m.idTripMember,
      namPayer: m.namMember,
    }))
  } else {
    payers.value = []
    debtors.value = []
  }
}

const required = (v: string | SelectOption) => !!v || 'This field is required'

// 🌟functions

const onSave = async () => {
  if (isNewMode.value) {
    await tripStore.createTransaction(selectTransaction.value)
    notify({
      message: 'Transaction created',
      color: 'success',
    })
  } else {
    await tripStore.updateTransaction(selectTransaction.value)
    notify({
      message: 'Transaction updated',
      color: 'success',
    })
  }
  gotoTrip()
}
const setSelectTransaction = async () => {
  if (isNewMode.value) {
    selectTransaction.value = tripStore.getTransactionCreate(idTrip)
  } else {
    selectTransaction.value = await tripStore.getTransactionUpdate(idTransaction)
  }
}
const gotoTrip = () => {
  router.push({ name: 'trip', params: { id: idTrip } })
}
// 🌟hooks
onMounted(async () => {
  loading.value = true
  selectTrip.value = await tripStore.getTrip(idTrip)
  setMembers()
  await setSelectTransaction()
  loading.value = false
})
</script>

<template>
  <VaCard v-if="selectTransaction != null">
    <VaCardContent>
      <h1 v-if="tripStore.isTransactionCreateMode" class="va-h5 mb-4">Add transactions</h1>
      <h1 v-else class="va-h5 mb-4">Edit transactions</h1>
      {{ tripStore.isTransactionCreateMode }}
      <VaForm v-slot="{ validate }" class="flex flex-col gap-2 xs12 md8 lg8">
        <VaInput v-model="selectTransaction.dscTransaction" label="Trans name" :rules="[required]" />
        <VaInput v-model="selectTransaction.amount" label="Amount" type="number" :rules="[required]" />
        <VaSelect
          v-model="selectTransaction.tripPayer"
          label="paid by"
          :options="payers"
          text-by="namPayer"
          track-by="idPayer"
          :rules="[required]"
          autocomplete
          highlight-matched-text
        >
        </VaSelect>
        <VaSelect
          v-model="selectTransaction.tripDebtors"
          label="deptor"
          :options="debtors"
          text-by="namDebtor"
          track-by="idDebtor"
          multiple
          autocomplete
          :rules="[required]"
          highlight-matched-text
        >
        </VaSelect>
        <VaDateInput v-model="selectTransaction.dtmCreate" label="Date" />
        <div class="flex justify-end flex-col-reverse sm:flex-row mt-4 gap-2 mb-2">
          <VaButton preset="secondary" color="secondary" @click="gotoTrip()">Cancel</VaButton>
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
