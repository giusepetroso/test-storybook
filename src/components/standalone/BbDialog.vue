<template>
  <teleport to="body">
    <TransitionRoot appear as="template" :show="isOpen">
      <Dialog @close="close()" class="bb-dialog">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="bb-dialog-overlay"></div>
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
            class="relative z-10 max-w-full"
            :class="{
              'md:w-[896px] md:max-w-4xl': size == 'lg',
              'md:w-[576px] md:max-w-xl': size == 'md',
              'md:w-[384px] md:max-w-sm': !size || size == 'sm',
            }"
          >
            <!-- header -->
            <div
              class="flex items-center justify-between p-6 rounded-t-xl border"
              :class="{
                'bg-white border-bb-gray-300': !type || type == 'default',
                'bg-bb-primary-100 border-bb-primary-100': type == 'primary',
                'bg-bb-success-100 border-bb-success-100': type == 'success',
                'bg-bb-warning-100 border-bb-warning-100': type == 'warning',
                'bg-bb-error-100 border-bb-error-100': type == 'error',
              }"
            >
              <div class="flex flex-col justify-center">
                <DialogTitle
                  class="bb-dialog-title"
                  :class="{
                    'text-bb-primary':
                      !type || type == 'default' || type == 'primary',
                    'text-bb-success': type == 'success',
                    'text-bb-warning': type == 'warning',
                    'text-bb-error': type == 'error',
                  }"
                >
                  <slot name="title"></slot>
                </DialogTitle>

                <DialogDescription v-if="$slots.description">
                  <div class="bb-dialog-description">
                    <slot name="description"></slot>
                  </div>
                </DialogDescription>
              </div>

              <button class="p-2" @click="close()">
                <XIcon
                  class="w-6 h-6"
                  :class="{
                    'text-bb-primary':
                      !type || type == 'default' || type == 'primary',
                    'text-bb-success': type == 'success',
                    'text-bb-warning': type == 'warning',
                    'text-bb-error': type == 'error',
                  }"
                />
              </button>
            </div>

            <!-- body -->
            <div class="bb-dialog-body">
              <slot></slot>

              <div class="flex flex-wrap items-center justify-end pt-6 gap-6">
                <button
                  v-if="!noCancel"
                  class="bb-link"
                  :class="{
                    'bb-link--primary': type != 'error',
                    'bb-link--error': type == 'error',
                  }"
                  @click="close()"
                >
                  {{ cancelText }}
                </button>
                <slot name="buttons"></slot>
              </div>
            </div>
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
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/solid";

interface Props {
  size?: "sm" | "md" | "lg";
  type?: "default" | "primary" | "success" | "warning" | "error" | undefined;
  cancelText?: string;
  noCancel?: boolean;
}
withDefaults(defineProps<Props>(), {
  size: "md",
  type: "default",
  cancelText: "Cancel",
});

const isOpen = ref(false);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function open() {
  isOpen.value = true;
}
function close() {
  isOpen.value = false;
}
</script>
