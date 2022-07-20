<template>
    <div
        class="base-multi-select__input relative"
        v-click-outside="onClickOutside"
    >
        <div
            :class="[
                hasErrors
                    ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-200'
                    : 'border-gray-400 focus-within:border-primary-300 focus-within:ring-primary-200',
                { ['bg-white']: !transparent },
            ]"
            class="rounded-md flex border focus-within:ring focus-within:ring-opacity-50 peer group"
            @click="onSearchBarClick"
        >
            <div
                class="relative flex-auto flex flex-wrap min-h-[40px] max-h-30 overflow-auto"
            >
                <template v-if="chips">
                    <IPTag
                        v-for="option in lastSelected"
                        :key="option.value"
                        style="flex: 0 1"
                        class="self-center my-1 ml-1 whitespace-nowrap"
                        :text="option.text"
                        :onClear="() => onSelected(null, option.index)"
                    >
                    </IPTag>
                </template>

                <input
                    :class="[transparent ? 'bg-transparent' : 'bg-white']"
                    :id="id"
                    :placeholder="computedPlaceholder"
                    @focus="onSearchBarClick"
                    @input.stop="onQuery"
                    @keydown.enter.stop="onEnter"
                    class="transition-all flex-auto basis-0 py-0 focus:h-auto focus:py-2 block border-0 self-center focus:outline-none outline-transparent focus:ring-0 rounded-md"
                    ref="searchbar"
                    type="text"
                    v-model="query"
                    style="min-width: 64px; max-height: 32px"
                />
            </div>
            <span
                v-if="hasErrors"
                class="flex-shrink-0 flex flex-col justify-center w-6 mr-2"
            >
                <img
                    class="w-full"
                    :src="asset.icon('validation_error.svg')"
                    alt="Icona errore"
                    aria-hidden="true"
                />
            </span>

            <slot name="dropicon">
                <span
                    class="flex flex-col justify-center items-center w-2 mr-3 rotate-90"
                    style="min-width: 8px"
                >
                    <img
                        v-if="!internalLoading"
                        :src="asset.icon('chevron_right.svg')"
                        alt=""
                        aria-hidden="true"
                    />
                    <svg
                        v-else
                        role="status"
                        class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                </span>
            </slot>
        </div>
        <div
            class="absolute top-full w-full z-10 border border-gray-400 bg-white rounded-md flex-col mt-2"
            :class="{ block: open, hidden: !open }"
        >
            <div
                class="flex justify-center items-center gap-x-3 overflow-hidden max-h-0 transition-all rounded-md"
                :class="{ 'max-h-10': internalLoading }"
            >
                <svg
                    role="status"
                    class="inline w-5 h-5 my-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span>Caricamento...</span>
            </div>
            <div
                v-if="filteredItems.length"
                class="max-h-28 overflow-auto simple-scrollbar"
                @click.stop="onSelected"
                @keydown.enter.stop="onSelected"
                @keydown.down.stop="focusOnNext"
                @keydown.up.stop="focusOnPrevious"
            >
                <div>
                    <div
                        v-for="option in filteredItems"
                        :key="option.value"
                        :class="{
                            disabled: option.disabled,
                            hidden: option.hidden,
                            selected: option.selected,
                        }"
                        :data-value="option.value"
                        :data-selected="option.selected"
                        :data-index="option.index"
                        role="button"
                        tabindex="0"
                        class="base-multi-select__input__options-container__option px-2 py-[2px] bg-white transition-colors hover:bg-primary-50 focus:bg-primary-50 bg-opacity-50 flex gap-2 items-center"
                    >
                        <slot name="option" v-bind="option">
                            <input
                                type="checkbox"
                                :checked="option.selected"
                                readonly="readonly"
                                disabled="disabled"
                                class="pointer-events-none border !border-primary text-primary rounded-[4px] w-5 h-5 focus:border-primary-300 hover:ring-primary-200 hover:border-black focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                            />
                            <span class="pointer-events-none">{{
                                option.text
                            }}</span>
                        </slot>
                    </div>
                </div>
            </div>

            <div v-else class="px-2 py-[2px]">
                {{ emptyMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import {
    isNil,
    noop,
    debounce,
    stubTrue,
    negate,
    isEqual,
    difference,
    defaultTo,
    head,
    uniqBy,
    isEmpty,
    trim,
    identity,
    flow,
} from "lodash";
import { useOptions } from "../../composable/useOptions";
import {
    getDependencies,
    getMode,
    modes,
    shouldStashCurrent,
} from "./AsyncAutocomplete/helpers";
import { asset } from "../../utils/asset";
import IPTag from "../common/IPTag.vue";
import { attempt, mapValue } from "../../utils/functions";

export default {
    name: "AsyncAutocomplete",
    components: { IPTag },
    props: {
        addOptions: {
            type: Boolean,
        },
        chips: {
            type: Boolean,
        },
        clearable: {
            type: Boolean,
        },
        cleanupFunction: {
            default: noop,
            required: false,
            type: Function,
        },
        closeOnClick: {
            default: null,
            type: Boolean,
        },
        debounceTime: {
            default: 500,
            type: Number,
        },
        dependencyTest: {
            default: stubTrue,
            type: Function,
        },
        disabled: {
            type: Boolean
        },
        emptyMessage: {
            default: `Non c'è ancora niente da visualizzare, cerca qualcosa`,
            type: String,
        },
        filterBy: {
            default: "text",
            type: [String, Array],
        },
        filters: {
            required: false,
            type: Object,
        },
        hasErrors: {
            type: Boolean,
        },
        id: {
            type: String,
        },
        items: {
            type: [Array, Function],
        },
        // Pass null if you want to use the whole object as text
        itemText: {
            default: "text",
        },
        // Pass null if you want to use the whole object as value
        itemValue: {
            default: "value",
        },
        max: {
            default: Infinity,
            type: Number
        },
        modelValue: {
            default: null,
        },
        multiple: {
            default: false,
        },
        name: {
            type: String
        },
        onClickClear: {
            default: noop,
            type: Function
        },
        placeholder: {
            type: String,
        },
        prefill: {
            default: false,
            type: Boolean,
        },
        prefillKeys: {
            default: null,
        },

        /** When using queries that would not return the currently selected item this should be true
         * (e.g. searching users by name will not return the other users that have already been selected)
         */
        preserveSelected: {
            default: false,
            type: Boolean,
        },
        preventToggle: {
            default: false,
            type: Boolean,
        },
        queryName: {
            default: "q",
            type: String,
        },

        /** Query is always emitted by default, pass any test to discard query before run */
        queryTest: {
            default: stubTrue,
            type: Function,
        },
        searchFunction: {
            required: false,
            type: Function,
        },
        transparent: {
            type: Boolean,
        },
        validate: {
            default: noop,
            type: Function,
        },
    },
    setup(props, ctx) {
        const { makeOption } = useOptions(props);
        const mode = getMode({
            searchFn: props.searchFunction,
            items: props.items,
            query: !!ctx.attrs.onQuery,
        });

        const search = props.searchFunction || (() => props.items);

        /**
         * It should load options when requested or when items are static
         */
        const shouldPrefill = !!props.prefill || mode === modes.SYNC;

        const shouldCloseOnClick = !isNil(props.closeOnClick)
            ? props.closeOnClick
            : !props.multiple;
        return {
            makeOption,
            toString,
            mode,
            search,
            shouldPrefill,
            shouldCloseOnClick,
            asset,
        };
    },
    async mounted() {
        if (this.shouldPrefill) {
            const { searchDependencies } = this;
            const dependencies = getDependencies({
                searchDependencies,
            });
            /**  Being coherent with value on mount should be a concern of configuration
             *   If the item loads incoherent options on mount, it is misconfigured
             */
            await this.searchFlow(dependencies, { coherenceCheck: false });
            this.setLastSelectedByValue(this.modelValue);
        }
    },
    beforeUnmount() {
        this.cleanupFunction();
    },
    data() {
        return {
            asset,
            open: false,
            query: null,
            innerItems: [],
            staticItems: [],
            internalLoading: false,
            lastSelected: [],
        };
    },
    computed: {
        _items() {
            let items = [];
            items = items.concat(this.staticItems);
            if (this.mode === modes.INTERNAL_ASYNC)
                items = items.concat(this.innerItems);
            else items = items.concat(this.items);
            return items;
        },
        filteredItems() {
            return this.computedItems.reduce((acc, curr, index) => {
                let pass = true;
                if (this.query) {
                    pass = []
                        .concat(this.filterBy)
                        .some((key) =>
                            curr[key]
                                .toLowerCase()
                                .includes(this.query.toLowerCase())
                        );
                }
                // Preserve original index
                if (pass) acc.push({ ...curr, index });
                return acc;
            }, []);
        },

        computedItems() {
            /**
             * Force to keep the items that have already been selected.
             * So you can search for new items without losing the previous ones when doing async searches
             */
            const preserveCurrent = shouldStashCurrent({
                mode: this.mode,
                multi: this.multiple,
                preserveSelected: this.preserveSelected,
            });
            if (preserveCurrent) {
                // Avoid duplicates by comparing the identifying key
                return uniqBy(
                    [].concat(
                        this._items.map(this.makeOption),
                        this.lastSelected
                    ),
                    "value"
                );
            }
            return this._items.map(this.makeOption);
        },
        searchDependencies() {
            const { filters } = this;
            return { filters };
        },
        computedPlaceholder() {
            if (this.chips) return this.placeholder;
            if (this.multiple) {
                if (this.lastSelected.length) {
                    if (this.lastSelected.length === 1)
                        return this.lastSelected[0].text;
                    if (this.lastSelected.length === 2)
                        return this.lastSelected
                            .map((item) => item.text)
                            .join(", ");

                    return `${this.lastSelected[0].text} ed altri  ${
                        this.lastSelected.length - 1
                    } selezionati`;
                }

                return this.placeholder;
            } else {
                /* const found = this.computedOptions.find(({ value }) =>
                    this.mappedValue.includes(value)
                );
                if (found) return found.text; */
                return this.placeholder;
            }
        },
    },
    methods: {
        /**
         * This fires when an option is selected
         */
        /*  onInput(value) {
      this.setLastSelectedByValue(value)
      this.$emit('input', value)
    }, */
        /**
         * This fires when the text input changes, both manually and automatically
         */
        onQuery(query) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(async () => {
                let action;
                /** Depending on the selected mode of operation might search internally or externall */
                if (
                    [modes.INTERNAL_ASYNC, modes.EXTERNAL_ASYNC].includes(
                        this.mode
                    )
                ) {
                    action = () => this.searchOnQuery(query);
                } else {
                    action = () => this.$emit("query", query);
                }
                /** Test the query is acceptable */
                if (this.queryTest(query)) {
                    action();
                }
            }, this.debounceTime);
        },

        /** Triggered by the input on user search */
        async searchOnQuery() {
            const { queryName, searchDependencies, prefillKeys } = this;
            const dependencies = getDependencies({
                query: this.query,
                queryName,
                searchDependencies,
                prefillKeys,
            });
            await this.searchFlow(dependencies);
        },
        /**
         * This is used to keep track of the elements that have been selected.
         */
        setLastSelectedByValue(value) {
            const values = [].concat(value).map((item) => JSON.stringify(item));
            // Preserve the original index to track original position in computed items
            this.lastSelected = this.computedItems.reduce(
                (acc, curr, index) => {
                    if (values.includes(curr.value))
                        acc.push({ ...curr, index });
                    return acc;
                },
                []
            );
        },
        onSelected(event, arbitraryIndex) {
            let valueToEmit;
            const index = !isNil(arbitraryIndex)
                ? arbitraryIndex
                : +event.target.dataset.index;
            const option = this.computedItems[index];
            if (option.selected) {
                if (this.preventToggle) {
                    return;
                }
                if (this.multiple) {
                    // Keep all selected items but skip deselected options's index
                    valueToEmit = this.computedItems.reduce((acc, curr, i) => {
                        if (curr.selected && i !== index) acc.push(curr.value);
                        return acc;
                    }, []);
                } else valueToEmit = JSON.stringify(null);
            } else {
                if (this.multiple) {
                    // Corner case is multiple but default value is null
                    if (!this.modelValue) valueToEmit = [].concat(option.value);
                    // Always recreate the list in order to avoid searching for the value
                    else
                        valueToEmit = this.computedItems.reduce(
                            (acc, curr, i) => {
                                if (curr.selected || i === index)
                                    acc.push(curr.value);
                                return acc;
                            },
                            []
                        );
                } else {
                    valueToEmit = option.value;
                }
            }

            valueToEmit = mapValue(attempt(JSON.parse), valueToEmit);

            this.$emit("update:modelValue", valueToEmit);
            this.setLastSelectedByValue(valueToEmit);
            if (this.shouldCloseOnClick) {
                this.open = false;
            }
            return;
        },

        /** Triggered when dependencies or items change */
        async onChange() {
            const { prefillKeys, searchDependencies } = this;
            const dependencies = getDependencies({
                prefillKeys,
                searchDependencies,
            });
            await this.searchFlow(dependencies);
        },

        async searchFlow(dependencies, { coherenceCheck = true } = {}) {
            // Test if dependencies are acceptable
            const passing = this.dependencyTest(dependencies);
            if (!passing) return;
            this.internalLoading = true;
            // Retrieve new items
            const items = await this.search(dependencies);
            if (this.mode === modes.INTERNAL_ASYNC) {
                this.innerItems = items;
            }
            this.internalLoading = false;
            // Used to align the current value to the available values
            if (coherenceCheck) {
                // Understands what items have become incoherent
                const allValues = this.computedItems.map((item) => item.value);
                const selectedValues = this.lastSelected.map(
                    (item) => item.value
                );
                const incoherentValues = difference(selectedValues, allValues);
                let coherentValues = difference(
                    selectedValues,
                    incoherentValues
                );
                if (!this.multiple)
                    coherentValues = defaultTo(head(coherentValues), null);
                // Emit the only coherent values
                this.$emit("update:ModelValue", coherentValues);
            }
        },

        onClickOutside() {
            if (this.open) {
                this.validate();
            }
            this.open = false;
            this.query = "";
        },

        onSearchBarClick() {
            this.$refs.searchbar.focus();
            this.open = true;
        },
        onEnter() {
            let value = isNil(this.query) ? '' : trim(this.query);
            if (!value  || !this.addOptions) return;
            value = trim
            let parsedValue = attempt(JSON.parse)(this.query);
            if (this.staticItems.includes(parsedValue)) return;
            this.staticItems = this.staticItems.concat(parsedValue);
            this.onSelected(null, this.staticItems.length - 1);

            this.query = "";
        },
        focusOnPrevious() {
            if (event.target.previousSibling)
                event.target.previousSibling.focus();
        },
        focusOnNext(event) {
            if (event.target.nextSibling) event.target.nextSibling.focus();
        },
    },

    watch: {
        /** Search when dependencies change */
        searchDependencies(newDeps, oldDeps) {
            const { prefillKeys } = this;
            const haveChanged = negate(isEqual)(
                getDependencies({
                    prefillKeys,
                    searchDependencies: newDeps,
                }),
                getDependencies({
                    prefillKeys,
                    searchDependencies: oldDeps,
                })
            );
            if (haveChanged) {
                this.onChange();
            }
        },
        /** Search when injected items change (from the outside) */
        items(newItems, oldItems) {
            if (this.searchFunction) return;
            const haveChanged = negate(isEqual)(newItems, oldItems);
            if (haveChanged) {
                this.onChange();
            }
        },
        /** Set valid items when value changes from outside */
        /**
         * We are not supporting prefilling from old value to new value every time it changes
         * so it could at some point be incoherent with what is shown
         * */
        async modelValue(value, oldValue) {
            if (!isNil(value) && !isEmpty(value)) {
                const indexed = [].concat(value).reduce(
                    (acc, curr) => ({
                        ...acc,
                        [JSON.stringify(curr)]: true,
                    }),
                    {}
                );
                if (this.lastSelected.some((item) => !indexed[item.value])) {
                    // Value changes from the outside
                    const { searchDependencies } = this;
                    const dependencies = getDependencies({
                        searchDependencies,
                    });
                    await this.searchFlow(dependencies, {
                        coherenceCheck: false,
                    });
                } else {
                    return;
                    // Value changes from inside
                }
            }
            this.setLastSelectedByValue(value);
        },
    },
};
</script>

<style></style>
