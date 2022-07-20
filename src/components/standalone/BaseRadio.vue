<template>
  <label
    class="bb-radio-base"
    :class="{
      checked,
      focused,
      disabled,
    }"
  >
    <input
      ref="el"
      type="radio"
      class="sr-only"
      :name="($attrs.name as string)"
      :value="value"
      @click="$emit('update:modelValue', ($event.target as any).value)"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span v-show="checked" class="bb-radio-base__dot"></span>
  </label>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from "vue";

export interface Props {
  value: any;
  modelValue?: any;
  disabled?: boolean;
}

const props = defineProps<Props>();
defineEmits(["update:modelValue"]);

const el = ref<any>(null);
onMounted(() => {
  if (props.disabled) el.value.tabIndex = "-1";
});

const focused = ref(false);

const { value, modelValue } = toRefs(props);
const checked = ref(false);
watch<any>(modelValue, (newVal) => {
  checked.value = value.value == newVal;
});
</script>
