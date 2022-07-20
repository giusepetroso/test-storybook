<template>
  <a :class="{ ...classes, disabled: disabled }">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  disabled?: boolean;

  primary?: boolean;
  secondary?: boolean;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;

  color?: string;
  variant?: string;
}
const props = defineProps<Props>();

const classes = computed(() => ({
  "bb-link": true,

  "bb-link--primary": !props.color && props.primary,
  "bb-link--secondary": !props.color && props.secondary,
  "bb-link--info": !props.color && props.info,
  "bb-link--success": !props.color && props.success,
  "bb-link--warning": !props.color && props.warning,
  "bb-link--error": !props.color && props.error,

  [`bb-link--${props.color}`]: props.color,
  [`bb-link--${props.variant}`]: props.variant,
}));
</script>
