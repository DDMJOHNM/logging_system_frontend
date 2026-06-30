<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900 mb-[10px]">Log</h1>
    <pre v-if="log" class="overflow-auto rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">{{ log }}</pre>
    <p v-else class="text-slate-600">Loading…</p>
  </div>
</template>
<script setup lang="ts">
type Log = {
  schema_version: string
  event_id: string
  event_type: string
  severity: string
  occurred_at: string
  project_id: string
  user_id: string
  service_type: string
  request_id: string
  tokens_used: number
  latency_ms: number
  has_correction: boolean
  has_recommended: boolean
  has_appointment: boolean
  provider: string
  model: string
  payload?: unknown
}

const log = ref<Log | null>(null)

onMounted(async () => {
  const { project_id, event_id } = useRoute().query
  if (typeof project_id !== 'string' || typeof event_id !== 'string') return
  log.value = await getLog(project_id, event_id)
  console.log(log.value?.payload)
})

async function getLog(project_id: string, event_id: string): Promise<Log> {
  return await $fetch<Log>('/api/log', {
    query: { project_id, event_id },
  })
}
</script>
