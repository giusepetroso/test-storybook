<template>
    <div>
        <label
            :for="id"
            class="ip-switch flex flex-wrap md:flex-nowrap justify-end items-center"
            :class="containerClasses"
        >
            <span
                class="tracking-tight md:mb-0 md:w-auto text-xl font-bold text-black"
                :class="[
                    right ? 'order-2' : 'w-full mb-4 flex-auto mr-5',
                    labelClass,
                    {['sr-only']: hideLabel}
                ]"
                >
                <slot name="labeltext" :label="label">
                    {{ label }}
                </slot>
                
            </span>
            <input
                :id="id"
                type="checkbox"
                role="switch"
                aria-checked="true"
                :disabled="disabled"
                :checked="mapValueFromOutside()"
                :name="name"
                :class="[
                    right ? 'order-1 mr-auto' : '',
                    hasErrors
                        ? 'error border-red-500 focus-within:border-red-500 focus-within:ring-red-200'
                        : 'focus:border-primary-300 focus:ring-primary-200',
                ]"
                class="w-10 rounded-xl h-6 shadow-sm text-primary border-gray-100 focus:ring focus:ring-opacity-50"
                @change="onChange"
            />
        </label>
        <div class="input__errors pt-1">
            <div
                class="text-xs text-right md:text-left text-gray-700 tracking-tight"
                v-for="(error, index) in errors"
                :key="index"
            >
                {{ index }}
            </div>
        </div>
    </div>
</template>

<script>
import { v4 } from "uuid";
import { isEqual } from "lodash";
export default {
    props: {
        disabled: {
            type: Boolean,
        },
        errors: {
            default: () => [],
            type: Array,
        },
        hideLabel: {
            type: Boolean,
        },
        id: {
            default: v4(),
            type: String,
        },
        label: {
            type: String,
        },
        containerClasses: {
            type: String,
        },
        labelClass: {
            type: String,
        },
        name: {
            type: String,
        },
        right: {
            type: Boolean,
        },
        modelValue: {
            type: [String, Number, Boolean, Object, Array],
        },
        falseValue: {
            type: [String, Number, Boolean, Object, Array],
            default: false,
        },
        trueValue: {
            type: [String, Number, Boolean, Object, Array],
            default: true,
        },
    },
    computed: {
        hasErrors() {
            return !!this.errors.length;
        },
    },
    methods: {
        onChange(event) {
            this.$emit(
                "update:modelValue",
                this.mapValueFromInside(event.target.checked)
            );
        },
        mapValueFromOutside() {
            return isEqual(this.modelValue, this.trueValue);
        },
        mapValueFromInside(value) {
            return value ? this.trueValue : this.falseValue;
        },
    },
};
</script>

<style></style>
