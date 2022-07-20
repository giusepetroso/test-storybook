<template>
  <teleport to="body">
    <TransitionRoot as="template" :show="isOpen">
      <Dialog @close="close()" class="bb-modal">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="bb-modal-overlay"></div>
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            as="div"
            class="relative z-10 max-w-full py-8"
            :class="{
              'xl:w-[1280px] xl:max-w-7xl': size == 'xl',
              'lg:w-[1024px] lg:max-w-5xl': size == 'lg' || size == 'xl',
              'sm:w-[576px] sm:max-w-xl':
                size == 'md' || size == 'lg' || size == 'xl',
              'sm:w-[384px] sm:max-w-sm': size == 'sm',
            }"
          >
            <XIcon
              v-if="withClose"
              class="absolute cursor-pointer bb-modal-close-icon"
              @click="close()"
            />
            <slot></slot>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/solid";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface Props {
  size?: ModalSize;
  withClose?: boolean;
}
withDefaults(defineProps<Props>(), {
  size: "md",
});

const isOpen = ref(false);

function open() {
  isOpen.value = true;
}
function close() {
  isOpen.value = false;
}

defineExpose({
  open,
  close,
});
</script>
