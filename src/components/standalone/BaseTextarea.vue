<template>
  <textarea
    ref="textarea"
    class="bb-input"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as any)?.value)"
  >
    <slot></slot>
</textarea
  >
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  modelValue: any;
}

defineProps<Props>();
defineEmits(["update:modelValue"]);

const textarea = ref<any>(null);

function focus() {
  textarea.value?.focus();
}

function blur() {
  textarea.value?.blur();
}

defineExpose({
  focus,
  blur,
});
</script>
