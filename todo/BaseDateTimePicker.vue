<template>
    <div v-click-outside="onClickOutside">
        <span
            :class="[
                hasErrors
                    ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200'
                    : 'border-gray-400 focus-within:border-primary-300 focus-within:ring-primary-200',
                { ['bg-white']: !transparent },
            ]"
            class="base-datetime-picker__input flex rounded-md border focus-within:ring focus-within:ring-opacity-50 p-0"
        >
            <span class="relative flex-auto">
                <input
                    :id="id"
                    :name="name"
                    type="text"
                    class="block w-full rounded-md shadow-sm border-0 focus:ring-0 cursor-pointer"
                    :class="[transparent ? 'bg-transparent' : 'bg-white']"
                    :value="displayValue"
                    readonly
                    :disabled="disabled"
                    @focus="open = true"
                    v-bind="$attrs"
                />
            </span>
            <span
                v-if="hasErrors"
                class="flex flex-col justify-center w-6 mr-2"
            >
                <img
                    :src="asset.icon('validation_error.svg')"
                    alt="Icona errore"
                    aria-hidden="true"
                />
            </span>
            <span v-if="clearable" class="w-6 mr-2">
                <button
                    class="inline text-4xl"
                    @click="clickClear"
                    :disabled="disabled"
                    type="button"
                >
                    <span>&times;</span>
                </button>
            </span>
            <span v-if="$slots.append" class="w-6 mr-2">
                <button
                    class="inline text-4xl"
                    @click="clickAppend"
                    type="button"
                >
                    <slot name="append"></slot>
                </button>
            </span>
        </span>
        <div class="flex justify-center h-0 w-0 mx-auto" v-if="open">
            <div class="bg-white z-10">
                <Datepicker
                    :uid="id"
                    auto-apply
                    inline
                    :range="range"
                    :modelValue="innerValue"
                    :enableTimePicker="time"
                    @update:modelValue="onDateSelected"
                />
            </div>
        </div>
    </div>
</template>

<script>
import "@vuepic/vue-datepicker/dist/main.css";
import { asset } from "../../utils/asset";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { noop, identity, flow } from "lodash";
import { parse, parseISO, startOfDay, endOfDay } from "date-fns";
import Datepicker from "@vuepic/vue-datepicker";
import { ifElse, mapValue, when } from "../../utils/functions";

const fromStringToDate = (stringDate, formatString) => {
    if (formatString === "iso") return parseISO(stringDate);
    return parse(stringDate, formatString, new Date());
};

const fromDateToString = (date, formatString) => {
    if (formatString === "iso") return date.toISOString();
    return format(date, formatString, { locale: it });
};

export default {
    name: "BaseDateTimePicker",
    components: {
        Datepicker,
    },
    props: {
        clearable: {
            type: Boolean,
        },
        disabled: {
            type: Boolean,
        },
        displayFormat: {
            type: String,
            default: "dd/MM/yyyy",
        },
        hasErrors: {
            type: Boolean,
        },
        id: {
            type: String,
        },
        modelValue: {
            type: [String, Date, Array],
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
        range: {
            type: Boolean,
        },
        roundToEnd: {
            type: Boolean,
        },
        time: {
            type: Boolean,
        },
        transparent: {
            type: Boolean,
        },
        // Pass null to use date
        valueFormat: {
            type: String,
            default: "iso",
        },
    },
    data() {
        let innerValue = this.modelValue;
        if (this.modelValue && this.valueFormat) {
            innerValue = mapValue(
                (value) => fromStringToDate(value, this.valueFormat),
                this.modelValue
            );
        }
        return { asset, open: false, innerValue };
    },
    computed: {
        displayValue() {
            return []
                .concat(this.innerValue)
                .filter(identity)
                .map(
                    flow([
                        when(() => !this.time, startOfDay),
                        (value) =>
                            fromDateToString(value, this.displayFormat, {
                                preserveTime: this.time,
                            }),
                    ])
                )
                .join(" - ");
        },
    },
    methods: {
        onDateSelected(value) {
            let mapped = value;
            if (!this.time) {
                mapped = mapValue(ifElse(() => this.roundToEnd, endOfDay, startOfDay), mapped);
                if (this.range) {
                    mapped[1] = endOfDay(mapped[1]);
                }
            }
            if (this.valueFormat) {
                mapped = mapValue(
                    (value) => fromDateToString(value, this.valueFormat),
                    mapped
                );
            }
            this.$emit("update:modelValue", mapped);
        },
        clickAppend(event) {
            this.onClickAppend(event);
            this.$emit("click:append", event);
        },
        clickClear(event) {
            let valueToEmit = this.range ? [] : null;
            this.onClickClear(event);
            this.$emit("click:clear", event);
            this.$emit("update:modelValue", valueToEmit);
        },
        onClickOutside(){
            this.$emit('validate');
            this.open = false;
        }
    },
    watch: {
        modelValue(value) {
            let mapped = value;
            if (value || (this.range && value.length)) {
                if (this.valueFormat) {
                    mapped = mapValue(
                        (value) => fromStringToDate(value, this.valueFormat),
                        mapped
                    );
                }
            }
            this.innerValue = mapped;
        },
    },
};
</script>

<style></style>
