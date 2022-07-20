<template>
  <Link :class="classes">
    <slot></slot>
  </Link>
</template>

<script setup lang="ts">
interface Props {
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
}
const props = defineProps<Props>();
const classes = {
  "bb-link-primary": !props.secondary,
  "bb-link-secondary": props.secondary,
  "bb-link-success": props.success,
  "bb-link-warning": props.warning,
  "bb-link-error": props.error,
};
</script>
