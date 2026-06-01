<template>
  <div class="mb-3">
    <label for="severity" class="sr-only">Severity</label>
    <div class="mt-2">
      <div
        class="flex items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[select:focus]:outline-2 has-[select:focus]:-outline-offset-2 has-[select:focus]:outline-indigo-600"
      >
        <div class="shrink-0 pl-3 text-base text-gray-500 select-none sm:text-sm/6">Severity</div>
        <select
          id="severity"
          v-model="severity"
          name="severity"
          aria-label="Filter by severity"
          class="block min-w-0 grow border-0 bg-transparent py-1.5 pr-2 pl-2 text-base text-gray-900 focus:outline-none focus:ring-0 sm:text-sm/6"
        >
          <option v-for="option in severityOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <div class="h-6 w-px shrink-0 bg-gray-300" aria-hidden="true" />
        <div class="shrink-0 pl-3 text-base text-gray-500 select-none sm:text-sm/6">Order by</div>
        <select
          id="order-by"
          v-model="orderBy"
          name="order-by"
          aria-label="Order by field"
          class="block min-w-0 grow border-0 bg-transparent py-1.5 pr-2 pl-2 text-base text-gray-900 focus:outline-none focus:ring-0 sm:text-sm/6"
        >
          <option v-for="option in orderByOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <div class="h-6 w-px shrink-0 bg-gray-300" aria-hidden="true" />
        <select
          id="order-direction"
          v-model="orderDirection"
          name="order-direction"
          aria-label="Sort direction"
          class="shrink-0 border-0 bg-transparent py-1.5 pr-3 pl-3 text-base text-gray-900 focus:outline-none focus:ring-0 sm:text-sm/6"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const orderBy = defineModel<string>({ default: 'occurred_at' })
const orderDirection = defineModel<'asc' | 'desc'>('orderDirection', { default: 'desc' })
const severity = defineModel<'' | 'info' | 'warning' | 'error'>('severity', { default: '' })

const SEVERITY_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'error', label: 'Error' },
] as const

const ORDER_BY_FIELDS = [
  'occurred_at',
  'event_id',
  'event_type',
  'severity',
  'project_id',
] as const

const FIELD_LABELS: Record<(typeof ORDER_BY_FIELDS)[number], string> = {
  occurred_at: 'Occurred At',
  event_id: 'Event ID',
  event_type: 'Event Type',
  severity: 'Severity',
  project_id: 'Project ID',
}

const severityOptions = SEVERITY_OPTIONS
const orderByOptions = ORDER_BY_FIELDS.map((value) => ({
  value,
  label: FIELD_LABELS[value],
}))
</script>
