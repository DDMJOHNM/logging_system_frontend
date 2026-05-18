<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900 mb-[10px]">Dashboard</h1>
    <p class="mt-2 text-slate-600 mb-[20px]">Welcome to the unified logging and subscription manager.</p>
    <div class="flex flex-col gap-1 border border-gray-300 dark:border-gray-600 rounded-md p-1 mb-[10px]" 
    v-for="project in projectCards" :key="project.id">
      <div class="columns-3 p-[10px]">
      <h2 class="text-lg font-semibold text-slate-900">{{ project.name }}</h2>
      <p class="text-slate-600">{{ project.description }}</p>
      <NuxtLink :to="project.logLink" class="text-blue-500">View Logs</NuxtLink>
      </div>
    </div>   
  </div>
</template>
<script setup lang="ts">
import {reactive} from 'vue';
const projectCards = reactive([
  {
    name: 'Project 1',
    description: 'Project 1 description',
    id: '1',
    logLink: '/logs?project_id=1',
  },
  {
    name: 'Project 2',
    description: 'Project 2 description',
    id: '2',
    logLink: '/logs?project_id=2',
  },
  {
    name: 'Project 3',
    description: 'Project 3 description',
    id: '3',
    logLink: '/logs?project_id=3',
  },
]);
</script>