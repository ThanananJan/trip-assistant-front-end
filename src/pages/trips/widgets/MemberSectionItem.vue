<template>
  <VaCard>
    <VaCardContent>
      <section>
        <header class="flex items-center justify-between">
          <div class="text-xl font-semibold grow">
            <span :class="tripMember.balanceAmount >= 0 ? 'text-success' : 'text-danger'">
              {{ formateAmountBath(tripMember.balanceAmount) }}
            </span>
          </div>
          <div>
            <VaAvatar size="small" :color="avatarColor(tripMember.namMember)">{{ tripMember.namMember }}</VaAvatar>
          </div>
        </header>
        <div>
          <p class="mb-2">balance</p>
          <p class="text-xs text-secondary">
            paid : <span>{{ formateAmountBath(tripMember.payerAmount) }} </span>

            , debt : <span>{{ formateAmountBath(tripMember.debtorAmount) }} </span>
          </p>
        </div>
      </section>
    </VaCardContent>
  </VaCard>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { VaCard } from 'vuestic-ui'
import { avatarColor, formateAmountBath } from '@/services/utils'

const props = defineProps<{
  tripMember: {}
}>()
const { tripMember } = toRefs(props)
</script>
