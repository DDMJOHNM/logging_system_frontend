<template>
  <table class="table-fixed -[7px] border border-gray-400 dark:border-gray-500 text-sm">
    <thead>
      <tr>
        <th class="border border-gray-300 dark:border-gray-600 p-[7px]">Occurred At</th>
        <th class="border border-gray-300 dark:border-gray-600 p-[7px]">Event ID</th>
        <th class="border border-gray-300 dark:border-gray-600 p-[7px]">Event Type</th>
        <th class="border border-gray-300 dark:border-gray-600 p-[7px]">Severity</th>
        <th class="border border-gray-300 dark:border-gray-600 p-[7px]">Project ID</th>
        <th class="border border-gray-300 dark:border-gray-600 p-[7px]">User ID</th>  
        <th class="border border-gray-300 dark:border-gray-600 p-[7px]">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="log in logs?.data ?? []" :key="log.event_id">
        <td class="border border-gray-300 dark:border-gray-600 p-[5px]">{{ log.occurred_at }}</td>
        <td class="border border-gray-300 dark:border-gray-600 p-[5px]">{{ log.event_id }}</td>
        <td class="border border-gray-300 dark:border-gray-600 p-[5px]">{{ log.event_type }}</td>
        <td class="border border-gray-300 dark:border-gray-600 p-[5px]" :class="{
          'text-green-500 text-center': log.severity === 'info',
           'text-yellow-500 text-center': log.severity === 'warning',
            'text-red-500 text-center': log.severity === 'error'}">
            {{ log.severity }}
          </td>
        <td class="border border-gray-300 dark:border-gray-600 p-[5px]">{{ log.project_id }}</td>
        <td class="border border-gray-300 dark:border-gray-600 p-[5px]">{{ log.user_id }}

        </td>
        <td class="border border-gray-300 dark:border-gray-600 p-[5px]">
          <button class="bg-blue-400 text-white px-1 py-1 rounded-md" @click="viewLog(log.event_id)">View</button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="7" class="border border-gray-300 dark:border-gray-600 p-[7px]">
          <div class="flex justify-center items-center gap-2">
            <button class="bg-blue-400 text-white px-1 py-1 rounded-md" @click="prevPage()">Prev</button>
            <button class="bg-blue-400 text-white px-1 py-1 rounded-md" @click="nextPage()">Next</button>
            {{ logs?.current_page }} ({{ logs?.to }} of {{ logs?.total }} totals: {{ logs?.total }})
          </div>
        </td>
      </tr>    
    </tfoot>
    </table>
</template>
<script setup lang="ts">
const props = defineProps<{
  getLogs: (page: number, per_page: number) => Promise<void>
  logs: {
    data: any[]
    current_page: number
    from: number
    to: number
    last_page: number
    per_page: number
    total: number
  } | null
}>()

const viewLog = (event_id: string) => {
  alert(`Viewing log ${event_id}`)
}

const currentPage = computed(() => props.logs?.current_page ?? 1)

const totalPages = computed(() => props.logs?.last_page ?? 1)

const prevPage = async () => {
  if (currentPage.value <= 1) return
  await props.getLogs(currentPage.value - 1, props.logs?.per_page ?? 10)
}

const nextPage = async () => {
  if (currentPage.value >= totalPages.value) return
  await props.getLogs(currentPage.value + 1, props.logs?.per_page ?? 10)
}
</script>

