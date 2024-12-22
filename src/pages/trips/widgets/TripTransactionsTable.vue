<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { defineVaDataTableColumns } from 'vuestic-ui'
import { useTripStore } from '@/stores/trip-store'
import { storeToRefs } from 'pinia'
import { TripTransaction } from '@/pages/trips/types'
import { avatarColor } from '@/services/utils'
import { useRouter } from 'vue-router'
import { useToast } from 'vuestic-ui'
// 🌟variables
const { init: notify } = useToast()
const props = defineProps({
  idTrip: Number,
})
const tripTransactions = ref([])
const tripStore = useTripStore()
const { loading } = storeToRefs(tripStore)
const columns = defineVaDataTableColumns([
  { label: 'Name', key: 'name', sortable: true },
  { label: 'Amount', key: 'amount', sortable: true },
  { label: 'Payer', key: 'payer', sortable: true },
  { label: 'Debtors', key: 'debtors', sortable: true },
  { label: 'Date', key: 'date', sortable: true },
  { label: 'Action', key: 'action', sortable: false },
])
const router = useRouter()
// 🌟computed

// 🌟functions
const loadTripTransaction = async () => {
  loading.value = true
  tripTransactions.value = await tripStore.getTripTransaction(props.idTrip)
  loading.value = false
}
const onDelete = async (tran: TripTransaction) => {
  const response = await confirm({
    title: 'Delete transaction',
    message: `Are you sure you want to delete trip "${tran.dscTransaction}"?`,
    okText: 'Delete',
    size: 'small',
    maxWidth: '380px',
  })
  if (!response) {
    return
  }
  await tripStore.deleteTransaction(tran)
  notify({
    message: 'Transaction deleted',
    color: 'success',
  })
  await loadTripTransaction()
}
const gotoTransactionForm = (idTransaction, action: 'new' | 'update') => {
  router.push({
    name: 'trans-form',
    params: { id: props.idTrip, mode: action, idTransaction: idTransaction },
  })
}

// 🌟hooks
onMounted(async () => {
  await loadTripTransaction()
})
</script>

<template>
  <VaInnerLoading v-if="!loading">
    <VaCard class="overflow-auto text-xs">
      <VaCardTitle> </VaCardTitle>
      <VaCardContent class="flex">
        <div class="align-middle">
          <VaDataTable
            ref="table"
            :items="tripTransactions"
            :columns="columns"
            :loading="isLoading"
            class="scroll-smooth md:scroll-auto"
          >
            <template #header(action)="{}">
              <div class="flex justify-end">
                <VaButton
                  class="pl-1 pr-1"
                  preset="primary"
                  size="small"
                  icon="add"
                  @click="gotoTransactionForm(0, 'new')"
                ></VaButton>
              </div>
            </template>
            <template #cell(name)="{ rowData }">
              <div class="ellipsis max-w-[230px] lg:max-w-[450px]">
                {{ rowData.dscTransaction }}
              </div>
            </template>
            <template #cell(payer)="{ rowData }">
              <VaAvatar
                v-if="rowData.tripPayer != null"
                size="small"
                :color="avatarColor(rowData.tripPayer.namPayer)"
                >{{ rowData.tripPayer.namPayer[0] }}</VaAvatar
              >
            </template>
            <template #cell(debtors)="{ rowData }">
              <VaAvatarGroup
                v-if="rowData.tripDebtors.length > 0"
                size="small"
                :options="
                  rowData.tripDebtors.map((user) => ({
                    label: user.namDebtor,
                    src: null,
                    fallbackText: user.namDebtor[0],
                    color: avatarColor(user.namDebtor),
                  }))
                "
                :max="2"
              />
              <div v-else>all</div>
            </template>
            <template #cell(date)="{ rowData }">
              {{ tripStore.formateDate(rowData.dtmCreate) }}
            </template>
            <template #cell(action)="{ rowData }">
              <div class="flex justify-between">
                <VaButton
                  preset="secondary"
                  icon="mso-edit"
                  color="secondary"
                  @click="gotoTransactionForm(rowData.idTripTransaction, 'update')"
                />
                <VaButton preset="secondary" icon="mso-delete" color="danger" @click="onDelete(rowData)" />
              </div>
            </template>
          </VaDataTable>
        </div>
      </VaCardContent>
    </VaCard>
  </VaInnerLoading>
</template>
