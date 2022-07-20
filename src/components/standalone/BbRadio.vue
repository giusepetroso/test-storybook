<template>
  <label class="bb-radio" :class="classes">
    <Radio
      class="bb-radio__control"
      :value="value"
      :disabled="disabled"
      :modelValue="modelValue"
      @update:modelValue="(value) => $emit('update:modelValue', value)"
    />
    <div class="bb-radio__label">
      <slot v-if="!$slots.checkedLabel && !$slots.uncheckedLabel"></slot>
      <slot v-if="value == modelValue" name="checkedLabel"></slot>
      <slot v-if="value != modelValue" name="uncheckedLabel"></slot>
      <slot name="valueLabel" :value="value" :modelValue="modelValue"></slot>
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Radio from "./BaseRadio.vue";

type LabelPosition = "top" | "bottom" | "left" | "right";
type LabelGap = 1 | 2 | 4 | 6 | 8 | 10 | 12;

// TODO: Probably vue defineProps does not accept complex interfaces
// import type { Props as RadioProps } from "./BbRadio.vue";
// interface Props extends RadioProps {
//   labelPosition?: LabelPosition;
//   labelGap?: string;
// }

interface Props {
  value: any;
  modelValue?: any;
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
