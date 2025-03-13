<script setup lang="ts">
import type { Participant } from '@/types'
defineProps<{ participant: Participant }>()
</script>

<template>
  <RouterLink class="event-link" :to="{ name: 'participant-list-view', params: { id: participant.id } }">
    <div class="event-card">
      <h2>{{ participant.name }}</h2>
      <p>{{ participant.email }} </p>
      <section>
        <h2>List of Joined Events</h2>
        <dl v-if="participant.events.length" aria-live="polite">
          <template v-for="event in participant.events" :key="event.id">
            <dt><strong>- {{ event.title }}:</strong> {{ event.description }}</dt>
            <dd>
              @ {{ event.time }} on {{ event.date }}
            </dd>
          </template>
        </dl>
        <p v-else>No events joined yet.</p>
      </section>

    </div>
  </RouterLink>
</template>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  text-decoration: none;
  color: inherit;                                                      
}

dd {
  margin-bottom: 0.75rem;
}
</style>
