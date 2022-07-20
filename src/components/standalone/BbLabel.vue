<template>
  <label class="bb-label">
    <template v-if="value">{{ value }}</template>
    <template v-else><slot></slot></template>
  </label>
</template>

<script setup lang="ts">
interface Props {
  value?: string;
}
defineProps<Props>();
</script>
