<template>
  <label class="inline-flex bb-switch-wrapper" :class="wrapperClasses">
    <Switch
      :checked="checked"
      :disabled="disabled"
      :modelValue="modelValue"
      @update:modelValue="(value) => $emit('update:modelValue', value)"
    />
    <div class="bb-switch-label">
      <slot v-if="!$slots.checkedLabel && !$slots.uncheckedLabel"></slot>
      <slot v-if="modelValue" name="checkedLabel"></slot>
      <slot v-if="!modelValue" name="uncheckedLabel"></slot>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Switch from "./BaseSwitch.vue";

// TODO: Probably vue defineProps does not accept complex interfaces
// import type { Props as SwitchProps } from "./BbSwitch.vue";
// interface Props extends SwitchProps {
//   labelPosition?: LabelPosition;
//   labelGap?: string;
// }

type LabelPosition = "top" | "bottom" | "left" | "right";

interface Props {
  modelValue?: any;
  checked?: boolean | any[];
  disabled?: boolean;
  labelPosition?: LabelPosition;
  labelGap?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelPosition: "right",
  labelGap: "gap-2",
});
defineEmits(["update:modelValue"]);

const wrapperClasses = computed(() => {
  let c = props.labelGap;

  switch (props.labelPosition) {
    case "top":
      c += " flex-col-reverse";
      break;
    case "bottom":
      c += " flex-col";
      break;
    case "left":
      c += " flex-row-reverse";
      break;
    case "right":
      c += " flex-row";
      break;
  }

  return c;
});
</script>
