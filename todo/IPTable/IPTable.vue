<template>
    <table class="ip-table" v-if="items.length">
        <thead>
            <IPHeaderRow>
                <IPTableHeader
                    v-for="header in headers"
                    :key="JSON.stringify(header.value)"
                    :text="header.text"
                    :value="header.value"
                    :class="headerClasses"
                    :headerClasses="header.headerClasses"
                >
                    <template
                        v-for="(index, name) in $slots"
                        v-slot:[name]="data"
                    >
                        <slot :name="name" v-bind="data"></slot>
                    </template>
                </IPTableHeader>
            </IPHeaderRow>
        </thead>
        <tbody v-if="!loading">
            <IPRow v-for="item in items" :key="item[itemKey]">
                <IPTableData
                    v-for="header in headers"
                    :key="JSON.stringify(header.value)"
                    :formatter="header.formatter"
                    :item="item"
                    :placeholder="header.placeholder"
                    :value="header.value"
                    :text="header.text"
                    :class="dataClasses"
                    :dataClasses="header.dataClasses"
                >
                    <template
                        v-for="(index, name) in $slots"
                        v-slot:[name]="data"
                    >
                        <slot :name="name" v-bind="data"></slot>
                    </template>
                </IPTableData>
            </IPRow>
        </tbody>
        <tbody v-else>
            <tr v-for="item in items" :key="item[itemKey]">
                <td :colspan="headers.length">
                    <div class="w-full py-5">
                        <div class="animate-pulse flex space-x-4">
                            <div
                                class="rounded-full bg-slate-200 h-10 w-10"
                            ></div>
                            <div class="flex-1 space-y-6 py-1">
                                <div class="space-y-3">
                                    <div class="grid grid-cols-3 gap-4">
                                        <div
                                            class="h-2 bg-slate-200 rounded col-span-2"
                                        ></div>
                                    </div>
                                    <div class="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
        <slot name="tfoot">
            <tfoot></tfoot>
        </slot>
    </table>
    <table class="ip-table" v-else-if="!loading">
        <tbody>
            <tr>
                <td>{{ emptyMessage }}</td>
            </tr>
        </tbody>
    </table>
    <table class="ip-table" v-else>
        <tbody>
            <tr>
                <td>
                    <div class="w-full py-5">
                        <div class="animate-pulse flex space-x-4">
                            <div
                                class="rounded-full bg-slate-200 h-10 w-10"
                            ></div>
                            <div class="flex-1 space-y-6 py-1">
                                <div class="space-y-3">
                                    <div class="grid grid-cols-3 gap-4">
                                        <div
                                            class="h-2 bg-slate-200 rounded col-span-2"
                                        ></div>
                                    </div>
                                    <div class="h-2 bg-slate-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import IPHeaderRow from "./IPHeaderRow.vue";
import IPTableHeader from "./IPTableHeader.vue";
import IPRow from "./IPRow.vue";
import IPTableData from "./IPTableData.vue";

export default {
    name: "IPtable",
    components: { IPHeaderRow, IPTableHeader, IPRow, IPTableData },
    props: {
        headers: {
            type: Array,
            default: () => [],
        },
        items: {
            type: [Array],
            default: () => [],
        },
        itemKey: {
            type: String,
            default: "id",
        },
        dataClasses: {
            default: null,
        },
        headerClasses: {
            default: null,
        },
        emptyMessage: {
            type: String,
            default: "Non ci sono dati da visualizzare",
        },
        loading: {
            type: Boolean,
        },
    },
};
</script>

<style lang="scss">
// Use transparent border for spacing keeping radius
$horizontalSpacing: 10px;
$verticalSpacing: 10px;
.ip-table {
    border-spacing: 0px $verticalSpacing;
    border-collapse: separate;
    width: 100%;
    thead {
        tr {
            th {
                font-size: 0.85rem;
                color: #767676;
                font-weight: 400;
                text-align: left;

                &:not(:last-of-type):not(:first-of-type) {
                    padding-left: calc($horizontalSpacing / 2);
                    padding-right: calc($horizontalSpacing / 2);
                }

                &:first-of-type {
                    padding-left: 30px;
                    padding-right: calc($horizontalSpacing / 2);
                }

                &:last-of-type {
                    padding-right: 30px;
                    padding-left: calc($horizontalSpacing / 2);
                }
            }
        }
    }
    tbody {
        tr {
            td {
                background-color: white;
                color: black;
                height: 85px;
                box-shadow: 0px 2px rgba(0, 0, 0, 0.15);
                &:not(:last-of-type):not(:first-of-type) {
                    padding-left: calc($horizontalSpacing / 2);
                    padding-right: calc($horizontalSpacing / 2);
                }

                &:first-of-type {
                    border-top-left-radius: 8px;
                    border-bottom-left-radius: 8px;
                    padding-left: 30px;
                    &:not(:only-child) {
                        padding-right: calc($horizontalSpacing / 2);
                    }
                }
                &:last-of-type {
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                    padding-right: 30px;
                    &:not(:only-child) {
                        padding-left: calc($horizontalSpacing / 2);
                    }
                }
            }
        }
    }
}
</style>
