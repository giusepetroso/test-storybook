<template>
    <input
        class="form-control"
        :disabled="disabled"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :type="type"
        :value="modelValue"
        @input="onModelValueUpdate"
    />
</template>

<script setup>
const props = defineProps({
    disabled: {
        type: String,
    },
    id: {
        type: String,
    },
    modelValue: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
    },
    readonly: {
        type: String,
    },
    // Change it for better keyboard integration on mobile
    type: {
        type: String,
        default: "text",
    },
});
const emit = defineEmits(["update:modelValue"]);
const onModelValueUpdate = ({target: {value}}) => emit("update:modelValue", value);
</script>

<style lang="scss" scoped></style>
