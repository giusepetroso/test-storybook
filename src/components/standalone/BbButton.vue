<template>
  <button
    :aria-disabled="!!($attrs.disabled as boolean)"
    :type="type"
    :class="classes"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  size?: "sm" | "md" | "lg";
  tag?: "a" | "button";

  icon?: boolean;
  rounded?: boolean;

  light?: boolean;
  outline?: boolean;

  primary?: boolean;
  secondary?: boolean;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;

  color?: string;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  tag: "button",
});

const classes = computed(() => ({
  "bb-btn": true,

  "bb-btn--icon": props.icon,
  "bb-btn--rounded": !props.icon && props.rounded,
  "bb-btn--light": props.light,
  "bb-btn--outline": !props.light && props.outline,

  "bb-btn--primary":
    !props.color &&
    (props.primary ||
      (!props.secondary &&
        !props.info &&
        !props.success &&
        !props.warning &&
        !props.error)),
  "bb-btn--secondary": !props.color && props.secondary,
  "bb-btn--info": !props.color && props.info,
  "bb-btn--success": !props.color && props.success,
  "bb-btn--warning": !props.color && props.warning,
  "bb-btn--error": !props.color && props.error,

  [`bb-btn--${props.size}`]: props.size,
  [`bb-btn--${props.color}`]: props.color,
  [`bb-btn--${props.variant}`]: props.variant,
}));
</script>
