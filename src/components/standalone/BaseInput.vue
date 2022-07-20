<template>
  <input
    ref="input"
    class="bb-input"
    :type="proxyType"
    :value="modelValue"
    @input="emitValue"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

interface Props {
  modelValue: any;
  type?: "text" | "number" | "date" | "datetime-local" | "email" | "password";
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});
const emit = defineEmits(["update:modelValue"]);

const input = ref(null);
const proxyType = ref(props.type);
const { modelValue } = toRefs(props);

watch<any>(modelValue, (val) => {
  if (val) handleFocus();
  else handleBlur();
});

function emitValue(event: any) {
  let value = event.target.value;
  emit("update:modelValue", props.type == "number" ? Number(value) : value);
}

function handleFocus() {
  proxyType.value = props.type;
}

function focus() {
  (input?.value as any).focus();
}

function handleBlur() {
  if (
    (props.type == "date" || props.type == "datetime-local") &&
    !props.modelValue
  ) {
    proxyType.value = "text";
  }
}
handleBlur();

function blur() {
  (input?.value as any).blur();
}

defineExpose({
  focus,
  blur,
});
</script>
