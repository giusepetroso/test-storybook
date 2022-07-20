<template>
    <div class="checkbox_tiles__checkbox_container" :class="$attrs.class">
        <div class="checkbox_tiles__checkbox_container">
            <label
                :for="id"
                class="checkbox_tiles__label inline-block cursor-pointer mr-2 my-1"
            >
                <input
                    class="sr-only peer"
                    type="checkbox"
                    :id="id"
                    :name="name"
                    :value="true"
                    :checked="modelValue"
                    @change="onChange"
                />
                <span
                    class="checkbox_tiles__tile bg-[#dfecef] peer-checked:bg-primary transition-all inline-block py-3 px-6 rounded-full text-primary"
                    ><span
                        class="checkbox_tiles__text inline-flex items-center text-gray-600"
                        >{{ label }}
                        <slot name="append"></slot> </span
                ></span>
            </label>
        </div>
    </div>
</template>

<script>
import { noop } from "lodash";
import { asset } from "../../utils/asset";

export default {
    name: "BaseCheckboxTiles",
    inheritAttrs: false,
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
        modelValue: {
            default: false,
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
    },
    data() {
        return { asset };
    },
    methods: {
        clickAppend(event) {
            this.onClickAppend(event);
            this.$emit("click:append", event);
        },
        onChange(event) {
            this.$emit("update:modelValue", event.target.checked);
        },
    },
};
</script>

<style lang="scss">
.checkbox_tiles__checkbox_container {
    .checkbox_tiles__label {
        input[type="checkbox"] {
            &:checked {
                & + .checkbox_tiles__tile {
                    .checkbox_tiles__text {
                        color: white;

                        .checkbox_tiles__icon {
                            color: inherit;
                        }
                    }
                }
            }

            & + .checkbox_tiles__tile {
                .checkbox_tiles__text {
                    color: auto;
                }
            }
        }
    }
}
</style>
