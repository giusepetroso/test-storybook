<template>
    <BaseInputContainer
        :class="'im-radio-tiles'"
        :disabled="disabled"
        :hide-label="hideLabel"
        :horizontal="horizontal"
        :id="id"
        :label="label"
        :labelTag="'span'"
        :name="name"
        :readonly="readonly"
    >
        <template #label="{ text }"
            ><slot name="label">{{ text }}</slot></template
        >
        <template #input="{ disabled, id, name, readonly }">
            <div class="im-radio-tiles__content">
                <BaseTile
                    v-for="option in options"
                    :checked="option.checked"
                    :disabled="option.disabled || disabled"
                    :id="`${id}_${option.value}`"
                    :key="option.value"
                    :model-value="option.value"
                    :name="name"
                    :readonly="readonly"
                    :text="option.text"
                    :variant="variant"
                    @update:model-value="onModelValueUpdate"
                >
                    <template
                        v-for="(index, name) in $slots"
                        v-slot:[name]="data"
                    >
                        <slot :name="name" v-bind="data" />
                    </template>
                </BaseTile>
            </div>
        </template>
    </BaseInputContainer>
</template>

<script setup>
import { when } from "@/js/Utils/Functions";
import {
    isPlainObject,
    cond,
    isFunction,
    overArgs,
    get,
    stubTrue,
    curry,
    pipe,
    negate,
    isString
} from "lodash/fp";
import { computed, toRefs } from "vue";
import BaseInputContainer from "./Base/BaseInputContainer.vue";
import BaseTile from "./Base/BaseTile.vue";

const _props = defineProps({
    disabled: {
        type: Boolean,
    },
    hideLabel: {
        type: Boolean,
    },
    horizontal: {
        // Can either be true, false, or a division string 'xxxx xxxxxx'
        type: [Boolean, String],
        default: false,
    },
    id: {
        type: String,
    },
    items: {
        default: () => [],
        type: Array,
    },
    // Pass null if you want to use the whole object as text
    itemText: {
        default: "text",
        type: String,
    },
    // Pass null if you want to use the whole object as value
    itemValue: {
        default: "value",
        type: String,
    },
    label: {
        type: String,
    },
    modelValue: {},
    name: {
        type: String,
    },
    readonly: {
        type: Boolean,
    },
    // Bootstrap variants
    variant: {
        type: String,
        default: "primary",
    },
});

const props = toRefs(_props);

const mappedValue = computed(() => JSON.stringify(props.modelValue.value));

/**
 * When prop is function call it with the item as arg.
 * Else just get the prop
 */
const getProp = curry(
    cond([
        [isFunction, overArgs],
        [stubTrue, get],
    ]),
    2
);
/**
 * Takes an item and creates a valid option to be passed to the tiles
 */
const makeOption = (item) => {
    let text, value, disabled, checked;
    if (isPlainObject(item)) {
        // If the text prop is not already a string make it one
        text = pipe(
            getProp(props.itemText.value),
            when(negate(isString), JSON.stringify)
        )(item);
        value = JSON.stringify(getProp(props.itemValue.value, item));
    } else {
        // If the text prop is not already a string make it one
        text = pipe(when(negate(isString), JSON.stringify))(item);
        value = JSON.stringify(item);
    }
    disabled = getProp("disabled", item) ? "disabled" : null;
    checked = value === mappedValue.value ? "checked" : null;
    return {
        checked,
        disabled,
        text,
        value,
    };
};

const options = computed(() => props.items.value.map(makeOption));
const emit = defineEmits(["update:modelValue"]);
const onModelValueUpdate = (value) =>
    emit("update:modelValue", JSON.parse(value));
</script>

<style lang="scss" scoped>
.im-radio-tiles {
    .im-radio-tiles__content {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
}
</style>
