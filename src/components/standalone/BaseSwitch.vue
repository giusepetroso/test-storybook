<template>
  <Switch
    :checked="proxyChecked"
    @update:modelValue="$emit('update:modelValue', !modelValue)"
    :class="{
      checked: proxyChecked,
    }"
    class="bb-switch"
  >
    <span class="sr-only">
      <slot name="sr"></slot>
    </span>
    <span
      :class="proxyChecked ? 'translate-x-[21px]' : 'translate-x-[1px]'"
      class="transition duration-200 ease-in-out transform bb-switch-handle"
    ></span>
  </Switch>
</template>

<script setup lang="ts">
import { Switch } from "@headlessui/vue";
import { computed } from "vue";

export interface Props {
  modelValue?: any;
  checked?: boolean | any[];
}

const props = defineProps<Props>();
defineEmits(["update:modelValue"]);

const proxyChecked = computed(() => {
  if (props.modelValue) return props.modelValue;
  return props.checked;
});
</script>
