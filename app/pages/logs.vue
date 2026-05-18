<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900 mb-[10px]">Logs</h1>
    <TableList :logs="logs" />
  </div>
</template>
<script setup lang="ts">

import {reactive} from 'vue';
const dummyData = [
{
  "schema_version": "1.0.0",
  "event_id": "3f8c1c4e-2c4a-4c1a-9e3d-9b2f0c7d9a40",
  "event_type": "model.inference.completed",
  "severity": "info",
  "occurred_at": "2026-04-09T17:30:00Z",
  "project_id": "project-12345",
  "user_id": "user-67890",
  "service_type": "chat-completion",
  "request_id": "req-abc-123",
  "tokens_used": 1520,
  "latency_ms": 842,
  "has_correction": false,
  "has_recommended": true,
  "has_appointment": false,
  "provider": "OpenAI",
  "model": "gpt-4.1"
},

{
  "schema_version": "1.0.0",
  "event_id": "3f8c1c4e-2c4a-4c1a-9e3d-9b2f0c7d9a41",
  "event_type": "model.inference.completed",
  "severity": "info",
  "occurred_at": "2026-04-09T17:30:00Z",
  "project_id": "project-12345",
  "user_id": "user-67890",
  "service_type": "chat-completion",
  "request_id": "req-abc-123",
  "tokens_used": 1520,
  "latency_ms": 842,
  "has_correction": false,
  "has_recommended": true,
  "has_appointment": false,
  "provider": "OpenAI",
  "model": "gpt-4.1"
},
{
  "schema_version": "1.0.0",
  "event_id": "3f8c1c4e-2c4a-4c1a-9e3d-9b2f0c7d9a42",
  "event_type": "model.inference.completed",
  "severity": "info",
  "occurred_at": "2026-04-09T17:30:00Z",
  "project_id": "project-12345",
  "user_id": "user-67890",
  "service_type": "chat-completion",
  "request_id": "req-abc-123",
  "tokens_used": 1520,
  "latency_ms": 842,
  "has_correction": false,
  "has_recommended": true,
  "has_appointment": false,
  "provider": "OpenAI",
  "model": "gpt-4.1"
}
];

const logs = reactive(dummyData);

</script>

