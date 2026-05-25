<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900 mb-[10px]">Logs</h1>
    <TableList :logs="logs" />
  </div>
</template>
<script setup lang="ts">
const logs = ref<any[]>([])

onMounted(() => {
  getLogs()
})

async function getLogs() {
  const { project_id } = useRoute().query
  if (!project_id || typeof project_id !== 'string') return

  const response = await $fetch<{ logs: { data: any[] } }>('/api/logs', { query: { project_id } })
  logs.value = response.logs.data
  console.log(logs.value)
}
</script>

