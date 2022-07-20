<template>
  <div class="bb-tooltip">
    <div
      ref="reference"
      class="bb-tooltip__reference"
      @click="handleShow"
      @mouseover="handleShow"
      @mouseenter="handleShow"
      @mouseout="handleShow"
      @mouseleave="handleShow"
    >
      <slot
        name="activator"
        class="bb-tooltip__activator"
        aria-describedby="tooltip"
        :attrs="$attrs"
      >
      </slot>
    </div>

    <Transition
      enter-from-class="bb-tooltip__transition--enter-from"
      enter-active-class="bb-tooltip__transition--enter-active"
      enter-to-class="bb-tooltip__transition--enter-to"
      leave-from-class="bb-tooltip__transition--leave-from"
      leave-active-class="bb-tooltip__transition--leave-active"
      leave-to-class="bb-tooltip__transition--leave-to"
    >
      <div v-show="show" :class="panelClasses" ref="tooltip" role="tooltip">
        <slot></slot>
        <div v-if="!noArrow" class="bb-tooltip__arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, nextTick, computed } from "vue";
import { createPopper } from "@popperjs/core";
import type { Instance } from "@popperjs/core";

type Placement =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";
type Strategy = "absolute" | "fixed";

interface Props {
  type?: "click" | "hover";
  placement?: Placement;
  strategy?: Strategy;
  noArrow?: boolean;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placement: "bottom",
  strategy: "absolute",
  noArrow: false,
});

let popperInstance: Instance | undefined;
const reference = ref<Element>();
const tooltip = ref<HTMLElement>();
const show = ref(false);

onMounted(() => {
  if (reference.value && tooltip.value) {
    popperInstance = createPopper(reference.value, tooltip.value, {
      placement: props.placement,
      strategy: props.strategy,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  }
});

onUnmounted(() => {
  popperInstance = undefined;
});

watch(show, (val) => {
  if (popperInstance && tooltip.value) {
    if (val) {
      popperInstance.update();
      nextTick(() => {
        tooltip.value?.setAttribute("data-show", "");
        popperInstance?.setOptions((options: any) => ({
          ...options,
          modifiers: [
            ...options.modifiers,
            { name: "eventListeners", enabled: true },
          ],
        }));
      });
    } else {
      tooltip.value.removeAttribute("data-show");
      popperInstance.setOptions((options: any) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: "eventListeners", enabled: false },
        ],
      }));
    }
  }
});

function handleShow(ev: Event) {
  if (props.type == "hover") {
    if (ev.type == "mouseover" || ev.type == "mouseenter" || ev.type == "focus")
      show.value = true;
    if (ev.type == "mouseout" || ev.type == "mouseleave" || ev.type == "blur")
      show.value = false;
  }

  if (props.type == "click" && ev.type == "click") show.value = !show.value;
}

const panelClasses = computed(() => ({
  ["bb-tooltip__panel"]: true,
  [`bb-tooltip__panel--${props.color}`]: props.color,
}));
</script>
