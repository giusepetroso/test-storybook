<template>
    <component
        :aria-disabled="!!disabled"
        class="im-button btn"
        :class="[
            { 'btn-sm': small, 'btn-lg': large, disabled },
            variantClass,
            `contrasting-text-${variant}`,
        ]"
        :disabled="disabled"
        :is="tag"
        v-bind="attributes"
    >
        <span class="im-button__content">
            <slot></slot>
        </span>
    </component>
</template>

<script setup>
import { computed, toRefs } from "vue";

const _props = defineProps({
    disabled: {
        default: false,
        type: Boolean,
    },
    outlined: {
        default: false,
        type: Boolean,
    },
    tag: {
        default: "button",
        type: String,
    },
    small: {
        default: "primary",
        type: String,
    },
    large: {
        default: "primary",
        type: String,
    },
    variant: {
        default: "primary",
        type: String,
    },
});

const props = toRefs(_props);

const variantClass = computed(() => {
    let base = ["btn"];
    if (props.outlined.value) base.push("outline");
    base.push(props.variant.value);
    return base.join("-");
});

/**
 * Unify gotchas handling and provide common attrs
 */
const attributes = computed(() => {
    let common = {}
    switch (props.tag.value) {
        case 'button':
            common.type = 'button'
            break;
        case 'a':
            common.href = '#'
            if(props.disabled) common.tabindex = -1;
            break;
        default:
            break;
    }
    return common;
})
</script>

<style lang="scss" scoped></style>
