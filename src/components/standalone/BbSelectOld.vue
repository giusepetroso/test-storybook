<template>
  <multiselect
    class="bb-select"
    :value="modelValue"
    :disabled="disabled"
    @change="(value: any) => $emit('update:modelValue', value)"
    @search:focus="setFocus"
    v-model="inner"
    ref="select"
  >
    <template #clear="{ clear }">
      <span
        class="multiselect-clear"
        :class="{
          hidden: noClear,
        }"
        @click="(event) => clearSelection(event, clear)"
      >
      </span>
    </template>

    <slot />
  </multiselect>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import Multiselect from "@vueform/multiselect";

interface Props {
  modelValue: any;
  disabled?: boolean;
  noClear?: boolean;
}

const props = defineProps<Props>();
defineEmits(["update:modelValue"]);

const modelValue = toRefs(props).modelValue;
const inner = ref(modelValue.value);

watch(modelValue, (v) => {
  inner.value = v;
});

const select = ref(null);

function setFocus() {
  (select.value as any)?.focus();
}

function clearSelection(event: any, nativeClear: any) {
  event.preventDefault();
  event.stopPropagation();
  nativeClear();
}
</script>
