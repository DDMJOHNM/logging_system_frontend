<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900 mb-[10px]">Logs</h1>
    <TableList
      v-model:order-by="orderBy"
      v-model:order-direction="orderDirection"
      v-model:severity="severity"
      :logs="logs"
      :getLogs="getLogs"
    />
  </div>
</template>
<script setup lang="ts">
type LogsPaginator = {
  data: any[]
  current_page: number
  from: number
  to: number
  last_page: number
  per_page: number
  total: number
  prev_page_url: string | null
  next_page_url: string | null
}

const logs = ref<LogsPaginator | null>(null)
const orderBy = ref('occurred_at')
const orderDirection = ref<'asc' | 'desc'>('desc')
const severity = ref<'' | 'info' | 'warning' | 'error'>('')

onMounted(() => {
  getLogs(1, 10, orderBy.value, orderDirection.value, severity.value)
})

async function getLogs(
  page: number,
  per_page: number,
  order_by = orderBy.value,
  direction: 'asc' | 'desc' = orderDirection.value,
  severityFilter: '' | 'info' | 'warning' | 'error' = severity.value,
) {
  const { project_id } = useRoute().query
  if (!project_id || typeof project_id !== 'string') return
  orderBy.value = order_by
  orderDirection.value = direction
  severity.value = severityFilter
  const response = await $fetch<{ logs: LogsPaginator }>('/api/logs', {
    query: {
      project_id,
      page,
      per_page,
      order_by,
      direction,
      ...(severityFilter ? { severity: severityFilter } : {}),
    },
  })
  logs.value = response.logs
}
</script>

