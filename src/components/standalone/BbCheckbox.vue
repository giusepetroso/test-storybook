<template>
  <label class="bb-checkbox" :class="classes">
    <Checkbox
      class="bb-checkbox__control"
      :checked="checked"
      :disabled="disabled"
      :modelValue="modelValue"
      @update:modelValue="(value) => $emit('update:modelValue', value)"
    />
    <div class="bb-checkbox__label">
      <slot v-if="!$slots.checkedLabel && !$slots.uncheckedLabel"></slot>
      <slot v-if="modelValue" name="checkedLabel"></slot>
      <slot v-if="!modelValue" name="uncheckedLabel"></slot>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Checkbox from "./BaseCheckbox.vue";

// TODO: Probably vue defineProps does not accept complex interfaces
// import type { Props as CheckboxProps } from "./BbCheckbox.vue";
// interface Props extends CheckboxProps {
//   labelPosition?: LabelPosition;
//   labelGap?: string;
// }

type LabelPosition = "top" | "bottom" | "left" | "right";
type LabelGap = 1 | 2 | 4 | 6 | 8 | 10 | 12;

interface Props {
  modelValue?: any;
  checked?: boolean | any[];
  disabled?: boolean;
  labelPosition?: LabelPosition;
  labelGap?: LabelGap;
}

const props = withDefaults(defineProps<Props>(), {
  labelPosition: "right",
  labelGap: 2,
});
defineEmits(["update:modelValue"]);

const classes = computed(() => ({
  [`bb-checkbox--label-gap-${props.labelGap}`]: props.labelGap,
  [`bb-checkbox--label-${props.labelPosition}`]: props.labelPosition,
}));
</script>
