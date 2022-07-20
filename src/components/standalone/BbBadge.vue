<template>
  <span :class="classes">
    <template v-if="value">{{ value }}</template>
    <template v-else><slot></slot></template>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value?: string;

  light?: boolean;
  outline?: boolean;

  primary?: boolean;
  secondary?: boolean;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;

  color?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const classes = computed(() => ({
  "bb-badge": true,

  "bb-badge--light": props.light,
  "bb-badge--outline": !props.light && props.outline,

  "bb-badge--primary":
    !props.color &&
    (props.primary ||
      (!props.secondary &&
        !props.info &&
        !props.success &&
        !props.warning &&
        !props.error)),
  "bb-badge--secondary": !props.color && props.secondary,
  "bb-badge--info": !props.color && props.info,
  "bb-badge--success": !props.color && props.success,
  "bb-badge--warning": !props.color && props.warning,
  "bb-badge--error": !props.color && props.error,

  [`bb-badge--${props.color}`]: props.color,
}));
</script>
