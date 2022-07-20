<template>
  <label
    class="bb-checkbox-base"
    :class="{
      checked: proxyChecked,
      focused,
      disabled,
    }"
  >
    <input
      ref="el"
      type="checkbox"
      class="sr-only"
      :checked="proxyChecked"
      @input="$emit('update:modelValue', ($event.target as any).checked)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <CheckIcon v-show="proxyChecked" class="bb-checkbox-base__icon" />
  </label>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { CheckIcon } from "@heroicons/vue/solid";

export interface Props {
  modelValue?: any;
  checked?: boolean | any[];
  disabled?: boolean;
}

const props = defineProps<Props>();
defineEmits(["update:modelValue"]);

const el = ref<any>(null);
onMounted(() => {
  if (props.disabled) el.value.tabIndex = "-1";
});

const focused = ref(false);

const proxyChecked = computed(() => {
  if (props.modelValue) return props.modelValue;
  return props.checked;
});
</script>
