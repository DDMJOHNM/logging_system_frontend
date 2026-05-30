<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900 mb-[10px]">Logs</h1>
    <TableList :logs="logs" :getLogs="getLogs" />
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

onMounted(() => {
  getLogs(1, 10)
})

async function getLogs(page: number, per_page: number) {
  const { project_id } = useRoute().query
  if (!project_id || typeof project_id !== 'string') return
  const response = await $fetch<{ logs: LogsPaginator }>('/api/logs', { query: { project_id, page, per_page } })
  logs.value = response.logs
}
</script>

