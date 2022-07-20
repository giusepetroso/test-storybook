<template>
    <div class="relative w-full" :class="$attrs.class">
        <div
            class="
                absolute
                top-0
                left-0
                h-full
                w-10
                grid
                place-items-center
                text-bb-gray-500
            "
        >
            <SearchIcon v-if="!searching" class="w-5 h-5" />
            <RefreshIcon v-if="searching" class="w-5 h-5 animate-spin" />
        </div>
        <input
            class="bb-form-control w-full pl-10"
            :class="{ readonly: readonly !== undefined }"
            :value="modelValue"
            v-bind="{
                placeholder: $attrs.placeholder,
            }"
            @keyup="emitValue"
            ref="input"
        />
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { SearchIcon, RefreshIcon } from "@heroicons/vue/solid";

export default defineComponent({
    inheritAttrs: false,

    components: { SearchIcon, RefreshIcon },

    props: ["modelValue", "readonly", "searching"],

    emits: ["update:modelValue"],

    setup(_, { emit }) {
        const input = ref(null);

        function emitValue() {
            emit("update:modelValue", input.value.value);
        }

        function focus() {
            this.$refs.input.focus();
        }

        return { input, focus, emitValue };
    },
});
</script>
