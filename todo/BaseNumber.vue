<template>
    <span
        :class="[
            hasErrors
                ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200'
                : 'border-gray-400 focus-within:border-primary-300 focus-within:ring-primary-200',
            { ['bg-white']: !transparent },
        ]"
        class="number-input__input flex rounded-md border focus-within:ring focus-within:ring-opacity-50 p-0 px-4 gap-2"
    >
        <span class="w-6">
            <button
                class="inline-flex items-center text-4xl"
                @click="decrease"
                type="button"
            >
                <span class="leading-none">&minus;</span>
            </button>
        </span>
        <span class="relative flex-auto">
            <input
                :id="id"
                :name="name"
                type="number"
                class="block w-full rounded-md shadow-sm border-0 focus:ring-0 text-center"
                :class="[transparent ? 'bg-transparent' : 'bg-white']"
                :value="innerValue"
                @input.stop="onInput"
                v-bind="$attrs"
            />
        </span>
        <span v-if="hasErrors" class="flex flex-col justify-center w-6">
            <img
                :src="asset.icon('validation_error.svg')"
                alt="Icona errore"
                aria-hidden="true"
            />
        </span>
        <span class="w-6">
            <button
                class="inline-flex items-center text-4xl"
                @click="increase"
                type="button"
            >
                <span class="leading-none">&plus;</span>
            </button>
        </span>
        <span v-if="clearable" class="w-6">
            <button
                class="inline-flex items-center text-4xl"
                @click="clickClear"
                type="button"
            >
                <span class="leading-none">&times;</span>
            </button>
        </span>
        <span v-if="$slots.append" class="w-6">
            <button class="inline text-4xl" @click="clickAppend" type="button">
                <slot name="append"></slot>
            </button>
        </span>
    </span>
</template>

<script>
import { noop, isNil, isString, isNumber } from "lodash";
import { asset } from "../../utils/asset";

export default {
    name: "BaseTextInput",
    props: {
        clearable: {
            type: Boolean,
        },
        disabled: {
            type: Boolean,
        },
        hasErrors: {
            type: Boolean,
        },
        id: {
            type: String,
        },
        max: {
            type: Number,
            default: Infinity,
        },
        min: {
            type: Number,
            default: -Infinity,
        },
        modelValue: {
            type: [String, Number],
        },
        name: {
            type: String,
        },
        onClickAppend: {
            default: noop,
            type: Function,
        },
        onClickClear: {
            default: noop,
            type: Function,
        },
        transparent: {
            type: Boolean,
        },
        step: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return { asset, innerValue: 0 };
    },
    methods: {
        decrease() {
            let valueToEmit = Math.max(this.innerValue - this.step, this.min);
            this.$emit("update:modelValue", valueToEmit);
        },
        increase() {
            let valueToEmit = Math.min(this.innerValue + this.step, this.max);
            this.$emit("update:modelValue", valueToEmit);
        },
        onInput(event) {
            if (event.target.value === "") return this.$emit("update:modelValue", null);
            this.$emit("update:modelValue", +event.target.value);
        },
        clickAppend(event) {
            this.onClickAppend(event);
            this.$emit("click:append", event);
        },
        clickClear(event) {
            this.onClickClear(event);
            this.$emit("click:clear", event);
        },
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(value) {
                if (!isNil(value)) {
                    let current = value;
                    if (isString(value)) {
                        current = +current;
                        if (!Number.isNaN(current)) {
                            this.innerValue = current;
                        }
                    } else if (isNumber(value)) {
                        this.innerValue = current;
                    }
                } else {
                    this.innerValue = 0;
                }
            },
        },
    },
};
</script>

<style lang="scss">
.number-input__input {
    input[type="number"] {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -moz-appearance: textfield;
            appearance: none;
        }
    }
}
</style>
