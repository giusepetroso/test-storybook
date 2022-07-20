<template>
    <span
        :class="[
            hasErrors
                ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200'
                : 'border-gray-400 focus-within:border-primary-300 focus-within:ring-primary-200',
            { ['bg-white']: !transparent },
        ]"
        class="textarea-input__input flex rounded-md border focus-within:ring focus-within:ring-opacity-50 p-0"
    >
        <span class="inline-block relative flex-auto overflow-hidden">
            <textarea
                ref="textarea"
                :id="id"
                :name="name"
                type="text"
                :class="[transparent ? 'bg-transparent' : 'bg-white', 'block w-full rounded-md shadow-sm border-0 focus:ring-0 min-h-[40px] resize-none']"
                :value="modelValue"
                @input.stop="onInput"
                v-bind="$attrs"
            />
        </span>
        <span v-if="hasErrors" class="flex flex-col justify-center w-6 mr-2">
            <img
                :src="asset.icon('validation_error.svg')"
                alt="Icona errore"
                aria-hidden="true"
            />
        </span>
        <span v-if="clearable" class="w-6 mr-2">
            <button class="inline text-4xl" @click="clickClear" type="button">
                <span>&times;</span>
            </button>
        </span>
    </span>
</template>

<script>
import { noop, debounce } from "lodash";
import { asset } from "../../utils/asset";

export default {
    name: "BaseTextInput",
    props: {
        autoSize: {
            type: Boolean,
            default: true
        },
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
    },
    mounted(){
        if(this.modelValue) this.updateHeight()
    },  
    data() {
        return { asset };
    },
    methods: {
        onInput(event) {
            this.$emit("update:modelValue", event.target.value);
        },
        clickAppend(event) {
            this.onClickAppend(event);
            this.$emit("click:append", event);
        },
        clickClear(event) {
            this.onClickClear(event);
            this.$emit("click:clear", event);
        },
        updateHeight() {
            this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
        },
    },
    watch: {
        modelValue: {
            handler: debounce(function(value){
                if(this.autoSize) this.updateHeight()
            }, 100)
        }
    }
};
</script>

<style></style>
