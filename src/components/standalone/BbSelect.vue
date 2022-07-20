<template>
  <div class="bb-select">
    <div class="bb-select-input-wrapper">
      <input type="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

interface SelectOption {
  value: any;
  label: string;
}

interface Props {
  modelValue: any;
  options:
    | object
    | SelectOption[]
    | ((query: string) => Promise<object>)
    | ((query: string) => Promise<SelectOption[]>);
  disabled?: boolean;
  noClear?: boolean;
}

defineProps<Props>();
const emits = defineEmits(["update:modelValue"]);

// check options schema
</script>
